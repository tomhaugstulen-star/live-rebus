import { normalizeText } from "../utils/geo";

const SEARCH_RADIUS_RA_METERS = 1200;
const SEARCH_RADIUS_KARTVERKET_METERS = 1800;

const interestingKartverketTypes = [
  "fjell",
  "ås",
  "haug",
  "innsjø",
  "vann",
  "øy",
  "holme",
  "vik",
  "nes",
  "dal",
  "elv",
  "bekk",
  "foss",
  "tjern",
  "sund",
  "fjord"
];

export async function generateRebusCheckpoints(lat, lon, count) {
  const unique = new Map();
  let attempts = 0;

  while (unique.size < count && attempts < count * 5) {
    attempts += 1;

    const useKartverket = Math.random() < 0.5;
    const post = useKartverket
      ? await fetchKartverketCheckpoint(lat, lon)
      : await fetchRiksantikvarenCheckpoint(lat, lon);

    if (!post) continue;

    const key = `${post.kilde}_${normalizeText(post.navn)}_${Math.round(
      post.latitude * 10000
    )}_${Math.round(post.longitude * 10000)}`;

    if (!unique.has(key)) {
      unique.set(key, post);
    }
  }

  return Array.from(unique.values()).slice(0, count);
}

export async function fetchRiksantikvarenCheckpoint(lat, lon) {
  const params = new URLSearchParams({
    where: "1=1",
    geometry: `${lon},${lat}`,
    geometryType: "esriGeometryPoint",
    inSR: "4326",
    spatialRel: "esriSpatialRelIntersects",
    distance: String(SEARCH_RADIUS_RA_METERS),
    units: "esriSRUnit_Meter",
    outFields: "navn,kulturminneKategori,kulturminneLokalitetArt,OBJECTID",
    returnGeometry: "true",
    outSR: "4326",
    f: "pjson"
  });

  const url =
    `https://kart.ra.no/arcgis/rest/services/Distribusjon/` +
    `Kulturminner20180301/MapServer/7/query?${params.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) return null;

    const json = await response.json();
    if (!json?.features?.length) return null;

    const shuffled = shuffleArray(json.features);

    for (const feature of shuffled) {
      const point = getPointFromArcGISGeometry(feature.geometry);
      if (!point) continue;

      const attr = feature.attributes || {};
      const art = attr.kulturminneLokalitetArt || "kulturminne";
      const navn = attr.navn || "Hemmelig kulturminne";

      return {
        id: `ra_${attr.OBJECTID || Date.now()}_${Math.random().toString(36).slice(2)}`,
        latitude: point.latitude,
        longitude: point.longitude,
        kilde: "Riksantikvaren",
        kategori: attr.kulturminneKategori || "Ukjent kategori",
        art,
        navn,
        question: "Hva slags kulturminne er dette?",
        answer: String(art).toLowerCase()
      };
    }

    return null;
  } catch (error) {
    console.error("RA API-feil:", error);
    return null;
  }
}

export async function fetchKartverketCheckpoint(lat, lon) {
  const url =
    `https://ws.geonorge.no/stedsnavn/v1/punkt` +
    `?nord=${lat}` +
    `&ost=${lon}` +
    `&radius=${SEARCH_RADIUS_KARTVERKET_METERS}` +
    `&koordsys=4326` +
    `&treffPerSide=50` +
    `&side=1`;

  try {
    const response = await fetch(url);
    if (!response.ok) return null;

    const json = await response.json();
    if (!json?.steder?.length) return null;

    const filtered = json.steder.filter((sted) => {
      const type = String(sted.navneobjekttype || "").toLowerCase();
      return interestingKartverketTypes.includes(type);
    });

    const candidates = filtered.length ? filtered : json.steder;
    const shuffled = shuffleArray(candidates);

    for (const place of shuffled) {
      const point = place.representasjonspunkt;
      const latitude = Number(point?.lat ?? point?.nord ?? point?.y);
      const longitude = Number(point?.lon ?? point?.ost ?? point?.["øst"] ?? point?.x);

      if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) continue;

      const art = place.navneobjekttype || "sted";
      const navn = getNameFromKartverketPlace(place);

      return {
        id: `kv_${normalizeText(navn)}_${Date.now()}_${Math.random().toString(36).slice(2)}`,
        latitude,
        longitude,
        kilde: "Kartverket",
        kategori: "stedsnavn",
        art,
        navn,
        question: "Hva slags sted eller terrengformasjon leter du etter?",
        answer: String(art).toLowerCase()
      };
    }

    return null;
  } catch (error) {
    console.error("Kartverket API-feil:", error);
    return null;
  }
}

function getPointFromArcGISGeometry(geometry) {
  const x = Number(geometry?.x);
  const y = Number(geometry?.y);

  if (Number.isFinite(x) && Number.isFinite(y)) {
    return {
      latitude: y,
      longitude: x
    };
  }

  if (Array.isArray(geometry?.rings) && geometry.rings.length > 0) {
    const points = geometry.rings
      .flat()
      .filter(
        (point) =>
          Array.isArray(point) &&
          point.length >= 2 &&
          Number.isFinite(Number(point[0])) &&
          Number.isFinite(Number(point[1]))
      );

    if (!points.length) return null;

    const sum = points.reduce(
      (acc, point) => {
        acc.longitude += Number(point[0]);
        acc.latitude += Number(point[1]);
        return acc;
      },
      {
        latitude: 0,
        longitude: 0
      }
    );

    return {
      latitude: sum.latitude / points.length,
      longitude: sum.longitude / points.length
    };
  }

  return null;
}

function getNameFromKartverketPlace(place) {
  const names = place?.stedsnavn;

  if (Array.isArray(names) && names.length > 0) {
    const approved =
      names.find((name) => name?.skrivemåtestatus === "godkjent") || names[0];

    return approved?.["skrivemåte"] || "Hemmelig sted";
  }

  if (names && typeof names === "object") {
    return names?.["skrivemåte"] || "Hemmelig sted";
  }

  return "Hemmelig sted";
}

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}
