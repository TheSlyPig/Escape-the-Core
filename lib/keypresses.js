const menu = new Audio('./assets/audio/Menu.mp3');
const menuReject = new Audio('./assets/audio/MenuReject.mp3');

export const handleEscape = (game, gameCanvas, ui, toolsCanvas, bgmStartTimes, bgm, menuBgm) => {
  if (game.gameActive === true || game.gameOver === true) {
    if (!window.muted) menuReject.play();
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
}

export const handleLeft = (ui, setDifficulty1, setDifficulty2) => {
  if (ui.shouldDrawMainMenu === true) {
    if (window.difficultyLevel === 3) {
      if (!window.muted) menu.play();
      setDifficulty2();
    } else if (window.difficultyLevel === 2) {
      if (!window.muted) menu.play();
      setDifficulty1();
    }
  }
}

export const handleRight = (ui, setDifficulty2, setDifficulty3) => {
  if (ui.shouldDrawMainMenu === true) {
    if (window.difficultyLevel === 1) {
      ui.stage1Victory = localStorage.getItem('stage1Victory');
      if (ui.stage1Victory === 'true') {
        if (!window.muted) menu.play();
        setDifficulty2();
      } else {
        if (!window.muted) menuReject.play();
        ui.stage3LockedDisplay = false;
        ui.stage2LockedDisplay = true;
      }
    } else if (window.difficultyLevel === 2) {
      ui.stage2Victory = localStorage.getItem('stage2Victory');
      if (ui.stage2Victory === 'true') {
        if (!window.muted) menu.play();
        setDifficulty3();
      } else {
        if (!window.muted) menuReject.play();
        ui.stage2LockedDisplay = false;
        ui.stage3LockedDisplay = true;
      }
    }
  }
}

export const handle1 = (ui, setDifficulty1) => {
  if (ui.shouldDrawMainMenu === true) {
    if (!window.muted) menu.play();
    setDifficulty1();
  }
}

export const handle2 = (ui, setDifficulty2) => {
  if (ui.shouldDrawMainMenu === true) {
    ui.stage1Victory = localStorage.getItem('stage1Victory');
    if (ui.stage1Victory === 'true') {
      if (!window.muted) menu.play();
      setDifficulty2();
    } else {
      if (!window.muted) menuReject.play();
      ui.stage3LockedDisplay = false;
      ui.stage2LockedDisplay = true;
    }
  }
}

export const handle3 = (ui, setDifficulty3) => {
  if (ui.shouldDrawMainMenu === true) {
    ui.stage2Victory = localStorage.getItem('stage2Victory');
    if (ui.stage2Victory === 'true') {
      if (!window.muted) menu.play();
      setDifficulty3();
    } else {
      if (!window.muted) menuReject.play();
      ui.stage2LockedDisplay = false;
      ui.stage3LockedDisplay = true;
    }
  }
}

export const handleM = (game, ui, bgm, menuBgm) => {
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
