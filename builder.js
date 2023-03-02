
// This function generates the drawing board.
// boardResolution is the number of rows and columns.
function createBoard(boardResolution) {
    const board = document.querySelector('.board');
 
    for (let i = 0; i < boardResolution; i++) {
        const row = document.createElement('div');
        row.classList.add('row')

        row.style['display'] = "flex";
        row.style['flex-grow'] = "1";
        row.style['flex-direction'] = "row";


        for (let j = 0; j < boardResolution; j++) {
            const pixel = document.createElement('div');
            pixel.classList.add('pixel')

            pixel.style['border'] = '0.5px solid lightblue';
            pixel.style['flex-grow'] = "1";
            pixel.style['box-sizing'] = "border-box";

            row.appendChild(pixel);
        }
        if (i == 0) {roundCorners(row, "first")};
        if (i == boardResolution - 1) {roundCorners(row, "last")};
        board.appendChild(row);
    }
}

// Used by createBoard() to make the corner's pixel's borders
// match the curvature of the board's border.
function roundCorners(row, place) {
    var firstNode = row.firstChild;
    var lastNode = row.lastChild;
    console.log(firstNode);

    if (place == "first") {
        console.log("first");
        firstNode.style['border-top-left-radius'] = "12px";
        lastNode.style['border-top-right-radius'] = "12px";
    }
    if (place == "last") {
        console.log("last");
        firstNode.style['border-bottom-left-radius'] = "12px";
        lastNode.style['border-bottom-right-radius'] = "12px";
    }
}

createBoard(24);