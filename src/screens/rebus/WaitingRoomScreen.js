import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import AppButton from "../../components/common/AppButton";
import Header from "../../components/common/Header";
import { theme } from "../../utils/theme";
import { formatDateTime } from "../../utils/geo";

export default function WaitingRoomScreen({ route, onBack, onStart, onStartNowDemo }) {
  const start = new Date(route.scheduledStartTime).getTime();
  const remainingSeconds = Math.max(0, Math.round((start - Date.now()) / 1000));
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const canStart = remainingSeconds <= 0 && route.accepted.host && route.accepted.guest;

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Venterom" onBack={onBack} />

      <View style={styles.content}>
        <Text style={styles.title}>Rebusen starter om</Text>
        <Text style={styles.countdown}>
          {minutes}:{String(seconds).padStart(2, "0")}
        </Text>

        <Text style={styles.timeText}>Start: {formatDateTime(route.scheduledStartTime)}</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Møt opp ved startpunktet</Text>
          <Text style={styles.cardText}>
            Første post vises først når starttiden er nådd og begge lag er klare.
          </Text>
        </View>

        <View style={styles.statusRow}>
          <StatusItem label="Host" ready={route.accepted.host} />
          <StatusItem label="Venn" ready={route.accepted.guest} />
        </View>

        <AppButton title="Start rebusen" onPress={onStart} disabled={!canStart} />
        <AppButton title="Demo: start nå" variant="secondary" onPress={onStartNowDemo} style={styles.secondary} />
      </View>
    </SafeAreaView>
  );
}

function StatusItem({ label, ready }) {
  return (
    <View style={styles.statusItem}>
      <Text style={styles.statusIcon}>{ready ? "✅" : "⏳"}</Text>
      <Text style={styles.statusLabel}>{label}</Text>
      <Text style={styles.statusText}>{ready ? "Klar" : "Venter"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center"
  },
  title: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: "900",
    textAlign: "center"
  },
  countdown: {
    color: theme.colors.primary,
    fontSize: 58,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 12
  },
  timeText: {
    color: theme.colors.textMuted,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 24
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 18,
    marginBottom: 18
  },
  cardTitle: {
    color: theme.colors.text,
    fontWeight: "900",
    fontSize: 17,
    marginBottom: 6
  },
  cardText: {
    color: theme.colors.textMuted,
    lineHeight: 21
  },
  statusRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20
  },
  statusItem: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  statusIcon: { fontSize: 24 },
  statusLabel: {
    color: theme.colors.text,
    fontWeight: "900",
    marginTop: 6
  },
  statusText: {
    color: theme.colors.textMuted,
    marginTop: 4
  },
  secondary: { marginTop: 10 }
});
