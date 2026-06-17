export const TREASURE_XP_RULES = Object.freeze({
  easy: Object.freeze({ completionXp: 60, xpPerTreasure: 10, normalMaxXp: 100 }),
  medium: Object.freeze({ completionXp: 120, xpPerTreasure: 12, normalMaxXp: 216 }),
  hard: Object.freeze({ completionXp: 220, xpPerTreasure: 15, normalMaxXp: 400 })
});

export const WINNER_BONUS_XP = 25;
export const SHARED_WINNER_BONUS_XP = 15;
export const MAX_LEVEL = 30;

export const LEVEL_REWARDS = Object.freeze({
  5: Object.freeze({ type: "title", value: "Skattejeger" }),
  10: Object.freeze({ type: "title", value: "Oppdager" }),
  15: Object.freeze({ type: "badge", value: "Sonarsøker" }),
  20: Object.freeze({ type: "title", value: "Mestersøker" }),
  25: Object.freeze({ type: "badge", value: "Elitesøker" }),
  30: Object.freeze({ type: "title", value: "Legendarisk skattejeger" })
});

const XP_TO_NEXT_LEVEL = Object.freeze({
  1: 200,
  2: 300,
  3: 400,
  4: 500,
  5: 650,
  6: 800,
  7: 1000,
  8: 1250,
  9: 1500
});

export function getTreasureXpRule(difficulty = "medium") {
  return TREASURE_XP_RULES[difficulty] || TREASURE_XP_RULES.medium;
}

export function calculateTreasureXp({
  difficulty = "medium",
  treasuresFound = 0,
  completed = false,
  winner = false,
  sharedWinner = false
} = {}) {
  const rule = getTreasureXpRule(difficulty);
  const safeFoundCount = Math.max(0, Math.floor(Number(treasuresFound) || 0));
  const treasureXp = safeFoundCount * rule.xpPerTreasure;
  const completionXp = completed ? rule.completionXp : 0;
  const winnerBonusXp = sharedWinner
    ? SHARED_WINNER_BONUS_XP
    : winner
      ? WINNER_BONUS_XP
      : 0;

  return {
    treasureXp,
    completionXp,
    winnerBonusXp,
    totalXp: treasureXp + completionXp + winnerBonusXp,
    normalMaxXp: rule.normalMaxXp
  };
}

export function getXpRequiredForNextLevel(level) {
  const safeLevel = Math.max(1, Math.floor(Number(level) || 1));

  if (safeLevel >= MAX_LEVEL) return 0;
  if (XP_TO_NEXT_LEVEL[safeLevel]) return XP_TO_NEXT_LEVEL[safeLevel];

  return 100 * safeLevel + 500;
}

export function getTotalXpRequiredForLevel(level) {
  const targetLevel = Math.min(
    MAX_LEVEL,
    Math.max(1, Math.floor(Number(level) || 1))
  );

  let total = 0;
  for (let currentLevel = 1; currentLevel < targetLevel; currentLevel += 1) {
    total += getXpRequiredForNextLevel(currentLevel);
  }

  return total;
}

export function getLevelProgress(totalXp) {
  const safeTotalXp = Math.max(0, Math.floor(Number(totalXp) || 0));
  let level = 1;
  let xpAtLevelStart = 0;

  while (level < MAX_LEVEL) {
    const required = getXpRequiredForNextLevel(level);
    if (safeTotalXp < xpAtLevelStart + required) break;
    xpAtLevelStart += required;
    level += 1;
  }

  const xpIntoLevel = safeTotalXp - xpAtLevelStart;
  const xpToNextLevel = getXpRequiredForNextLevel(level);

  return {
    level,
    totalXp: safeTotalXp,
    xpIntoLevel,
    xpToNextLevel,
    xpRemaining: level >= MAX_LEVEL ? 0 : Math.max(0, xpToNextLevel - xpIntoLevel),
    progress: level >= MAX_LEVEL || xpToNextLevel === 0
      ? 1
      : Math.min(1, xpIntoLevel / xpToNextLevel),
    reward: LEVEL_REWARDS[level] || null
  };
}
