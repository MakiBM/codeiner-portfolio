const Fractal = () => {
  let a = 0;
  let b = 0;
  let r = 0;
  let tx;
  let ty;
  let width;
  let height;
  let canvas;
  let ctx;
  let p0;
  let p1;
  let p2;

  const drawTriangle = (p0, p1, p2) => {
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.fillStyle = '#fff';
    ctx.fill();
  };

  const sierpinski = (p0, p1, p2, limit) => {
    if (limit > 0) {
      const pA = {
        x: p0.x + (p1.x - p0.x) * tx,
        y: p0.y + (p1.y - p0.y) * ty
      };
      const pB = {
        x: p1.x + (p2.x - p1.x) * tx,
        y: p1.y + (p2.y - p1.y) * ty
      };
      const pC = {
        x: p2.x + (p0.x - p2.x) * tx,
        y: p2.y + (p0.y - p2.y) * ty
      };
      sierpinski(p0, pA, pC, limit - 1);
      sierpinski(pA, p1, pB, limit - 1);
      sierpinski(pC, pB, p2, limit - 1);
    } else {
      drawTriangle(p0, p1, p2);
    }
  };

  const draw = progress => {
    if (progress < 0.025) return;
    a = progress - 0.5;
    b = -a * 2;
    r = (progress * 2) - 1;
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate(r);
    tx = 0.5 + Math.sin(a) * 0.25;
    ty = 0.5 + Math.sin(b) * 0.5;
    sierpinski(p0, p1, p2, 7);
    ctx.restore();
  };

  const update = () => {
    width = canvas.width = window.innerWidth / 2;
    height = canvas.height = window.innerWidth / 2;

    p0 = {
      x: 0,
      y: -321
    };
    p1 = {
      x: 278,
      y: 160
    };
    p2 = {
      x: -278,
      y: 160
    };
  };

  const init = el => {
    canvas = el;
    ctx = canvas.getContext("2d");
    update();
  };

  return {
    init,
    draw,
    update
  };
};

// Export Singleton so we have an access to the same instantion across the app
export default (new Fractal());
