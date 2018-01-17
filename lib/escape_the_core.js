import Game from './game.js';

window.leftPressed = false;
window.rightPressed = false;

document.addEventListener('DOMContentLoaded', ()=> {
  const gameCanvas = document.getElementById('game');
  gameCanvas.height = 500;
  gameCanvas.width = 500;
  const canvasContext = gameCanvas.getContext('2d');

  const game = new Game(
    canvasContext,
    gameCanvas,
    gameCanvas.width,
    gameCanvas.height,
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
        game.begin();
        break;
      case 84:
        if (snd.paused) {
          snd.play();
        } else {
          snd.pause();
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
