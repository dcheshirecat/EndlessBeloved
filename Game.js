const Game = {
  render() {
    const screen = document.createElement('div');
    screen.className = 'screen';
    screen.innerHTML = `
      ${_ui.starfield()}
      ${_ui.nebula()}
      <div class="portrait-area">
        <img id="portrait" class="portrait" src="" alt="" style="display:none;">
      </div>
      <div class="dialogue-box" id="dialogue-box">
        <div class="speaker-name" id="speaker-name"></div>
        <div class="dialogue-text" id="dialogue-text">Loading...</div>
        <div class="choices-container" id="choices"></div>
        <div class="tap-hint" id="tap-hint">tap to continue</div>
      </div>
    `;

    // Wire up dialogue system
    DialogueSystem.on('nodeEnter', node => {
      // Portrait
      const portrait = screen.querySelector('#portrait');
      if (node.portrait_key) {
        portrait.src = `art/characters/${node.portrait_key}.png`;
        portrait.style.display = 'block';
        portrait.onerror = () => portrait.style.display = 'none';
      } else {
        portrait.style.display = 'none';
      }
      // Speaker name
      const char = RouteManager.getCharacter(node.character_id);
      screen.querySelector('#speaker-name').textContent =
        char ? char.displayName : (node.character_id === 'narrator' ? '' : node.character_id);
      // Dialogue text
      screen.querySelector('#dialogue-text').innerHTML =
        StoryLoader.parseText(node.text);
      // Choices
      const choicesEl = screen.querySelector('#choices');
      choicesEl.innerHTML = '';
      const tapHint = screen.querySelector('#tap-hint');
      if (!node.choices?.length) {
        tapHint.style.display = 'block';
      } else {
        tapHint.style.display = 'none';
      }
    });

    DialogueSystem.on('choicesPresented', choices => {
      const choicesEl = screen.querySelector('#choices');
      choicesEl.innerHTML = '';
      choices.forEach((choice, i) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = choice.text;
        btn.addEventListener('click', () => DialogueSystem.selectChoice(i));
        choicesEl.appendChild(btn);
      });
    });

    DialogueSystem.on('chapterEnd', () => {
      screen.querySelector('#dialogue-text').textContent = '— End of Chapter —';
      screen.querySelector('#choices').innerHTML = '';
      screen.querySelector('#tap-hint').style.display = 'none';
      const btn = document.createElement('button');
      btn.className = 'btn primary';
      btn.style.marginTop = '16px';
      btn.textContent = 'Return to menu';
      btn.addEventListener('click', () => GameManager.returnToMainMenu());
      screen.querySelector('#choices').appendChild(btn);
    });

    DialogueSystem.on('routeEnd', endingType => {
      screen.querySelector('#dialogue-text').textContent =
        `— ${endingType.charAt(0).toUpperCase() + endingType.slice(1)} ending —`;
      screen.querySelector('#choices').innerHTML = '';
      const btn = document.createElement('button');
      btn.className = 'btn primary';
      btn.style.marginTop = '16px';
      btn.textContent = 'Return to menu';
      btn.addEventListener('click', () => {
        if (!GameState.completedRoutes.includes(GameState.activeRouteId))
          GameState.completedRoutes.push(GameState.activeRouteId);
        RouteManager.checkUnlocks();
        GameManager.returnToMainMenu();
      });
      screen.querySelector('#choices').appendChild(btn);
    });

    // Tap to advance
    screen.querySelector('#dialogue-box').addEventListener('click', e => {
      if (e.target.classList.contains('choice-btn')) return;
      if (e.target.classList.contains('btn')) return;
      const choices = screen.querySelector('#choices');
      if (!choices.children.length) DialogueSystem.advance();
    });

    // Start the chapter
    DialogueSystem.startChapter(GameState.activeRouteId, GameState.currentChapter || 1);

    return screen;
  }
};
