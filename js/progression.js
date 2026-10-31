const XP_PER_LEVEL = 100;
export function awardProgress(store, xp, points) {
  store.update((state) => { const totalXp = state.player.xp + xp; const level = Math.floor(totalXp / XP_PER_LEVEL) + 1; return { ...state, player: { ...state.player, xp: totalXp, level, points: state.player.points + points } }; });
}
export function xpToNextLevel(player) { return XP_PER_LEVEL - (player.xp % XP_PER_LEVEL); }
