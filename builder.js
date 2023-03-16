createBoard(24);

// State variables
let trigger = false;
let random = false;
let rainbow = false;
let mode = "black";
let bg = "#EDF6F9"; 

// Set up the menu's buttons
const draw = document.getElementById('pen');
draw.addEventListener('click', () => { 
    mode = "black";
    random = false;
    rainbow = false;
})

const erase = document.getElementById('eraser');
erase.addEventListener('click', () => {
    mode = bg;
    random = false;
    rainbow = false;
})

const clear = document.getElementById('clear');
clear.addEventListener('click', () => {
    const board = document.querySelector('.board');
    board.remove();
    createBoard(slider.value);
})

const rnb = document.getElementById('rnb');
rnb.addEventListener('click', () => {
    rainbow = true;
    random = false;
})

const rnd = document.getElementById('rnd');
rnd.addEventListener('click', () => {
    random = true;
    rainbow = false;
} )

// Allows continuous drawing
document.addEventListener('mousedown', () => { trigger = true; })
document.addEventListener('mouseup', () => { trigger = false; })

// Moving the slider generates a new board with the selected square count.
const slider = document.getElementById('sizeSlider');

// Set up resoluton's slider
slider.addEventListener('change', () => {
    const board = document.querySelector('.board');
    board.remove();
    createBoard(slider.value);
})

slider.addEventListener('mousemove', () => {
    const val = document.querySelector('.sizeValue');
    val.innerHTML = slider.value;
})

// Set up pen color picker
const picker = document.getElementById("picker");
picker.addEventListener("input", () => {
    mode = event.target.value;
})

// Generates the drawing board.
function populateBoard(board, boardResolution) {
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
        }
        setupSquares(row);

        if (i == 0) {roundCorners(row, "first")};
        if (i == boardResolution - 1) {roundCorners(row, "last")};
        board.appendChild(row);
    }
}


function createBoard(boardResolution) {
    const board = document.createElement('div');
    const frame = document.querySelector('.frame');
    const menu = document.querySelector('.menu');
   
    board.classList.add('board');

    populateBoard(board, boardResolution);

    frame.insertBefore(board, menu);
}

// Set up the squares for drawing
function setupSquares(row) {
    for (let i = 0; i < row.childNodes.length; i++) {
        row.childNodes[i].addEventListener('mousedown', (e) => {
            if (random == true) {
                row.childNodes[i].style['background'] = randomRGB();
            } else if (rainbow == true) {
                row.childNodes[i].style['background'] = rainbowRGB();
            } else {
                row.childNodes[i].style['background'] = mode;
            }
        })
        row.childNodes[i].addEventListener('mouseenter', (e) => {
            if (random == true && trigger == true) {
                row.childNodes[i].style['background'] = randomRGB();
            } else if (rainbow == true && trigger == true) {
                row.childNodes[i].style['background'] = rainbowRGB();
            } else if (trigger == true) {
                row.childNodes[i].style['background'] = mode;
            }
        })
    }
}

// Make the corner's squares match the curvature of the board.
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

// Generate random css-formated rgb values.
function randomRGB() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    
    return "rgb(" + r + "," + g + "," + b + ")";
}

// Yields rainbow css-formated rgb values.
let nextColor = 0;
const rnbColors = [
    [255, 0, 0],    // red
    [255, 125, 0],  // orange
    [255, 255, 0],  // yellow
    [125, 255, 0],  // spring green
    [0, 255, 0],    // green
    [0, 255, 125],  // turquoise
    [0, 255, 255],  // cyan
    [0, 125, 255],  // ocean
    [0, 0, 255],    // blue
    [125, 0, 255],  // violet
    [255, 0, 255],  // magenta
    [255, 0, 125]   // raspberry
]

function rainbowRGB() {
    let r = rnbColors[nextColor][0];
    let g = rnbColors[nextColor][1];
    let b = rnbColors[nextColor][2];
    let rgb = "rgb(" + r + "," + g + "," + b + ")";

    if (nextColor == 11) {
        nextColor = 0;
    } else {
        nextColor += 1;
    }

    return rgb;
}