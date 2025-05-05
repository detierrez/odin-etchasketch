const btnReset = document.querySelector("#reset");
const btnResize = document.querySelector("#resize");
const btnRainbow = document.querySelector("#rainbow");
const btnScratch = document.querySelector("#scratch");
const divContainer = document.querySelector("#container");
const containerSize = divContainer.clientHeight;
const currentRainbowColor = [randInt(256), randInt(256), randInt(256)];

let gridSize = 8;
let isRainbowOn = true;
let isScratchOn = false;

btnReset.addEventListener("click", generateGrid);
btnResize.addEventListener("click", updateGrid);
btnRainbow.addEventListener("click", toggleRainbow);
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
    tile.style.backgroundColor = "rgba(255 255 255)";
    tile.style.width = `${tileSize}px`;
    tile.addEventListener("mouseenter", paint);
    tiles.push(tile);
  }
  divContainer.replaceChildren(...tiles);
}

function paint() {
  let [r, g, b, a] = toColorArray(this.style.backgroundColor);
  if (!isRainbowOn && !isScratchOn) {
    a = 0;
  } 
  
  if (isRainbowOn) {
    tickRainbow();
    [r, g, b] = currentRainbowColor;
  } 
  
  if (isScratchOn) {
    if (!a) a = 1;
    a *= 0.7;
  }
  this.style.backgroundColor = toColorString([r, g, b, a]);
}

function tickRainbow() {
  currentRainbowColor.forEach(
    (value, i) => (currentRainbowColor[i] = deviate(value))
  );
}

function toggleScratch() {
  isScratchOn = !isScratchOn;
}

function toggleRainbow() {
  isRainbowOn = !isRainbowOn;
}

function toColorString([r, g, b, a = 1]) {
  return `rgb(${r} ${g} ${b} / ${a})`;
}

function toColorArray(color) {
  return color.match(/\d+\.*\d*/g);
}

function deviate(colorValue) {
  colorValue += randInt(41) - 20;
  return bound(colorValue, 0, 255);
}

function bound(n, lowerLimit, upperLimit) {
  return Math.min(upperLimit, Math.max(lowerLimit, n));
}

function randInt(n) {
  return Math.floor(Math.random() * n);
}
