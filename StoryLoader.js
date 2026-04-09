const StoryLoader = (() => {
  const cache = {};

  return {
    async loadChapter(routeId, chapterNumber) {
      const num = String(chapterNumber).padStart(2, '0');
      const path = `story/${routeId}/chapter_${num}.json`;
      const res = await fetch(path);
      if (!res.ok) { console.warn('[StoryLoader] Missing:', path); return null; }
      const chapter = await res.json();
      for (const node of chapter.nodes) cache[node.id] = node;
      return chapter;
    },
    getNode: id => cache[id] ?? null,
    clearCache: () => Object.keys(cache).forEach(k => delete cache[k]),
    parseText(raw) {
      return raw
        .replace(/{playerName}/g, GameState.playerName)
        .replace(/{they}/g,       GameState.pronounSubject)
        .replace(/{them}/g,       GameState.pronounObject)
        .replace(/{their}/g,      GameState.pronounPossessive);
    },
  };
})();
