import db from './db.js'

class Ui {
  constructor(game, toolsCtx, toolsCanvas, shouldDrawMainMenu, mainMenu, bgm, playButton, shouldDrawPlayButton) {

    this.game = game;
    this.toolsCtx = toolsCtx;
    this.toolsCanvas = toolsCanvas;
    this.score;
    this.highScore1 = 0;
    this.highScore2 = 0;
    this.highScore3 = 0;
    this.shouldDrawMainMenu = shouldDrawMainMenu;
    this.shouldDrawPlayButton = shouldDrawPlayButton;
    this.mainMenu = mainMenu;
    this.playButton = playButton;
    this.bgm = bgm;

    this.cover = new Image();
    this.cover.src = './assets/images/Stage2Cover.png';
    this.cover2 = new Image();
    this.cover2.src = './assets/images/Stage2Cover2.png';

    this.feedbackTimeout;

    this.stage2LockedDisplay = false;
    this.muteButtonDisplay = false;

    this.stage1Victory = false;
    this.stage2Victory = false;
    this.stage3Victory = false;

    this.getVictoryStatus();
    this.getStoredHighScores();

  }

  getVictoryStatus() {
    if (localStorage.getItem("stage1Victory") != null) {
      this.stage1Victory = parseInt(localStorage.getItem("stage1Victory"));
    }

    if (localStorage.getItem("stage2Victory") != null) {
      this.stage2Victory = parseInt(localStorage.getItem("stage2Victory"));
    }

    if (localStorage.getItem("stage3Victory") != null) {
      this.stage3Victory = parseInt(localStorage.getItem("stage3Victory"));
    }
  }

  getStoredHighScores() {
    if (localStorage.getItem("highScore1") != null) {
      this.highScore1 = localStorage.getItem("highScore1");
    }

    if (localStorage.getItem("highScore2") != null) {
      this.highScore2 = localStorage.getItem("highScore2");
    }

    if (localStorage.getItem("highScore3") != null) {
      this.highScore3 = localStorage.getItem("highScore3");
    }
  }

  drawElapsedTime() {
    if (this.game.gameActive === true) {
      let elapsed = parseInt((new Date() - this.game.startTime));
      let hundredths = (elapsed / 1000).toFixed(2);
      if (hundredths.length < 2) hundredths = '0' + hundredths;
      this.toolsCtx.save();
      this.toolsCtx.beginPath();
      this.toolsCtx.fillStyle = 'white';
      if (parseInt(hundredths) >= 60.0) this.toolsCtx.fillStyle = 'lightgreen';

      this.toolsCtx.font = '50px Orbitron';

      this.toolsCtx.globalAlpha = 0.50;
      this.toolsCtx.fillText(hundredths, this.toolsCanvas.width - 365, 60);
      this.toolsCtx.restore();
      this.score = hundredths;
    }
  }

  drawFinalScore() {

    if (window.difficultyLevel === 1) {
      if (parseInt(this.score) > parseInt(this.highScore1)) {
        this.highScore1 = this.score;
      }
    } else if (window.difficultyLevel === 2) {
      if (parseInt(this.score) > parseInt(this.highScore2)) {
        this.highScore2 = this.score;
      }
    } else if (window.difficultyLevel === 3) {
      if (parseInt(this.score) > parseInt(this.highScore3)) {
        this.highScore3 = this.score;
      }
    }

    this.toolsCtx.save();
    this.toolsCtx.beginPath();
    this.toolsCtx.fillStyle = 'white';
    this.handleStageCompletion(); // saving to localstorage
    this.toolsCtx.font = '50px Orbitron';
    this.toolsCtx.fillText(this.score, this.toolsCanvas.width - 365, 60);
    this.toolsCtx.restore();
  }

  handleStageCompletion() {
    if (parseInt(this.score) >= 60.0) {
      this.toolsCtx.fillStyle = 'lightgreen';
      if (window.difficultyLevel === 1) {
        localStorage.setItem('stage1Victory', 'true');
      } else if (window.difficultyLevel === 2) {
        localStorage.setItem('stage2Victory', 'true');
      } else if (window.difficultyLevel === 3) {
        localStorage.setItem('stage3Victory', 'true');
      }
    }
  }

