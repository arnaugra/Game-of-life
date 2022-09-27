const HEIGHT = 25;
let TABLE = document.querySelector("table");

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

function cellStatus(box) {
    if (box.classList.contains("dead")) {
        box.classList.remove("dead");
        box.classList.add("alive");
        box.style.backgroundColor = "#000000";
    } else {
        box.classList.remove("alive");
        box.classList.add("dead");
        box.style.backgroundColor = "#eeeeee";
    }
}

window.onload = () => {
    board();
}