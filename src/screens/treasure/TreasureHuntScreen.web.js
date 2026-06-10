import React, { useMemo, useState } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const INITIAL_DISTANCE = 42;
const MIN_DISTANCE = 2;
const MAX_DISTANCE = 80;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getSignalLabel(distance) {
  if (distance <= 5) return "Svært nær";
  if (distance <= 15) return "Sterkt signal";
  if (distance <= 30) return "Middels signal";
  return "Svakt signal";
}

function getPulseLabel(distance) {
  if (distance <= 5) return "Pulsen er svært tett";
  if (distance <= 15) return "Pulsen øker";
  if (distance <= 30) return "Du nærmer deg";
  return "Signal søker";
}

function getSearchHint(distance) {
  if (distance <= 5) return "Skatten er svært nær. Beveg deg rolig og se deg rundt.";
  if (distance <= 15) return "Sterkt signal. Utforsk nærområdet rolig.";
  if (distance <= 30) return "Signal øker. Du nærmer deg.";
  return "Svakt signal. Beveg deg rolig i søkeområdet.";
}

function getCompassLabel(distance) {
  if (distance <= 5) return "Svært nær";
  if (distance <= 20) return "Nærmer deg";
  return "Langt unna";
}

function getSignalPercent(distance) {
  const percent = 100 - (distance / MAX_DISTANCE) * 100;
  return `${clamp(Math.round(percent), 12, 96)}%`;
}

function getSonarSize(distance, baseSize) {
  const distanceFactor = clamp(distance / MAX_DISTANCE, 0, 1);
  return Math.round(baseSize + distanceFactor * 34);
}

function getFogRevealSize(distance) {
  if (distance <= 5) return 154;
  if (distance <= 15) return 128;
  if (distance <= 30) return 106;
  return 84;
}

