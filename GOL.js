const HEIGHT = 25;
let TABLE = document.querySelector("table");

function board() {
    for (let col = 0; col < HEIGHT; col++) {
        tr = document.createElement("tr");

        for (let row = 0; row < HEIGHT; row++) {
            td = document.createElement("td");
            tr.append(td);

        }

        TABLE?.appendChild(tr);
    }
}

window.onload = () => {
    board();
}