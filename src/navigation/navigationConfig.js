export const DEFAULT_REBUS_CONFIG = {
  postCount: 7,
  scheduledStartTime: new Date(Date.now() + 15 * 60 * 1000).toISOString()
};

export const DEFAULT_TREASURE_CONFIG = {
  name: "",
  variant: "fog",
  players: "solo",
  difficulty: "medium"
};

export const TREASURE_TOTALS = {
  easy: 4,
  medium: 8,
  hard: 12
};

export function calculateRebusXp(completedCount, wrongAnswers) {
  const baseXp = completedCount * 50;
  const penalty = wrongAnswers * 10;
  return Math.max(0, baseXp - penalty);
}
