import Game from './game.js';

window.leftPressed = false;
window.rightPressed = false;

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

  const game = new Game(
    canvasContext,
    gameCanvas,
    gameCanvas.width,
    gameCanvas.height,
    bgm,
    hitSound
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
        if (game.gameActive === false) {
          game.gameActive = true;
          menuBgm.pause();
          bgm.play();
          game.begin();
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
