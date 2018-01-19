class Line {
  constructor(ctx, gameCanvas, type, color, lineSpeed1, lineSpeed2, game) {
    this.ctx = ctx;
    this.gameCanvas = gameCanvas;
    this.game = game;
    this.color = color;
    this.x = 0;
    this.y = 0;
    this.halfWidth = this.gameCanvas.width / 2;
    this.halfHeight = this.gameCanvas.height / 2;
    this.fullWidth = this.gameCanvas.width;
    this.fullHeight = this.gameCanvas.height;

    this.lineSpeed1 = lineSpeed1;
    this.lineSpeed2 = lineSpeed2;

    this.lineWidth = 10;
    this.type = type;
    this.handleType(type);
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
      this.x = 0;
      this.y = 0;
    } else if (type === 6) {
      this.x = this.gameCanvas.width;
      this.y = 0;
    } else if (type === 7) {
      this.x = 0;
      this.y = 0;
    } else if (type === 8) {
      this.x = 0;
      this.y = this.gameCanvas.height;
    } else if (type === 9) {
      this.x = 0;
      this.y = this.gameCanvas.height;
    } else if (type === 10) {
      this.x = -200;
      this.y = this.gameCanvas.height / 2;
    } else if (type === 11) {
      this.x = (this.gameCanvas.width / 2);
      this.y = -200;
    } else if (type === 12) {
      this.x = 0;
      this.y = 0;
    }

  }

  closeIn() {
    if (this.type < 5) {
      if (this.type === 1) {
        this.x = this.x + this.lineSpeed1;
        this.y = this.y + this.lineSpeed1;
      } else if (this.type === 2) {
        this.x = this.x - this.lineSpeed1;
        this.y = this.y - this.lineSpeed1;
      } else if (this.type === 3) {
        this.fullWidth = this.fullWidth - this.lineSpeed1;
        this.y = this.y + this.lineSpeed1;
      } else if (this.type === 4) {
        this.x = this.x + this.lineSpeed1;
        this.fullHeight = this.fullHeight - this.lineSpeed1;
      }

    } else {
      if (this.type === 5) {
        this.x = this.x + this.lineSpeed2;
        this.y = this.y + this.lineSpeed2;
        this.fullHeight = this.fullHeight - this.lineSpeed2;
      } else if (this.type === 6) {
        this.x = this.x - this.lineSpeed2;
        this.y = this.y + this.lineSpeed2;
        this.fullHeight = this.fullHeight - this.lineSpeed2;
      } else if (this.type === 7) {
        this.x = this.x + this.lineSpeed2;
        this.y = this.y + this.lineSpeed2;
        this.fullWidth = this.fullWidth - this.lineSpeed2;
      } else if (this.type === 8) {
        this.x = this.x + this.lineSpeed2;
        this.y = this.y - this.lineSpeed2;
        this.fullWidth = this.fullWidth - this.lineSpeed2;
      } else if (this.type === 9) {
        this.x = this.x + this.lineSpeed2 + 2;
        this.y = this.y - this.lineSpeed2 - 2;
        this.fullWidth = this.fullWidth - this.lineSpeed2 - 2;
      } else if (this.type === 10) {
        this.x = this.x + this.lineSpeed1 + 2;
        this.fullHeight = this.fullHeight - this.lineSpeed1 - 2;
      } else if (this.type === 11) {
        this.fullWidth = this.fullWidth - this.lineSpeed1 - 2;
        this.y = this.y + this.lineSpeed1 + 2;
      } else if (this.type === 12) {
        this.x = this.x + this.lineSpeed2 + 2;
        this.y = this.y + this.lineSpeed2 + 2;
        this.fullWidth = this.fullWidth - this.lineSpeed2 - 2;
      }

    }

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
    } else if (this.type === 5) {
      this.startPoint = [this.x, this.y];
      ctx.moveTo(this.x, this.y);
      this.endPoint = [this.x, this.fullHeight];
      ctx.lineTo(this.x, this.fullHeight);
    } else if (this.type === 6) {
      this.startPoint = [this.x, this.y];
      ctx.moveTo(this.x, this.y);
      this.endPoint = [this.x, this.fullHeight];
      ctx.lineTo(this.x, this.fullHeight);
    } else if (this.type === 7) {
      this.startPoint = [this.x, this.y];
      ctx.moveTo(this.x, this.y);
      this.endPoint = [this.fullWidth, this.y];
      ctx.lineTo(this.fullWidth, this.y);
    } else if (this.type === 8) {
      this.startPoint = [this.x, this.y];
      ctx.moveTo(this.x, this.y);
      this.endPoint = [this.fullWidth, this.y];
      ctx.lineTo(this.fullWidth, this.y);
    } else if (this.type === 9) {
      this.startPoint = [this.x, this.y];
      ctx.moveTo(this.x, this.y);
      this.endPoint = [this.fullWidth, this.y];
      ctx.lineTo(this.fullWidth, this.y);
      this.color = this.game.color;
    } else if (this.type === 10) {
      this.startPoint = [this.x, this.y];
      ctx.moveTo(this.x, this.y);
      this.endPoint = [this.halfWidth, this.fullHeight + 200];
      ctx.lineTo(this.halfWidth, this.fullHeight + 200);
      this.color = this.game.color;
    } else if (this.type === 11) {
      this.startPoint = [this.x, this.y];
      ctx.moveTo(this.x, this.y);
      this.endPoint = [this.fullWidth + 200, this.halfHeight];
      ctx.lineTo(this.fullWidth + 200, this.halfHeight);
      this.color = this.game.color;
    } else if (this.type === 12) {
      this.startPoint = [this.x, this.y];
      ctx.moveTo(this.x, this.y);
      this.endPoint = [this.fullWidth, this.y];
      ctx.lineTo(this.fullWidth, this.y);
      this.color = this.game.color;
    }

    ctx.closePath();
    ctx.stroke();
  }
}

export default Line;
