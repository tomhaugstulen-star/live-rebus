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

function getSignalPercent(distance) {
  const percent = 100 - (distance / MAX_DISTANCE) * 100;
  return `${clamp(Math.round(percent), 12, 96)}%`;
}

function getSonarSize(distance, baseSize) {
  const distanceFactor = clamp(distance / MAX_DISTANCE, 0, 1);
  return Math.round(baseSize + distanceFactor * 34);
}

export default function TreasureHuntScreen({ onBack, onFound }) {
  const [distance, setDistance] = useState(INITIAL_DISTANCE);
  const [showHint, setShowHint] = useState(false);

  const signalLabel = useMemo(() => getSignalLabel(distance), [distance]);
  const pulseLabel = useMemo(() => getPulseLabel(distance), [distance]);
  const searchHint = useMemo(() => getSearchHint(distance), [distance]);
  const signalPercent = useMemo(() => getSignalPercent(distance), [distance]);
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
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>Tilbake</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.kicker}>Skattejakt</Text>
        <Text style={styles.title}>RADARMODUS</Text>
        <Text style={styles.text}>
          Legg mobilen i lomma og følg signalet. Jo sterkere pulsen blir, jo nærmere er du. Kart og GPS er deaktivert i web-test.
        </Text>

        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View>
              <Text style={styles.cardTitle}>Sonarvisning</Text>
              <Text style={styles.cardSubtitle}>Simulert signal i Radarmodus</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{signalLabel}</Text>
            </View>
          </View>

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
          onPress={() => Alert.alert("Kart", "Kartmodus og Fog of War testes på mobil. Web viser trygg Radarmodus-test.")}
        >
          <Text style={styles.secondaryButtonText}>Vis kart</Text>
        </TouchableOpacity>

        {!canOpenTreasure ? (
          <Text style={styles.helperText}>Skatten kan åpnes når signalet er svært sterkt.</Text>
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
    marginTop: 3
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
