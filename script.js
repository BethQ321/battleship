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

const carrier = new Ship(5);
const battleship = new Ship(4);
const destroyer = new Ship(3);
const submarine = new Ship(3);
const patrolBoat = new Ship(2);

function hitShip(ship) {
    ship.hit();
    return ship.timesHit;
}

export { Ship, hitShip }
