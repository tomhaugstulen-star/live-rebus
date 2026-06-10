export function distanceMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function bearingText(lat1, lon1, lat2, lon2) {
  const dLon = toRadians(lon2 - lon1);
  const y = Math.sin(dLon) * Math.cos(toRadians(lat2));
  const x =
    Math.cos(toRadians(lat1)) * Math.sin(toRadians(lat2)) -
    Math.sin(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.cos(dLon);

  const bearing = ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;

  const directions = [
    "Nord",
    "Nordøst",
    "Øst",
    "Sørøst",
    "Sør",
    "Sørvest",
    "Vest",
    "Nordvest"
  ];

  return directions[Math.round(bearing / 45) % 8];
}

export function createCircleCoordinates(centerLat, centerLon, radiusMeters, points = 48) {
  const earthRadius = 6371000;
  const coordinates = [];
  const latRad = toRadians(centerLat);
  const lonRad = toRadians(centerLon);
  const angularDistance = radiusMeters / earthRadius;

  for (let i = 0; i < points; i++) {
    const bearing = (2 * Math.PI * i) / points;
    const pointLat = Math.asin(
      Math.sin(latRad) * Math.cos(angularDistance) +
        Math.cos(latRad) * Math.sin(angularDistance) * Math.cos(bearing)
    );

    const pointLon =
      lonRad +
      Math.atan2(
        Math.sin(bearing) * Math.sin(angularDistance) * Math.cos(latRad),
        Math.cos(angularDistance) - Math.sin(latRad) * Math.sin(pointLat)
      );

    coordinates.push({
      latitude: toDegrees(pointLat),
      longitude: toDegrees(pointLon)
    });
  }

  return coordinates;
}

export function createOuterPolygonFromRegion(region, multiplier = 2.4) {
  const latDelta = region.latitudeDelta * multiplier;
  const lonDelta = region.longitudeDelta * multiplier;

  return [
    { latitude: region.latitude + latDelta, longitude: region.longitude - lonDelta },
    { latitude: region.latitude + latDelta, longitude: region.longitude + lonDelta },
    { latitude: region.latitude - latDelta, longitude: region.longitude + lonDelta },
    { latitude: region.latitude - latDelta, longitude: region.longitude - lonDelta }
  ];
}

export function createRandomPointWithinRadius(centerLat, centerLon, maxRadiusMeters, minRadiusMeters = 0) {
  const radius = minRadiusMeters + Math.random() * (maxRadiusMeters - minRadiusMeters);
  const angle = Math.random() * 2 * Math.PI;
  const earthRadius = 6371000;
  const latRad = toRadians(centerLat);
  const lonRad = toRadians(centerLon);
  const angularDistance = radius / earthRadius;

  const pointLat = Math.asin(
    Math.sin(latRad) * Math.cos(angularDistance) +
      Math.cos(latRad) * Math.sin(angularDistance) * Math.cos(angle)
  );

  const pointLon =
    lonRad +
    Math.atan2(
      Math.sin(angle) * Math.sin(angularDistance) * Math.cos(latRad),
      Math.cos(angularDistance) - Math.sin(latRad) * Math.sin(pointLat)
    );

  return {
    latitude: toDegrees(pointLat),
    longitude: toDegrees(pointLon)
  };
}

export function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${minutes} min ${String(rest).padStart(2, "0")} sek`;
}
export function formatDateTime(isoString) {
  
  try {
    return new Intl.DateTime("nb-NO", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit"
    }).format(new Date(isoString));
  } catch {
    return isoString;
  }
}
export function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
export function getSignalLevel(distance) {
  if (distance > 400) return { key: "none", label: "Ingen kontakt", helper: "Utforsk området." };
  if (distance > 200) return { key: "weak", label: "Svakt signal", helper: "Du er i riktig område." };
  if (distance > 100) return { key: "medium", label: "Middels signal", helper: "Du nærmer deg." };
  if (distance > 50) return { key: "strong", label: "Sterkt signal", helper: "Du er nær skatten." };
  return { key: "veryStrong", label: "Veldig sterkt signal", helper: "Skatten er svært nær." };
}

export function buildHintSteps(hunt) {
  const kind =
    hunt?.targetType === "history"
      ? "historiske spor eller markerte kulturminner"
      : "naturlige formasjoner eller markerte punkter";

  return [
    "Utforsk området rundt deg og velg en trygg vei.",
    `Se etter ${kind}.`,
    "Du er svært nær søkeområdet. Se nøye rundt deg."
  ];
}

function toRadians(value) {
  return (value * Math.PI) / 180;
}

function toDegrees(value) {
  return (value * 180) / Math.PI;
}
