class Player {
  constructor(ctx, gameCanvas, color, ballSpeed) {
    this.ctx = ctx;
    this.gameCanvas = gameCanvas;
    this.color = 'white';
    this.circle = {
      centerX: this.gameCanvas.width / 2,
      centerY: this.gameCanvas.height / 2,
      radius: 75,
      angle: 0,
    };
    this.ball = { x: 0, y: 0, speed: 0 };
    this.ball.x = 0;
    this.ball.y = 0;
    this.ball.radius = 8;
    this.ballSpeed = ballSpeed;
    ctx.strokeStyle = 'black';
    ctx.stroke();
  }

  render(ctx) {

    if (window.rightPressed) {
      this.ball.speed = this.ballSpeed;
    }

    if (window.leftPressed) {
      this.ball.speed = -(this.ballSpeed);
    }

    if (!window.leftPressed && !window.rightPressed) {
      this.ball.speed = 0;
    }

    this.ball.x = this.circle.centerX + Math.cos(this.circle.angle) * this.circle.radius;
    this.ball.y = this.circle.centerY + Math.sin(this.circle.angle) * this.circle.radius;

    this.circle.angle += this.ball.speed;

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  }
}

export default Player;
