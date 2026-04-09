const RouteSelect = {
  render() {
    const screen = document.createElement('div');
    screen.className = 'screen';

    const characters = RouteManager.getAll();
    let cardsHTML = '';
    for (const c of characters) {
      const unlocked = RouteManager.isUnlocked(c.id);
      cardsHTML += `
        <div class="route-card ${unlocked ? '' : 'locked'}" data-id="${c.id}">
          <div class="route-name">${c.displayName}</div>
          <div class="route-theme">${c.theme}</div>
          <span class="route-badge">${unlocked ? 'Available' : 'Locked'}</span>
        </div>`;
    }

    screen.innerHTML = `
      ${_ui.starfield()}
      ${_ui.nebula()}
      ${_ui.corners()}
      <div class="content" style="padding: 40px 20px; width: min(520px, 94vw);">
        <h2 class="panel-title">Choose your path</h2>
        <p class="subtitle">Who calls to you?</p>
        ${_ui.divider()}
        <div class="route-grid">${cardsHTML}</div>
        <div style="height:20px"></div>
        <button class="btn" id="btn-back">Back</button>
      </div>
    `;

    screen.querySelectorAll('.route-card:not(.locked)').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.id;
        GameState.activeRouteId = id;
        GameManager.showScreen('game');
      });
    });
    screen.querySelector('#btn-back').addEventListener('click', () => GameManager.showScreen('main-menu'));
    return screen;
  }
};
