const btnClear = document.querySelector(".btn[data-label=Clear]");
const btnClassic = document.querySelector(".btn[data-label=Classic]");
const btnRainbow = document.querySelector(".btn[data-label=Rainbow]");
const btnGradient = document.querySelector(".btn[data-label=Gradient]");
const inputSize = document.querySelector("input");
const divContainer = document.querySelector("#container");
const containerSize = divContainer.clientHeight;
const currentRainbowColor = [randInt(256), randInt(256), randInt(256)];

let gridSize = 16;
let isRainbowOn = false;
let isGradientOn = false;

btnClassic.addEventListener("click", activateClassic);
btnGradient.addEventListener("click", toggleGradient);
btnRainbow.addEventListener("click", toggleRainbow);
btnClear.addEventListener("click", generateGrid);
inputSize.addEventListener("keyup", updateGrid);

generateGrid();

function updateGrid(event) {
  if (event.key === "Enter") {
    gridSize = +inputSize.value;
    gridSize = isNaN(gridSize) ? 0 : gridSize;
    gridSize = bound(gridSize, 4, 100);
    generateGrid();
    inputSize.value = "";
  }
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

  inputSize.placeholder = `${gridSize}x${gridSize}`;
}

function paint() {
  let [r, g, b, a] = toColorArray(this.style.backgroundColor);
  if (!isRainbowOn && !isGradientOn) {
    a = 0;
  }
  if (isGradientOn) {
    if (!a) a = 1;
    a *= 0.7;
  }
  if (isRainbowOn) {
    tickRainbow();
    [r, g, b] = currentRainbowColor;
  }

  this.style.backgroundColor = toColorString([r, g, b, a]);
}

// Change the current rainbow color to a slightly different one
function tickRainbow() {
  currentRainbowColor.forEach(
    (value, i) => (currentRainbowColor[i] = deviate(value))
  );
}

function activateClassic() {
  isGradientOn = false;
  isRainbowOn = false;
  btnGradient.classList.remove('active');
  btnRainbow.classList.remove('active');
}

function toggleGradient() {
  isGradientOn = !isGradientOn;
  btnGradient.classList.toggle('active');
}

function toggleRainbow() {
  isRainbowOn = !isRainbowOn;
  btnRainbow.classList.toggle('active');
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
