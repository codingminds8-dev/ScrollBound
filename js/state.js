import { readState, writeState, clearState } from './storage.js';

export const initialState = {
  player: { name: 'Wayfarer', level: 1, xp: 0, points: 0, health: 100 },
  topics: [{ id: 'foundations', title: 'Scrollbound Foundations', description: 'A starter quest for learning the realm.', questions: [{ id: 'q1', prompt: 'What is the best way to begin a quest?', answers: ['Wait forever', 'Take the first step', 'Ignore the map'], correctIndex: 1 }] }],
  story: { unlockedChapter: 1, defeatedEnemies: [] },
  inventory: { owned: [], equipped: { weapon: null, armor: null, skin: null } },
  lastView: 'home'
};

export function createStore() {
  let state = readState(initialState);
  const listeners = new Set();
  return {
    get: () => state,
    update: (changes) => { state = typeof changes === 'function' ? changes(state) : { ...state, ...changes }; writeState(state); listeners.forEach((listener) => listener(state)); return state; },
    subscribe: (listener) => { listeners.add(listener); return () => listeners.delete(listener); },
    reset: () => { clearState(); state = readState(initialState); listeners.forEach((listener) => listener(state)); }
  };
}
