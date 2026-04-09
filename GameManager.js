const GameManager = (() => {
  let activeSaveSlot = 0;

  function showScreen(name) {
    const container = document.getElementById('screen-container');
    // Fade out current
    const current = container.querySelector('.screen.visible');
    if (current) {
      current.classList.remove('visible');
      setTimeout(() => {
        current.remove();
        _mountScreen(name, container);
      }, 400);
    } else {
      _mountScreen(name, container);
    }
  }

  function _mountScreen(name, container) {
    let el;
    switch(name) {
      case 'main-menu':   el = MainMenu.render();   break;
      case 'new-game':    el = NewGame.render();     break;
      case 'load-game':   el = LoadGame.render();    break;
      case 'route-select': el = RouteSelect.render(); break;
      case 'game':        el = Game.render();        break;
      default: console.warn('Unknown screen:', name); return;
    }
    container.appendChild(el);
    requestAnimationFrame(() => el.classList.add('visible'));
  }

  return {
    async init() {
      await RouteManager.init();
      await SpellSystem.init();
      await SkillSystem.init();
      SaveSystem.load(activeSaveSlot);
      showScreen('main-menu');
    },

    showScreen,
    save: () => SaveSystem.save(activeSaveSlot),

    startNewGame(slot, playerName, pronounSubject, pronounObject, pronounPossessive) {
      activeSaveSlot = slot;
      GameState.reset();
      GameState.playerName        = playerName;
      GameState.pronounSubject    = pronounSubject;
      GameState.pronounObject     = pronounObject;
      GameState.pronounPossessive = pronounPossessive;
      SaveSystem.save(slot);
      showScreen('route-select');
    },

    loadGame(slot) {
      if (!SaveSystem.load(slot)) return;
      activeSaveSlot = slot;
      showScreen('game');
    },

    returnToMainMenu() {
      SaveSystem.save(activeSaveSlot);
      showScreen('main-menu');
    },

    quit() { window.close?.(); },
  };
})();
