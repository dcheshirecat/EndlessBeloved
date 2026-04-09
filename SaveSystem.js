const SaveSystem = (() => {
  const SLOT_COUNT = 3;
  const key = slot => `eb_save_slot_${slot}`;

  return {
    save(slot) {
      if (slot < 0 || slot >= SLOT_COUNT) return;
      GameState.lastSaved = new Date().toLocaleString();
      localStorage.setItem(key(slot), JSON.stringify(GameState.toJSON()));
    },
    load(slot) {
      const raw = localStorage.getItem(key(slot));
      if (!raw) return false;
      try { GameState.fromJSON(JSON.parse(raw)); return true; }
      catch(e) { console.warn('[SaveSystem] Failed to load slot', slot, e); return false; }
    },
    exists(slot) { return localStorage.getItem(key(slot)) !== null; },
    delete(slot) { localStorage.removeItem(key(slot)); },
    preview(slot) {
      const raw = localStorage.getItem(key(slot));
      if (!raw) return null;
      try { return JSON.parse(raw); } catch { return null; }
    },
  };
})();
