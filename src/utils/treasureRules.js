export const TREASURE_RULES = Object.freeze({
  easy: Object.freeze({
    total: 4,
    areaLabel: "lite område",
    recommendedAreaDiameterMeters: 50,
    areaRadiusMeters: 25,
    sonarForwardVisibilityMeters: 2,
    revealRadiusMeters: 8,
    minimumTreasureDistanceMeters: 8
  }),
  medium: Object.freeze({
    total: 6,
    areaLabel: "middels område",
    recommendedAreaDiameterMeters: 75,
    areaRadiusMeters: 37.5,
    sonarForwardVisibilityMeters: 2.5,
    revealRadiusMeters: 6,
    minimumTreasureDistanceMeters: 12
  }),
  hard: Object.freeze({
    total: 8,
    areaLabel: "stort område",
    recommendedAreaDiameterMeters: 150,
    areaRadiusMeters: 75,
    sonarForwardVisibilityMeters: 3,
    revealRadiusMeters: 5,
    minimumTreasureDistanceMeters: 18
  })
});

export const DEFAULT_TREASURE_DIFFICULTY = "medium";
export const MAX_TREASURE_PLACEMENT_ATTEMPTS = 500;

export function getTreasureRules(difficulty) {
  return TREASURE_RULES[difficulty] || TREASURE_RULES[DEFAULT_TREASURE_DIFFICULTY];
}

export function distanceBetweenCoordinates() {
  return 0;
}

export function generateTreasureCoordinates() {
  return {
    coordinates: [],
    error: "Automatisk GPS-plassering er ikke aktiv i denne flyten."
  };
}