export default function TreasureHuntScreen({ onBack, onFound }) {
  const [activeMode, setActiveMode] = useState("map");
  const [distance, setDistance] = useState(INITIAL_DISTANCE);
  const [showHint, setShowHint] = useState(false);

  const signalLabel = useMemo(() => getSignalLabel(distance), [distance]);
  const pulseLabel = useMemo(() => getPulseLabel(distance), [distance]);
  const searchHint = useMemo(() => getSearchHint(distance), [distance]);
  const compassLabel = useMemo(() => getCompassLabel(distance), [distance]);
  const signalPercent = useMemo(() => getSignalPercent(distance), [distance]);
  const fogRevealSize = useMemo(() => getFogRevealSize(distance), [distance]);
  const canOpenTreasure = distance <= 5;

  const sonarRings = useMemo(
    () => [
      getSonarSize(distance, 62),
      getSonarSize(distance, 104),
      getSonarSize(distance, 146)
    ],
    [distance]
  );

  const moveCloser = () => {
    setDistance((value) => clamp(value - 12, MIN_DISTANCE, MAX_DISTANCE));
  };

  const moveAway = () => {
    setDistance((value) => clamp(value + 10, MIN_DISTANCE, MAX_DISTANCE));
  };

  const resetDemo = () => {
    setDistance(INITIAL_DISTANCE);
    setShowHint(false);
    setActiveMode("map");
  };

  const renderModeTabs = () => (
    <View style={styles.modeTabs}>
      <TouchableOpacity
        style={[styles.modeTab, activeMode === "map" && styles.modeTabActive]}
        onPress={() => setActiveMode("map")}
      >
        <Text style={[styles.modeTabText, activeMode === "map" && styles.modeTabTextActive]}>Kart</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.modeTab, activeMode === "compass" && styles.modeTabActive]}
        onPress={() => setActiveMode("compass")}
      >
        <Text style={[styles.modeTabText, activeMode === "compass" && styles.modeTabTextActive]}>Kompass</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.modeTab, activeMode === "sonar" && styles.modeTabActive]}
        onPress={() => setActiveMode("sonar")}
      >
        <Text style={[styles.modeTabText, activeMode === "sonar" && styles.modeTabTextActive]}>Sonar</Text>
      </TouchableOpacity>
    </View>
  );

  const renderMapMode = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>KARTMODUS</Text>
      <Text style={styles.cardSubtitle}>Fog of War web-demo</Text>
      <Text style={styles.modeText}>
        På mobil bruker Kartmodus kart med mørk tåke over uutforsket område. Web viser en trygg simulering uten react-native-maps.
      </Text>

      <View style={styles.fogStage}>
        <View style={styles.fogGrid}>
          {Array.from({ length: 30 }).map((_, index) => (
            <View key={index} style={styles.fogCell} />
          ))}
        </View>
        <View
          style={[
            styles.revealCircle,
            {
              width: fogRevealSize,
              height: fogRevealSize,
              borderRadius: fogRevealSize / 2
            }
          ]}
        />
        <View style={styles.playerDot} />
        {canOpenTreasure ? (
          <View style={styles.treasureMarker}>
            <Text style={styles.treasureMarkerText}>✦</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.metric}>{canOpenTreasure ? "Skatten kan skimtes i synlig område." : "Skatten er skjult av tåken."}</Text>
        <Text style={styles.mutedText}>Utforsk området gradvis. Velg alltid en trygg og lovlig vei.</Text>
      </View>
    </View>
  );

  const renderCompassMode = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>KOMPASSMODUS</Text>
      <Text style={styles.cardSubtitle}>Grov veiledning</Text>
      <Text style={styles.modeText}>
        Kompassmodus gir kun en følelse av nærhet. Den viser ikke tåke, sonar, eksakte koordinater eller nøyaktig retning.
      </Text>

      <View style={styles.compassFace}>
        <View style={styles.compassRing}>
          <Text style={styles.compassNeedle}>⌁</Text>
        </View>
      </View>

      <View style={styles.metricGrid}>
        <View style={styles.metricBox}>
          <Text style={styles.metricLabel}>Status</Text>
          <Text style={styles.metricValue}>{compassLabel}</Text>
        </View>
        <View style={styles.metricBox}>
          <Text style={styles.metricLabel}>Presisjon</Text>
          <Text style={styles.metricValue}>Grov</Text>
        </View>
      </View>
    </View>
  );

  const renderSonarMode = () => (
    <>
      <View style={styles.card}>
        <View style={styles.cardHeaderRow}>
          <View>
            <Text style={styles.cardTitle}>SONAR</Text>
            <Text style={styles.cardSubtitle}>Lyd- og signalvisning</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{signalLabel}</Text>
          </View>
        </View>

        <Text style={styles.modeText}>
          Legg mobilen i lomma og følg signalet. Jo sterkere pulsen blir, jo nærmere er du.
        </Text>

        <View style={styles.sonarWrap}>
          <View
            style={[
              styles.pulseRing,
              {
                width: sonarRings[2],
                height: sonarRings[2],
                borderRadius: sonarRings[2] / 2,
                opacity: distance <= 15 ? 0.75 : 0.35
              }
            ]}
          />
          <View
            style={[
              styles.pulseRing,
              styles.pulseRingStrong,
              {
                width: sonarRings[1],
                height: sonarRings[1],
                borderRadius: sonarRings[1] / 2,
                opacity: distance <= 30 ? 0.85 : 0.45
              }
            ]}
          />
          <View
            style={[
              styles.pulseRing,
              styles.pulseRingHot,
              {
                width: sonarRings[0],
                height: sonarRings[0],
                borderRadius: sonarRings[0] / 2,
                opacity: distance <= 5 ? 1 : 0.55
              }
            ]}
          />

          <View style={styles.scanLine} />

          <View style={styles.sonarCenter}>
            <View style={styles.sonarDot} />
          </View>
        </View>

        <View style={styles.metricGrid}>
          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>Signalnivå</Text>
            <Text style={styles.metricValue}>{signalLabel}</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>Puls</Text>
            <Text style={styles.metricValue}>{pulseLabel}</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Signal</Text>
        <View style={styles.signalBar}>
          <View
            style={[
              styles.signalFill,
              { width: signalPercent },
              distance <= 30 && styles.signalFillOn,
              distance <= 15 && styles.signalFillStrong,
              distance <= 5 && styles.signalFillVeryStrong
            ]}
          />
        </View>
        <Text style={styles.metric}>{searchHint}</Text>
        <Text style={styles.mutedText}>Bruk området rundt deg. Velg alltid en trygg og lovlig vei.</Text>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>Tilbake</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.kicker}>Skattejakt</Text>
        <Text style={styles.title}>Finn skatten</Text>
        <Text style={styles.text}>
          Velg kart, kompass eller sonar. Web-testen bruker simulert søk uten kartmotor, GPS eller Fog of War-import.
        </Text>

        {renderModeTabs()}

        {activeMode === "map" ? renderMapMode() : null}
        {activeMode === "compass" ? renderCompassMode() : null}
        {activeMode === "sonar" ? renderSonarMode() : null}

        <View style={styles.actionsCard}>
          <TouchableOpacity style={styles.secondaryButton} onPress={moveCloser}>
            <Text style={styles.secondaryButtonText}>Demo: gå nærmere</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={moveAway}>
            <Text style={styles.secondaryButtonText}>Demo: gå lenger unna</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.ghostButton} onPress={resetDemo}>
            <Text style={styles.ghostButtonText}>Nullstill demo</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => setShowHint((value) => !value)}
        >
          <Text style={styles.secondaryButtonText}>{showHint ? "Skjul hint" : "Vis hint"}</Text>
        </TouchableOpacity>

        {showHint ? (
          <View style={styles.hintBox}>
            <Text style={styles.hintTitle}>Hint</Text>
            <Text style={styles.hintText}>
              Utforsk området rundt deg og velg en trygg vei. Se etter naturlige formasjoner eller markerte punkter.
            </Text>
          </View>
        ) : null}

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => Alert.alert("Kart", "Kartmodus og Fog of War testes på mobil. Web viser trygg testvisning.")}
        >
          <Text style={styles.secondaryButtonText}>Vis kart</Text>
        </TouchableOpacity>

        {!canOpenTreasure ? (
          <Text style={styles.helperText}>Skatten kan åpnes når du er svært nær.</Text>
        ) : (
          <View style={styles.readyBox}>
            <Text style={styles.readyTitle}>Skatten er svært nær</Text>
            <Text style={styles.readyText}>Se deg rolig rundt. Åpne skatten når du har funnet stedet.</Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.primaryButton, !canOpenTreasure && styles.primaryButtonDisabled]}
          onPress={canOpenTreasure ? onFound : undefined}
          disabled={!canOpenTreasure}
        >
          <Text style={[styles.primaryButtonText, !canOpenTreasure && styles.primaryButtonTextDisabled]}>
            Åpne skatt
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0F172A"
  },
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center"
  },
  topRow: {
    alignItems: "flex-start",
    marginBottom: 16
  },
  backButton: {
    minHeight: 44,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: "#1E293B",
    alignItems: "center",
    justifyContent: "center"
  },
  backButtonText: {
    color: "#E2E8F0",
    fontSize: 15,
    fontWeight: "800"
  },
  kicker: {
    color: "#F59E0B",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 8
  },
  title: {
    color: "#E2E8F0",
    fontSize: 30,
    fontWeight: "900",
    marginBottom: 12
  },
  text: {
    color: "#94A3B8",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20
  },
  modeTabs: {
    flexDirection: "row",
    backgroundColor: "#1E293B",
    borderRadius: 18,
    padding: 6,
    marginBottom: 16,
    gap: 6
  },
  modeTab: {
    flex: 1,
    minHeight: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center"
  },
  modeTabActive: {
    backgroundColor: "#F59E0B"
  },
  modeTabText: {
    color: "#94A3B8",
    fontSize: 14,
    fontWeight: "900"
  },
  modeTabTextActive: {
    color: "#111827"
  },
  card: {
    backgroundColor: "#1E293B",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.14)"
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 14
  },
  cardTitle: {
    color: "#F59E0B",
    fontSize: 18,
    fontWeight: "900"
  },
  cardSubtitle: {
    color: "#94A3B8",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 3,
    marginBottom: 12
  },
  modeText: {
    color: "#E2E8F0",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16
  },
  badge: {
    minHeight: 32,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: "rgba(245, 158, 11, 0.16)",
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.35)",
    alignItems: "center",
    justifyContent: "center"
  },
  badgeText: {
    color: "#FDE68A",
    fontSize: 12,
    fontWeight: "900"
  },
  fogStage: {
    height: 230,
    borderRadius: 22,
    backgroundColor: "rgba(15, 23, 42, 0.94)",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 107, 53, 0.24)"
  },
  fogGrid: {
    position: "absolute",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    height: "100%",
    opacity: 0.18
  },
  fogCell: {
    width: "20%",
    height: "16.66%",
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.22)"
  },
  revealCircle: {
    position: "absolute",
    backgroundColor: "rgba(255, 107, 53, 0.14)",
    borderWidth: 2,
    borderColor: "rgba(255, 107, 53, 0.55)"
  },
  playerDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#FF6B35",
    borderWidth: 3,
    borderColor: "#FED7AA",
    zIndex: 2
  },
  treasureMarker: {
    position: "absolute",
    right: 72,
    top: 70,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(245, 158, 11, 0.28)",
    borderWidth: 2,
    borderColor: "rgba(255, 107, 53, 0.95)",
    alignItems: "center",
    justifyContent: "center"
  },
  treasureMarkerText: {
    color: "#FDE68A",
    fontSize: 18,
    fontWeight: "900"
  },
  infoBox: {
    backgroundColor: "#334155",
    borderRadius: 16,
    padding: 14
  },
  compassFace: {
    height: 190,
    borderRadius: 22,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.14)"
  },
  compassRing: {
    width: 132,
    height: 132,
    borderRadius: 66,
    borderWidth: 2,
    borderColor: "rgba(245, 158, 11, 0.6)",
    alignItems: "center",
    justifyContent: "center"
  },
  compassNeedle: {
    color: "#F59E0B",
    fontSize: 42,
    fontWeight: "900"
  },
  sonarWrap: {
    height: 220,
    borderRadius: 22,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.18)"
  },
  sonarCenter: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F59E0B",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3,
    borderWidth: 3,
    borderColor: "rgba(253, 230, 138, 0.7)"
  },
  sonarDot: {
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: "#111827"
  },
  pulseRing: {
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(34, 197, 94, 0.34)"
  },
  pulseRingStrong: {
    borderColor: "rgba(245, 158, 11, 0.48)",
    borderWidth: 2
  },
  pulseRingHot: {
    borderColor: "rgba(34, 197, 94, 0.7)",
    borderWidth: 2
  },
  scanLine: {
    position: "absolute",
    width: 2,
    height: 104,
    backgroundColor: "rgba(34, 197, 94, 0.35)",
    transform: [{ rotate: "42deg" }],
    top: 30,
    zIndex: 1
  },
  metricGrid: {
    flexDirection: "row",
    gap: 12
  },
  metricBox: {
    flex: 1,
    backgroundColor: "#334155",
    borderRadius: 16,
    padding: 14
  },
  metricLabel: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 5
  },
  metricValue: {
    color: "#E2E8F0",
    fontSize: 16,
    fontWeight: "900"
  },
  metric: {
    color: "#E2E8F0",
    fontSize: 16,
    fontWeight: "900",
    lineHeight: 23,
    marginBottom: 8
  },
  mutedText: {
    color: "#94A3B8",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20
  },
  signalBar: {
    height: 16,
    borderRadius: 999,
    backgroundColor: "#334155",
    overflow: "hidden",
    marginTop: 14,
    marginBottom: 12
  },
  signalFill: {
    height: "100%",
    backgroundColor: "#475569"
  },
  signalFillOn: {
    backgroundColor: "#94A3B8"
  },
  signalFillStrong: {
    backgroundColor: "#F59E0B"
  },
  signalFillVeryStrong: {
    backgroundColor: "#22C55E"
  },
  actionsCard: {
    backgroundColor: "#1E293B",
    borderRadius: 18,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.14)"
  },
  secondaryButton: {
    minHeight: 54,
    borderRadius: 16,
    backgroundColor: "#334155",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    paddingHorizontal: 16
  },
  secondaryButtonText: {
    color: "#E2E8F0",
    fontSize: 17,
    fontWeight: "900"
  },
  ghostButton: {
    minHeight: 48,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#334155"
  },
  ghostButtonText: {
    color: "#94A3B8",
    fontSize: 15,
    fontWeight: "900"
  },
  hintBox: {
    backgroundColor: "#1E293B",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#334155"
  },
  hintTitle: {
    color: "#F59E0B",
    fontSize: 15,
    fontWeight: "900",
    marginBottom: 6
  },
  hintText: {
    color: "#E2E8F0",
    fontSize: 16,
    lineHeight: 23
  },
  helperText: {
    color: "#94A3B8",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12
  },
  readyBox: {
    backgroundColor: "rgba(34, 197, 94, 0.14)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(34, 197, 94, 0.42)"
  },
  readyTitle: {
    color: "#BBF7D0",
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 4
  },
  readyText: {
    color: "#E2E8F0",
    fontSize: 14,
    lineHeight: 20
  },
  primaryButton: {
    minHeight: 54,
    borderRadius: 16,
    backgroundColor: "#F59E0B",
    alignItems: "center",
    justifyContent: "center"
  },
  primaryButtonDisabled: {
    backgroundColor: "#334155"
  },
  primaryButtonText: {
    color: "#111827",
    fontSize: 17,
    fontWeight: "900"
  },
  primaryButtonTextDisabled: {
    color: "#94A3B8"
  }
});
