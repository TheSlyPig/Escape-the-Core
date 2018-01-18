class Line {
  constructor(ctx, gameCanvas, type, color) {
    this.ctx = ctx;
    this.gameCanvas = gameCanvas;
    this.color = color;
    this.x = 0;
    this.y = 0;
    this.halfWidth = this.gameCanvas.width / 2;
    this.halfHeight = this.gameCanvas.height / 2;
    this.fullWidth = this.gameCanvas.width;
    this.fullHeight = this.gameCanvas.height;

    this.lineWidth = 10;
    this.type = type;
    this.handleType(type);
    this.sizeScaler = 5;
    this.sizeScaler = 0;
    this.startPoint = [0, 0];
    this.endPoint = [0, 0];
  }

  handleType(type) {
    if (type === 1) {
      this.x = -200;
      this.y = 0;
    } else if (type === 2) {
      this.x = this.gameCanvas.height + 200;
      this.y = this.gameCanvas.width;
    } else if (type === 3) {
      this.x = (this.gameCanvas.width / 2);
      this.y = -200;
    } else if (type === 4) {
      this.x = -200;
      this.y = this.gameCanvas.height / 2;
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
        this.x = this.x + 5;
        this.y = this.y + 5;
      } else if (this.type === 2) {
        this.x = this.x - 5;
        this.y = this.y - 5;
      } else if (this.type === 3) {
        this.fullWidth = this.fullWidth - 5;
        this.y = this.y + 5;
      } else if (this.type === 4) {
        this.x = this.x + 5;
        this.fullHeight = this.fullHeight - 5;
      }

      // this.sizeScaler = this.sizeScaler + .16;
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

      // this.sizeScaler = this.sizeScaler + .0265;
    }

    this.lineWidth = this.lineWidth - this.sizeScaler;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    if (this.type === 1) {
      this.startPoint = [this.x, this.halfHeight];
      ctx.moveTo(this.x, this.halfHeight);
      this.endPoint = [this.halfWidth, this.y - 200];
      ctx.lineTo(this.halfWidth, this.y - 200);
    } else if (this.type === 2) {
      this.startPoint = [this.x, this.halfHeight];
      ctx.moveTo(this.x, this.halfHeight);
      this.endPoint = [this.halfWidth, this.y + 200];
      ctx.lineTo(this.halfWidth, this.y + 200);
    } else if (this.type === 3) {
      this.startPoint = [this.x, this.y];
      ctx.moveTo(this.x, this.y);
      this.endPoint = [this.fullWidth + 200, this.halfHeight];
      ctx.lineTo(this.fullWidth + 200, this.halfHeight);
    } else if (this.type === 4) {
      this.startPoint = [this.x, this.y];
      ctx.moveTo(this.x, this.y);
      this.endPoint = [this.halfWidth, this.fullHeight + 200];
      ctx.lineTo(this.halfWidth, this.fullHeight + 200);
    } else if (this.type === 5 || this.type === 6) {
      this.startPoint = [this.x, this.y + 10];
      ctx.moveTo(this.x, this.y + 10);
      this.endPoint = [this.x + 10, this.y + 10];
      ctx.lineTo(this.x + 10, this.y + 10);
    } else if (this.type === 7 || this.type === 8) {
      this.startPoint = [this.x + 10, this.y];
      ctx.moveTo(this.x + 10, this.y);
      this.endPoint = [this.x + 10, this.y + 10];
      ctx.lineTo(this.x + 10, this.y + 10);
    }

    ctx.closePath();
    ctx.stroke();
  }
}

export default Line;
