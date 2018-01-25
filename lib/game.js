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
    gameOverAudio,
    bgmStartTimes,
    hitSound,
    lineSpeed1,
    lineSpeed2,
    difficultyModifier,
    rotateSpeed,
    lineLifeTimer,
    ballSpeed
  ) {

    document.addEventListener('visibilitychange', () => {
      this.escIfLoseFocus();
    });
    //basic-setup
    this.ctx = ctx;
    this.gameCanvas = gameCanvas;
    this.toolsCtx = toolsCtx;
    this.toolsCanvas = toolsCanvas;
    this.ui = ui;
    this.gameActive = false;
    this.gameOver = false;
    this.difficultyModifier = difficultyModifier;
    this.center = new Center(ctx, gameCanvas, this.difficultyModifier, 49);

    //audio-setup
    this.bgm = bgm;
    this.menuBgm = menuBgm;
    this.bgmStartTimes = bgmStartTimes;
    this.hitSound = hitSound;
    this.hitSound.volume = 0.7;
    this.gameOverAudio = gameOverAudio;

    //line-setup
    this.lineWidth = 10;
    this.lines = [];
    this.lines2 = [];
    this.frames;
    this.specialLineCount = 0;
    this.specialFlag = false;
    this.specialLineFrequency = () => (
      Math.floor(Math.random() * 15 - (5 * (this.difficultyModifier - 1))) + 1
    );
    this.specialLineQuantity = this.difficultyModifier === 1 ? 9 : 11;
    this.interval = 0;
    this.interval2 = -(lineLifeTimer / 2);
    this.lineSpeed1 = lineSpeed1;
    this.lineSpeed2 = lineSpeed2;
    this.lineLifeTimer = lineLifeTimer;

    //colors
    this.r = Math.floor(Math.random() * 250) + 6;
    this.g = Math.floor(Math.random() * 250) + 6;
    this.b = Math.floor(Math.random() * 250) + 6;
    this.color = 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';

    //rotation and player
    this.rotateTimer = 130;
    this.rotateDir = 'left';
    this.rotateSpeed = rotateSpeed;
    this.ballSpeed = ballSpeed;
    this.player = new Player(ctx, gameCanvas, this.color, this.ballSpeed);

    //images
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
    let userNameValue = document.getElementById('user-name').value;
    localStorage.setItem('userName', userNameValue);
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
    if (!window.muted) this.hitSound.play();
    this.gameOverAudio.pause();
    this.gameOverAudio.currentTime = 0;
    if (!window.muted) this.gameOverAudio.play();
    this.bgm.pause();
    this.bgm.currentTime = this.bgmStartTimes[Math.floor(Math.random() * this.bgmStartTimes.length)];
    if (!window.muted) this.menuBgm.play();
    this.ui.drawFinalScore();
    this.ui.sendHighScores();
    this.ui.setCookies();
    this.gameActive = false;
    this.gameOver = true;
    cancelAnimationFrame(this.frames);
  }

  choosePattern(ctx) {
    let specialLines;
    if (this.specialLineFrequency() === 1) { // They rolled a special shape
      switch (Math.floor(Math.random() * this.specialLineQuantity) + 1) {
        case 1:
          this.specialFlag = true;
          specialLines = [
            new Line(ctx, this.gameCanvas, 1, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new Line(ctx, this.gameCanvas, 3, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new Line(ctx, this.gameCanvas, 8, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
          ];
          break;
        case 2:
          this.specialFlag = true;
          specialLines = [
            new Line(ctx, this.gameCanvas, 1, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new Line(ctx, this.gameCanvas, 8, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
          ];
          break;
        case 3:
          this.specialFlag = true;
          specialLines = [
            new Line(ctx, this.gameCanvas, 1, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new Line(ctx, this.gameCanvas, 2, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new Line(ctx, this.gameCanvas, 6, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new Line(ctx, this.gameCanvas, 7, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
          ];
          break;
        case 4:
          this.specialFlag = true;
          specialLines = [
            new Line(ctx, this.gameCanvas, 1, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new Line(ctx, this.gameCanvas, 2, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new Line(ctx, this.gameCanvas, 3, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new Line(ctx, this.gameCanvas, 5, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new Line(ctx, this.gameCanvas, 6, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new Line(ctx, this.gameCanvas, 7, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
          ];
          break;
        case 5:
          this.specialFlag = true;
          specialLines = [
            new Line(ctx, this.gameCanvas, 1, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new Line(ctx, this.gameCanvas, 2, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new Line(ctx, this.gameCanvas, 3, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new Line(ctx, this.gameCanvas, 7, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new Line(ctx, this.gameCanvas, 6, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new Line(ctx, this.gameCanvas, 8, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
          ];
          break;
        case 6: // Cases 6 and on are rainbow lines
          this.specialFlag = true;
          specialLines = [
            new Line(ctx, this.gameCanvas, 9, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth, this),
          ];
          break;
        case 7:
          this.specialFlag = true;
          specialLines = [
            new Line(ctx, this.gameCanvas, 10, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth, this),
          ];
          break;
        case 8:
          this.specialFlag = true;
          specialLines = [
            new Line(ctx, this.gameCanvas, 11, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth, this),
          ];
          break;
        case 9:
          this.specialFlag = true;
          specialLines = [
            new Line(ctx, this.gameCanvas, 12, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth, this),
          ];
          break;
        case 10:
          this.specialFlag = true;
          specialLines = [
            new Line(ctx, this.gameCanvas, 10, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth, this),
            new Line(ctx, this.gameCanvas, 11, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth, this),
          ];
          break;
        case 11:
          this.specialFlag = true;
          specialLines = [
            new Line(ctx, this.gameCanvas, 9, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth, this),
            new Line(ctx, this.gameCanvas, 12, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth, this),
          ];
          break;
      }
    }

    if (specialLines) return specialLines;

    // they didn't roll a special line
    let allDiagLines = [
                new Line(ctx, this.gameCanvas, 1, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
                new Line(ctx, this.gameCanvas, 2, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
                new Line(ctx, this.gameCanvas, 3, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
                new Line(ctx, this.gameCanvas, 4, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
                ];
    let allLines = [
                new Line(ctx, this.gameCanvas, 5, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
                new Line(ctx, this.gameCanvas, 6, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
                new Line(ctx, this.gameCanvas, 7, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
                new Line(ctx, this.gameCanvas, 8, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
                ];
    return Math.floor(Math.random() * 3) === 1 ? allDiagLines : allLines;
  }

// we have two shapes on screen at any given time, with an interval between them
// this handles choosing the full shapes and removing 1-2 lines from non-special shapes
// (to make it possible to get out)
  makePatterns(ctx) {
    this.specialFlag = false;
    let chosenLines = this.choosePattern(ctx);
    if (this.interval > this.lineLifeTimer) {
      let randNum = Math.floor(Math.random() * chosenLines.length);
      if (Math.floor(Math.random() * this.difficultyModifier) === 0) {
        if (this.specialFlag === false) chosenLines.splice((randNum + Math.floor((Math.random() * 3) + 1)) % 4, 1);
      }

      if (this.specialFlag === false) chosenLines.splice(randNum, 1);
      this.specialFlag = false;
      this.lines = chosenLines;
      this.interval = 0;
    } else {
      this.interval += 1;
    }

    this.specialFlag = false;
    let chosenLines2 = this.choosePattern(ctx);
    if (this.interval2 > this.lineLifeTimer) {
      let randNum2 = Math.floor(Math.random() * chosenLines2.length);
      if (Math.floor(Math.random() * this.difficultyModifier) === 0) {
        if (this.specialFlag === false) chosenLines2.splice((randNum2 + Math.floor((Math.random() * 3) + 1)) % 4, 1);
      }

      if (this.specialFlag === false) chosenLines2.splice(randNum2, 1);
      this.specialFlag = false;
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
    if (this.r < 40) this.r = 50;

    this.g += Math.floor(Math.random() * 250) + 2;
    this.g = this.g % 256;
    if (this.g < 40) this.g = 50;

    this.b += Math.floor(Math.random() * 250) + 2;
    this.b = this.b % 256;
    if (this.b < 40) this.b = 50;
    this.color = 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';
  }

  pulseCenter() {
    if (window.difficultyLevel === 1) {
      if (this.center.radius < 40) {
        this.center.radius += 20;
      } else {
        this.center.radius -= .4068;
      }
    }

    if (window.difficultyLevel === 2) {
      if (this.center.radius < 40) {
        this.center.radius += 20;
      } else {
        this.center.radius -= .513;
      }
    }

    if (window.difficultyLevel === 3) {
      if (this.center.radius < 47) {
        this.center.radius += 18;
      } else {
        this.center.radius -= .499;
      }
    }
  }


  doEvilThingsToFirstStage() {
    if (parseInt(this.ui.score) > 30 && window.difficultyLevel === 1) {
      this.rotateSpeed = 120;
    }
  }

  doEvilThingsToSecondStage() {
    if (parseInt(this.ui.score) > 30 && window.difficultyLevel === 2) {
      this.rotateSpeed = 80;
    }
  }

  doEvilThingsToThirdStage() {
    if (parseInt(this.ui.score) > 10 && window.difficultyLevel === 3) {
      this.center.color = 'black';
      if (parseInt(this.ui.score) > 20 && parseInt(this.ui.score) < 30) {
        this.rotateSpeed = 0;
      }
      if (parseInt(this.ui.score) > 30) {
        this.rotateSpeed = 59;
      }
      if (parseInt(this.ui.score) > 35) {
        this.lineWidth = 5;
      }
      if (parseInt(this.ui.score) > 40) {
        this.color = 'white';
        this.rotateSpeed = 0;
      }
      if (parseInt(this.ui.score) > 45) {
        this.rotateSpeed = 59;
      }
      if (parseInt(this.ui.score) > 50 && parseInt(this.ui.score.charAt(3)) % 2 !== 0) {
        this.lineWidth = 1;
        this.player.color = 'black';
      }
      if (parseInt(this.ui.score) > 50 && parseInt(this.ui.score.charAt(3)) % 2 === 0) {
        this.lineWidth = 1;
        this.player.color = 'white';
      }
    }
  }

  escIfLoseFocus() {
    this.gameActive = false;
    cancelAnimationFrame(this.frames);
    this.ctx.clearRect(-300, -300, this.gameCanvas.width + 300, this.gameCanvas.height + 300);
    this.ui.toolsCtx.clearRect(-300, -300, this.toolsCanvas.width + 300, this.toolsCanvas.height + 300);
    this.ui.shouldDrawMainMenu = true;
    this.hitSound.pause();
    this.hitSound.currentTime = 0;
    if (!window.muted) this.menuBgm.play();
    this.bgm.pause();
    this.gameOver = false;
  }

  render(ctx) {

    if (this.gameActive === true) {
      this.makePatterns(ctx);

      if (this.ui.score > 60.0 && window.difficultyLevel !== 1) {
        if (this.rotateSpeed > 60) this.rotateSpeed -= .05;
        if (this.player.ballSpeed < .17) this.player.ballSpeed += .00005;
        this.lineSpeed1 += .001;
        this.lineSpeed2 += .001;
        this.lineLifeTimer -= .02;
      } else if (this.ui.score > 60 && window.difficultyLevel === 1 ) {
        if (this.rotateSpeed > 60) this.rotateSpeed -= .05;
        if (this.player.ballSpeed < .17) this.player.ballSpeed += .00005;
        if (this.lineSpeed1 < 6.2) {
          this.lineSpeed1 += .001;
          this.lineSpeed2 += .001;
          this.lineLifeTimer -= .0321;
        }
      }

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
      this.pulseCenter();

      this.doEvilThingsToFirstStage();
      this.doEvilThingsToSecondStage();
      this.doEvilThingsToThirdStage();

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
      if (parseInt(this.ui.score) >= 60.0 && window.difficultyLevel === 3) {
        this.toolsCtx.drawImage(
          this.gameCompleteScreen,
          this.toolsCanvas.width / 2 - this.gameCompleteScreen.width / 2,
          this.toolsCanvas.height / 2 - this.gameCompleteScreen.height / 2
        );
      } else if (parseInt(this.ui.score) >= 60.0) {
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
