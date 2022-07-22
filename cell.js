class Cell {
  constructor(x, y, w = 50) {
    this.x = x;
    this.y = y;
    this.w = w;

    this.cx = this.x + this.w / 2;
    this.cy = this.y + this.w / 2;

    this.mine = Math.random() > 0.9;

    this.i = x / w;
    this.j = y / w;

    this.id = `${this.i}-${this.j}`;

    this.revealed = false;

    this.value = '';

    this.flagged = false;
  }

  draw(ctx) {
    square(ctx, this.x, this.y, this.w);
    fill(ctx, '#fff');
    stroke(ctx);

    if (this.revealed) {
      if (this.mine) {
        circle(ctx, this.cx, this.cy, this.w / 4);
        stroke(ctx);
        fill(ctx);
        return;
      }

      fill(ctx, '#ddd');
      stroke(ctx);
      text(ctx, this.value, this.cx, this.cy);
      return;
    }

    if (this.flagged) {
      fill(ctx, '#FFB3BA');
      stroke(ctx);
    }
  }

  flag() {
    this.flagged = !this.flagged;
  }

  reveal(cells, callback) {
    if (this.revealed) return;
    if (this.flagged) return;

    this.revealed = true;

    if (this.mine) {
      cells.forEach((c) => (c.revealed = true));
      return callback('MINE FOUND');
    }

    if (cells.filter((c) => c.mine).length + cells.filter((c) => c.revealed).length === cells.length) {
      return callback('SUCCESS');
    }

    const neighbours = this.getNeighbours(cells);

    const mineNeighbours = neighbours.filter((n) => n.mine);
    const mineCount = mineNeighbours.length;

    if (mineCount === 0) {
      neighbours.forEach((cell) => {
        cell.reveal(cells, callback);
      });
      return;
    }

    this.value = mineCount;
  }

  getNeighbours(cells = []) {
    return cells.filter((cell) => {
      if (cell.id === `${this.i - 1}-${this.j - 1}`) return true;
      if (cell.id === `${this.i}-${this.j - 1}`) return true;
      if (cell.id === `${this.i + 1}-${this.j - 1}`) return true;
      if (cell.id === `${this.i - 1}-${this.j}`) return true;
      if (cell.id === `${this.i + 1}-${this.j}`) return true;
      if (cell.id === `${this.i - 1}-${this.j + 1}`) return true;
      if (cell.id === `${this.i}-${this.j + 1}`) return true;
      if (cell.id === `${this.i + 1}-${this.j + 1}`) return true;

      return false;
    });
  }
}
