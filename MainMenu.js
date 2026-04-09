const MainMenu = {
  render() {
    const screen = document.createElement('div');
    screen.className = 'screen';
    screen.innerHTML = `
      ${_ui.starfield()}
      ${_ui.nebula()}
      ${_ui.corners()}
      <div class="content" style="padding: 40px 0;">
        <p class="ornament">✦ &nbsp; a tale of the beloved &nbsp; ✦</p>
        <h1 class="title">Endless,<br>Beloved</h1>
        <p class="subtitle">the tower awaits</p>
        ${_ui.divider()}
        <button class="btn primary" id="btn-new">New Game</button>
        <button class="btn" id="btn-load">Load Game</button>
        <button class="btn" id="btn-quit">Quit</button>
      </div>
      <span class="version">v0.1 &nbsp;·&nbsp; endless, beloved</span>
    `;

    const anySave = SaveSystem.exists(0) || SaveSystem.exists(1) || SaveSystem.exists(2);
    screen.querySelector('#btn-load').disabled = !anySave;

    screen.querySelector('#btn-new').addEventListener('click',  () => GameManager.showScreen('new-game'));
    screen.querySelector('#btn-load').addEventListener('click', () => GameManager.showScreen('load-game'));
    screen.querySelector('#btn-quit').addEventListener('click',  () => GameManager.quit());

    return screen;
  }
};
