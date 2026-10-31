import { loadState, saveState, resetState } from './storage.js';
import { createDefaultState, normalizeState } from './data-model.js';

export const initialState = createDefaultState();

export function loadAppState() { return normalizeState(loadState()); }
export function saveAppState(state) { return saveState(normalizeState(state)); }
export function resetAppState() { resetState(); return createDefaultState(); }

export function createStore() {
  let state = loadAppState();
  const listeners = new Set();
  return {
    get: () => state,
    update: (changes) => { state = normalizeState(typeof changes === 'function' ? changes(state) : { ...state, ...changes }); saveAppState(state); listeners.forEach((listener) => listener(state)); return state; },
    subscribe: (listener) => { listeners.add(listener); return () => listeners.delete(listener); },
    reset: () => { state = resetAppState(); listeners.forEach((listener) => listener(state)); return state; }
  };
}
