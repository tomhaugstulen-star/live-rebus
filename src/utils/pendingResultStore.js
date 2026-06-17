let pendingResult = null;

export function setPendingResult(result) {
  pendingResult = result ? { ...result } : null;
  return getPendingResult();
}

export function getPendingResult() {
  return pendingResult ? { ...pendingResult } : null;
}

export function clearPendingResult() {
  pendingResult = null;
}
