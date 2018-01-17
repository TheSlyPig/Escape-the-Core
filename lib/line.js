class Line {
  constructor(ctx, gameCanvas, type) {
    this.ctx = ctx;
    this.gameCanvas = gameCanvas;
    this.color = this.randomColor();
    this.x = 0;
    this.y = 0;
    this.lineWidth = 300;
    this.type = type;
    this.handleType(type);
  }

  handleType(type) {
    if (type === 1) {
      this.x = 0;
      this.y = 0;
    } else if (type === 2) {
      this.x = this.gameCanvas.height;
      this.y = this.gameCanvas.width;
    }

  }

  randomColor() {
    const HEX_DIGITS = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += HEX_DIGITS[Math.floor((Math.random() * 16))];
    }

    return color;
  }

  closeIn() {
    if (this.type === 1) {
      this.x = this.x + 3;
      this.y = this.y + 3;
      this.lineWidth = this.lineWidth - 3.2;
    } else if (this.type === 2) {
      this.x = this.x - 3;
      this.y = this.y - 3;
      this.lineWidth = this.lineWidth - 3.2;
    }
  }

  render(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - 10, this.y - 10);
    ctx.closePath();
    ctx.stroke();
  }
}

export default Line;
