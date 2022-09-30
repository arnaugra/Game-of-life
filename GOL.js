const HEIGHT = 25;
const TABLE = document.querySelector("table");
const NEW_CELLS = new Array(24);
let CELLS = [];
let PAUSE = true;
let interval;
let refresh = document.querySelector("#range").value;

/**
 * Build the board, too lazy to do it, this is faster
 */
function board() {
    for (let col = 0; col < HEIGHT; col++) {
        CELLS[col] = [];
        NEW_CELLS[col] = new Array(24);
        tr = document.createElement("tr");

        for (let row = 0; row < HEIGHT; row++) {
            CELLS[col][row] = "dead";
            td = document.createElement("td");
            td.setAttribute("onclick", "cellStatus(this);");
            td.setAttribute("onmouseover", "if (window.event.which == 1) cellStatus(this);");
            td.setAttribute("class", "dead");
            td.setAttribute("id", col + "_" + row);
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
    let placeArray = cell.id.split("_");
    cell.classList.remove("dead");
    cell.classList.remove("alive");

    if (CELLS[placeArray[0]][placeArray[1]] == "dead") {
        cell.classList.add("alive");
        CELLS[placeArray[0]][placeArray[1]] = "alive";

    } else {
        cell.classList.add("dead");
        CELLS[placeArray[0]][placeArray[1]] = "dead";

    }

}

/**
 * Runs or stops the game progress
 * @param {HTMLButtonElement} button 
 */
function gameStat(button) {
    if (PAUSE) {
        button.value = "Stop";
        button.classList.add("secondary");
        PAUSE = false;
        interval = setInterval(() => {
            game();
            updateTurn();
        }, refresh);
    } else {
        button.value = "Start";
        button.classList.remove("secondary");
        PAUSE = true;
        window.clearInterval(interval);
    }
}

let volta = 0;
/**
 * Execution of the simulation
 */
function game() {

    let boardCells = document.querySelectorAll("td");
    let newCells = JSON.parse(JSON.stringify(NEW_CELLS));

    boardCells.forEach(cell => {

        let neighbours = 0;

        let id = cell.id.split("_");
        let id1 = parseInt(id[0]);
        let id2 = parseInt(id[1]);

        if (cell.id == "0_0") {

            if (CELLS[id1][id2 + 1] == "alive") neighbours++;

            if (CELLS[id1 + 1][id2 + 1] == "alive") neighbours++;

            if (CELLS[id1 + 1][id2] == "alive") neighbours++;

        } else if (cell.id == "0_24") {

            if (CELLS[id1][id2 - 1] == "alive") neighbours++;

            if (CELLS[id1 + 1][id2 - 1] == "alive") neighbours++;

            if (CELLS[id1 + 1][id2] == "alive") neighbours++;

        } else if (cell.id == "24_24") {

            if (CELLS[id1][id2 - 1] == "alive") neighbours++;

            if (CELLS[id1 - 1][id2 - 1] == "alive") neighbours++;

            if (CELLS[id1 - 1][id2] == "alive") neighbours++;

        } else if (cell.id == "24_0") {

            if (CELLS[id1 - 1][id2] == "alive") neighbours++;

            if (CELLS[id1 - 1][id2 + 1] == "alive") neighbours++;

            if (CELLS[id1][id2 + 1] == "alive") neighbours++;

        } else if (id1 == "0") {

            if (CELLS[id1][id2 - 1] == "alive") neighbours++;

            if (CELLS[id1 + 1][id2 - 1] == "alive") neighbours++;

            if (CELLS[id1 + 1][id2] == "alive") neighbours++;

            if (CELLS[id1 + 1][id2 + 1] == "alive") neighbours++;

            if (CELLS[id1][id2 + 1] == "alive") neighbours++;

        } else if (id1 == "24") {

            if (CELLS[id1][id2 - 1] == "alive") neighbours++;

            if (CELLS[id1 - 1][id2 - 1] == "alive") neighbours++;

            if (CELLS[id1 - 1][id2] == "alive") neighbours++;

            if (CELLS[id1 - 1][id2 + 1] == "alive") neighbours++;

            if (CELLS[id1][id2 + 1] == "alive") neighbours++;

        } else if (id2 == "0") {

            if (CELLS[id1 - 1][id2] == "alive") neighbours++;

            if (CELLS[id1 - 1][id2 + 1] == "alive") neighbours++;

            if (CELLS[id1][id2 + 1] == "alive") neighbours++;

            if (CELLS[id1 + 1][id2 + 1] == "alive") neighbours++;

            if (CELLS[id1 + 1][id2] == "alive") neighbours++;

        } else if (id2 == "24") {

            if (CELLS[id1 - 1][id2] == "alive") neighbours++;

            if (CELLS[id1 - 1][id2 - 1] == "alive") neighbours++;

            if (CELLS[id1][id2 - 1] == "alive") neighbours++;

            if (CELLS[id1 + 1][id2 - 1] == "alive") neighbours++;

            if (CELLS[id1 + 1][id2] == "alive") neighbours++;

        } else {

            if (CELLS[id1 - 1][id2 - 1] == "alive") neighbours++;

            if (CELLS[id1 - 1][id2] == "alive") neighbours++;

            if (CELLS[id1 - 1][id2 + 1] == "alive") neighbours++;

            if (CELLS[id1][id2 - 1] == "alive") neighbours++;

            if (CELLS[id1][id2 + 1] == "alive") neighbours++;

            if (CELLS[id1 + 1][id2 - 1] == "alive") neighbours++;

            if (CELLS[id1 + 1][id2] == "alive") neighbours++;

            if (CELLS[id1 + 1][id2 + 1] == "alive") neighbours++;

        }

        if (cell.classList.contains("alive")) {

            if (neighbours < 2 || neighbours > 3) newCells[id1][id2] = "dead";

            else if (neighbours >= 2 && neighbours <= 3) newCells[id1][id2] = "alive";//just stay alive

            else newCells[id1][id2] = "alive";

        } else if (cell.classList.contains("dead")) {

            if (neighbours == 3) newCells[id1][id2] = "alive";

            else newCells[id1][id2] = "dead";

        }

    });


    boardCells.forEach(cell => {

        let id = cell.id.split("_");
        let id1 = parseInt(id[0]);
        let id2 = parseInt(id[1]);

        if (cell.classList.contains("alive") && newCells[id1][id2] == "dead" || cell.classList.contains("dead") && newCells[id1][id2] == "alive") cellStatus(cell);
    });

    CELLS = JSON.parse(JSON.stringify(newCells));
}

/**
 * Every turn updates the counter
 */
function updateTurn() {
    let turns = document.querySelector("#turns");
    turns.innerHTML = parseInt(turns.textContent) + 1;
}

/**
 * Adjusts the velocity of the simulation
 * @param {HTMLInputElement} range Value of speed
 */
function refreshRate(range) {
    refresh = parseInt(range.value);
    document.querySelector("#rangeSpeed").innerHTML = refresh;
    if (!PAUSE) {
        window.clearInterval(interval);
        interval = setInterval(() => {
            game();
            updateTurn();
        }, refresh);

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
        if (cell.classList.contains("alive")) {
            cellStatus(cell);
        }
    });
}

/**
 * Execute the board building when the page loads
 */
window.onload = () => {
    board();
    document.querySelector("#rangeSpeed").innerHTML = refresh
}