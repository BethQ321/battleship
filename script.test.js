import Ship from './src/ship.js';
import Gameboard from './src/gameboard.js';
import Player from './src/player.js';

// Creates a new ship for each test
let ship;
beforeEach(() => {
    ship = new Ship(3, 'destroyer');
});

// Initial tests of the class
test('confirm initial hits is 0', () => {
    expect(ship.timesHit).toBe(0);
});

test('confirm initial isSunk state is false', () => {
    expect(ship.isSunk()).toBe(false);
});

// Single hit
test('timesHit increases from 0 to 1', () => {
    ship.hit();
    expect(ship.timesHit).toBe(1);
});

test('confirm isSunk is false after a single hit', () => {
    ship.hit();
    expect(ship.isSunk()).toBe(false);
});

// Exactly sunk
test('ship is sunk when hits = length', () => {
    for(let i = 0; i < 3; i++) {
        ship.hit();
    }
    expect(ship.isSunk()).toBe(true);
});

// Overkill
test('ship is still sunk when hits > length', () => {
    for(let i = 0; i < 4; i++) {
        ship.hit();
    }
    expect(ship.isSunk()).toBe(true);
});

// Gameboard testing
let gameboard;
let carrier, battleship, destroyer, submarine, patrolBoat;

beforeEach(() => {
    gameboard = new Gameboard();

    carrier = new Ship(5, 'carrier');
    battleship = new Ship(4, 'battleship');
    destroyer = new Ship(3, 'destroyer');
    submarine = new Ship(3, 'submarine');
    patrolBoat = new Ship(2, 'patrol boat');
})

// Testing gameboard & generateBoard
test('creates a gameboard with correct dimensions', () => {
    expect(gameboard.board.length).toBe(10);
    gameboard.board.forEach(row => {
        expect(row.length).toBe(10);
    })
});

test('initializes the board with 0s', () => {
    gameboard.board.forEach(row => {
        row.forEach(cell => {
            expect(cell).toBe(0);
        })
    })
});

// Testing gameboard: placeShip
test('allows ship to fit exactly horizontally', () => {
    expect(gameboard.placeShip([7, 7], destroyer, 'h')).toBe(true);
});

test('prevents ship from horizontal overflow', () => {
    expect(gameboard.placeShip([8, 7], destroyer, 'h')).toBe(false);
});

test('allows ship to fit exactly vertically', () => {
    expect(gameboard.placeShip([7, 7], destroyer, 'v')).toBe(true);
});

test('prevents ship from vertical overflow', () => {
    expect(gameboard.placeShip([7, 8], destroyer, 'v')).toBe(false);
});

test('checks for correct placement of ships', () => {
    gameboard.placeShip([0, 0], destroyer, 'h');
    expect(gameboard.board[0][0]).toEqual({ship: destroyer, isHit: false});
    expect(gameboard.board[1][0]).toEqual({ship: destroyer, isHit: false});
    expect(gameboard.board[2][0]).toEqual({ship: destroyer, isHit: false});
    expect(gameboard.board[3][0]).toBe(0);
    expect(gameboard.board[0][1]).toBe(0);
})

test('prevents ships from collisions', () => {
    gameboard.placeShip([0, 0], destroyer, 'h');
    expect(gameboard.placeShip([1, 0], battleship, 'h')).toBe(false);
})

// Testing gameboard: receiveAttack and endGame

test('when empty location is attacked, "miss" is returned', () => {
    expect(gameboard.receiveAttack([0, 0])).toBe('miss');
});

test('check for empty location to change to 1 after attack', () => {
    gameboard.receiveAttack([0, 0]);
    expect(gameboard.board[0][0]).toBe(1);
});

test('do not allow second attack at same location', () => {
    gameboard.receiveAttack([0, 0]);
    expect(gameboard.receiveAttack([0, 0])).toBe('already attacked');
});

test('if ship is attacked, a hit is returned', () => {
    gameboard.placeShip([0, 0], destroyer, 'h');
    expect(gameboard.receiveAttack([1, 0])).toBe('hit');
});

test('if ship is attacked, a hit is correctly recorded', () => {
    gameboard.placeShip([0, 0], destroyer, 'h');
    gameboard.receiveAttack([1, 0]);
    expect(gameboard.board[1][0].isHit).toBe(true);
    expect(gameboard.board[1][0].ship.timesHit).toBe(1);
    expect(gameboard.totalHits).toBe(1);
});