  drawHighScore() {
    if (window.difficultyLevel === 1) {
      if (this.highScore1) {
        this.toolsCtx.save();
        this.toolsCtx.beginPath();
        this.toolsCtx.fillStyle = 'white';
        this.toolsCtx.font = '26px Orbitron';
        this.toolsCtx.globalAlpha = 0.70;
        this.toolsCtx.fillText('Best: ' + this.highScore1, this.toolsCanvas.width - 610, 24);
        this.toolsCtx.restore();
      }
    } else if (window.difficultyLevel === 2) {
      if (this.highScore2) {
        this.toolsCtx.save();
        this.toolsCtx.beginPath();
        this.toolsCtx.fillStyle = 'white';
        this.toolsCtx.font = '26px Orbitron';
        this.toolsCtx.globalAlpha = 0.70;
        this.toolsCtx.fillText('Best: ' + this.highScore2, this.toolsCanvas.width - 610, 24);
        this.toolsCtx.restore();
      }
    } else if (window.difficultyLevel === 3) {
      if (this.highScore3) {
        this.toolsCtx.save();
        this.toolsCtx.beginPath();
        this.toolsCtx.fillStyle = 'white';
        this.toolsCtx.font = '26px Orbitron';
        this.toolsCtx.globalAlpha = 0.70;
        this.toolsCtx.fillText('Best: ' + this.highScore3, this.toolsCanvas.width - 610, 24);
        this.toolsCtx.restore();
      }
    }
  }

  drawMainMenu() {
    this.toolsCtx.drawImage(this.mainMenu,
      this.toolsCanvas.width / 2 - this.toolsCanvas.width / 2,
      this.toolsCanvas.height / 2 - this.toolsCanvas.height / 2
    );
    this.drawDifficulty();
  }

  drawPlayButton() {
    this.toolsCtx.drawImage(this.playButton,
      this.toolsCanvas.width / 2 - this.toolsCanvas.width / 2,
      this.toolsCanvas.height / 2 - this.toolsCanvas.height / 2
    );
  }

  drawStage2Cover() {
    this.toolsCtx.drawImage(this.cover,
      this.toolsCanvas.width / 2 - this.toolsCanvas.width / 2,
      this.toolsCanvas.height / 2 - this.toolsCanvas.height / 2
    );
  }

  drawStage2Cover2() {
    this.toolsCtx.drawImage(this.cover2,
      this.toolsCanvas.width / 2 - this.mainMenu.width / 2,
      this.toolsCanvas.height / 2 - this.mainMenu.height / 2
    );
  }

  drawMuteButton() {
    if (this.shouldDrawMainMenu === true && this.shouldDrawPlayButton === false) {
      this.toolsCtx.beginPath();
      this.toolsCtx.strokeStyle = 'red';
      this.toolsCtx.lineWidth = 4;
      this.toolsCtx.moveTo(this.toolsCanvas.width - 181, this.toolsCanvas.height - 13);
      this.toolsCtx.lineTo(this.toolsCanvas.width - 181, this.toolsCanvas.height - 30);
      this.toolsCtx.moveTo(this.toolsCanvas.width - 183, this.toolsCanvas.height - 30);
      this.toolsCtx.lineTo(this.toolsCanvas.width - 156, this.toolsCanvas.height - 30);
      this.toolsCtx.moveTo(this.toolsCanvas.width - 158, this.toolsCanvas.height - 30);
      this.toolsCtx.lineTo(this.toolsCanvas.width - 158, this.toolsCanvas.height - 13);
      this.toolsCtx.moveTo(this.toolsCanvas.width - 169, this.toolsCanvas.height - 30);
      this.toolsCtx.lineTo(this.toolsCanvas.width - 169, this.toolsCanvas.height - 13);
      this.toolsCtx.closePath();
      this.toolsCtx.stroke();
    }
  }

