const HEIGHT = 25;
const TABLE = document.querySelector("table");

/**
 * Build the board, too lazy to do it, this is faster
 */
function board() {
    for (let col = 0; col < HEIGHT; col++) {
        tr = document.createElement("tr");

        for (let row = 0; row < HEIGHT; row++) {
            td = document.createElement("td");
            td.setAttribute("onclick", "cellStatus(this)");
            td.setAttribute("class", "dead");
            tr.append(td);

        }

        TABLE.appendChild(tr);
    }
}

/**
 * Change the status (dead/alive) of the cell indicated
 * @param {HTMLTableCellElement} cell - Cell clicked 
 */
function cellStatus(cell) {
    if (cell.classList.contains("dead")) {
        cell.classList.remove("dead");
        cell.classList.add("alive");
        cell.style.backgroundColor = "#000000";
    } else {
        cell.classList.remove("alive");
        cell.classList.add("dead");
        cell.style.backgroundColor = "#eeeeee";
    }
}

/**
 * Gets all the cells from the board and with a random number (1 to 3) decides the cell state (1 alive / 2-3 dead)
 */
function cellStatusRandom() {
    clearCell();
    let CELLS = document.querySelectorAll("td");
    CELLS.forEach(cell => {
        if (Math.ceil(Math.random() * 3) == 1) {
            cellStatus(cell);
        }
    });
}

/**
 * Clears the board of alive cells, all of them become dead
 */
function clearCell() {
    let CELLS = document.querySelectorAll("td");
    CELLS.forEach(cell => {
        cell.classList.remove("alive");
        cell.classList.add("dead");
        cell.style.backgroundColor = "#eeeeee";
    });
}

/**
 * Execute the board building when the page loads
 */
window.onload = () => {
    board();
}