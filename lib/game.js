import Line from './line.js';
import Center from './center.js';
import Player from './player.js';
import Collide from 'line-circle-collision';

class Game {
  constructor(
    ctx,
    gameCanvas,
    toolsCanvas,
    toolsCtx,
    ui,
    bgm,
    menuBgm,
    bgmStartTimes,
    hitSound,
    lineSpeed1,
    lineSpeed2,
    difficultyModifier,
    rotateSpeed,
    lineLifeTimer,
    ballSpeed
  ) {
    this.ctx = ctx;
    this.gameCanvas = gameCanvas;

    this.toolsCtx = toolsCtx;
    this.toolsCanvas = toolsCanvas;
    this.ui = ui;

    this.bgm = bgm;
    this.menuBgm = menuBgm;
    this.bgmStartTimes = bgmStartTimes;
    this.hitSound = hitSound;
    this.hitSound.volume = 0.7;

    this.gameActive = false;
    this.gameOver = false;

    this.lines = [];
    this.lines2 = [];
    this.frames;

    this.startTime;

    this.r = Math.floor(Math.random() * 250) + 6;
    this.g = Math.floor(Math.random() * 250) + 6;
    this.b = Math.floor(Math.random() * 250) + 6;
    this.color = 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';

    this.center = new Center(ctx, gameCanvas);
    this.difficultyModifier = difficultyModifier;

    this.interval = 0;
    this.interval2 = -(lineLifeTimer / 2);

    this.rotateTimer = 130;
    this.rotateDir = 'left';
    this.rotateSpeed = rotateSpeed;
    this.lineSpeed1 = lineSpeed1;
    this.lineSpeed2 = lineSpeed2;
    this.lineLifeTimer = lineLifeTimer;
    this.ballSpeed = ballSpeed;

    this.player = new Player(ctx, gameCanvas, this.color, this.ballSpeed);

    this.gameOverScreen = new Image();
    this.gameOverScreen.src = 'assets/images/GameOver.png';
    this.stageCompleteScreen = new Image();
    this.stageCompleteScreen.src = 'assets/images/StageComplete.png';
    this.gameCompleteScreen = new Image();
    this.gameCompleteScreen.src = 'assets/images/GameComplete.png';
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
    this.startTime = new Date();
    this.ui.render();
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
    this.bgm.currentTime = this.bgmStartTimes[Math.floor(Math.random() * this.bgmStartTimes.length)];
    this.menuBgm.play();
    this.ui.drawFinalScore();
    this.gameActive = false;
    this.gameOver = true;
    cancelAnimationFrame(this.frames);
  }

  choosePattern(ctx) {
    let allDiagLines = [
                new Line(ctx, this.gameCanvas, 1, this.color, this.lineSpeed1, this.lineSpeed2),
                new Line(ctx, this.gameCanvas, 2, this.color, this.lineSpeed1, this.lineSpeed2),
                new Line(ctx, this.gameCanvas, 3, this.color, this.lineSpeed1, this.lineSpeed2),
                new Line(ctx, this.gameCanvas, 4, this.color, this.lineSpeed1, this.lineSpeed2),
                ];
    let allLines = [
                new Line(ctx, this.gameCanvas, 5, this.color, this.lineSpeed1, this.lineSpeed2),
                new Line(ctx, this.gameCanvas, 6, this.color, this.lineSpeed1, this.lineSpeed2),
                new Line(ctx, this.gameCanvas, 7, this.color, this.lineSpeed1, this.lineSpeed2),
                new Line(ctx, this.gameCanvas, 8, this.color, this.lineSpeed1, this.lineSpeed2),
                ];
    return Math.floor(Math.random() * 3) === 1 ? allDiagLines : allLines;
  }

  makePatterns(ctx) {
    let chosenLines = this.choosePattern(ctx);
    if (this.interval > this.lineLifeTimer) {
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
    if (this.interval2 > this.lineLifeTimer) {
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

  rotate(ctx, flip) {
    if (flip === true) this.rotateDir = this.rotateDir === 'left' ? 'right' : 'left';
    let rotation = this.rotateDir === 'left' ? -this.rotateSpeed : this.rotateSpeed;
    ctx.translate(this.gameCanvas.width / 2, this.gameCanvas.width / 2);
    ctx.rotate(Math.PI / rotation);
    ctx.translate(-this.gameCanvas.width / 2, -this.gameCanvas.width / 2);
  }

  setColor() {
    this.r += Math.floor(Math.random() * 250) + 2;
    this.r = this.r % 256;
    if (this.r < 40) this.r = 40;

    this.g += Math.floor(Math.random() * 250) + 2;
    this.g = this.g % 256;
    if (this.g < 40) this.g = 40;

    this.b += Math.floor(Math.random() * 250) + 2;
    this.b = this.b % 256;
    if (this.b < 40) this.b = 40;
    this.color = 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';
  }

  render(ctx) {
    if (this.gameActive === true) {
      this.makePatterns(ctx);

      this.checkCollision();
      ctx.clearRect(-700, -700, this.gameCanvas.width + 700, this.gameCanvas.height + 700);

      if (this.rotateTimer < 1) {
        this.rotate(ctx, true);
        this.rotateTimer = Math.floor(Math.random() * 190) + 70;
      } else {
        this.rotate(ctx, false);
        this.rotateTimer = this.rotateTimer - 1;
      }

      this.setColor();

      this.moveLines();
      this.player.render(ctx);
      this.lines.forEach((line) => {
        line.render(ctx);
      });
      this.lines2.forEach((line) => {
        line.render(ctx);
      });
      this.center.render(ctx);
    } else if (this.gameOver === true) {
      if (this.ui.score >= 60.0 && window.difficultyLevel === 3) {
        this.toolsCtx.drawImage(
          this.gameCompleteScreen,
          this.toolsCanvas.width / 2 - this.gameCompleteScreen.width / 2,
          this.toolsCanvas.height / 2 - this.gameCompleteScreen.height / 2
        );
      } else if (this.ui.score >= 60.0) {
        this.toolsCtx.drawImage(
          this.stageCompleteScreen,
          this.toolsCanvas.width / 2 - this.stageCompleteScreen.width / 2,
          this.toolsCanvas.height / 2 - this.stageCompleteScreen.height / 2
        );
      } else {
        this.toolsCtx.drawImage(
          this.gameOverScreen,
          this.toolsCanvas.width / 2 - this.gameOverScreen.width / 2,
          this.toolsCanvas.height / 2 - this.gameOverScreen.height / 2
        );
      }
    }
  };
}

export default Game;