  drawDifficulty() {
    this.toolsCtx.beginPath();
    this.toolsCtx.lineWidth = 6;
    if (window.difficultyLevel === 1) {
      this.toolsCtx.strokeStyle = localStorage.getItem('stage1Victory') == 'true' ? '#00BD21' : 'blue';
      this.toolsCtx.moveTo(10, this.toolsCanvas.height - 15);
      this.toolsCtx.lineTo(75, this.toolsCanvas.height - 15);
      this.toolsCtx.moveTo(10, this.toolsCanvas.height - 65);
      this.toolsCtx.lineTo(75, this.toolsCanvas.height - 65);
      this.toolsCtx.moveTo(13, this.toolsCanvas.height - 65);
      this.toolsCtx.lineTo(13, this.toolsCanvas.height - 15);
      this.toolsCtx.moveTo(72, this.toolsCanvas.height - 65);
      this.toolsCtx.lineTo(72, this.toolsCanvas.height - 15);
    } else if (window.difficultyLevel === 2) {
      this.toolsCtx.strokeStyle = localStorage.getItem('stage2Victory') == 'true' ? '#00BD21' : 'blue';
      this.toolsCtx.moveTo(85, this.toolsCanvas.height - 14);
      this.toolsCtx.lineTo(150, this.toolsCanvas.height - 14);
      this.toolsCtx.moveTo(85, this.toolsCanvas.height - 65);
      this.toolsCtx.lineTo(150, this.toolsCanvas.height - 65);
      this.toolsCtx.moveTo(88, this.toolsCanvas.height - 65);
      this.toolsCtx.lineTo(88, this.toolsCanvas.height - 15);
      this.toolsCtx.moveTo(147, this.toolsCanvas.height - 65);
      this.toolsCtx.lineTo(147, this.toolsCanvas.height - 15);
    } else if (window.difficultyLevel === 3) {
      this.toolsCtx.strokeStyle = localStorage.getItem('stage3Victory') ? '#00BD21' : 'blue';
      this.toolsCtx.moveTo(162, this.toolsCanvas.height - 15);
      this.toolsCtx.lineTo(227, this.toolsCanvas.height - 15);
      this.toolsCtx.moveTo(162, this.toolsCanvas.height - 65);
      this.toolsCtx.lineTo(227, this.toolsCanvas.height - 65);
      this.toolsCtx.moveTo(165, this.toolsCanvas.height - 65);
      this.toolsCtx.lineTo(165, this.toolsCanvas.height - 15);
      this.toolsCtx.moveTo(224, this.toolsCanvas.height - 65);
      this.toolsCtx.lineTo(224, this.toolsCanvas.height - 15);
    }

    this.toolsCtx.closePath();
    this.toolsCtx.stroke();
  }

  stage2Locked() {
    if (this.shouldDrawMainMenu === true) {
      this.toolsCtx.save();
      this.toolsCtx.beginPath();
      this.toolsCtx.fillStyle = 'red';
      this.toolsCtx.font = '22px Orbitron';
      this.toolsCtx.fillText('Unlocked by reaching 60 seconds on Stage 1', 25, this.toolsCanvas.height - 230);
      this.toolsCtx.strokeStyle = 'red';
      this.toolsCtx.moveTo(85, this.toolsCanvas.height - 15);
      this.toolsCtx.lineTo(150, this.toolsCanvas.height - 15);
      this.toolsCtx.moveTo(85, this.toolsCanvas.height - 65);
      this.toolsCtx.lineTo(150, this.toolsCanvas.height - 65);
      this.toolsCtx.moveTo(88, this.toolsCanvas.height - 65);
      this.toolsCtx.lineTo(88, this.toolsCanvas.height - 15);
      this.toolsCtx.moveTo(147, this.toolsCanvas.height - 65);
      this.toolsCtx.lineTo(147, this.toolsCanvas.height - 15);
      this.toolsCtx.closePath();
      this.toolsCtx.stroke();
      this.toolsCtx.restore();
    }
  }

  stage3Locked() {
    if (this.shouldDrawMainMenu === true) {
      this.toolsCtx.save();
      this.toolsCtx.beginPath();
      this.toolsCtx.fillStyle = 'red';
      this.toolsCtx.font = '22px Orbitron';
      this.toolsCtx.fillText('Unlocked by reaching 60 seconds on Stage 2', 25, this.toolsCanvas.height - 230);
      this.toolsCtx.strokeStyle = 'red';
      this.toolsCtx.moveTo(162, this.toolsCanvas.height - 15);
      this.toolsCtx.lineTo(227, this.toolsCanvas.height - 15);
      this.toolsCtx.moveTo(162, this.toolsCanvas.height - 65);
      this.toolsCtx.lineTo(227, this.toolsCanvas.height - 65);
      this.toolsCtx.moveTo(165, this.toolsCanvas.height - 65);
      this.toolsCtx.lineTo(165, this.toolsCanvas.height - 15);
      this.toolsCtx.moveTo(224, this.toolsCanvas.height - 65);
      this.toolsCtx.lineTo(224, this.toolsCanvas.height - 15);
      this.toolsCtx.closePath();
      this.toolsCtx.stroke();
      this.toolsCtx.restore();
    }
  }


