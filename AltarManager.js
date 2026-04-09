const AltarManager = (() => {
  const listeners = { itemAdded: [], itemRemoved: [], effectTriggered: [] };

  return {
    on(event, fn) { listeners[event]?.push(fn); },
    addItem(id) {
      if (GameState.altarItems.includes(id)) return;
      GameState.altarItems.push(id);
      listeners.itemAdded.forEach(fn => fn(id));
      GameManager.save();
    },
    removeItem(id) {
      const i = GameState.altarItems.indexOf(id);
      if (i < 0) return;
      GameState.altarItems.splice(i, 1);
      listeners.itemRemoved.forEach(fn => fn(id));
      GameManager.save();
    },
    hasItem: id => GameState.altarItems.includes(id),
    applyEffect(effectId) {
      if (!effectId) return;
      listeners.effectTriggered.forEach(fn => fn(effectId));
    },
  };
})();
