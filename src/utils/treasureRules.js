export const TREASURE_RULES = Object.freeze({
  easy: Object.freeze({
    total: 4,
    areaLabel: "lite område",
    recommendedAreaDiameterMeters: 50,
    areaRadiusMeters: 25,
    revealRadiusMeters: 8,
    minimumTreasureDistanceMeters: 8
  }),
  medium: Object.freeze({
    total: 8,
    areaLabel: "middels område",
    recommendedAreaDiameterMeters: 80,
    areaRadiusMeters: 40,
    revealRadiusMeters: 6,
    minimumTreasureDistanceMeters: 12
  }),
  hard: Object.freeze({
    total: 12,
    areaLabel: "stort område",
    recommendedAreaDiameterMeters: 150,
    areaRadiusMeters: 75,
    revealRadiusMeters: 5,
    minimumTreasureDistanceMeters: 18
  })
});

export const DEFAULT_TREASURE_DIFFICULTY = "medium";
export const MAX_TREASURE_PLACEMENT_ATTEMPTS = 500;

const EARTH_RADIUS_METERS = 6371000;

export function getTreasureRules(difficulty) {
  return TREASURE_RULES[difficulty] || TREASURE_RULES[DEFAULT_TREASURE_DIFFICULTY];
}

export function distanceBetweenCoordinates(a, b) {
  const latitude1 = toRadians(a.latitude);
  const latitude2 = toRadians(b.latitude);
  const latitudeDelta = toRadians(b.latitude - a.latitude);
  const longitudeDelta = toRadians(b.longitude - a.longitude);

  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(latitude1) *
      Math.cos(latitude2) *
      Math.sin(longitudeDelta / 2) ** 2;

  return 2 * EARTH_RADIUS_METERS * Math.asin(Math.sqrt(haversine));
}

export function generateTreasureCoordinates({
  center,
  difficulty = DEFAULT_TREASURE_DIFFICULTY,
  random = Math.random,
  maxAttempts = MAX_TREASURE_PLACEMENT_ATTEMPTS
}) {
  if (!isValidCoordinate(center)) {
    return {
      coordinates: [],
      error: "Startposisjonen er ugyldig. Kontroller posisjonstilgangen og prøv igjen."
    };
  }

  const rules = getTreasureRules(difficulty);
  const coordinates = [];
  let attempts = 0;

  while (coordinates.length < rules.total && attempts < maxAttempts) {
    attempts += 1;

    // Square root gives an even distribution across the circular area.
    const distance = Math.sqrt(random()) * rules.areaRadiusMeters;
    const bearing = random() * 360;
    const candidate = coordinateAtDistance(center, distance, bearing);

    const hasRequiredSpacing = coordinates.every(
      (coordinate) =>
        distanceBetweenCoordinates(coordinate, candidate) >=
        rules.minimumTreasureDistanceMeters
    );

    if (hasRequiredSpacing) {
      coordinates.push({
        id: `treasure-${coordinates.length + 1}`,
        latitude: candidate.latitude,
        longitude: candidate.longitude,
        found: false
      });
    }
  }

  if (coordinates.length !== rules.total) {
    return {
      coordinates: [],
      error:
        "Vi klarte ikke å plassere alle skattene i det valgte området. Velg et større område eller prøv igjen."
    };
  }

  return { coordinates, error: null };
}

function coordinateAtDistance(center, distanceMeters, bearingDegrees) {
  const angularDistance = distanceMeters / EARTH_RADIUS_METERS;
  const bearing = toRadians(bearingDegrees);
  const latitude1 = toRadians(center.latitude);
  const longitude1 = toRadians(center.longitude);

  const latitude2 = Math.asin(
    Math.sin(latitude1) * Math.cos(angularDistance) +
      Math.cos(latitude1) * Math.sin(angularDistance) * Math.cos(bearing)
  );

  const longitude2 =
    longitude1 +
    Math.atan2(
      Math.sin(bearing) * Math.sin(angularDistance) * Math.cos(latitude1),
      Math.cos(angularDistance) - Math.sin(latitude1) * Math.sin(latitude2)
    );

  return {
    latitude: toDegrees(latitude2),
    longitude: normalizeLongitude(toDegrees(longitude2))
  };
}

function isValidCoordinate(coordinate) {
  return (
    Number.isFinite(coordinate?.latitude) &&
    coordinate.latitude >= -90 &&
    coordinate.latitude <= 90 &&
    Number.isFinite(coordinate?.longitude) &&
    coordinate.longitude >= -180 &&
    coordinate.longitude <= 180
  );
}

function normalizeLongitude(longitude) {
  return ((longitude + 540) % 360) - 180;
}

function toRadians(value) {
  return (value * Math.PI) / 180;
}

function toDegrees(value) {
  return (value * 180) / Math.PI;
}
