class Ship {
    constructor(length) {
        this.length = length;
        this.timesHit = 0;
    }

    hit() {
        this.timesHit++;
    }

    isSunk() {
        return this.timesHit >= this.length;
    }
}

// const carrier = new Ship(5);
// const battleship = new Ship(4);
// const destroyer = new Ship(3);
// const submarine = new Ship(3);
// const patrolBoat = new Ship(2);

class Gameboard {
    constructor() {
        this.length = 10;
        this.width = 10;
        this.board = this.generateBoard(this.length, this.width);
    }

    generateBoard(length, width) {
        const newBoard = [];
        for(let i = 0; i < length; i++) {
            newBoard[i] = [];
            for(let j = 0; j < width; j++) {
                newBoard[i][j] = 'e';
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
                if(this.board[x + i][y] !== 'e') {
                    return false;
                };
            };
        };

        if(orientation === 'v') {
            for(let i = 0; i < ship.length; i++) {
                if(this.board[x][y + i] !== 'e') {
                    return false;
                };
            };
        };

        // place ship
        if(orientation === 'h') {
            for(let i = 0; i < ship.length; i++) {
                this.board[x + i][y] = ship;
            };
        };

        if(orientation === 'v') {
            for(let i = 0; i < ship.length; i++) {
                this.board[x][y + i] = ship;
            };
        };


        return true;
    }

}

export { Ship, Gameboard }
