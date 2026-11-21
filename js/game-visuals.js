// Reusable, asset-free pixel game visuals. Every shape is CSS-sized in --px units.
const esc = (value = '') => String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[c]));

export function playerSprite(equipped = {}, label = 'Wayfarer') {
  const weapon = equipped.weapon ? `weapon-${equipped.weapon}` : '';
  const armor = equipped.armor || equipped.chest ? 'armor-cloak' : '';
  const helm = equipped.helmet ? 'armor-helm' : '';
  const skin = equipped.skin || equipped.vanity ? 'skin-forest' : '';
  return `<div class="pixel-character player-character ${weapon} ${armor} ${helm} ${skin}" role="img" aria-label="${esc(label)}">
    <span class="character-shadow"></span><span class="character-skin"></span><span class="character-legs"></span>
    <span class="character-armor"></span><span class="character-head"></span><span class="character-weapon"></span>
  </div>`;
}

export function enemySprite(enemy = {}, state = '') {
  const kind = enemy.biome || 'forest';
  return `<div class="pixel-enemy enemy-${kind} ${state ? `enemy-state-${state}` : ''}" role="img" aria-label="${esc(enemy.name || 'Enemy')}">
    <span class="enemy-shadow"></span><span class="enemy-body"></span><span class="enemy-eye enemy-eye-one"></span><span class="enemy-eye enemy-eye-two"></span>
  </div>`;
}

export function weaponVisual(type = 'blade') { return `<span class="pixel-weapon weapon-visual-${type}" aria-hidden="true"></span>`; }
export function armorVisual(type = 'chest') { return `<span class="pixel-armor armor-visual-${type}" aria-hidden="true"></span>`; }
export function potionVisual(type = 'health') { return `<span class="pixel-potion potion-${type}" aria-hidden="true"><i></i></span>`; }

export function biomeScene(biome = 'forest') {
  const name = biome === 'cave' ? 'Inkfall cavern' : biome === 'castle' ? 'Rune Keep' : 'Whispering Woods';
  return `<div class="pixel-biome biome-${biome}" aria-label="${name} battle environment" role="img"><div class="biome-sky"></div><div class="biome-stars"></div><div class="biome-back"></div><div class="biome-mid"></div><div class="biome-front"></div><div class="biome-tiles">${'<i></i>'.repeat(18)}</div></div>`;
}

export function battleEffects(kind = '') {
  return `<div class="battle-effects ${kind ? `effects-${kind}` : ''}" aria-hidden="true">${'<i></i>'.repeat(8)}</div>`;
}

export function stateVisual(state = 'victory') {
  return `<div class="state-visual state-${state}" aria-hidden="true"><span></span><span></span><span></span><span></span><b>${state === 'victory' ? '✦' : '☠'}</b></div>`;
}
