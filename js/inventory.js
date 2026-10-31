import { DEFAULT_ITEMS } from './data-model.js';
export const shopItems = DEFAULT_ITEMS;
export function purchaseItem(store, item) { const state = store.get(); if (state.player.points < item.price || state.inventory.ownedItemIds.includes(item.id)) return false; store.update((current) => ({ ...current, player: { ...current.player, points: current.player.points - item.price }, inventory: { ...current.inventory, ownedItemIds: [...current.inventory.ownedItemIds, item.id] } })); return true; }
export function equipItem(store, item) { if (!store.get().inventory.ownedItemIds.includes(item.id)) return; store.update((state) => ({ ...state, inventory: { ...state.inventory, equipped: { ...state.inventory.equipped, [item.type]: item.id } } })); }
