const DialogueSystem = (() => {
  let currentNode = null;
  const listeners = { nodeEnter: [], choicesPresented: [], chapterEnd: [], routeEnd: [] };

  return {
    on(event, fn) { listeners[event]?.push(fn); },

    async startChapter(routeId, chapterNumber) {
      const chapter = await StoryLoader.loadChapter(routeId, chapterNumber);
      if (!chapter) return;
      GameState.activeRouteId  = routeId;
      GameState.currentChapter = chapterNumber;
      this.advanceTo(chapter.start_node_id);
    },

    advanceTo(nodeId) {
      const node = StoryLoader.getNode(nodeId);
      if (!node) { console.warn('[DialogueSystem] Node not found:', nodeId); return; }
      currentNode = node;
      GameState.currentNodeId = nodeId;
      if (!GameState.visitedNodeIds.includes(nodeId))
        GameState.visitedNodeIds.push(nodeId);
      if (node.spell_effect) SpellSystem.triggerEffect(node.spell_effect);
      if (AppVariant.isHeal && node.skill_unlock) SkillSystem.unlock(node.skill_unlock);
      listeners.nodeEnter.forEach(fn => fn(node));
      if (node.choices?.length) listeners.choicesPresented.forEach(fn => fn(node.choices));
    },

    selectChoice(index) {
      const choices = currentNode?.choices ?? [];
      if (index >= choices.length) return;
      const choice = choices[index];
      if (choice.character_id && choice.affinity_change)
        RouteManager.modifyAffinity(choice.character_id, choice.affinity_change);
      this.advanceTo(choice.next_node_id);
    },

    advance() {
      if (!currentNode) return;
      if (currentNode.is_ending) {
        listeners.routeEnd.forEach(fn => fn(currentNode.ending_type ?? 'neutral'));
        return;
      }
      if (currentNode.chapter_end_id) {
        listeners.chapterEnd.forEach(fn => fn(currentNode.chapter_end_id));
        return;
      }
      if (currentNode.auto_next_id) this.advanceTo(currentNode.auto_next_id);
    },
  };
})();
