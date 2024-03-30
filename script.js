var cnv;
var cells = [];
let winSize, w;
var ruleSlider, dimSlider, ruleInput;
var rule;
let DIM = 300;
let y;

function ruleset(n) {
  if (n <= 0 || n > 255) {
    return 0;
  }
  let rules = {};
  let bit = 128;
  for (let i = 7; i >= 0; i--) {
    if (n & bit) {
      rules[i] = 1;
    } else {
      rules[i] = 0;
    }
    bit = bit >> 1;
  }
  return rules;
}

function analyze(cells) {
  let newCells = new Array(cells.length);
  for (let i = 1; i < cells.length-1; i++) {
    const block = (cells[i-1]*4) + (cells[i]*2) + (cells[i+1]);
    newCells[i] = rules[block];
  }
  newCells[0] = cells[0];
  newCells[cells.length-1] = cells[cells.length-1];
  return newCells;
}

function setup() {
  winSize = min(windowHeight, windowWidth) - 100;
  cnv = createCanvas(windowWidth-10, windowHeight-200);
  // frameRate(1);
  cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);
  console.log(ruleset(178));
  ruleInput = createInput("82", "number");
  ruleInput.position(width/2-30, 60);
  ruleInput.size(60, 20);
  ruleInput.style("background: rgb(50, 50, 50); color: white; border: 1px solid white;")
  dimSlider = createSlider(20, 1000, 300, 1);
  dimSlider.position(10, 60);
  dimSlider.style("-webkit-appearance: none; background: rgb(50, 50, 50); width: 200px; height: 20px; border: 1px solid white;")
  rule = parseInt(ruleInput.value());
  restart();
}

function restart() {
  clear();
  DIM = dimSlider.value();
  let r = parseInt(ruleInput.value());
  if (r > 255 || r < 0) {
    ruleInput.value("0");
    rule = 0;
  }
  rule = parseInt(ruleInput.value());
  rules = ruleset(r);
  w = width / DIM;
  for (let i = 0; i < DIM; i++) {
    cells[i] = 0;
  }
  cells[floor(DIM/2)] = 1;
  y = 100;
}

function draw() {
  // background(200);
  if (rule != parseInt(ruleInput.value()) || DIM != dimSlider.value()) {
    restart();
  }
  // console.log(cells);
  if (y < height) {
    for (let i = 0; i < DIM; i++) {
      // stroke(0);
      noStroke(0);
      fill((cells[i] * 255));
      square(i * w, y, w);
    }
  }
  let next = analyze(cells);
  y += w;
  cells = next;
  fill(255);
  noStroke();
  textSize(20);
  text(`rule: ${rule}`, width/2-30, 80);
  text(`n: ${DIM}`, 10, 24);
  stroke(100);
  noFill();
  rect(0, 0, width, height);
}
