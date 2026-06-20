export const DEFAULT_REBUS_CONFIG = {
  postCount: 7,
  scheduledStartTime: new Date(Date.now() + 15 * 60 * 1000).toISOString()
};

export const DEFAULT_TREASURE_CONFIG = {
  variant: "fog",
  players: "solo",
  difficulty: "medium"
};

export const TREASURE_TOTALS = {
  easy: 4,
  medium: 6,
  hard: 8
};

export const TREASURE_DIFFICULTY_AREAS = {
  easy: {
    diameterMeters: 50,
    label: "Små områder",
    description: "Uteplasser, bakgårder og små nærområder."
  },
  medium: {
    diameterMeters: 75,
    label: "Mellomstore områder",
    description: "Skolegårder, lekeplasser og åpne fellesområder."
  },
  hard: {
    diameterMeters: 150,
    label: "Store områder",
    description: "Parker, skogsområder og større uteområder."
  }
};

export function calculateRebusXp(completedCount, wrongAnswers) {
  const baseXp = completedCount * 50;
  const penalty = wrongAnswers * 10;
  return Math.max(0, baseXp - penalty);
}
