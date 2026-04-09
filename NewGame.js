const NewGame = {
  render() {
    const screen = document.createElement('div');
    screen.className = 'screen';
    screen.innerHTML = `
      ${_ui.starfield()}
      ${_ui.nebula()}
      ${_ui.corners()}
      <div class="content" style="padding: 40px 20px; width: min(480px, 92vw);">
        <h2 class="panel-title">Who are you?</h2>
        ${_ui.divider()}
        <label class="field-label">Your name</label>
        <input type="text" id="name-input" placeholder="Wanderer" maxlength="30">
        <label class="field-label" style="margin-top:20px;">Your pronouns</label>
        <select id="pronoun-select">
          <option value="0">they / them / their</option>
          <option value="1">she / her / her</option>
          <option value="2">he / him / his</option>
        </select>
        <div style="height:32px"></div>
        <button class="btn primary" id="btn-begin">Begin</button>
        <button class="btn" id="btn-back">Back</button>
      </div>
    `;

    const PRONOUNS = [
      ['they','them','their'],
      ['she','her','her'],
      ['he','him','his'],
    ];

    screen.querySelector('#btn-begin').addEventListener('click', () => {
      const name = screen.querySelector('#name-input').value.trim() || 'Wanderer';
      const idx  = parseInt(screen.querySelector('#pronoun-select').value);
      const p    = PRONOUNS[idx];
      GameManager.startNewGame(0, name, p[0], p[1], p[2]);
    });
    screen.querySelector('#btn-back').addEventListener('click', () => GameManager.showScreen('main-menu'));

    return screen;
  }
};
