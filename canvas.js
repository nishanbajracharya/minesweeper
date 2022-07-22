function createCanvas(w = 500, h = 500, root = document.body) {
  const canvas = document.createElement('canvas');

  canvas.width = w;
  canvas.height = h;

  root.appendChild(canvas);

  const ctx = canvas.getContext('2d');

  return { canvas, ctx };
}

function rect(ctx, x, y, w, h) {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
}

function square(ctx, x, y, w) {
  rect(ctx, x, y, w, w);
}

function circle(ctx, x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
}

function background(ctx, color = 'black', w = 500, h = 500) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, w, h);
}

function stroke(ctx, style = 'black', width = 1) {
  ctx.save();
  ctx.clip();
  ctx.lineWidth = width;
  ctx.strokeStyle = style;
  ctx.stroke();
  ctx.restore();
}

function fill(ctx, style = 'black') {
  ctx.fillStyle = style;

  ctx.fill();
}

function text(
  ctx,
  text,
  x = 0,
  y = 0,
  style = 'black',
  font = '12px sans-serif',
  align = 'center',
  baseline = 'middle'
) {
  ctx.beginPath();
  ctx.font = font;
  ctx.textAlign = align;
  ctx.fillStyle = style;
  ctx.textBaseline = baseline;
  ctx.fillText(text, x, y);
}
