import Line from './line.js';
import Center from './center.js';
import Player from './player.js';
import Collide from 'line-circle-collision';

class Game {
  constructor(ctx, gameCanvas, xDim, yDim, bgm, hitSound) {
    this.ctx = ctx;
    this.gameCanvas = gameCanvas;
    this.xDim = xDim;
    this.yDim = yDim;
    this.bgm = bgm;
    this.hitSound = hitSound;

    this.gameActive = false;

    this.lines = [];
    this.lines2 = [];
    this.frames;
    this.color = 'blue';

    this.center = new Center(ctx, gameCanvas);
    this.player = new Player(ctx, gameCanvas);
    this.difficultyModifier = 1;

    this.interval = 0;
    this.interval2 = -37;
    this.rotateTimer = 200;
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
      this.render(this.ctx);
      this.frames = requestAnimationFrame(animateCallback);
    };

    if (this.gameActive === true) {
      animateCallback();
    } else {
      cancelAnimationFrame(frames);
    }
  };

  end() {
    this.color = 'red';
    this.hitSound.play();
    this.bgm.pause();
    this.gameActive = false;
    cancelAnimationFrame(this.frames);
  }

  choosePattern(ctx) {
    let allDiagLines = [
                new Line(ctx, this.gameCanvas, 1, this.color),
                new Line(ctx, this.gameCanvas, 2, this.color),
                new Line(ctx, this.gameCanvas, 3, this.color),
                new Line(ctx, this.gameCanvas, 4, this.color),
                ];
    let allLines = [
                new Line(ctx, this.gameCanvas, 5, this.color),
                new Line(ctx, this.gameCanvas, 6, this.color),
                new Line(ctx, this.gameCanvas, 7, this.color),
                new Line(ctx, this.gameCanvas, 8, this.color),
                ];
    return Math.floor(Math.random() * 3) === 1 ? allDiagLines : allLines;
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
      this.lines2 = chosenLines2;
      this.interval2 = 0;
    } else {
      this.interval2 += 1;
    }

  }

  checkCollision() {
    let circle = [this.player.ball.x, this.player.ball.y];
    let radius = this.player.ball.radius;
    this.lines.forEach((line) => {
      let a = line.startPoint;
      let b = line.endPoint;
      let hit = Collide(a, b, circle, radius);
      if (hit === true) {
        this.end();
      }
    });
    this.lines2.forEach((line) => {
      let a = line.startPoint;
      let b = line.endPoint;
      let hit = Collide(a, b, circle, radius);
      if (hit === true) {
        this.end();
      }
    });
  }

  rotate(ctx) {
    let rotateDir = Math.floor(Math.random() * 3) === 1 ? 'left' : 'right';
    let rotation = rotateDir === 'left' ? -60 : 60;
    ctx.translate(this.gameCanvas.width / 2, this.gameCanvas.width / 2);
    ctx.rotate(Math.PI / rotation);
    ctx.translate(-this.gameCanvas.width / 2, -this.gameCanvas.width / 2);
  }

  render(ctx) {
    if (this.gameActive === true) {
      this.makePatterns(ctx);

      this.checkCollision();
      ctx.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
      if (this.rotateTimer < 1) {
        this.rotate(ctx, flip);
        this.rotateTimer = 200;
      } else {
        this.rotate(ctx);
        this.rotateTimer -= 1;
      }

      this.moveLines();
      this.player.render(ctx);
      this.center.render(ctx);
      this.lines.forEach((line) => {
        line.render(ctx);
      });
      this.lines2.forEach((line) => {
        line.render(ctx);
      });
    } else {
      ctx.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
    }
  };
}

export default Game;
