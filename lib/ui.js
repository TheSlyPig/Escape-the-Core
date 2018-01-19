class Ui {
  constructor(game, toolsCtx, toolsCanvas) {
    this.game = game;
    this.toolsCtx = toolsCtx;
    this.toolsCanvas = toolsCanvas;
    this.score;
  }

  drawElapsedTime() {
    if (this.game.gameActive === true) {
      let elapsed = parseInt((new Date() - this.game.startTime));
      let hundredths = (elapsed / 1000).toFixed(2);
      if (hundredths.length < 2) hundredths = '0' + hundredths;

      this.toolsCtx.save();
      this.toolsCtx.beginPath();
      this.toolsCtx.fillStyle = 'white';
      this.toolsCtx.font = '50px Orbitron';

      this.toolsCtx.globalAlpha = 0.50;
      this.toolsCtx.fillText(hundredths, this.toolsCanvas.width - 310, 39);
      this.toolsCtx.restore();
      this.score = hundredths;
    }
  }

  drawFinalScore() {
    this.toolsCtx.save();
    this.toolsCtx.beginPath();
    this.toolsCtx.fillStyle = 'white';
    this.toolsCtx.font = '50px Orbitron';
    this.toolsCtx.fillText(this.score, this.toolsCanvas.width - 310, 39);
    this.toolsCtx.restore();
  }

  render() {
    const animateCallback = () => {
      this.toolsCtx.clearRect(0, 0, this.toolsCanvas.width, this.toolsCanvas.height);
      this.game.gameOver === false ? this.drawElapsedTime() : this.drawFinalScore();
      this.frames = requestAnimationFrame(animateCallback);
    };

    animateCallback();

  }
}

export default Ui;