  sendHighScores() {
    let newScore = [{
      stage: window.difficultyLevel,
      name: localStorage.getItem('userName'),
      score: this.score,
      invscore: -(this.score)
    }];
    if (parseInt(this.score) > 85 && window.difficultyLevel == 1) {
      db.ref('scores').push(newScore);
    }
    if (parseInt(this.score) > 45 && window.difficultyLevel == 2) {
      db.ref('scores').push(newScore);
    }
    if (parseInt(this.score) > 9 && window.difficultyLevel == 3) {
      db.ref('scores').push(newScore);
    }
    this.displayHighScores();
  }

  setCookies() {
    if (window.difficultyLevel === 1) {
      let storedHighScore = localStorage.getItem('highScore1') == null ? 0 : localStorage.getItem('highScore1');
      if (parseInt(storedHighScore) < parseInt(this.highScore1) || storedHighScore == null) {
        localStorage.setItem('highScore1', this.highScore1);
      }
    }
    if (window.difficultyLevel === 2) {
      let storedHighScore = localStorage.getItem('highScore2') == null ? 0 : localStorage.getItem('highScore2');
      if (parseInt(storedHighScore) < parseInt(this.highScore2) || storedHighScore == null) {
        localStorage.setItem('highScore2', this.highScore2);
      }
    }
    if (window.difficultyLevel === 3) {
      let storedHighScore = localStorage.getItem('highScore3') == null ? 0 : localStorage.getItem('highScore3');
      if (parseInt(storedHighScore) < parseInt(this.highScore3) || storedHighScore == null) {
        localStorage.setItem('highScore3', this.highScore3);
      }
    }
    this.getVictoryStatus();
  }

  displayHighScores() {
    document.getElementById('scores').innerHTML = '';
    document.getElementById('scores').innerHTML += '<h3 class="scores-stage">Stage: ' + window.difficultyLevel + '</h3><br/>';
    let i = 0;
    db.ref('scores').orderByChild('0/invscore').on('child_added', (data) => {
      let childScoreHolder = data.val();
      if (childScoreHolder != undefined) {
        let childScore = childScoreHolder[0];
        if (window.difficultyLevel == childScore.stage && i < 10) {
          document.getElementById('scores').innerHTML += childScore.name + ': ' + childScore.score + '<br/>';
          i += 1;
        }
      }
    })
  }

  displayUsernameFeedback() {
    let nameInput = document.getElementById('user-name');

    nameInput.onkeyup = (e) => {
      document.getElementById("name-feedback").innerHTML = "Saving...";
        clearTimeout(this.feedbackTimeout);
        this.feedbackTimeout = setTimeout(() => {
          document.getElementById("name-feedback").innerHTML = "Saved!";
          let userNameValue = document.getElementById('user-name').value;
          localStorage.setItem('userName', userNameValue);
          document.activeElement.blur();
          this.toolsCanvas.focus();
          setTimeout(() => {
            document.getElementById("name-feedback").innerHTML = "";
          }, 1000);
        }, 1000);

    };
  }

  render() {
    const animateCallback = () => {
      this.toolsCtx.clearRect(0, 0, this.toolsCanvas.width, this.toolsCanvas.height);
      if(this.shouldDrawPlayButton === false){
        this.shouldDrawMainMenu === true ? this.drawMainMenu() : null;
      } else {
        this.drawPlayButton();
      }

      if (this.score > 60 && this.score < 80 && window.difficultyLevel === 2 && this.shouldDrawMainMenu === false) {
        this.drawStage2Cover();
      }
      if (this.score > 80 && window.difficultyLevel === 2 && this.shouldDrawMainMenu === false) {
        this.drawStage2Cover2();
      }

      this.game.gameOver === false ? this.drawElapsedTime() : this.drawFinalScore();
      this.displayUsernameFeedback();
      if (this.highScore1 > 0 || this.highScore2 > 0 || this.highScore3 > 0) this.drawHighScore();

      if (this.stage2LockedDisplay === true) {
        this.stage2Locked();
        setTimeout(() => (this.stage2LockedDisplay = false), 2300);
      }

      if (this.stage3LockedDisplay === true) {
        this.stage3Locked();
        setTimeout(() => (this.stage3LockedDisplay = false), 2300);
      }

      if (this.muteButtonDisplay === true) {
        this.drawMuteButton();
      }

      this.frames = requestAnimationFrame(animateCallback);
    };

    animateCallback();

  }
}

export default Ui;
