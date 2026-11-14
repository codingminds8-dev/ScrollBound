export const DEFAULT_ENEMIES = [
  { id: 'gloom-sprite', name: 'Gloom Sprite', chapter: 1, biome: 'forest', sprite: '☄', maxHealth: 20, attackPower: 5, difficulty: 1, rewardXp: 40, rewardPoints: 20, rewardValue: '40 XP · 20 pts' },
  { id: 'ink-wolf', name: 'Ink Wolf', chapter: 2, biome: 'cave', sprite: '🐺', maxHealth: 35, attackPower: 9, difficulty: 2, rewardXp: 65, rewardPoints: 35, rewardValue: '65 XP · 35 pts' },
  { id: 'rune-knight', name: 'Rune Knight', chapter: 3, biome: 'castle', sprite: '♞', maxHealth: 55, attackPower: 13, difficulty: 3, rewardXp: 100, rewardPoints: 55, rewardValue: '100 XP · 55 pts' }
];

export const DEFAULT_CHAPTERS = [
  { id: 'whispering-woods', number: 1, name: 'The Whispering Woods', enemyId: 'gloom-sprite', unlocked: true },
  { id: 'inkfall-pass', number: 2, name: 'Inkfall Pass', enemyId: 'ink-wolf', unlocked: false },
  { id: 'rune-keep', number: 3, name: 'The Rune Keep', enemyId: 'rune-knight', unlocked: false }
];

export const DEFAULT_ITEMS = [
  { id: 'ember-blade', name: 'Ember Blade', type: 'weapon', price: 40, attackBonus: 3, icon: '⚔' },
  { id: 'star-cloak', name: 'Star Cloak', type: 'armor', price: 60, healthBonus: 15, icon: '✦' },
  { id: 'forest-skin', name: 'Forest Skin', type: 'skin', price: 80, icon: '♞' }
];

export const DEFAULT_TOPIC = {
  id: 'foundations', title: 'Scrollbound Foundations', description: 'A starter quest for learning the realm.',
  questions: [{ id: 'q1', prompt: 'What is the best way to begin a quest?', answers: ['Wait forever', 'Take the first step', 'Ignore the map'], correctIndex: 1 }]
};

export function createDefaultState() {
  return {
    version: 1,
    player: { id: 'player-1', name: 'Wayfarer', level: 1, experience: 0, points: 0, maxHealth: 100, health: 100, attackPower: 10 },
    topics: [structuredCloneSafe(DEFAULT_TOPIC)],
    story: { currentChapter: 1, unlockedChapter: 1, defeatedEnemies: [], chapters: structuredCloneSafe(DEFAULT_CHAPTERS), enemies: structuredCloneSafe(DEFAULT_ENEMIES) },
    inventory: { ownedItemIds: [], equipped: { weapon: null, armor: null, skin: null }, items: structuredCloneSafe(DEFAULT_ITEMS) },
    settings: { soundEnabled: true, reducedMotion: false, onboardingComplete: false },
    lastView: 'home'
  };
}

function structuredCloneSafe(value) { return JSON.parse(JSON.stringify(value)); }

function arrayOr(value, fallback) { return Array.isArray(value) ? value : fallback; }
function numberOr(value, fallback, minimum = 0) { return Number.isFinite(value) && value >= minimum ? value : fallback; }

export function normalizeState(saved) {
  const defaults = createDefaultState();
  const source = saved && typeof saved === 'object' ? saved : {};
  const player = source.player && typeof source.player === 'object' ? source.player : {};
  const story = source.story && typeof source.story === 'object' ? source.story : {};
  const inventory = source.inventory && typeof source.inventory === 'object' ? source.inventory : {};
  const settings = source.settings && typeof source.settings === 'object' ? source.settings : {};
  return {
    version: 1,
    player: { ...defaults.player, ...player, level: numberOr(player.level, defaults.player.level, 1), experience: numberOr(player.experience ?? player.xp, defaults.player.experience), points: numberOr(player.points, defaults.player.points), maxHealth: numberOr(player.maxHealth, defaults.player.maxHealth, 1), health: numberOr(player.health, defaults.player.health), attackPower: numberOr(player.attackPower, defaults.player.attackPower) },
    topics: arrayOr(source.topics, defaults.topics).filter(Boolean).map((topic) => ({ ...topic, id: topic.id || `topic-${Date.now()}`, title: topic.title || 'Untitled topic', description: topic.description || '', questions: arrayOr(topic.questions, []).filter(Boolean).map((question) => ({ ...question, id: question.id || `question-${Date.now()}`, prompt: question.prompt || '', answers: arrayOr(question.answers, []), correctIndex: numberOr(question.correctIndex, 0) })) })),
    story: { ...defaults.story, ...story, currentChapter: numberOr(story.currentChapter, defaults.story.currentChapter, 1), unlockedChapter: numberOr(story.unlockedChapter, defaults.story.unlockedChapter, 1), defeatedEnemies: arrayOr(story.defeatedEnemies, []), chapters: arrayOr(story.chapters, defaults.story.chapters), enemies: arrayOr(story.enemies, defaults.story.enemies).map((enemy, index) => ({ ...defaults.story.enemies[index] || {}, ...enemy, difficulty: numberOr(enemy.difficulty, index + 1, 1), rewardValue: enemy.rewardValue || `${enemy.rewardXp || 0} XP · ${enemy.rewardPoints || 0} pts` })) },
    inventory: { ...defaults.inventory, ...inventory, ownedItemIds: arrayOr(inventory.ownedItemIds ?? inventory.owned, []), equipped: { ...defaults.inventory.equipped, ...(inventory.equipped || {}) }, items: arrayOr(inventory.items, defaults.inventory.items) },
    settings: { ...defaults.settings, ...settings },
    lastView: typeof source.lastView === 'string' ? source.lastView : defaults.lastView
  };
}
