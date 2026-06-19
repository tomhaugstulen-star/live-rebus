import { getTreasureRules } from "./treasureRules";

let session = null;

function normalizeConfig(config = {}) {
  const rules = getTreasureRules(config.difficulty);
  return {
    name: config.name?.trim() || "",
    mode: config.variant === "sonar" ? "sonar" : "fog",
    difficulty: config.difficulty || "medium",
    treasuresTotal: rules.total
  };
}

export function ensureTreasureSession(config = {}) {
  const normalized = normalizeConfig(config);

  if (!session || session.completed || session.mode !== normalized.mode || session.difficulty !== normalized.difficulty) {
    session = {
      ...normalized,
      treasuresFound: 0,
      startedAt: null,
      gameStarted: false,
      completed: false,
      xpAwarded: false
    };
  }

  return getTreasureSession();
}

export function startTreasureSession(config = {}) {
  ensureTreasureSession(config);
  if (!session.gameStarted) {
    session.gameStarted = true;
    session.startedAt = Date.now();
  }
  return getTreasureSession();
}

export function getTreasureSession() {
  if (!session) return null;
  return { ...session, elapsedSeconds: getTreasureElapsedSeconds() };
}

export function registerTreasureSessionFound(config = {}) {
  ensureTreasureSession(config);
  if (!session.gameStarted) return getTreasureSession();

  session.treasuresFound = Math.min(
    session.treasuresFound + 1,
    session.treasuresTotal
  );

  session.completed = session.treasuresFound >= session.treasuresTotal;
  if (session.completed) {
    session.completedAt = session.completedAt || Date.now();
  }

  return getTreasureSession();
}

export function getTreasureElapsedSeconds() {
  if (!session?.gameStarted || !session.startedAt) return 0;
  const end = session.completedAt || Date.now();
  return Math.max(0, Math.floor((end - session.startedAt) / 1000));
}

export function completeTreasureSession() {
  if (!session) return null;
  session.completed = true;
  session.completedAt = session.completedAt || Date.now();
  return getTreasureSession();
}

export function markTreasureXpAwarded() {
  if (!session || session.xpAwarded) return false;
  session.xpAwarded = true;
  return true;
}

export function resetTreasureSession() {
  session = null;
}
