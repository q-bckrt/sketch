createBoard(24);

let trigger = false;
let mode = "black";

const draw = document.getElementById('pen');
const erase = document.getElementById('eraser');
draw.addEventListener('click', () => { mode = "black"; })
erase.addEventListener('click', () => { mode = "#EDF6F9"; })

const clearB = document.getElementById('clearb');

clearB.addEventListener('click', () => {
    const board = document.querySelector('.board');
    board.remove();
    createBoard(slider.value);
})

document.addEventListener('mousedown', () => { trigger = true; })
document.addEventListener('mouseup', () => { trigger = false; })

// Moving the slider generates a new board with the selected square count.
const slider = document.getElementById('sizeSlider');

slider.addEventListener('change', () => {
    const board = document.querySelector('.board');
    board.remove();
    createBoard(slider.value);
})

slider.addEventListener('mousemove', () => {
    const val = document.querySelector('.sizeValue');
    val.innerHTML = slider.value;
})

const picker = document.getElementById("picker");
picker.addEventListener("input", () => {
    mode = event.target.value;
})

// This function generates the drawing board.
// boardResolution is the number of rows and columns.
function createBoard(boardResolution) {
    const board = document.createElement('div');
    const frame = document.querySelector('.frame');
    const menu = document.querySelector('.menu');
   
    board.classList.add('board');

    for (let i = 0; i < boardResolution; i++) {
        const row = document.createElement('div');
        row.classList.add('row')

        row.style['display'] = "flex";
        row.style['flex-grow'] = "1";
        row.style['flex-direction'] = "row";


        for (let j = 0; j < boardResolution; j++) {
            const pixel = document.createElement('div');
            pixel.classList.add('pixel')

            pixel.style['border'] = '0.5px solid lightgrey';
            pixel.style['flex-grow'] = "1";
            pixel.style['box-sizing'] = "border-box";

            row.appendChild(pixel);
            for (let k = 0; k < row.childNodes.length; k++) {
                row.childNodes[k].addEventListener('mousedown', (e) => {
                    row.childNodes[k].style['background-color'] = mode;
            })
                row.childNodes[k].addEventListener('mouseenter', (e) => {
                    if (trigger == true) {
                        row.childNodes[k].style['background-color'] = mode;
                    }
            })
            }
        }
        if (i == 0) {roundCorners(row, "first")};
        if (i == boardResolution - 1) {roundCorners(row, "last")};
        board.appendChild(row);
    }
    frame.insertBefore(board, menu);
}

// Used by createBoard() to make the corner's pixel's borders
// match the curvature of the board's border.
function roundCorners(row, place) {
    var firstNode = row.firstChild;
    var lastNode = row.lastChild;

    if (place == "first") {
        firstNode.style['border-top-left-radius'] = "12px";
        lastNode.style['border-top-right-radius'] = "12px";
    }
    if (place == "last") {
        firstNode.style['border-bottom-left-radius'] = "12px";
        lastNode.style['border-bottom-right-radius'] = "12px";
    }
}
