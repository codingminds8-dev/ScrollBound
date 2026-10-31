export const STORAGE_KEY = 'scrollbound-state-v1';

function getStorage() {
  try { return typeof localStorage === 'undefined' ? null : localStorage; }
  catch { return null; }
}

export function loadState() {
  const storage = getStorage();
  if (!storage) return null;
  try {
    const saved = storage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export function saveState(state) {
  const storage = getStorage();
  if (!storage) return false;
  try { storage.setItem(STORAGE_KEY, JSON.stringify(state)); return true; }
  catch { return false; }
}

export function resetState() {
  const storage = getStorage();
  if (!storage) return false;
  try { storage.removeItem(STORAGE_KEY); return true; }
  catch { return false; }
}

// Backward-compatible names for modules that already use the storage layer.
export const readState = (fallback) => ({ ...fallback, ...(loadState() || {}) });
export const writeState = saveState;
export const clearState = resetState;
