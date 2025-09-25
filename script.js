class Ship {
    constructor(length, name) {
        this.length = length;
        this.name = name;
        this.timesHit = 0;
    }

    hit() {
        this.timesHit++;
    }

    isSunk() {
        return this.timesHit >= this.length;
    }
}

class Gameboard {
    constructor() {
        this.length = 10;
        this.width = 10;
        this.totalHits = 0;
        this.board = this.generateBoard(this.length, this.width);
    }

    generateBoard(length, width) {
        const newBoard = [];
        for(let i = 0; i < length; i++) {
            newBoard[i] = [];
            for(let j = 0; j < width; j++) {
                newBoard[i][j] = 0;
            }
        }
        return newBoard;
    }

    placeShip(coordinate, ship, orientation) {
        const [x, y] = coordinate;

        // check boundaries
        if(orientation === 'h') {
            if(x + ship.length > this.width) {
                return false;
            }
        } else if(orientation === 'v') {
            if(y + ship.length > this.length) {
                return false;
            }
        };
        
        // check collisions
        if(orientation === 'h') {
            for(let i = 0; i < ship.length; i++) {
                if(this.board[x + i][y] !== 0) {
                    return false;
                };
            };
        };

        if(orientation === 'v') {
            for(let i = 0; i < ship.length; i++) {
                if(this.board[x][y + i] !== 0) {
                    return false;
                };
            };
        };

        // place ship
        if(orientation === 'h') {
            for(let i = 0; i < ship.length; i++) {
                this.board[x + i][y] = { ship: ship, isHit: false};
            };
        };

        if(orientation === 'v') {
            for(let i = 0; i < ship.length; i++) {
                this.board[x][y + i] = { ship: ship, isHit: false};
            };
        };

        return true;
    }

    receiveAttack (coordinate) {
        let message = '';
        const [x, y] = coordinate;
        const attackLocation = this.board[x][y];

        if(attackLocation === 1 || (typeof attackLocation === 'object' && attackLocation.isHit)) {
            message = 'already attacked';
        } else if(attackLocation === 0) {
            this.board[x][y] = 1;
            message = 'miss';
        } else {
            attackLocation.isHit = true;
            attackLocation.ship.hit();
            this.totalHits++;

            if(attackLocation.ship.isSunk()) {
                message = `You sunk my ${attackLocation.ship.name}`;
            } else {
                message = 'hit';
            }
        }
        if(this.endGame()) {
            message += ' and won the game!';
        };
        return message;
    }

    endGame() {
        return this.totalHits >= 17;
    }

}

class Player {
    constructor(playerType) {
        this.playerType = playerType;
        this.playerBoard = new Gameboard; 
        this.attackList = [];     
    }

    attack(coordinate, opponentBoard) {
        const [x, y] = coordinate;
        if(this.attackList.includes(`${x},${y}`)) {
            return 'already attacked';
        } else {
            this.attackList.push(`${x},${y}`);
        }

        return opponentBoard.receiveAttack(coordinate);
    }

    generateMove() {
        let coordinate;
        do {
            const x = Math.floor(Math.random() * 10);
            const y = Math.floor(Math.random() * 10);      
            coordinate = [x, y];
        } while (this.attackList.includes(`${coordinate[0]},${coordinate[1]}`));
        return coordinate;
    }
}

export { Ship, Gameboard, Player }
