class Ui {
  constructor(game, toolsCtx, toolsCanvas, shouldDrawMainMenu, mainMenu, bgm) {
    this.game = game;
    this.toolsCtx = toolsCtx;
    this.toolsCanvas = toolsCanvas;
    this.score;
    this.highScore1 = 0;
    this.highScore2 = 0;
    this.highScore3 = 0;
    this.shouldDrawMainMenu = shouldDrawMainMenu;
    this.mainMenu = mainMenu;
    this.bgm = bgm;
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
      this.toolsCtx.fillText(hundredths, this.toolsCanvas.width - 365, 39);
      this.toolsCtx.restore();
      this.score = hundredths;
    }
  }

  drawFinalScore() {

    if (window.difficultyLevel === 1) {
      if (this.score > this.highScore1) {
        this.highScore1 = this.score;
      }
    } else if (window.difficultyLevel === 2) {
      if (this.score > this.highScore2) {
        this.highScore2 = this.score;
      }
    } else if (window.difficultyLevel === 3) {
      if (this.score > this.highScore3) {
        this.highScore3 = this.score;
      }
    }

    this.toolsCtx.save();
    this.toolsCtx.beginPath();
    this.toolsCtx.fillStyle = 'white';
    this.toolsCtx.font = '50px Orbitron';
    this.toolsCtx.fillText(this.score, this.toolsCanvas.width - 365, 39);
    this.toolsCtx.restore();
  }

  drawHighScore() {
    if (window.difficultyLevel === 1) {
      if (this.highScore1) {
        this.toolsCtx.save();
        this.toolsCtx.beginPath();
        this.toolsCtx.fillStyle = 'white';
        this.toolsCtx.font = '26px Orbitron';
        this.toolsCtx.globalAlpha = 0.70;
        this.toolsCtx.fillText('Best: ' + this.highScore1, this.toolsCanvas.width - 585, 30);
        this.toolsCtx.restore();
      }
    } else if (window.difficultyLevel === 2) {
      if (this.highScore2) {
        this.toolsCtx.save();
        this.toolsCtx.beginPath();
        this.toolsCtx.fillStyle = 'white';
        this.toolsCtx.font = '26px Orbitron';
        this.toolsCtx.globalAlpha = 0.70;
        this.toolsCtx.fillText('Best: ' + this.highScore2, this.toolsCanvas.width - 585, 30);
        this.toolsCtx.restore();
      }
    } else if (window.difficultyLevel === 3) {
      if (this.highScore3) {
        this.toolsCtx.save();
        this.toolsCtx.beginPath();
        this.toolsCtx.fillStyle = 'white';
        this.toolsCtx.font = '26px Orbitron';
        this.toolsCtx.globalAlpha = 0.70;
        this.toolsCtx.fillText('Best: ' + this.highScore3, this.toolsCanvas.width - 585, 30);
        this.toolsCtx.restore();
      }
    }
  }

  drawMainMenu() {
    this.toolsCtx.drawImage(this.mainMenu,
      this.toolsCanvas.width / 2 - this.mainMenu.width / 2,
      this.toolsCanvas.height / 2 - this.mainMenu.height / 2
    );
    this.drawDifficulty();
  }

  drawDifficulty() {
    this.toolsCtx.beginPath();
    this.toolsCtx.strokeStyle = 'blue';
    this.toolsCtx.lineWidth = 6;
    if (window.difficultyLevel === 1) {
      this.toolsCtx.moveTo(10, this.toolsCanvas.height - 14);
      this.toolsCtx.lineTo(75, this.toolsCanvas.height - 14);
      this.toolsCtx.moveTo(10, this.toolsCanvas.height - 65);
      this.toolsCtx.lineTo(75, this.toolsCanvas.height - 65);
      this.toolsCtx.moveTo(13, this.toolsCanvas.height - 65);
      this.toolsCtx.lineTo(13, this.toolsCanvas.height - 15);
      this.toolsCtx.moveTo(72, this.toolsCanvas.height - 65);
      this.toolsCtx.lineTo(72, this.toolsCanvas.height - 15);
    } else if (window.difficultyLevel === 2) {
      this.toolsCtx.moveTo(85, this.toolsCanvas.height - 14);
      this.toolsCtx.lineTo(150, this.toolsCanvas.height - 14);
      this.toolsCtx.moveTo(85, this.toolsCanvas.height - 65);
      this.toolsCtx.lineTo(150, this.toolsCanvas.height - 65);
      this.toolsCtx.moveTo(88, this.toolsCanvas.height - 65);
      this.toolsCtx.lineTo(88, this.toolsCanvas.height - 15);
      this.toolsCtx.moveTo(147, this.toolsCanvas.height - 65);
      this.toolsCtx.lineTo(147, this.toolsCanvas.height - 15);
    } else if (window.difficultyLevel === 3) {
      this.toolsCtx.moveTo(161, this.toolsCanvas.height - 14);
      this.toolsCtx.lineTo(227, this.toolsCanvas.height - 14);
      this.toolsCtx.moveTo(161, this.toolsCanvas.height - 65);
      this.toolsCtx.lineTo(227, this.toolsCanvas.height - 65);
      this.toolsCtx.moveTo(164, this.toolsCanvas.height - 65);
      this.toolsCtx.lineTo(164, this.toolsCanvas.height - 15);
      this.toolsCtx.moveTo(224, this.toolsCanvas.height - 65);
      this.toolsCtx.lineTo(224, this.toolsCanvas.height - 15);
    }

    this.toolsCtx.closePath();
    this.toolsCtx.stroke();
  }

  render() {
    const animateCallback = () => {
      this.toolsCtx.clearRect(0, 0, this.toolsCanvas.width, this.toolsCanvas.height);
      this.shouldDrawMainMenu === true ? this.drawMainMenu() : null;
      this.game.gameOver === false ? this.drawElapsedTime() : this.drawFinalScore();
      if (this.highScore1 > 0 || this.highScore2 > 0 || this.highScore3 > 0) this.drawHighScore();

      // this.toolsCtx.fillStyle = 'white';
      // this.toolsCtx.fillText(this.bgm.currentTime, 185, 400);

      this.frames = requestAnimationFrame(animateCallback);
    };

    animateCallback();

  }
}

export default Ui;
