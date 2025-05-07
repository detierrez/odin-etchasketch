const btnClassic = document.querySelector(".btn[data-label=Classic]");
const btnGradient = document.querySelector(".btn[data-label=Gradient]");
const btnRainbow = document.querySelector(".btn[data-label=Rainbow]");
const btnClear = document.querySelector(".btn[data-label=Clear]");
const inputSize = document.querySelector("input");
const divContainer = document.querySelector(".grid-container");
const containerSize = divContainer.clientHeight;

let gridSize;
let isRainbowOn = false;
let isGradientOn = false;
let currentRainbowColor = [randInt(256), randInt(256), randInt(256)];

btnClassic.addEventListener("click", activateClassicMode);
btnGradient.addEventListener("click", toggleGradientMode);
btnRainbow.addEventListener("click", toggleRainbowMode);
btnClear.addEventListener("click", generateGrid);
inputSize.addEventListener("keyup", userSetGridSize);

setGridSize(16);
generateGrid();

function userSetGridSize(event) {
  if (event.key === "Enter") {
    inputSize.value = "";
    newSize = +inputSize.value;
    if (!isNaN(newSize) && inputSize.value !== "") {
      setGridSize(newSize);
      generateGrid();
    }
  }
}

function setGridSize(newSize) {
  newSize = bound(newSize, 4, 100);
  gridSize = newSize;
  inputSize.placeholder = `${newSize}x${newSize}`;
}

function generateGrid() {
  const tiles = [];
  const tileSize = containerSize / gridSize;
  for (let i = 0; i < gridSize ** 2; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.style.backgroundColor = "rgba(255 255 255)";
    tile.style.width = `${tileSize}px`;
    tile.addEventListener("pointerdown", (e) => {
      tile.releasePointerCapture(e.pointerId);
    });
    tile.addEventListener("pointerenter", paint);
    tiles.push(tile);
  }
  divContainer.replaceChildren(...tiles);
}

function paint(event) {
  const target = event.target;
  let [r, g, b, a] = toColorArray(target.style.backgroundColor);

  if (!isRainbowOn && !isGradientOn) {
    a = 0;
  }
  if (isGradientOn) {
    if (!a) a = 1;
    a *= 0.7;
  }
  if (isRainbowOn) {
    // change the color to a slightly different one
    currentRainbowColor = currentRainbowColor.map((ch) => {
      ch += randInt(41) - 20;
      return bound(ch, 0, 255);
    });
    [r, g, b] = currentRainbowColor;
  }

  target.style.backgroundColor = toColorString([r, g, b, a]);
}

function activateClassicMode() {
  isGradientOn = false;
  isRainbowOn = false;
  btnGradient.classList.remove("active");
  btnRainbow.classList.remove("active");
}

function toggleGradientMode() {
  isGradientOn = !isGradientOn;
  btnGradient.classList.toggle("active");
}

function toggleRainbowMode() {
  isRainbowOn = !isRainbowOn;
  btnRainbow.classList.toggle("active");
}

function toColorString([r, g, b, a = 1]) {
  return `rgb(${r} ${g} ${b} / ${a})`;
}

function toColorArray(color) {
  return color.match(/\d+\.*\d*/g);
}

function bound(n, lowerLimit, upperLimit) {
  return Math.min(upperLimit, Math.max(lowerLimit, n));
}

function randInt(n) {
  return Math.floor(Math.random() * n);
}
