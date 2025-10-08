const DOM = (() => {
    const renderBoard = (gameboard, container, showShips = true) => {
        container.innerHTML = "";

        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.x = x;
                cell.dataset.y = y;

                const value = gameboard.board[y][x];

                if (value.ship && showShips) {
                    cell.classList.add("ship");
                }

                if (value === 1) {
                    cell.classList.add("miss");
                }

                if (value.ship && value.isHit) {
                    cell.classList.add("hit");
                }

                container.appendChild(cell);
            }
        }
    }; 

    return { renderBoard };
})();

export default DOM;