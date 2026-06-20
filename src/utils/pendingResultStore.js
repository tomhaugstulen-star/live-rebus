let pendingResult = null;
let pendingResultPresented = false;

export function setPendingResult(result) {
  pendingResult = result ? { ...result } : null;
  pendingResultPresented = false;
  return getPendingResult();
}

export function getPendingResult() {
  if (pendingResultPresented) return null;
  return pendingResult ? { ...pendingResult } : null;
}

export function markPendingResultPresented() {
  if (!pendingResult) return false;
  pendingResultPresented = true;
  return true;
}

export function clearPendingResult() {
  pendingResult = null;
  pendingResultPresented = false;
}
