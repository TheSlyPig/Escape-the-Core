import Line from './line.js';
import Center from './center.js';
import Player from './player.js';

class Game {
  constructor(ctx, gameCanvas, xDim, yDim) {
    this.ctx = ctx;
    this.gameCanvas = gameCanvas;
    this.xDim = xDim;
    this.yDim = yDim;

    this.lines = [];
    this.center = new Center(ctx, gameCanvas);
    this.player = new Player(ctx, gameCanvas);

    this.i = 0;
  }

  moveLines() {
    this.lines.forEach(line => {
      line.closeIn();
    });
  };

  begin() {
    const animateCallback = () => {
      this.moveLines();
      this.render(this.ctx);
      requestAnimationFrame(animateCallback);
    };

    animateCallback();
  };

  render(ctx) {
    if (this.i > 75) {
      this.lines = [new Line(ctx, this.gameCanvas, Math.floor((Math.random() * 8) + 1), 'red')];
      this.i = 0;
    } else {
      this.i += 1;
    }

    this.player.render(ctx);
    this.center.render(ctx);
    this.lines.forEach((line) => {
      line.render(ctx);
    });
  };
}

export default Game;
