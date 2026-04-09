const GameState = {
  playerName:        'Wanderer',
  pronounSubject:    'they',
  pronounObject:     'them',
  pronounPossessive: 'their',
  avatarId:          'default',

  activeRouteId:  '',
  currentChapter: 0,
  currentNodeId:  '',
  visitedNodeIds: [],

  unlockedRoutes:  ['oracle', 'angel', 'keeper'],
  completedRoutes: [],
  affinity:        {},

  altarItems:     [],
  unlockedSpells: [],
  castSpells:     [],
  currentMoonPhase: 'new',

  unlockedSkills: [],
  lastSaved:      '',
  saveVersion:    1,

  reset() {
    this.playerName        = 'Wanderer';
    this.pronounSubject    = 'they';
    this.pronounObject     = 'them';
    this.pronounPossessive = 'their';
    this.avatarId          = 'default';
    this.activeRouteId     = '';
    this.currentChapter    = 0;
    this.currentNodeId     = '';
    this.visitedNodeIds    = [];
    this.unlockedRoutes    = ['oracle', 'angel', 'keeper'];
    this.completedRoutes   = [];
    this.affinity          = {};
    this.altarItems        = [];
    this.unlockedSpells    = [];
    this.castSpells        = [];
    this.currentMoonPhase  = 'new';
    this.unlockedSkills    = [];
    this.lastSaved         = '';
  },

  toJSON() {
    return {
      playerName: this.playerName,
      pronounSubject: this.pronounSubject,
      pronounObject: this.pronounObject,
      pronounPossessive: this.pronounPossessive,
      avatarId: this.avatarId,
      activeRouteId: this.activeRouteId,
      currentChapter: this.currentChapter,
      currentNodeId: this.currentNodeId,
      visitedNodeIds: [...this.visitedNodeIds],
      unlockedRoutes: [...this.unlockedRoutes],
      completedRoutes: [...this.completedRoutes],
      affinity: {...this.affinity},
      altarItems: [...this.altarItems],
      unlockedSpells: [...this.unlockedSpells],
      castSpells: [...this.castSpells],
      currentMoonPhase: this.currentMoonPhase,
      unlockedSkills: [...this.unlockedSkills],
      lastSaved: this.lastSaved,
      saveVersion: this.saveVersion,
    };
  },

  fromJSON(d) {
    this.playerName        = d.playerName        ?? 'Wanderer';
    this.pronounSubject    = d.pronounSubject    ?? 'they';
    this.pronounObject     = d.pronounObject     ?? 'them';
    this.pronounPossessive = d.pronounPossessive ?? 'their';
    this.avatarId          = d.avatarId          ?? 'default';
    this.activeRouteId     = d.activeRouteId     ?? '';
    this.currentChapter    = d.currentChapter    ?? 0;
    this.currentNodeId     = d.currentNodeId     ?? '';
    this.visitedNodeIds    = d.visitedNodeIds    ?? [];
    this.unlockedRoutes    = d.unlockedRoutes    ?? ['oracle','angel','keeper'];
    this.completedRoutes   = d.completedRoutes   ?? [];
    this.affinity          = d.affinity          ?? {};
    this.altarItems        = d.altarItems        ?? [];
    this.unlockedSpells    = d.unlockedSpells    ?? [];
    this.castSpells        = d.castSpells        ?? [];
    this.currentMoonPhase  = d.currentMoonPhase  ?? 'new';
    this.unlockedSkills    = d.unlockedSkills    ?? [];
    this.lastSaved         = d.lastSaved         ?? '';
    this.saveVersion       = d.saveVersion       ?? 1;
  },
};
