const GRID_SIZE = 30;
const TOTAL_SIZE = GRID_SIZE**2;
const container = document.getElementById("container");
const cellSize = 100/GRID_SIZE;
console.log(cellSize)

for (let i = 0; i < TOTAL_SIZE; i++){
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.style.flexBasis = `${cellSize}%`;
    cell.style.height = `${cellSize}%`;
    container.appendChild(cell);
}

