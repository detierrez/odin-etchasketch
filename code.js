const btnReset = document.querySelector("#reset");
const btnResize = document.querySelector("#resize");
const btnScratch = document.querySelector("#scratch");
const divContainer = document.querySelector("#container");
const containerSize = divContainer.clientHeight;

let gridSize = 32;
let isScratchOn = true;

btnReset.addEventListener("click", generateGrid);
btnResize.addEventListener("click", updateGrid);
btnScratch.addEventListener("click", toggleScratch);

generateGrid();

function updateGrid() {
  gridSize = +prompt("Enter a new size: ");
  gridSize = Math.min(100, gridSize);
  generateGrid();
}

function generateGrid() {
  const tiles = [];
  const tileSize = containerSize / gridSize;
  for (let i = 0; i < gridSize ** 2; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.style.opacity = 1;
    tile.style.width = `${tileSize}px`;
    tile.addEventListener("mouseenter", paint);
    tiles.push(tile);
  }
  divContainer.replaceChildren(...tiles);
}

function paint() {
  if (isScratchOn) {
    this.style.opacity *= 0.7;
  } else {
    this.style.opacity = 0;
  }
}

function toggleScratch() {
  isScratchOn = !isScratchOn;
}
