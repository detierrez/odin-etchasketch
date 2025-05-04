import currentColor from "./color.js";

const btnReset = document.querySelector("#reset");
const btnResize = document.querySelector("#resize");
const btnRainbow = document.querySelector("#rainbow");
const divContainer = document.querySelector("#container");
const containerSize = divContainer.clientHeight;

let gridSize = 32;
let isRainbowOn = true;

btnReset.addEventListener("click", generateGrid);
btnResize.addEventListener("click", updateGrid);
btnRainbow.addEventListener("click", toggleRainbow);

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
    tile.style.width = `${tileSize}px`;
    tile.addEventListener("mouseenter", paint);
    tiles.push(tile);
  }
  divContainer.replaceChildren(...tiles);
}

function paint() {
  if (isRainbowOn) {
    this.style.backgroundColor = currentColor;
    currentColor.update();
  } else {
    this.style.backgroundColor = "#000";
  }
}

function toggleRainbow() {
  isRainbowOn = !isRainbowOn;
}


