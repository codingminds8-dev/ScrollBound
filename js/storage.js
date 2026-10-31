const STORAGE_KEY = 'scrollbound-state-v1';

export function readState(fallback) {
  try { return { ...fallback, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') }; }
  catch { return { ...fallback }; }
}

export function writeState(state) { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
export function clearState() { localStorage.removeItem(STORAGE_KEY); }
