let currentColor = {
  red: randInt(256),
  blue: randInt(256),
  green: randInt(256),
  toString() {
    return `rgb(${this.red} ${this.blue} ${this.green})`;
  },
  update() {
    this.red = deviateColorValue(this.red);
    this.blue = deviateColorValue(this.blue);
    this.green = deviateColorValue(this.green);
  },
};

function deviateColorValue(colorValue) {
  colorValue += randInt(41) - 20;
  return bound(colorValue, 0, 255);
}

function bound(n, lowerLimit, upperLimit) {
  return Math.min(upperLimit, Math.max(lowerLimit, n));
}

function randInt(n) {
  return Math.floor(Math.random() * n);
}

export default currentColor;
