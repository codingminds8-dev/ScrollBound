import { createStore } from './state.js';
import { createRouter } from './navigation.js';

const store = createStore();
const navigate = createRouter(store);
document.querySelectorAll('[data-route]').forEach((el) => el.addEventListener('click', () => navigate(el.dataset.route)));
window.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !document.querySelector('#app-view').hidden) navigate('home'); });
navigate(location.hash.slice(1) || 'home', false);
