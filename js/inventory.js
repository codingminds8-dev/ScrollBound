import { DEFAULT_ITEMS } from './data-model.js';
export const shopItems = DEFAULT_ITEMS;
export function itemPrice(item, level = 1) { return Math.max(1, Math.round(item.price * (1 + Math.max(0, level - 1) * 0.08))); }
export function purchaseItem(store, item) { const state = store.get(); const price = itemPrice(item, state.player.level); if (state.player.points < price || state.inventory.ownedItemIds.includes(item.id)) return false; store.update((current) => ({ ...current, player: { ...current.player, points: current.player.points - price }, inventory: { ...current.inventory, ownedItemIds: [...current.inventory.ownedItemIds, item.id] } })); return true; }
export function equipItem(store, item) { if (!store.get().inventory.ownedItemIds.includes(item.id)) return; store.update((state) => ({ ...state, inventory: { ...state.inventory, equipped: { ...state.inventory.equipped, [item.type]: item.id } } })); }
