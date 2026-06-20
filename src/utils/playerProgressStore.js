let totalXp = 0;
const listeners = new Set();

export function getPlayerXp() {
  return totalXp;
}

export function setPlayerXp(value) {
  const nextXp = Math.max(0, Math.floor(Number(value) || 0));
  if (nextXp === totalXp) return totalXp;

  totalXp = nextXp;
  emitChange();
  return totalXp;
}

export function addPlayerXp(value) {
  const earnedXp = Math.max(0, Math.floor(Number(value) || 0));
  if (earnedXp === 0) return totalXp;

  totalXp += earnedXp;
  emitChange();
  return totalXp;
}

export function subscribeToPlayerXp(listener) {
  if (typeof listener !== "function") return () => {};

  listeners.add(listener);
  return () => listeners.delete(listener);
}

function emitChange() {
  listeners.forEach((listener) => listener(totalXp));
}
