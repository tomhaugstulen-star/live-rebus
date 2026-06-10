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

export function sortNearestNeighbor(startLat, startLon, checkpoints) {
  const remaining = [...checkpoints];
  const ordered = [];
  let currentLat = startLat;
  let currentLon = startLon;

  while (remaining.length) {
    remaining.sort((a, b) => {
      const distA = distanceMeters(currentLat, currentLon, a.latitude, a.longitude);
      const distB = distanceMeters(currentLat, currentLon, b.latitude, b.longitude);
      return distA - distB;
    });

    const next = remaining.shift();
    ordered.push(next);
    currentLat = next.latitude;
    currentLon = next.longitude;
  }

  return ordered;
}

export function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${minutes} min ${String(rest).padStart(2, "0")} sek`;
}

export function formatDateTime(isoString) {
  try {
    return new Intl.DateTimeFormat("nb-NO", {
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

export function toRadians(value) {
  return (value * Math.PI) / 180;
}
