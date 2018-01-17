class Player {
  constructor(ctx, gameCanvas) {
    this.ctx = ctx;
    this.gameCanvas = gameCanvas;
    this.color = 'cornflowerblue';
    this.circle = { centerX: 250, centerY: 250, radius: 75, angle: 0 };
    this.ball = { x: 0, y: 0, speed: 0 };
    this.ball.x = 0;
    this.ball.y = 0;
  }

  render(ctx) {

    if (window.rightPressed) {
      this.ball.speed = .088;
    }

    if (window.leftPressed) {
      this.ball.speed = -.088;
    }

    if (!window.leftPressed && !window.rightPressed) {
      this.ball.speed = 0;
    }

    ctx.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
    ctx.strokeStyle = this.color;

    this.ball.x = this.circle.centerX + Math.cos(this.circle.angle) * this.circle.radius;
    this.ball.y = this.circle.centerY + Math.sin(this.circle.angle) * this.circle.radius;

    this.circle.angle += this.ball.speed;

    ctx.fillStyle = 'darkblue';
    ctx.beginPath();
    ctx.arc(this.ball.x, this.ball.y, 8, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  }
}

export default Player;
