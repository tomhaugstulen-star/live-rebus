import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../utils/theme";
import { formatDateTime } from "../../utils/geo";

export default function RouteReadyScreen({
  route,
  onBack,
  onMarkGuestReady,
  onStart,
  onStartNowDemo
}) {
  const checkpoints = route?.checkpoints || [];
  const accepted = route?.accepted || {};
  const canStart =
    !!accepted.host &&
    !!accepted.guest &&
    Date.now() >= new Date(route?.scheduledStartTime).getTime();
  const title = route?.title || "Rebusruten er klar";
  const areaName = route?.areaName || "Live Rebus demo";
  const estimatedMinutes = route?.estimatedDurationMinutes || 45;
  const distanceLabel = formatDistance(route?.distanceMeters);
  const guestReady = !!accepted.guest;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
            activeOpacity={0.86}
            accessibilityRole="button"
            accessibilityLabel="Tilbake"
          >
            <Text style={styles.backButtonText}>Tilbake</Text>
          </TouchableOpacity>

          <View style={styles.kickerPill}>
            <Text style={styles.kickerText}>Rute klar</Text>
          </View>
        </View>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>
          Sjekk ruten og klargjør deltakerne før start.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Rutedetaljer</Text>
          <DetailRow label="Område" value={areaName} first />
          <DetailRow label="Poster" value={`${checkpoints.length}`} />
          <DetailRow label="Estimert tid" value={`${estimatedMinutes} min`} />
          <DetailRow label="Distanse" value={distanceLabel} />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Deltakere</Text>
          <ParticipantRow label="Vert" ready={!!accepted.host} first />
          <ParticipantRow label="Gjest" ready={!!accepted.guest} />

          {!guestReady ? (
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={onMarkGuestReady}
              activeOpacity={0.85}
              accessibilityRole="button"
              accessibilityLabel="Demo: marker gjest klar"
            >
              <Text style={styles.secondaryButtonText}>Demo: marker gjest klar</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Web-test</Text>
          <Text style={styles.cardBody}>
            Demo-start bruker testdata og web-safe spillvisning.
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.primaryButton, !canStart && styles.primaryButtonDisabled]}
          onPress={onStart}
          activeOpacity={0.88}
          disabled={!canStart}
          accessibilityRole="button"
          accessibilityLabel={canStart ? "Start når klar" : "Venter på starttid"}
        >
          <Text style={styles.primaryButtonText}>
            {canStart ? "Start når klar" : "Venter på starttid"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.demoButton}
          onPress={onStartNowDemo}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel="Demo: start nå"
        >
          <Text style={styles.demoButtonText}>Demo: start nå</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function DetailRow({ label, value, first = false }) {
  return (
    <View style={[styles.detailRow, first && styles.detailRowFirst]}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

function ParticipantRow({ label, ready, first = false }) {
  return (
    <View style={[styles.participantRow, first && styles.participantRowFirst]}>
      <Text style={styles.participantLabel}>{label}</Text>
      <View style={[styles.statusPill, ready ? styles.statusPillReady : styles.statusPillWaiting]}>
        <Text style={styles.statusText}>{ready ? "Klar" : "Venter"}</Text>
      </View>
    </View>
  );
}

function formatDistance(distanceMeters) {
  if (typeof distanceMeters !== "number" || Number.isNaN(distanceMeters)) {
    return "0 m";
  }

  if (distanceMeters >= 1000) {
    return `${(distanceMeters / 1000).toFixed(1)} km`;
  }

  return `${Math.round(distanceMeters)} m`;
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
  backButton: {
    minHeight: 44,
    minWidth: 44,
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  backButtonText: {
    color: theme.colors.primary,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "800"
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
  cardBody: {
    color: theme.colors.textMuted,
    fontSize: 15,
    lineHeight: 22
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
    fontWeight: "800",
    textAlign: "right",
    flexShrink: 1,
    marginLeft: 12
  },
  participantRow: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingVertical: 2
  },
  participantRowFirst: {
    borderTopWidth: 0
  },
  participantLabel: {
    color: theme.colors.text,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "800"
  },
  statusPill: {
    minHeight: 30,
    minWidth: 76,
    paddingHorizontal: 12,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center"
  },
  statusPillReady: {
    backgroundColor: "rgba(34, 197, 94, 0.2)"
  },
  statusPillWaiting: {
    backgroundColor: theme.colors.surfaceAlt
  },
  statusText: {
    color: theme.colors.text,
    fontSize: 13,
    lineHeight: 18,
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
    marginTop: 14,
    paddingHorizontal: 18
  },
  secondaryButtonText: {
    color: theme.colors.text,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "900",
    textAlign: "center"
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
  primaryButtonDisabled: {
    opacity: 0.55
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "900"
  },
  demoButton: {
    minHeight: 54,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(139, 92, 246, 0.6)",
    backgroundColor: "rgba(139, 92, 246, 0.16)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18
  },
  demoButtonText: {
    color: theme.colors.text,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "900"
  }
});
