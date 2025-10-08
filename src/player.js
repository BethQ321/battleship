import Gameboard from "./gameboard.js";

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

export default Player;
