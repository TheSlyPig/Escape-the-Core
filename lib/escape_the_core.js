import Game from './game.js';
import Ui from './ui.js';

window.leftPressed = false;
window.rightPressed = false;
window.difficultyLevel = 1;
window.muted = false;

let difficultyModifier = 1;
let rotateSpeed = 118;
let lineSpeed1 = 4.1;
let lineSpeed2 = 2.1;
let lineLifeTimer = 108;
let ballSpeed = .088;

let bgmStartTimes1 = [0, 30.23, 50.177, 75.77, 126.03];
let bgmStartTimes2 = [0, 32.34, 56.29, 77.65];
let bgmStartTimes3 = [0, 9.9, 29.7, 49.5, 89.07, 108.88];

const mainMenu = new Image();
mainMenu.src = 'assets/images/MainMenu.png';

const menuBgm = new Audio('./assets/audio/Mangetsu.mp3');
menuBgm.loop = true;

const beginAudio = new Audio('./assets/audio/Begin.mp3');
const gameOverAudio = new Audio('./assets/audio/GameOver.mp3');

menuBgm.play();

const bgm1 = new Audio('./assets/audio/CODABuildingTheme.mp3');
bgm1.loop = true;

const bgm2 = new Audio('./assets/audio/BattleTheme1.mp3');
bgm2.addEventListener('timeupdate', function () {
  var buffer = .412;
  if (this.currentTime > this.duration - buffer) {
    this.currentTime = 2.98;
    this.play();
  }
}, false);

const bgm3 = new Audio('./assets/audio/Xeleuiem.mp3');
bgm3.addEventListener('timeupdate', function () {
  var buffer = .252;
  if (this.currentTime > this.duration - buffer) {
    this.currentTime = 9.9;
    this.play();
  }
}, false);

let bgm;
let bgmStartTimes;

function setBgm() {
  if (window.difficultyLevel === 1) {
    bgm = bgm1;
    bgmStartTimes = bgmStartTimes1;
  } else if (window.difficultyLevel === 2) {
    bgm = bgm2;
    bgmStartTimes = bgmStartTimes2;
  } else {
    bgm = bgm3;
    bgmStartTimes = bgmStartTimes3;
  }
}

setBgm();

const hitSound = new Audio('./assets/audio/hitSound.mp3');

