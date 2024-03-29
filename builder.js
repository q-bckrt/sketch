let bg = "white";
createBoard(24);

// State variables
let trigger = false;
let drawmode = true;
let random = false;
let rainbow = false;
let light = false;
let dark = false;
let color_pick = "#080929"; 
let mode = "#080929";

// Set up the menu's buttons
const draw = document.getElementById('pen');
draw.addEventListener('click', () => { 
    mode = color_pick;
    drawmode = true;
    random = false;
    rainbow = false;
    light = false;
    dark = false;
})

const erase = document.getElementById('eraser');
erase.addEventListener('click', () => {
    mode = bg;
    drawmode = true;
    random = false;
    rainbow = false;
    light = false;
    dark = false;
})

const clear = document.getElementById('clear');
clear.addEventListener('click', () => {
    const board = document.querySelector('.board');
    board.remove();
    createBoard(slider.value);
    if (light == true || dark == true) {
        light = false;
        dark = false;
        drawmode = true;
    }
})

const rnb = document.getElementById('rnb');
rnb.addEventListener('click', () => {
    rainbow = true;
    drawmode = false;
    random = false;
    light = false;
    dark = false;
})

const rnd = document.getElementById('rnd');
rnd.addEventListener('click', () => {
    random = true;
    drawmode = false;
    rainbow = false;
    light = false;
    dark = false;
} )

const lighten = document.getElementById('lighten');
lighten.addEventListener('click', () => {
    light = true;
    drawmode = false;
    random = false;
    rainbow = false;
    dark = false;
})

const darken = document.getElementById('darken');
darken.addEventListener('click', () => {
    light = false;
    drawmode = false;
    random = false;
    rainbow = false;
    dark = true;
})

// Allows continuous drawing
document.addEventListener('mousedown', () => { trigger = true; })
document.addEventListener('mouseup', () => { trigger = false; })

// Select new board size
const slider = document.getElementById('sizeSlider');
slider.addEventListener('mousemove', () => {
    const val = document.querySelector('.sizeValue');
    val.innerHTML = slider.value;
})

// Set up pen color picker
const picker = document.getElementById("picker");
picker.addEventListener("input", () => {
    mode = event.target.value;
    color_pick = event.target.value;
    const pickerLabel = document.getElementById("picker-label");
    pickerLabel.style['color'] = mode;
})

// Generates the drawing board.
function populateBoard(board, boardResolution) {
    for (let i = 0; i < boardResolution; i++) {
        const row = document.createElement('div');

        row.style['display'] = "flex";
        row.style['flex-grow'] = "1";
        row.style['flex-direction'] = "row";

        for (let j = 0; j < boardResolution; j++) {
            const pixel = document.createElement('div');
            pixel.classList.add('pixel')

            pixel.style['border'] = '0.5px solid lightgrey';
            pixel.style['flex-grow'] = "1";
            pixel.style['box-sizing'] = "border-box";
            pixel.style['background'] = bg;

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

    // frame.insertBefore(board, menu);
    frame.appendChild(board);
}

// Set up the squares for drawing
function setupSquares(row) {
    for (let i = 0; i < row.childNodes.length; i++) {

            row.childNodes[i].addEventListener('mousedown', (e) => {
            if (light == true) {
                row.childNodes[i].style['background'] = lightenRGB(row.childNodes[i]);
            } else if (dark == true) {
                row.childNodes[i].style['background'] = darkenRGB(row.childNodes[i]);
            } else if (random == true) {
                row.childNodes[i].style['background'] = randomRGB();
            } else if (rainbow == true) {
                row.childNodes[i].style['background'] = rainbowRGB();
            } else if (drawmode == true) {
                row.childNodes[i].style['background'] = mode;
            }
        })
        row.childNodes[i].addEventListener('mouseenter', (e) => {
            if (light == true && trigger == true) {
                row.childNodes[i].style['background'] = lightenRGB(row.childNodes[i]);
            } else if (dark == true && trigger == true) {
                row.childNodes[i].style['background'] = darkenRGB(row.childNodes[i]);
            } else if (random == true && trigger == true) {
                row.childNodes[i].style['background'] = randomRGB();
            } else if (rainbow == true && trigger == true) {
                row.childNodes[i].style['background'] = rainbowRGB();
            } else if (drawmode == true && trigger == true) {
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

// Generate a css-formated color 10% lighter than provided in argument
function addTenPercent(value) {
    let biggerValue = 0;

    if (value == 0) {
        biggerValue = 10;
    } else if (value > 229.5) {
        biggerValue = 255;
    } else {
        biggerValue = Math.ceil(value + (0.1 * (255 - value)));
    }

    return biggerValue;
}

function lightenRGB(baseColor) {
    const raw = getComputedStyle(baseColor).backgroundColor;
    const og = raw.match(
        /rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/
        );
    let r = addTenPercent(parseInt(og[1])); 
    let g = addTenPercent(parseInt(og[2])); 
    let b = addTenPercent(parseInt(og[3])); 
    let rgb = "rgb(" + r + "," + g + "," + b + ")";

    return rgb;
}

// Generate a css-formated color 10% darken than provided in argument
function remTenPercent(value) {
    let smallerValue = 0;

    if (value < 25.5) {
        smallerValue = 0;
    } else {
        smallerValue = Math.floor(value * 0.9);
    }

    return smallerValue;
}

function darkenRGB(baseColor) {
    const raw = getComputedStyle(baseColor).backgroundColor;
    const og = raw.match(
        /rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/
        );
    let r = remTenPercent(parseInt(og[1])); 
    let g = remTenPercent(parseInt(og[2])); 
    let b = remTenPercent(parseInt(og[3])); 
    let rgb = "rgb(" + r + "," + g + "," + b + ")";

    return rgb;
}