import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import AppButton from "../../components/common/AppButton";
import Header from "../../components/common/Header";
import { theme } from "../../utils/theme";
import { formatDateTime } from "../../utils/geo";

export default function RebusResultScreen({
  route,
  completedCount,
  elapsedSeconds,
  wrongAnswers,
  xp,
  onNewRoute,
  onMenu
}) {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Resultat" />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.trophy}>
          <Text style={styles.trophyText}>🏆</Text>
        </View>

        <Text style={styles.title}>Ruten fullført</Text>
        <Text style={styles.subtitle}>Alle poster er godkjent av appen.</Text>

        <View style={styles.card}>
          <Metric label="Tid brukt" value={formatDuration(elapsedSeconds)} />
          <Metric label="Poster" value={`${completedCount} / ${route.checkpoints.length}`} />
          <Metric label="Feil svar" value={String(wrongAnswers)} />
          <Metric label="XP opptjent" value={`+${xp} XP`} highlight />
        </View>

        <AppButton title="Lag ny rebus" onPress={onNewRoute} style={styles.button} />
        <AppButton title="Til hovedmeny" variant="secondary" onPress={onMenu} style={styles.secondary} />
      </ScrollView>
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
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: {
    padding: 24,
    alignItems: "center",
    paddingBottom: 40
  },
  trophy: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: "rgba(245, 158, 11, 0.14)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20
  },
  trophyText: { fontSize: 60 },
  title: {
    color: theme.colors.primary,
    fontSize: 28,
    fontWeight: "900"
  },
  subtitle: {
    color: theme.colors.text,
    fontSize: 16,
    marginTop: 6,
    marginBottom: 22,
    textAlign: "center"
  },
  card: {
    width: "100%",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 16
  },
  metric: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border
  },
  metricLabel: {
    color: theme.colors.textMuted,
    fontSize: 14
  },
  metricValue: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: "900"
  },
  metricHighlight: {
    color: theme.colors.primary
  },
  button: {
    width: "100%",
    marginTop: 22
  },
  secondary: {
    width: "100%",
    marginTop: 12
  }
});
