let pixel;
const gridSize = 16;
const container = document.querySelector('#container');
let isMousedown = false;
let rainbowMode = false;
let opacityMode = false;
const gridButton = document.querySelector('.grid-button');
const rainbowButton = document.querySelector('.rainbow-button');
const inkOnButton = document.querySelector('.ink-on');
const opacityButton = document.querySelector('.opacity-mode');
const colorButton = document.querySelector('#color');

// Function to draw the grid
function drawGrid(truesize) {
    container.innerHTML = '';
    const totalSize = truesize ** 2;
    const cellSize = 100 / truesize;
    for (let i = 0; i < totalSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.style.flexBasis = `${cellSize}%`;
        cell.style.height = `${cellSize}%`;
        container.appendChild(cell);
    }
}

// Function to handle the grid size prompt
function gridPrompt() {
    let getSize = prompt("Enter the grid size, the total cells will be the square of the number. Limit is 100.");
    getSize = parseInt(getSize);
    if (getSize > 100 || getSize < 0) {
        gridPrompt();
    } else if (isNaN(getSize)) {
        drawGrid(gridSize);
    } else {
        drawGrid(getSize);
    }
    selectPixel();
    update();
}

// Function to select all cells
function selectPixel() {
    pixel = document.querySelectorAll('.cell');
}

// Function to get a random color
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Function to handle ink (black or rainbow mode)
function ink(event) {
    if (isMousedown && opacityMode) {
        event.target.style.backgroundColor = rainbowMode ? getRandomColor() : colorButton.value;
        let currentOpacity = parseFloat(event.target.style.opacity) || 0;
        currentOpacity += 0.1;

        if (currentOpacity > 1){
            currentOpacity = 1;
        }
        event.target.style.opacity = currentOpacity;
    } else if (isMousedown){
        event.target.style.backgroundColor = rainbowMode ? getRandomColor() : colorButton.value;
    }
}




// Function to update event listeners for cells
function update() {
    pixel.forEach(cell => {
        cell.addEventListener('mousedown', ink);
        cell.addEventListener('mouseenter', ink);
    });
}

// Event listener for the grid button
gridButton.addEventListener('click', gridPrompt);

// Event listener for the rainbow button
rainbowButton.addEventListener('click', () => {
    rainbowMode = !rainbowMode;
    rainbowButton.textContent = rainbowMode ? 'Rainbow mode On' : 'Rainbow mode Off';
});

opacityButton.addEventListener('click', () => {
    opacityMode = !opacityMode;
    opacityButton.textContent = opacityMode ? 'Opacity Mode On' : 'Opacity Mode Off';
});


container.addEventListener('mousedown', () => {
    isMousedown = true;
    inkOnButton.textContent = "Ink On";
});

container.addEventListener('mouseup', () => {
    isMousedown = false;
    inkOnButton.textContent = "Ink Off";
});

// Initial setup
drawGrid(gridSize);
selectPixel();
update();
