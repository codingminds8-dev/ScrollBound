import { awardProgress } from './progression.js';
import { DEFAULT_ENEMIES } from './data-model.js';
export const enemies = DEFAULT_ENEMIES;
export function beginBattle(topic) { return { topic, enemy: enemies[0], enemyHealth: enemies[0].maxHealth, playerHealth: 100, questionIndex: 0 }; }
export function resolveAnswer(store, battle, correct) { if (correct) { battle.enemyHealth = Math.max(0, battle.enemyHealth - 10); if (battle.enemyHealth === 0) { awardProgress(store, battle.enemy.rewardXp, battle.enemy.rewardPoints); return { ...battle, won: true }; } } else battle.playerHealth = Math.max(0, battle.playerHealth - battle.enemy.attackPower); return { ...battle, lost: battle.playerHealth === 0 }; }