test('do not allow second attack at same location on ship', () => {
    gameboard.placeShip([0, 0], destroyer, 'h');
    gameboard.receiveAttack([1, 0]);
    expect(gameboard.receiveAttack([1,0])).toBe('already attacked');
});

test('ships are marked sunk correctly', () => {
    gameboard.placeShip([0, 0], destroyer, 'h');
    gameboard.receiveAttack([0, 0]);
    gameboard.receiveAttack([1, 0]);
    expect(gameboard.receiveAttack([2, 0])).toBe('You sunk my destroyer');
    expect(destroyer.isSunk()).toBe(true);
});

test('do not allow another attack on a ship after it is sunk', () => {
  gameboard.placeShip([0, 0], destroyer, 'h');
  gameboard.receiveAttack([0, 0]);
  gameboard.receiveAttack([1, 0]);
  gameboard.receiveAttack([2, 0]); 
  expect(gameboard.receiveAttack([1, 0])).toBe('already attacked');
});


test('endGame is keeping an accurate count and remains false when less than 17', () => {
    gameboard.placeShip([0, 0], destroyer, 'h');
    gameboard.receiveAttack([0, 0]);
    gameboard.receiveAttack([1, 0]);
    gameboard.receiveAttack([2, 0]);
    expect(gameboard.totalHits).toBe(3);
    expect(gameboard.endGame()).toBe(false);
});

test('endGame is triggered correctly', () => {
    gameboard.placeShip([0, 0], patrolBoat, 'h');
    gameboard.receiveAttack([0, 0]);
    gameboard.receiveAttack([1, 0]);
    gameboard.placeShip([0, 1], submarine, 'h');
    gameboard.receiveAttack([0, 1]);
    gameboard.receiveAttack([1, 1]);
    gameboard.receiveAttack([2, 1]);
    gameboard.placeShip([0, 2], destroyer, 'h');
    gameboard.receiveAttack([0, 2]);
    gameboard.receiveAttack([1, 2]);
    gameboard.receiveAttack([2, 2]);
    gameboard.placeShip([0, 3], battleship, 'h');
    gameboard.receiveAttack([0, 3]);
    gameboard.receiveAttack([1, 3]);
    gameboard.receiveAttack([2, 3]);
    gameboard.receiveAttack([3, 3]);
    gameboard.placeShip([0, 4], carrier, 'h');
    gameboard.receiveAttack([0, 4]);
    gameboard.receiveAttack([1, 4]);
    gameboard.receiveAttack([2, 4]);
    gameboard.receiveAttack([3, 4]);
    expect(gameboard.receiveAttack([4, 4])).toBe('You sunk my carrier and won the game!');
});

// Testing Player class

let player;
let opponent;

beforeEach(() => {
    player = new Player('human');
    opponent = new Gameboard();
});

test('player type is assigned correctly', () => {
    expect(player.playerType).toBe('human');
});

test('an empty game board is generated for the player', () => {
    player.playerBoard.board.forEach(row => {
        row.forEach(cell => {
            expect(cell).toBe(0);
        })
    })
});

test('the attack list is initialized as empty', () => {
    expect(player.attackList).toEqual([]);
});

// Test attack method of Player class

test('attack list is updated after an attack', () => {
    player.attack([0, 0], opponent);
    expect(player.attackList).toContain('0,0');
});

test('attackList stores coordinates in correct "x,y" string format', () => {
    player.attack([3, 4], opponent);
    expect(player.attackList.includes('3,4')).toBe(true);
});

test('a duplicated attack returns "already attacked"', () => {
    player.attack([0, 0], opponent);
    expect(player.attack([0, 0], opponent)).toBe('already attacked');
});

// Test generateMove method of Player class

test('generateMove returns a valid coordinate within bounds', () => {
    const move = player.generateMove();
    expect(move[0]).toBeGreaterThanOrEqual(0);
    expect(move[0]).toBeLessThan(10);
    expect(move[1]).toBeGreaterThanOrEqual(0);
    expect(move[1]).toBeLessThan(10);
});

test('multiple generated moves do not duplicate', () => {
    for (let i = 0; i < 20; i++) {
      const move = player.generateMove();
      player.attack(move, opponent); 
    }
    expect(player.attackList.length).toBe(20);
});


