const RouteManager = (() => {
  let characters = [];

  async function init() {
    const res = await fetch('data/characters.json');
    const data = await res.json();
    characters = data.characters;
  }

  return {
    init,
    getCharacter: id => characters.find(c => c.id === id) ?? null,
    getAll: () => characters,
    getUnlocked: () => characters.filter(c => GameState.unlockedRoutes.includes(c.id)),
    isUnlocked: id => GameState.unlockedRoutes.includes(id),
    unlock(id) {
      if (GameState.unlockedRoutes.includes(id)) return;
      GameState.unlockedRoutes.push(id);
      GameManager.save();
    },
    modifyAffinity(charId, amount) {
      GameState.affinity[charId] = Math.max(-100,
        Math.min(100, (GameState.affinity[charId] ?? 0) + amount));
    },
    getAffinity: charId => GameState.affinity[charId] ?? 0,
    checkUnlocks() {
      const c = GameState.completedRoutes;
      if (c.includes('oracle') && c.includes('angel'))  this.unlock('wanderer');
      if (c.includes('angel')  && c.includes('keeper')) this.unlock('apprentice');
      if (c.length >= 4)                                 this.unlock('weaver');
    },
  };
})();
