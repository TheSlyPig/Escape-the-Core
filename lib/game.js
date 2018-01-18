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
    this.lines2 = [];
    this.center = new Center(ctx, gameCanvas);
    this.player = new Player(ctx, gameCanvas);
    this.difficultyModifier = 1;

    this.interval = 0;
    this.interval2 = -37;
  }

  moveLines() {
    this.lines.forEach(line => {
      line.closeIn();
    });
    this.lines2.forEach(line => {
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

  choosePattern(ctx) {
    let allLines = [
                new Line(ctx, this.gameCanvas, 1, 'red'),
                new Line(ctx, this.gameCanvas, 2, 'red'),
                new Line(ctx, this.gameCanvas, 3, 'red'),
                new Line(ctx, this.gameCanvas, 4, 'red'),
                ];
    let allDiagLines = [
                new Line(ctx, this.gameCanvas, 5, 'red'),
                new Line(ctx, this.gameCanvas, 6, 'red'),
                new Line(ctx, this.gameCanvas, 7, 'red'),
                new Line(ctx, this.gameCanvas, 8, 'red'),
                ];
    return Math.floor(Math.random() * 3) === 1 ? allLines : allDiagLines;
  }

  makePatterns(ctx) {
    let chosenLines = this.choosePattern(ctx);
    if (this.interval > 74) {
      let randNum = Math.floor(Math.random() * chosenLines.length);
      if (Math.floor(Math.random() * this.difficultyModifier) === 0) {
        chosenLines.splice((randNum + Math.floor((Math.random() * 3) + 1)) % 4, 1);
      }

      chosenLines.splice(randNum, 1);
      this.lines = chosenLines;
      this.interval = 0;
    } else {
      this.interval += 1;
    }

    let chosenLines2 = this.choosePattern(ctx);
    if (this.interval2 > 74) {
      let randNum2 = Math.floor(Math.random() * chosenLines2.length);
      if (Math.floor(Math.random() * this.difficultyModifier) === 0) {
        chosenLines2.splice((randNum2 + Math.floor((Math.random() * 3) + 1)) % 4, 1);
      }

      chosenLines2.splice(randNum2, 1);
      if (chosenLines2 != chosenLines) this.lines2 = chosenLines2;
      this.interval2 = 0;
    } else {
      this.interval2 += 1;
    }

  }

  checkCollision() {
    this.lines.forEach(line => {
      if (line.x < this.player.ball.x + 8  && line.x + line.width  > this.player.ball.x &&
        line.y < this.player.ball.y + 8 && line.y + line.height > this.player.ball.y) {

      }
    });
  }

  render(ctx) {
    this.makePatterns(ctx);

    this.checkCollision();

    this.player.render(ctx);
    this.center.render(ctx);
    this.lines.forEach((line) => {
      line.render(ctx);
    });
    this.lines2.forEach((line) => {
      line.render(ctx);
    });
  };
}

export default Game;
