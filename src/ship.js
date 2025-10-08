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

export default Ship;
