import { createStore } from './state.js';
import { createRouter } from './navigation.js';
import { bindBattleEvents } from './views.js?v=20261114-5';

const store = createStore();
const navigate = createRouter(store);
document.querySelectorAll('[data-route]').forEach((el) => el.addEventListener('click', () => navigate(el.dataset.route)));
window.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !document.querySelector('#app-view').hidden) navigate('home'); });
navigate(location.hash.slice(1) || 'home', false);
bindBattleEvents(store, navigate);
window.addEventListener('keydown', (event) => { if (!/^[1-4]$/.test(event.key) || !document.querySelector('[data-answer-index]')) return; document.querySelector(`[data-answer-index="${Number(event.key) - 1}"]`)?.click(); });