document.addEventListener('DOMContentLoaded', () => {
  const gameCanvas = document.getElementById('game');
  gameCanvas.height = 500;
  gameCanvas.width = 500;
  const canvasContext = gameCanvas.getContext('2d');

  const toolsCanvas = document.getElementById('tools');
  toolsCanvas.height = 616;
  toolsCanvas.width = 616;
  const toolsCanvasContext = toolsCanvas.getContext('2d');

  let ui;

  let game = new Game(
    canvasContext,
    gameCanvas,
    toolsCanvas,
    toolsCanvasContext,
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
  );

  mainMenu.onload = () => {
    ui = new Ui(game, toolsCanvasContext, toolsCanvas, true, mainMenu, bgm);
    ui.render();
    ui.displayHighScores();
  };

  const setDifficulty1 = () => {
    window.difficultyLevel = 1;
    difficultyModifier = 1;
    setBgm();
    rotateSpeed = 160;
    lineSpeed1 = 3.5;
    lineSpeed2 = 1.7;
    lineLifeTimer = 138.7;
    ballSpeed = .088;
    ui.displayHighScores();
  };

  const setDifficulty2 = () => {
    window.difficultyLevel = 2;
    difficultyModifier = 2;
    setBgm();
    rotateSpeed = 106;
    lineSpeed1 = 5.25;
    lineSpeed2 = 3.25;
    lineLifeTimer = 74;
    ballSpeed = .125;
    ui.displayHighScores();
  };

  const setDifficulty3 = () => {
    window.difficultyLevel = 3;
    difficultyModifier = 3;
    setBgm();
    rotateSpeed = 59;
    lineSpeed1 = 6.2;
    lineSpeed2 = 4.2;
    lineLifeTimer = 65;
    ballSpeed = .173;
    ui.displayHighScores();
  };

  window.addEventListener('keydown', checkKeyPressed, false);
  window.addEventListener('keyup', checkKeyLifted, false);
  // window.playerName = prompt('What is your name?');

  function checkKeyPressed(event) {
    switch (event.keyCode) {
      case 27:
        if (game.gameActive === true || game.gameOver === true) {
          game.gameActive = false;
          cancelAnimationFrame(game.frames);
          game.ctx.clearRect(-300, -300, gameCanvas.width + 300, gameCanvas.height + 300);
          ui.toolsCtx.clearRect(-300, -300, toolsCanvas.width + 300, toolsCanvas.height + 300);
          ui.shouldDrawMainMenu = true;
          game.hitSound.pause();
          game.hitSound.currentTime = 0;
          if (!window.muted) menuBgm.play();
          bgm.pause();
          bgm.currentTime = bgmStartTimes[Math.floor(Math.random() * bgmStartTimes.length)];
          game.gameOver = false;
        }

        break;
      case 32:
        if (window.difficultyLevel === 1) setDifficulty1();
        setBgm();
        beginAudio.pause();
        gameOverAudio.pause();
        beginAudio.currentTime = 0;
        if (!window.muted) beginAudio.play();
        if (game.gameActive === false) {
          game.hitSound.pause();
          game.hitSound.currentTime = 0;
          game = new Game(
            canvasContext,
            gameCanvas,
            toolsCanvas,
            toolsCanvasContext,
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
          );
          ui.game = game;
          ui.bgm = bgm;
          ui.shouldDrawMainMenu = false;
          game.gameActive = true;
          game.gameOver = false;
          menuBgm.pause();
          bgm.currentTime = bgmStartTimes[Math.floor(Math.random() * bgmStartTimes.length)];
          if (!window.muted) bgm.play();
          game.begin();
        }

        break;
      case 37:
        window.leftPressed = true;
        if (ui.shouldDrawMainMenu === true) {
          if (window.difficultyLevel === 3) {
            setDifficulty2();
          } else if (window.difficultyLevel === 2) {
            setDifficulty1();
          }
        }

        break;
      case 39:
        window.rightPressed = true;
        if (ui.shouldDrawMainMenu === true) {
          if (window.difficultyLevel === 1) {
            ui.stage1Victory = localStorage.getItem('stage1Victory');
            if (ui.stage1Victory === 'true') {
              setDifficulty2();
            } else {
              ui.stage3LockedDisplay = false;
              ui.stage2LockedDisplay = true;
            }
          } else if (window.difficultyLevel === 2) {
            ui.stage2Victory = localStorage.getItem('stage2Victory');
            if (ui.stage2Victory === 'true') {
              setDifficulty3();
            } else {
              ui.stage2LockedDisplay = false;
              ui.stage3LockedDisplay = true;
            }
          }
        }

        break;
      case 49:
        if (ui.shouldDrawMainMenu === true) {
          setDifficulty1();
        }

        break;
      case 50:
        if (ui.shouldDrawMainMenu === true) {
          ui.stage1Victory = localStorage.getItem('stage1Victory');
          if (ui.stage1Victory === 'true') {
            setDifficulty2();
          } else {
            ui.stage3LockedDisplay = false;
            ui.stage2LockedDisplay = true;
          }
        }

        break;
      case 51:
        if (ui.shouldDrawMainMenu === true) {
          ui.stage2Victory = localStorage.getItem('stage2Victory');
          if (ui.stage2Victory === 'true') {
            setDifficulty3();
          } else {
            ui.stage2LockedDisplay = false;
            ui.stage3LockedDisplay = true;
          }
        }

        break;
      case 77:
        if (game.gameActive === true) {
          if (window.muted) {
            window.muted = false;
            bgm.play();
            ui.muteButtonDisplay = false;
          } else {
            window.muted = true;
            bgm.pause();
            ui.muteButtonDisplay = true;
          }
        } else {
          if (window.muted) {
            window.muted = false;
            menuBgm.play();
            ui.muteButtonDisplay = false;
          } else {
            window.muted = true;
            menuBgm.pause();
            ui.muteButtonDisplay = true;
          }
        }
    }
  }

  function checkKeyLifted(event) {
    switch (event.keyCode) {
      case 37:
        window.leftPressed = false;
        break;
      case 39:
        window.rightPressed = false;
        break;
    }
  }

});
