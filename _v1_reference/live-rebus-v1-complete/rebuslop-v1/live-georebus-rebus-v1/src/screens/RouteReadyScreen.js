import React from "react";
import { SafeAreaView, ScrollView, Share, StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";
import Header from "../components/Header";
import { theme } from "../utils/theme";
import { formatDateTime } from "../utils/geo";

export default function RouteReadyScreen({
  route,
  onBack,
  onMarkGuestReady,
  onStart,
  onStartNowDemo
}) {
  async function shareRoute() {
    const payload = {
      routeId: route.id,
      scheduledStartTime: route.scheduledStartTime,
      postCount: route.checkpoints.length,
      mode: "reverse",
      note: "Samme rute. Samme spørsmål. Motsatt vei."
    };

    await Share.share({
      message:
        `Bli med på Live Georebus!\n\n` +
        `Poster: ${route.checkpoints.length}\n` +
        `Start: ${formatDateTime(route.scheduledStartTime)}\n` +
        `Modus: Samme rute, samme spørsmål, motsatt vei.\n\n` +
        `Demo-kode:\n${JSON.stringify(payload, null, 2)}`
    });
  }

  const canStart =
    route.accepted.host &&
    route.accepted.guest &&
    Date.now() >= new Date(route.scheduledStartTime).getTime();

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Rute klar" onBack={onBack} />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>Rute klar</Text>
          <Text style={styles.subtitle}>
            {route.checkpoints.length} poster · Start {formatDateTime(route.scheduledStartTime)}
          </Text>

          <View style={styles.routePreview}>
            <Text style={styles.previewTitle}>Samme rute – motsatt vei</Text>
            <Text style={styles.previewText}>
              Host: {route.hostOrder.map((_, i) => i + 1).join(" → ")}
            </Text>
            <Text style={styles.previewText}>
              Venn: {[...route.hostOrder].reverse().map((_, i) => i + 1).join(" → ")}
            </Text>
          </View>

          <View style={styles.teamRow}>
            <TeamBox title="Host" subtitle="Vanlig vei" ready={route.accepted.host} color={theme.colors.history} />
            <TeamBox title="Venn" subtitle="Motsatt vei" ready={route.accepted.guest} color={theme.colors.nature} />
          </View>

          <AppButton title="Send invitasjon" onPress={shareRoute} style={styles.button} />
          <AppButton title="Demo: marker venn som klar" variant="secondary" onPress={onMarkGuestReady} style={styles.smallButton} />
          <AppButton
            title={canStart ? "Start rebusen" : "Venter på starttid"}
            onPress={onStart}
            disabled={!canStart}
            style={styles.smallButton}
          />
          <AppButton title="Demo: start nå" variant="secondary" onPress={onStartNowDemo} style={styles.smallButton} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function TeamBox({ title, subtitle, ready, color }) {
  return (
    <View style={[styles.teamBox, { borderColor: color }]}>
      <Text style={[styles.teamTitle, { color }]}>{title}</Text>
      <Text style={styles.teamSubtitle}>{subtitle}</Text>
      <Text style={styles.teamReady}>{ready ? "Klar" : "Venter"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: 18, paddingBottom: 34 },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 20
  },
  title: {
    color: theme.colors.text,
    fontSize: 28,
    fontWeight: "900"
  },
  subtitle: {
    color: theme.colors.textMuted,
    fontSize: 15,
    marginTop: 8,
    marginBottom: 16
  },
  routePreview: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 14,
    marginBottom: 16
  },
  previewTitle: {
    color: theme.colors.primary,
    fontWeight: "900",
    marginBottom: 8
  },
  previewText: {
    color: theme.colors.text,
    marginTop: 5
  },
  teamRow: {
    flexDirection: "row",
    gap: 12
  },
  teamBox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: theme.radius.md,
    padding: 14,
    backgroundColor: theme.colors.background
  },
  teamTitle: {
    fontSize: 16,
    fontWeight: "900"
  },
  teamSubtitle: {
    color: theme.colors.textMuted,
    fontSize: 13,
    marginTop: 4
  },
  teamReady: {
    color: theme.colors.text,
    fontSize: 13,
    fontWeight: "900",
    marginTop: 8
  },
  button: { marginTop: 18 },
  smallButton: { marginTop: 10 }
});
