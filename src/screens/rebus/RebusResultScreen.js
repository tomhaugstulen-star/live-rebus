import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../utils/theme";

export default function RebusResultScreen({
  route,
  completedCount,
  elapsedSeconds,
  wrongAnswers,
  xp,
  onNewRoute,
  onMenu
}) {
  const routeTitle = route?.title || "Demo-rebus";
  const totalPosts = route?.checkpoints?.length || completedCount || 0;
  const allCompleted = completedCount >= totalPosts && totalPosts > 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <View style={styles.kickerPill}>
            <Text style={styles.kickerText}>Resultat</Text>
          </View>
        </View>

        <Text style={styles.title}>Rebus fullført</Text>
        <Text style={styles.body}>
          Du fullførte rebusløpet i web-testmodus.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Oppsummering</Text>
          <DetailRow label="Rute" value={routeTitle} first />
          <DetailRow label="Poster fullført" value={`${completedCount}`} />
          <DetailRow label="Feil svar" value={`${wrongAnswers}`} />
          <DetailRow label="Tid" value={formatDuration(elapsedSeconds)} />
          <DetailRow label="XP" value={`${xp} XP`} />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Status</Text>
          <Text style={styles.statusText}>
            {allCompleted ? "Alle poster ble fullført." : "Ruten ble delvis fullført."}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={onNewRoute}
          activeOpacity={0.88}
          accessibilityRole="button"
          accessibilityLabel="Ny rute"
        >
          <Text style={styles.primaryButtonText}>Ny rute</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={onMenu}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel="Til meny"
        >
          <Text style={styles.secondaryButtonText}>Til meny</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function formatDuration(totalSeconds = 0) {
  const safeSeconds = Math.max(0, Number(totalSeconds) || 0);
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${minutes} min ${seconds} sek`;
}

function DetailRow({ label, value, first = false }) {
  return (
    <View style={[styles.detailRow, first && styles.detailRowFirst]}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  content: {
    padding: 20,
    paddingBottom: 32
  },
  topBar: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20
  },
  kickerPill: {
    minHeight: 32,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: theme.colors.rebus,
    alignItems: "center",
    justifyContent: "center"
  },
  kickerText: {
    color: theme.colors.text,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 0.4
  },
  title: {
    color: theme.colors.text,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "900",
    marginBottom: 10
  },
  body: {
    color: theme.colors.textMuted,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 18
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 20,
    marginBottom: 16
  },
  cardTitle: {
    color: theme.colors.text,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "900",
    marginBottom: 14
  },
  detailRow: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingVertical: 2
  },
  detailRowFirst: {
    borderTopWidth: 0
  },
  detailLabel: {
    color: theme.colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "700"
  },
  detailValue: {
    color: theme.colors.text,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "900",
    textAlign: "right",
    flexShrink: 1,
    marginLeft: 12
  },
  statusText: {
    color: theme.colors.text,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "700"
  },
  primaryButton: {
    minHeight: 54,
    borderRadius: 18,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
    marginBottom: 12
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "900"
  },
  secondaryButton: {
    minHeight: 54,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surfaceAlt,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18
  },
  secondaryButtonText: {
    color: theme.colors.text,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "900"
  }
});
