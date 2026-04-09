const LoadGame = {
  render() {
    const screen = document.createElement('div');
    screen.className = 'screen';

    let slotsHTML = '';
    for (let i = 0; i < 3; i++) {
      const p = SaveSystem.preview(i);
      const label = p
        ? `Slot ${i+1} — ${p.playerName}<br><small style="font-size:0.75em;color:var(--text-muted)">${p.activeRouteId || '—'} · Ch.${p.currentChapter} · ${p.lastSaved}</small>`
        : `Slot ${i+1} — Empty`;
      slotsHTML += `<button class="btn${p ? '' : ''}" id="slot-${i}" ${p ? '' : 'disabled'}>${label}</button>`;
    }

    screen.innerHTML = `
      ${_ui.starfield()}
      ${_ui.nebula()}
      ${_ui.corners()}
      <div class="content" style="padding: 40px 20px; width: min(480px, 92vw);">
        <h2 class="panel-title">Return to the tower</h2>
        ${_ui.divider()}
        ${slotsHTML}
        <div style="height:8px"></div>
        <button class="btn" id="btn-back">Back</button>
      </div>
    `;

    for (let i = 0; i < 3; i++) {
      const btn = screen.querySelector(`#slot-${i}`);
      if (btn && !btn.disabled) {
        btn.addEventListener('click', () => GameManager.loadGame(i));
      }
    }
    screen.querySelector('#btn-back').addEventListener('click', () => GameManager.showScreen('main-menu'));
    return screen;
  }
};
