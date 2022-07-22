let state = 'PLAYING'; // PLAYING | GAME_OVER

const width = 800;
const height = 600;

const { canvas, ctx } = createCanvas(width, height);

const cellSize = 40;
const rows = height / cellSize;
const columns = width / cellSize;

const cells = [];

function getCellFromMouse(e) {
  const mouseX = e.clientX - canvas.offsetLeft;
  const mouseY = e.clientY - canvas.offsetTop;

  const cellX = Math.floor(mouseX / cellSize);
  const cellY = Math.floor(mouseY / cellSize);

  const cell = cells.find((c) => c.id === `${cellX}-${cellY}`);

  return { cell, cellX, cellY };
}

function init() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      cells.push(new Cell(j * cellSize, i * cellSize, cellSize));
    }
  }

  canvas.addEventListener('click', revealCell);
  canvas.addEventListener('contextmenu', flagCell);
}

function flagCell(e) {
  e.preventDefault();

  const { cell } = getCellFromMouse(e);

  cell.flag();
}

function revealCell(e) {
  const { cell } = getCellFromMouse(e);

  cell.reveal(cells, function (status) {
    canvas.removeEventListener('click', revealCell);
    canvas.removeEventListener('contextmenu', flagCell);

    document.querySelector('#status').textContent = status;
  });
}

function draw() {
  background(ctx, '#fff');

  cells.forEach((cell) => {
    cell.draw(ctx);
  });
}

function run() {
  draw();
  requestAnimationFrame(run);
}

init();
run();
