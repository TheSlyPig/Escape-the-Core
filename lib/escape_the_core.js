import Game from './game.js';

window.leftPressed = false;
window.rightPressed = false;

let difficultyModifier = 1;
let rotateSpeed = 118;
let lineSpeed1 = 4.1;
let lineSpeed2 = 2.1;
let lineLifeTimer = 108;
let ballSpeed = .088;

const mainMenu = new Image();
mainMenu.src = 'assets/images/MainMenu.png';

const menuBgm = new Audio('./assets/audio/Mangetsu.mp3');
menuBgm.addEventListener('ended', function () {
  this.currentTime = 0;
  this.play();
}, false);

menuBgm.play();

const bgm = new Audio('./assets/audio/Xeleuiem.mp3');
bgm.addEventListener('ended', function () {
  this.currentTime = 0;
  this.play();
}, false);

const hitSound = new Audio('./assets/audio/hitSound.mp3');

document.addEventListener('DOMContentLoaded', () => {
  const gameCanvas = document.getElementById('game');
  gameCanvas.height = 500;
  gameCanvas.width = 500;
  const canvasContext = gameCanvas.getContext('2d');

  const toolsCanvas = document.getElementById('tools');
  toolsCanvas.height = 100;
  toolsCanvas.width = 500;
  const toolsCanvasContext = toolsCanvas.getContext('2d');
  mainMenu.onload = () => {
    canvasContext.drawImage(mainMenu, 0, 0);
  };

  let game = new Game(
    canvasContext,
    gameCanvas,
    toolsCanvas,
    toolsCanvasContext,
    bgm,
    hitSound,
    lineSpeed1,
    lineSpeed2,
    difficultyModifier,
    rotateSpeed,
    lineLifeTimer,
    ballSpeed
  );

  window.addEventListener('keydown', checkKeyPressed, false);
  window.addEventListener('keyup', checkKeyLifted, false);

  function checkKeyPressed(event) {
    switch (event.keyCode) {
      case 37:
        window.leftPressed = true;
        break;
      case 39:
        window.rightPressed = true;
        break;
      case 32:
        game = new Game(
          canvasContext,
          gameCanvas,
          toolsCanvas,
          toolsCanvasContext,
          bgm,
          hitSound,
          lineSpeed1,
          lineSpeed2,
          difficultyModifier,
          rotateSpeed,
          lineLifeTimer,
          ballSpeed
        );
        game.gameActive = true;
        menuBgm.pause();
        bgm.play();
        game.begin();

        break;
      case 49:
        if (game.gameActive === false) {
          difficultyModifier = 1;
          rotateSpeed = 118;
          lineSpeed1 = 4.1;
          lineSpeed2 = 2.1;
          lineLifeTimer = 108;
          ballSpeed = .088;
        }

        break;
      case 50:
        if (game.gameActive === false) {
          difficultyModifier = 2;
          rotateSpeed = 75;
          lineSpeed1 = 5.25;
          lineSpeed2 = 3.25;
          lineLifeTimer = 74;
          ballSpeed = .125;
        }

        break;
      case 51:
        if (game.gameActive === false) {
          difficultyModifier = 3;
          rotateSpeed = 55;
          lineSpeed1 = 6.2;
          lineSpeed2 = 4.2;
          lineLifeTimer = 65;
          ballSpeed = .165;
        }

        break;
      case 77:
        if (game.gameActive === true) {
          if (bgm.paused) {
            bgm.play();
          } else {
            bgm.pause();
          }
        } else {
          if (menuBgm.paused) {
            menuBgm.play();
          } else {
            menuBgm.pause();
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
