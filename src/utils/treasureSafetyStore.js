let confirmedAt = 0;

const MAX_CONFIRMATION_AGE_MS = 2 * 60 * 1000;

export function confirmTreasureSafety() {
  confirmedAt = Date.now();
}

export function resetTreasureSafety() {
  confirmedAt = 0;
}

export function consumeTreasureSafetyConfirmation() {
  const isFresh = confirmedAt > 0 && Date.now() - confirmedAt <= MAX_CONFIRMATION_AGE_MS;
  confirmedAt = 0;
  return isFresh;
}
