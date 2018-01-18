class Line {
  constructor(ctx, gameCanvas, type, color) {
    this.ctx = ctx;
    this.gameCanvas = gameCanvas;
    this.color = color;
    this.x = 0;
    this.y = 0;
    this.lineWidth = 500;
    this.lineWidthDiag = 627;
    this.type = type;
    this.handleType(type);
    this.sizeScaler = 5;
  }

  handleType(type) {
    if (type === 1) {
      this.x = 0;
      this.y = -14;
      this.lineWidth = this.lineWidthDiag;
    } else if (type === 2) {
      this.x = this.gameCanvas.height;
      this.y = this.gameCanvas.width - 14;
      this.lineWidth = this.lineWidthDiag;
    } else if (type === 3) {
      this.x = this.gameCanvas.width - 10;
      this.y = -5;
      this.lineWidth = this.lineWidthDiag;
    } else if (type === 4) {
      this.x = 0;
      this.y = this.gameCanvas.height - 15;
      this.lineWidth = this.lineWidthDiag;
    } else if (type === 5) {
      this.x = -8;
      this.y = (this.gameCanvas.height / 2) - 6;
    } else if (type === 6) {
      this.x = this.gameCanvas.width - 8;
      this.y = (this.gameCanvas.height / 2) - 6;
    } else if (type === 7) {
      this.x = (this.gameCanvas.width / 2) - 10;
      this.y = 0;
    } else if (type === 8) {
      this.x = (this.gameCanvas.width / 2) - 10;
      this.y = this.gameCanvas.height;
    }

  }

  // randomColor() {
  //   const HEX_DIGITS = '0123456789ABCDEF';
  //   let color = '#';
  //   for (let i = 0; i < 6; i++) {
  //     color += HEX_DIGITS[Math.floor((Math.random() * 16))];
  //   }
  //
  //   return color;
  // }

  closeIn() {
    if (this.type < 5) {
      if (this.type === 1) {
        this.x = this.x + 3;
        this.y = this.y + 3;
      } else if (this.type === 2) {
        this.x = this.x - 3;
        this.y = this.y - 3;
      } else if (this.type === 3) {
        this.x = this.x - 3;
        this.y = this.y + 3;
      } else if (this.type === 4) {
        this.x = this.x + 3;
        this.y = this.y - 3;
      }

      this.sizeScaler = this.sizeScaler + .0677;
    } else {
      if (this.type === 5) {
        this.x = this.x + 3;
        this.y = this.y;
      } else if (this.type === 6) {
        this.x = this.x - 3;
        this.y = this.y;
      } else if (this.type === 7) {
        this.x = this.x;
        this.y = this.y + 3;
      } else if (this.type === 8) {
        this.x = this.x;
        this.y = this.y - 3;
      }

      this.sizeScaler = this.sizeScaler + .0265;
    }

    this.lineWidth = this.lineWidth - this.sizeScaler;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    if (this.type === 1 || this.type === 2) {
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x + 10, this.y + 10);
    } else if (this.type === 3 || this.type === 4) {
      ctx.moveTo(this.x + 20, this.y);
      ctx.lineTo(this.x + 10, this.y + 10);
    } else if (this.type === 5 || this.type === 6) {
      ctx.moveTo(this.x, this.y + 10);
      ctx.lineTo(this.x + 10, this.y + 10);
    } else if (this.type === 7 || this.type === 8) {
      ctx.moveTo(this.x + 10, this.y);
      ctx.lineTo(this.x + 10, this.y + 10);
    }

    ctx.closePath();
    ctx.stroke();
  }
}

export default Line;
