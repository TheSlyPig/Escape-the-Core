class Center {
  constructor(ctx, gameCanvas) {
    this.ctx = ctx;
    this.gameCanvas = gameCanvas;
    this.color = 'blue';
  }

  render(ctx) {
    let centerX = this.gameCanvas.width / 2;
    let centerY = this.gameCanvas.height / 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 55, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Center;
