import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { addPlayerXp } from "../../utils/playerProgressStore";
import { calculateTreasureXp } from "../../utils/xpRules";
import {
  getTreasureSession,
  markTreasureXpAwarded,
  resetTreasureSession
} from "../../utils/treasureSessionStore";

function formatElapsedSeconds(totalSeconds) {
  const safeSeconds = Math.max(0, Number(totalSeconds) || 0);
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${minutes} min ${seconds} sek`;
}

export default function TreasureResultScreen({
  foundCount,
  difficulty,
  completed = true,
  winner = false,
  sharedWinner = false,
  elapsedSeconds,
  onNewHunt,
  onMenu
}) {
  const session = getTreasureSession();
  const resolvedFoundCount = session?.treasuresFound ?? Math.max(0, Number(foundCount) || 0);
  const resolvedDifficulty = session?.difficulty || difficulty || "medium";
  const resolvedCompleted = session?.completed ?? completed;
  const resolvedElapsedSeconds = session?.elapsedSeconds ?? Math.max(0, Number(elapsedSeconds) || 0);
  const modeLabel = session?.mode === "sonar" ? "Sonar" : "Tåkekart";

  const calculatedXp = calculateTreasureXp({
    difficulty: resolvedDifficulty,
    treasuresFound: resolvedFoundCount,
    completed: resolvedCompleted,
    winner,
    sharedWinner
  });

  const summaryRows = [
    { label: "Modus", value: modeLabel },
    { label: "Skatter funnet", value: String(resolvedFoundCount) },
    { label: "XP", value: String(calculatedXp.totalXp) },
    { label: "Tid", value: formatElapsedSeconds(resolvedElapsedSeconds) }
  ];

  function completeResult(onComplete) {
    if (markTreasureXpAwarded()) {
      addPlayerXp(calculatedXp.totalXp);
    }

    resetTreasureSession();
    onComplete?.();
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.kicker}>
          <Text style={styles.kickerText}>Resultat</Text>
        </View>

        <Text style={styles.title}>Skattejakt fullført</Text>
        <Text style={styles.body}>
          {modeLabel} er fullført. XP-en følger de samme reglene for begge spillemodusene.
        </Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Oppsummering</Text>
          {summaryRows.map((row, index) => (
            <View
              key={row.label}
              style={[styles.summaryRow, index === summaryRows.length - 1 && styles.summaryRowLast]}
            >
              <Text style={styles.summaryLabel}>{row.label}</Text>
              <Text style={[styles.summaryValue, row.label === "XP" && styles.summaryValueHighlight]}>
                {row.value}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>XP-fordeling</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Fullføring</Text>
            <Text style={styles.summaryValue}>{calculatedXp.completionXp} XP</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Skatter</Text>
            <Text style={styles.summaryValue}>{calculatedXp.treasureXp} XP</Text>
          </View>
          {calculatedXp.winnerBonusXp > 0 ? (
            <View style={[styles.summaryRow, styles.summaryRowLast]}>
              <Text style={styles.summaryLabel}>Vinnerbonus</Text>
              <Text style={styles.summaryValue}>{calculatedXp.winnerBonusXp} XP</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.card}>
          <View style={styles.statusHeader}>
            <View style={styles.statusMark}>
              <Text style={styles.statusMarkText}>✓</Text>
            </View>
            <Text style={styles.sectionTitle}>Status</Text>
          </View>
          <Text style={styles.cardText}>Alle skattene er registrert og jakten er fullført.</Text>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => completeResult(onNewHunt)}
          accessibilityRole="button"
          accessibilityLabel="Ny skattejakt"
        >
          <Text style={styles.primaryButtonText}>Ny skattejakt</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => completeResult(onMenu)}
          accessibilityRole="button"
          accessibilityLabel="Til meny"
        >
          <Text style={styles.secondaryButtonText}>Til meny</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0F172A" },
  container: { padding: 20, paddingBottom: 28 },
  kicker: { alignSelf: "flex-start", backgroundColor: "rgba(245, 158, 11, 0.14)", borderColor: "rgba(245, 158, 11, 0.35)", borderWidth: 1, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6, marginBottom: 14 },
  kickerText: { color: "#F59E0B", fontSize: 13, fontWeight: "800", letterSpacing: 0.6, textTransform: "uppercase" },
  title: { color: "#E2E8F0", fontSize: 29, fontWeight: "800", lineHeight: 34, marginBottom: 10 },
  body: { color: "#94A3B8", fontSize: 16, lineHeight: 23, marginBottom: 18 },
  card: { backgroundColor: "#1E293B", borderRadius: 20, padding: 20, marginBottom: 18, borderWidth: 1, borderColor: "rgba(148, 163, 184, 0.12)" },
  sectionTitle: { color: "#E2E8F0", fontSize: 16, fontWeight: "800" },
  summaryRow: { minHeight: 44, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "rgba(148, 163, 184, 0.12)" },
  summaryRowLast: { borderBottomWidth: 0 },
  summaryLabel: { color: "#94A3B8", fontSize: 15, fontWeight: "600" },
  summaryValue: { color: "#E2E8F0", fontSize: 15, fontWeight: "700" },
  summaryValueHighlight: { color: "#22C55E" },
  statusHeader: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  statusMark: { width: 28, height: 28, borderRadius: 14, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(34, 197, 94, 0.14)", borderWidth: 1, borderColor: "rgba(34, 197, 94, 0.3)", marginRight: 10 },
  statusMarkText: { color: "#22C55E", fontSize: 16, fontWeight: "900", lineHeight: 18 },
  cardText: { color: "#E2E8F0", fontSize: 15, lineHeight: 22 },
  primaryButton: { minHeight: 54, borderRadius: 16, backgroundColor: "#F59E0B", alignItems: "center", justifyContent: "center", marginBottom: 12 },
  primaryButtonText: { color: "#111827", fontSize: 17, fontWeight: "800" },
  secondaryButton: { minHeight: 54, borderRadius: 16, backgroundColor: "#334155", alignItems: "center", justifyContent: "center" },
  secondaryButtonText: { color: "#E2E8F0", fontSize: 17, fontWeight: "800" }
});
