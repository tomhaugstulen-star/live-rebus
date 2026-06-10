import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

function formatElapsedSeconds(totalSeconds) {
  const safeSeconds = Math.max(0, Number(totalSeconds) || 0);
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${minutes} min ${seconds} sek`;
}

export default function TreasureResultScreen({
  foundCount,
  xp,
  elapsedSeconds,
  onNewHunt,
  onMenu
}) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Skattejakt fullført</Text>
        <Text style={styles.text}>
          Du fullførte skattejakten i web-testmodus.
        </Text>

        <View style={styles.card}>
          <Metric label="Skatter funnet" value={String(foundCount)} />
          <Metric label="XP" value={String(xp)} highlight />
          <Metric label="Tid" value={formatElapsedSeconds(elapsedSeconds)} />
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={onNewHunt}>
          <Text style={styles.primaryButtonText}>Ny skattejakt</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={onMenu}>
          <Text style={styles.secondaryButtonText}>Til meny</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function Metric({ label, value, highlight }) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={[styles.metricValue, highlight && styles.metricHighlight]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0F172A"
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center"
  },
  title: {
    color: "#E2E8F0",
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 12
  },
  text: {
    color: "#94A3B8",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24
  },
  card: {
    backgroundColor: "#1E293B",
    borderRadius: 18,
    padding: 20,
    marginBottom: 16
  },
  metric: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#334155"
  },
  metricLabel: {
    color: "#94A3B8",
    fontSize: 14,
    fontWeight: "700"
  },
  metricValue: {
    color: "#E2E8F0",
    fontSize: 15,
    fontWeight: "800"
  },
  metricHighlight: {
    color: "#22C55E"
  },
  primaryButton: {
    minHeight: 54,
    borderRadius: 16,
    backgroundColor: "#F59E0B",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12
  },
  primaryButtonText: {
    color: "#111827",
    fontSize: 17,
    fontWeight: "800"
  },
  secondaryButton: {
    minHeight: 54,
    borderRadius: 16,
    backgroundColor: "#334155",
    alignItems: "center",
    justifyContent: "center"
  },
  secondaryButtonText: {
    color: "#E2E8F0",
    fontSize: 17,
    fontWeight: "800"
  }
});
