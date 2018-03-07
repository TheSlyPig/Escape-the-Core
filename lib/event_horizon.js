import Game from './game.js';
import Ui from './ui.js';
import * as keypresses from './keypresses.js';

// window variables
window.leftPressed = false;
window.rightPressed = false;
window.difficultyLevel = 1;
window.muted = false;

// default values (stage 1)
let difficultyModifier = 1;
let rotateSpeed = 300;
let lineSpeed1 = 4.1;
let lineSpeed2 = 2.1;
let lineLifeTimer = 108;
let ballSpeed = .088;

// images
const mainMenu = new Image();
mainMenu.src = './assets/images/MainMenu.png';

// audio
const menuBgm = new Audio('./assets/audio/Mangetsu.mp3');
menuBgm.loop = true;

const beginAudio = new Audio('./assets/audio/Begin.mp3');
const gameOverAudio = new Audio('./assets/audio/GameOver.mp3');
const bgm1 = new Audio('./assets/audio/CODABuildingTheme.mp3');
bgm1.loop = true;

const bgm2 = new Audio('./assets/audio/BattleTheme1.mp3');
bgm2.addEventListener('timeupdate', function () {
  var buffer = .454;
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
let bgmStartTimes1 = [0, 30.23, 50.177, 75.77, 126.03];
let bgmStartTimes2 = [0, 32.34, 56.29, 77.65];
let bgmStartTimes3 = [0, 9.9, 29.7, 49.5, 89.07, 108.88];

menuBgm.play();

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

// initialize game when page is loaded
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

  if (localStorage.getItem('userName') !== null) {
    if (document.getElementById("user-name") !== null)
    document.getElementById("user-name").value = localStorage.getItem('userName');
  }

  let r = Math.floor(Math.random() * 150) + 3;
  let g = Math.floor(Math.random() * 150) + 3;
  let b = Math.floor(Math.random() * 150) + 3;
  let r2 = Math.floor(Math.random() * 120) + 120;
  let g2 = Math.floor(Math.random() * 120) + 120;
  let b2 = Math.floor(Math.random() * 120) + 120;

  // setting variables based on difficulty
  const setDifficulty1 = () => {
    window.difficultyLevel = 1;
    difficultyModifier = 1;
    setBgm();
    rotateSpeed = 300;
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

  toolsCanvas.focus();
  canvasContext.save();
  canvasContext.setTransform(1, 0, 0, 1, 0, 0);
  canvasContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  canvasContext.restore();
  gameCanvas.style.backgroundImage = `linear-gradient(to bottom, rgba(${r},${g}, ${b},0.73) 0%,rgba(${r2},${g2}, ${b2},0.73) 100%)`;

  // setup touch listeners
  const touchStart = (e) => {
    e.preventDefault();
    const x = e.touches[0].pageX - e.touches[0].target.offsetLeft;
    const y = e.touches[0].pageY - e.touches[0].target.offsetTop;
    if(ui.shouldDrawMainMenu && y < 250) {
      handleSpace();
    } else if(ui.shouldDrawMainMenu === false && game.gameActive === false && y > 390) {
      handleEscape();
    } else if(ui.shouldDrawMainMenu === false && game.gameActive === false) {
      handleSpace();
    } else if(x > 8 && x < 65 && y > 440 && y < 495) {
      keypresses.handle1(ui, setDifficulty1);
    } else if(x > 66 && x < 129 && y > 440 && y < 495) {
      keypresses.handle2(ui, setDifficulty2);
    } else if(x > 130 && x < 194 && y > 440 && y < 495) {
      keypresses.handle3(ui, setDifficulty3);
    } else if(x < 260) {
      window.leftPressed = true;
      keypresses.handleLeft(ui, setDifficulty1, setDifficulty2);
    } else {
      window.rightPressed = true;
      keypresses.handleRight(ui, setDifficulty2, setDifficulty3);
    }
  }

  const touchEnd = (e) => {
    window.leftPressed = false;
    window.rightPressed = false;
  }

  toolsCanvas.addEventListener('touchstart', function(e) {
     e.preventDefault();
  });

  gameCanvas.addEventListener("touchstart", touchStart, false);
  gameCanvas.addEventListener("touchend", touchEnd, false);
  gameCanvas.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
  });
  toolsCanvas.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
  });

  // handle keypresses
  function checkKeyPressed(event) {
    if (document.activeElement === toolsCanvas || document.activeElement === gameCanvas) {
      switch (event.keyCode) {
        case 27:
          handleEscape();
          break;
        case 32:
          handleSpace();
          break;
        case 37:
          window.leftPressed = true;
          keypresses.handleLeft(ui, setDifficulty1, setDifficulty2);
          break;
        case 39:
          window.rightPressed = true;
          keypresses.handleRight(ui, setDifficulty2, setDifficulty3);
          break;
        case 49:
          keypresses.handle1(ui, setDifficulty1);
          break;
        case 50:
          keypresses.handle2(ui, setDifficulty2);
          break;
        case 51:
          keypresses.handle3(ui, setDifficulty3);
          break;
        case 77:
          keypresses.handleM(game, ui, bgm, menuBgm);
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

  window.addEventListener('keydown', checkKeyPressed, false);
  window.addEventListener('keyup', checkKeyLifted, false);

  function handleEscape() {
    toolsCanvas.focus();
    canvasContext.save();
    canvasContext.setTransform(1, 0, 0, 1, 0, 0);
    canvasContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    canvasContext.restore();
    keypresses.handleEscape(game, gameCanvas, ui, toolsCanvas, bgmStartTimes, bgm, menuBgm);
  }

  function handleSpace() {
    if (game.gameActive === false) {
      if (window.difficultyLevel === 1) setDifficulty1();
      setBgm();
      gameOverAudio.pause();
      beginAudio.pause();
      beginAudio.currentTime = 0;
      if (!window.muted) beginAudio.play();
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
  }


});
