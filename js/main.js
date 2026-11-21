import { createStore } from './state.js';
import { createRouter } from './navigation.js';
import { bindBattleEvents } from './views.js?v=20261114-6';

const store = createStore();
const navigate = createRouter(store);
const pauseModal = document.querySelector('#pause-modal');
const closePause = () => { if (pauseModal) pauseModal.hidden = true; };
document.querySelectorAll('[data-route]').forEach((el) => el.addEventListener('click', () => { closePause(); navigate(el.dataset.route); }));
document.querySelectorAll('[data-close-pause]').forEach((el) => el.addEventListener('click', closePause));
window.addEventListener('keydown', (event) => { if (event.key !== 'Escape') return; if (pauseModal?.hidden === false) { closePause(); return; } if (!document.querySelector('#app-view').hidden) { pauseModal.hidden = false; pauseModal.querySelector('[data-close-pause]')?.focus(); } });
navigate(location.hash.slice(1) || 'home', false);
bindBattleEvents(store, navigate);
window.addEventListener('keydown', (event) => { if (!/^[1-4]$/.test(event.key) || !document.querySelector('[data-answer-index]')) return; document.querySelector(`[data-answer-index="${Number(event.key) - 1}"]`)?.click(); });
