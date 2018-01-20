class Center {
  constructor(ctx, gameCanvas, difficultyModifier, radius) {
    this.ctx = ctx;
    this.gameCanvas = gameCanvas;
    this.radius = radius;
    if (difficultyModifier == 1) this.color = '#7C7C7C';
    if (difficultyModifier == 2) this.color = '#303030';
    if (difficultyModifier == 3) this.color = '#131313';
  }

  render(ctx) {
    let centerX = this.gameCanvas.width / 2;
    let centerY = this.gameCanvas.height / 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Center;
