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
    if (this.difficultyModifier === 1) {
      this.specialLineQuantity = 5;
    } else if (this.difficultyModifier === 2) {
      this.specialLineQuantity = 9;
    } else {
      this.specialLineQuantity = 11;
    }
    this.interval = 0;
    this.interval2 = -(lineLifeTimer / 2);
    this.interval2Offset = 0;
    this.lineSpeed1 = lineSpeed1;
    this.lineSpeed2 = lineSpeed2;
    this.intervalResetFlag = false;
    this.interval2Offset = 0;
    this.lineLifeTimer = lineLifeTimer;

    //colors
    this.r = Math.floor(Math.random() * 250) + 6;
    this.g = Math.floor(Math.random() * 250) + 6;
    this.b = Math.floor(Math.random() * 250) + 6;
    this.color = 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';
    this.colorChangeTimer = 0;

    this.bgrUP = true;
    this.bggUP = true;
    this.bgbUP = true;
    this.bgr2UP = true;
    this.bgg2UP = true;
    this.bgb2UP = true;

    this.currRgb;
    this.backgroundR = Math.floor(Math.random() * 250) + 6;
    this.backgroundG = Math.floor(Math.random() * 250) + 6;
    this.backgroundB = Math.floor(Math.random() * 250) + 6;
    this.backgroundR2 = Math.floor(Math.random() * 250) + 6;
    this.backgroundG2 = Math.floor(Math.random() * 250) + 6;
    this.backgroundB2 = Math.floor(Math.random() * 250) + 6;

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

  colorChangeBackground() {

    if(this.backgroundR > 210) this.bgrUP = false;
    if(this.backgroundR < 1) this.bgrUP = true;
    this.bgrUP === true ? this.backgroundR += (Math.floor(Math.random() * 4) + 1) : this.backgroundR -= (Math.floor(Math.random() * 6) + 1);
    if(this.backgroundG > 210) this.bggUP = false;
    if(this.backgroundG < 1) this.bggUP = true;
    this.bggUP === true ? this.backgroundG += (Math.floor(Math.random() * 4) + 1) : this.backgroundG -= (Math.floor(Math.random() * 6) + 1);
    if(this.backgroundB > 210) this.bgbUP = false;
    if(this.backgroundB < 1) this.bgbUP = true;
    this.bgbUP === true ? this.backgroundB += (Math.floor(Math.random() * 4) + 1) : this.backgroundB -= (Math.floor(Math.random() * 6) + 1);
    if(this.backgroundR2 > 210) this.bgr2UP = false;
    if(this.backgroundR2 < 1) this.bgr2UP = true;
    this.bgr2UP === true ? this.backgroundR2 += (Math.floor(Math.random() * 6) + 1) : this.backgroundR2 -= (Math.floor(Math.random() * 4) + 1);
    if(this.backgroundG2 > 210) this.bgg2UP = false;
    if(this.backgroundG2 < 1) this.bgg2UP = true;
    this.bgg2UP === true ? this.backgroundG2 += (Math.floor(Math.random() * 6) + 1) : this.backgroundG2 -= (Math.floor(Math.random() * 4) + 1);
    if(this.backgroundB2 > 210) this.bgb2UP = false;
    if(this.backgroundB2 < 1) this.bgb2UP = true;
    this.bgb2UP === true ? this.backgroundB2 += (Math.floor(Math.random() * 6) + 1) : this.backgroundB2 -= (Math.floor(Math.random() * 4) + 1);

    this.gameCanvas.style.backgroundImage = `linear-gradient(to bottom, rgba(${this.backgroundR},${this.backgroundG}, ${this.backgroundB},0.73) 0%,rgba(${this.backgroundR2},${this.backgroundG2}, ${this.backgroundB2},0.73) 100%), url('./assets/images/BackgroundBlue.gif')`;

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
    this.currRgb = `rgb(${this.backgroundR + 80}, ${this.backgroundG + 80}, ${this.backgroundB + 80})`;
    if (parseInt(this.ui.score) > 50 && window.difficultyLevel === 3) this.currRgb = 'black';
    let specialLines;
    if (this.specialLineFrequency() === 1) { // They rolled a special shape
      switch (Math.floor(Math.random() * this.specialLineQuantity) + 1) {
        case 1:
          this.specialFlag = true;
          specialLines = [
            new Line(ctx, this.gameCanvas, 1, this.currRgb, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new Line(ctx, this.gameCanvas, 3, this.currRgb, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new Line(ctx, this.gameCanvas, 8, this.currRgb, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
          ];
          break;
        case 2:
          this.specialFlag = true;
          specialLines = [
            new Line(ctx, this.gameCanvas, 1, this.currRgb, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new Line(ctx, this.gameCanvas, 8, this.currRgb, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
          ];
          break;
        case 3:
          this.specialFlag = true;
          specialLines = [
            new Line(ctx, this.gameCanvas, 1, this.currRgb, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new Line(ctx, this.gameCanvas, 2, this.currRgb, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new Line(ctx, this.gameCanvas, 6, this.currRgb, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new Line(ctx, this.gameCanvas, 7, this.currRgb, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
          ];
          break;
        case 4:
          this.specialFlag = true;
          specialLines = [
            new Line(ctx, this.gameCanvas, 1, this.currRgb, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new Line(ctx, this.gameCanvas, 2, this.currRgb, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new Line(ctx, this.gameCanvas, 3, this.currRgb, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new Line(ctx, this.gameCanvas, 5, this.currRgb, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new Line(ctx, this.gameCanvas, 6, this.currRgb, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new Line(ctx, this.gameCanvas, 7, this.currRgb, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
          ];
          break;
        case 5:
          this.specialFlag = true;
          specialLines = [
            new Line(ctx, this.gameCanvas, 1, this.currRgb, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new Line(ctx, this.gameCanvas, 2, this.currRgb, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new Line(ctx, this.gameCanvas, 3, this.currRgb, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new Line(ctx, this.gameCanvas, 7, this.currRgb, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new Line(ctx, this.gameCanvas, 6, this.currRgb, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new Line(ctx, this.gameCanvas, 8, this.currRgb, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
          ];
          break;
        case 6: // Cases 6 and on are rainbow lines
          this.specialFlag = true;
          specialLines = [
            new Line(ctx, this.gameCanvas, 9, this.currRgb, this.lineSpeed1, this.lineSpeed2, this.lineWidth, this),
          ];
          break;
        case 7:
          this.specialFlag = true;
          specialLines = [
            new Line(ctx, this.gameCanvas, 10, this.currRgb, this.lineSpeed1, this.lineSpeed2, this.lineWidth, this),
          ];
          break;
        case 8:
          this.specialFlag = true;
          specialLines = [
            new Line(ctx, this.gameCanvas, 11, this.currRgb, this.lineSpeed1, this.lineSpeed2, this.lineWidth, this),
          ];
          break;
        case 9:
          this.specialFlag = true;
          specialLines = [
            new Line(ctx, this.gameCanvas, 12, this.currRgb, this.lineSpeed1, this.lineSpeed2, this.lineWidth, this),
          ];
          break;
        case 10:
          this.specialFlag = true;
          specialLines = [
            new Line(ctx, this.gameCanvas, 10, this.currRgb, this.lineSpeed1, this.lineSpeed2, this.lineWidth, this),
            new Line(ctx, this.gameCanvas, 11, this.currRgb, this.lineSpeed1, this.lineSpeed2, this.lineWidth, this),
          ];
          break;
        case 11:
          this.specialFlag = true;
          specialLines = [
            new Line(ctx, this.gameCanvas, 9, this.currRgb, this.lineSpeed1, this.lineSpeed2, this.lineWidth, this),
            new Line(ctx, this.gameCanvas, 12, this.currRgb, this.lineSpeed1, this.lineSpeed2, this.lineWidth, this),
          ];
          break;
      }
    }

    if (specialLines) return specialLines;

    // they didn't roll a special line
    let allDiagLines = [
                new Line(ctx, this.gameCanvas, 1, this.currRgb, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
                new Line(ctx, this.gameCanvas, 2, this.currRgb, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
                new Line(ctx, this.gameCanvas, 3, this.currRgb, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
                new Line(ctx, this.gameCanvas, 4, this.currRgb, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
                ];
    let allLines = [
                new Line(ctx, this.gameCanvas, 5, this.currRgb, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
                new Line(ctx, this.gameCanvas, 6, this.currRgb, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
                new Line(ctx, this.gameCanvas, 7, this.currRgb, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
                new Line(ctx, this.gameCanvas, 8, this.currRgb, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
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
      this.interval2 = 0 - this.interval2Offset;
    } else {
      this.interval2 += 1;
    }
  }

  checkCollision() {
    let circle = [this.player.ball.x, this.player.ball.y];
    let radius = this.player.ball.radius - 3;
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
    if (parseInt(this.ui.score) > 60 && window.difficultyLevel === 1) {
      this.specialLineFrequency = 9;
    }
  }

  doEvilThingsToSecondStage() {
    if (parseInt(this.ui.score) > 30 && window.difficultyLevel === 2) {
      this.rotateSpeed = 80;
    }
  }

  doEvilThingsToThirdStage() {
    if (window.difficultyLevel === 3) {
      if (this.backgroundR > 60) this.bgrUP = false;
      if (this.backgroundG > 60) this.bggUP = false;
      if (this.backgroundB > 60) this.bgbUP = false;
      if (this.backgroundR2 > 60) this.bgr2UP = false;
      if (this.backgroundG2 > 60) this.bgg2UP = false;
      if (this.backgroundB2 > 60) this.bgb2UP = false;
    }
    if (parseInt(this.ui.score) > 10 && window.difficultyLevel === 3) {
      if (parseInt(this.ui.score) > 10 && parseInt(this.ui.score) < 30) {
        this.rotateSpeed = 0;
      }
      if (parseInt(this.ui.score) > 17) {
        this.rotateSpeed = 59;
      }
      if (parseInt(this.ui.score) > 27) {
        this.rotateSpeed = 0;
        this.specialLineFrequency = () => 1;
      }
      if (parseInt(this.ui.score) > 33) {
        this.rotateSpeed = 59;
        this.specialLineFrequency = () => (
          Math.floor(Math.random() * 15 - (5 * (this.difficultyModifier - 1))) + 1
        );
      }
      if (parseInt(this.ui.score) > 40) {
        this.color = 'white';
        this.player.color = 'white';
        this.center.color = 'white';
        this.gameCanvas.style.backgroundImage = 'none';
        this.gameCanvas.style.backgroundColor = 'black';
        this.rotateSpeed = 0;
      }
      if (parseInt(this.ui.score) > 47) {
        this.rotateSpeed = 59;
        this.gameCanvas.style.backgroundImage = `linear-gradient(to bottom, rgba(${this.backgroundR},${this.backgroundG}, ${this.backgroundB},0.73) 0%,rgba(${this.backgroundR2},${this.backgroundG2}, ${this.backgroundB2},0.73) 100%), url('./assets/images/BackgroundBlue.gif')`;
        this.backgroundR += 2;
        this.backgroundG += 2;
        this.backgroundB += 2;
        this.backgroundR2 += 2;
        this.backgroundG2 += 2;
        this.backgroundB2 += 2;
      }
      if (parseInt(this.ui.score) > 50 && parseInt(this.ui.score.charAt(3)) % 2 !== 0) {
        this.lineWidth = 1;
        this.player.color = 'black';
      }
      if (parseInt(this.ui.score) > 50) {
        this.lineWidth = 1;
        this.color = 'black';
        this.player.color = 'white';
        this.backgroundR += 2;
        this.backgroundG += 2;
        this.backgroundB += 2;
        this.backgroundR2 += 2;
        this.backgroundG2 += 2;
        this.backgroundB2 += 2;
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

      if (this.colorChangeTimer > 2) {
        this.colorChangeBackground();
        this.colorChangeTimer = 0;
      } else {
        this.colorChangeTimer += 1;
      }

      this.player.color = `rgb(${this.backgroundR + 70}, ${this.backgroundG + 70}, ${this.backgroundB + 70})`;

      this.makePatterns(ctx);

      if (this.ui.score > 60.0 && window.difficultyLevel !== 1) {
        if (this.rotateSpeed > 60) this.rotateSpeed -= .05;
        if (this.player.ballSpeed < .17) this.player.ballSpeed += .00005;
        this.lineSpeed1 += .001;
        this.lineSpeed2 += .001;
        this.lineLifeTimer -= .02;
      } else if (this.ui.score > 0 && window.difficultyLevel === 1 ) {
        if (this.rotateSpeed > 60) this.rotateSpeed -= .05;
        if (this.player.ballSpeed < .17) this.player.ballSpeed += .00005;
        if (this.lineSpeed1 < 5.5) {
          this.lineSpeed1 += .002;
          this.lineSpeed2 += .002;
          this.lineLifeTimer -= .0638;
        } else {
          if (this.intervalResetFlag === false) {
            this.intervalResetFlag = true;
            this.lines = [];
            this.lines2 = [];
            this.lineSpeed1 = 5.25;
            this.lineSpeed2 = 3.25;
            this.lineLifeTimer = 80;
            this.interval = this.lineLifeTimer;
            this.interval2 = -(this.lineLifeTimer / 2);
            this.specialLineQuantity = 11;
            this.specialLineFrequency = () => (
              Math.floor(Math.random() * 6 ) + 1
            );
            this.backgroundR += 200;
            this.backgroundG += 200;
            this.backgroundB += 200;
            this.backgroundR2 += 200;
            this.backgroundG2 += 200;
            this.backgroundB2 += 200;
          } else {
            if (this.rotateSpeed > 60) this.rotateSpeed -= .05;
            if (this.player.ballSpeed < .17) this.player.ballSpeed += .00005;
            this.lineSpeed1 += .001;
            this.lineSpeed2 += .001;
            this.lineLifeTimer -= .0105;
          }
        }
      }

      this.checkCollision();
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
      ctx.restore();
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
