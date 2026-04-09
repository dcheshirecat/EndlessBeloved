const SpellSystem = (() => {
  let spells = [];
  const listeners = [];

  async function init() {
    const res = await fetch('data/spells.json');
    const data = await res.json();
    spells = data.spells;
  }

  return {
    init,
    on: fn => listeners.push(fn),
    getSpell: id => spells.find(s => s.id === id) ?? null,
    canCast: spell => spell.ingredients.every(i => AltarManager.hasItem(i)),
    getCastable: () => spells.filter(s => SpellSystem.canCast(s)),
    cast(spellId) {
      const spell = SpellSystem.getSpell(spellId);
      if (!spell || !SpellSystem.canCast(spell)) return false;
      if (!GameState.castSpells.includes(spellId))     GameState.castSpells.push(spellId);
      if (!GameState.unlockedSpells.includes(spellId)) GameState.unlockedSpells.push(spellId);
      AltarManager.applyEffect(spell.altarEffect);
      if (spell.storyEffect) DialogueSystem.advanceTo(spell.storyEffect);
      listeners.forEach(fn => fn(spell));
      GameManager.save();
      return true;
    },
    triggerEffect: effectId => AltarManager.applyEffect(effectId),
  };
})();
