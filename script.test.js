import { Ship, hitShip } from "./script";

// const carrier = new Ship(5);
// const battleship = new Ship(4);
// const destroyer = new Ship(3);
// const submarine = new Ship(3);
// const patrolBoat = new Ship(2);

test('hit from 0 to 1', () => {
    const carrier = new Ship(5);
    expect(hitShip(carrier)).toBe(1);
})

test('ship is sunk', () => {
    const length = 4;
    const battleship = new Ship(length);
    for(let i = 0; i < length; i++) {
        hitShip(battleship);
    }
    expect(battleship.isSunk()).toBe(true);
})