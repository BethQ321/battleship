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
                if(this.board[y][x + i] !== 0) {
                    return false;
                };
            };
        };

        if(orientation === 'v') {
            for(let i = 0; i < ship.length; i++) {
                if(this.board[y + i][x] !== 0) {
                    return false;
                };
            };
        };

        // place ship
        if(orientation === 'h') {
            for(let i = 0; i < ship.length; i++) {
                this.board[y][x + i] = { ship: ship, isHit: false};
            };
        };

        if(orientation === 'v') {
            for(let i = 0; i < ship.length; i++) {
                this.board[y + i][x] = { ship: ship, isHit: false};
            };
        };

        return true;
    }

    receiveAttack (coordinate) {
        let message = '';
        const [x, y] = coordinate;
        const attackLocation = this.board[y][x];

        if(attackLocation === 1 || (typeof attackLocation === 'object' && attackLocation.isHit)) {
            message = 'Already attacked';
        } else if(attackLocation === 0) {
            this.board[y][x] = 1;
            message = 'Miss';
        } else {
            attackLocation.isHit = true;
            attackLocation.ship.hit();
            this.totalHits++;

            if(attackLocation.ship.isSunk()) {
                message = `Hit. You sunk my ${attackLocation.ship.name}!`;
            } else {
                message = 'Hit!';
            }
        }
        return message;
    }

    endGame() {
        return this.totalHits >= 17;
    }

}

export default Gameboard;
