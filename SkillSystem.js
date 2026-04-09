const SkillSystem = (() => {
  let skills = [];
  const listeners = [];

  async function init() {
    if (!AppVariant.isHeal) return;
    const res = await fetch('data/skills.json');
    const data = await res.json();
    skills = data.skills;
  }

  return {
    init,
    on: fn => listeners.push(fn),
    unlock(skillId) {
      if (!AppVariant.isHeal) return;
      if (GameState.unlockedSkills.includes(skillId)) return;
      GameState.unlockedSkills.push(skillId);
      const skill = SkillSystem.getSkill(skillId);
      if (skill) listeners.forEach(fn => fn(skill));
      GameManager.save();
    },
    getSkill: id => skills.find(s => s.id === id) ?? null,
    getUnlocked: () => skills.filter(s => GameState.unlockedSkills.includes(s.id)),
    getByCategory: cat => SkillSystem.getUnlocked().filter(s => s.category === cat),
  };
})();
