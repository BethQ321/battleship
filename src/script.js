import Ship from './ship.js';
import Gameboard from './gameboard.js';
import Player from './player.js';
import DOM from './dom.js';

const actionContainer = document.getElementById('action');
const humanBoardContainer = document.getElementById('humanBoard');
const opponentBoardContainer = document.getElementById('opponentBoard');

const human = new Player('human');
const computer = new Player('computer');
let currentPlayer = human;

const start = document.createElement('start');
start.textContent = "🧑🏽‍🦱 Your turn";
actionContainer.appendChild(start);

// Current hard coding of ships **needs to be removed later!**

human.playerBoard.placeShip([0, 0], new Ship(2, 'patrol boat'), 'h');
human.playerBoard.placeShip([0, 2], new Ship(3, 'submarine'), 'h');
human.playerBoard.placeShip([0, 4], new Ship(3, 'destroyer'), 'h');
human.playerBoard.placeShip([0, 6], new Ship(4, 'battleship'), 'h');
human.playerBoard.placeShip([0, 8], new Ship(5, 'carrier'), 'h');

computer.playerBoard.placeShip([0, 0], new Ship(2, 'patrol boat'), 'h');
computer.playerBoard.placeShip([0, 2], new Ship(3, 'submarine'), 'h');
computer.playerBoard.placeShip([0, 4], new Ship(3, 'destroyer'), 'h');
computer.playerBoard.placeShip([0, 6], new Ship(4, 'battleship'), 'h');
computer.playerBoard.placeShip([0, 8], new Ship(5, 'carrier'), 'h');

DOM.renderBoard(human.playerBoard, humanBoardContainer, true);
DOM.renderBoard(computer.playerBoard, opponentBoardContainer, true);

function logAction (message) {
    const p = document.createElement('p');
    p.textContent = message;
    actionContainer.appendChild(p);

    actionContainer.scrollTop = actionContainer.scrollHeight;
}

function switchTurn() {
    currentPlayer = (currentPlayer === human) ? computer: human;
    let message = (currentPlayer === human) ? "🧑🏽‍🦱 Your turn" : "🤖 My turn";
    logAction(message);
}

opponentBoardContainer.addEventListener('click', (e) => {
    const cell = e.target.closest('.cell');
    if (!cell || !opponentBoardContainer.contains(cell)) return;

    const x = Number(cell.dataset.x);
    const y = Number(cell.dataset.y);

    humanTurn(x, y);
});

function humanTurn(x, y) {
    if (currentPlayer !== human || computer.playerBoard.endGame()) return;

    const result = computer.playerBoard.receiveAttack([x, y]);
    const textResult = `Human attack: ${result}`;
    logAction(textResult);

    DOM.renderBoard(computer.playerBoard, opponentBoardContainer, true);

    if(!computer.playerBoard.endGame()) {
        switchTurn();
        computerTurn();
    } else {
        const winText = "GAME OVER! YOU WIN!!!";
        logAction(winText);
    }

}

function computerTurn() {
    const coordinate = computer.generateMove();

    const result = computer.attack(coordinate, human.playerBoard);
    const textResult = `Computer attack: ${result}`;
    logAction(textResult);

    DOM.renderBoard(human.playerBoard, humanBoardContainer, true);

    if(!human.playerBoard.endGame()) {
        switchTurn();
    } else {
        const winText = "GAME OVER! I WIN!!!";
        logAction(winText);
    }
}