import { Ship, Gameboard } from "./script";

// const carrier = new Ship(5);
// const battleship = new Ship(4);
// const destroyer = new Ship(3);
// const submarine = new Ship(3);
// const patrolBoat = new Ship(2);

// Creates a new ship for each test
let ship;
beforeEach(() => {
    ship = new Ship(3);
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
beforeEach(() => {
    gameboard = new Gameboard();
    ship1 = new Ship(3);
    ship2 = new Ship(4);
})

test('creates a gameboard with correct dimensions', () => {
    expect(gameboard.board.length).toBe(10);
    gameboard.board.forEach(row => {
        expect(row.length).toBe(10);
    })
});

test('initializes the board with spaces', () => {
    gameboard.board.forEach(row => {
        row.forEach(cell => {
            expect(cell).toBe('e');
        })
    })
});

test('allows ship to fit exactly horizontally', () => {
    expect(gameboard.placeShip([7, 7], ship1, 'h')).toBe(true);
});

test('prevents ship from horizontal overflow', () => {
    expect(gameboard.placeShip([8, 7], ship1, 'h')).toBe(false);
});

test('allows ship to fit exactly vertically', () => {
    expect(gameboard.placeShip([7, 7], ship1, 'v')).toBe(true);
});

test('prevents ship from vertical overflow', () => {
    expect(gameboard.placeShip([7, 8], ship1, 'v')).toBe(false);
});

test('checks for correct placement of ships', () => {
    gameboard.placeShip([0, 0], ship1, 'h');
    expect(gameboard.board[0][0]).toBe(ship1);
    expect(gameboard.board[1][0]).toBe(ship1);
    expect(gameboard.board[2][0]).toBe(ship1);
    expect(gameboard.board[3][0]).toBe('e');
    expect(gameboard.board[0][1]).toBe('e');
})

test('prevents ships from collisions', () => {
    gameboard.placeShip([0, 0], ship1, 'h');
    expect(gameboard.placeShip([1, 0], ship2, 'h')).toBe(false);
})