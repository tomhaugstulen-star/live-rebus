import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const colors = {
  background: "#0F172A",
  surface: "#1E293B",
  surfaceAlt: "#334155",
  text: "#E2E8F0",
  muted: "#94A3B8",
  primary: "#FF6B35",
  rebus: "#8B5CF6",
  success: "#22C55E",
  border: "rgba(226, 232, 240, 0.12)"
};

const POST_OPTIONS = [3, 5, 7];
const DEFAULT_POST_COUNT = 7;

function normalizePostCount(value) {
  if (POST_OPTIONS.includes(value)) return value;

  if (value <= 4) return 3;
  if (value <= 6) return 5;
  return 7;
}

function buildScheduledStartTime(initialValue) {
  if (initialValue) return initialValue;

  return new Date(Date.now() + 15 * 60 * 1000).toISOString();
}

export default function RebusSetupScreen({ initialConfig, onBack, onCreateRoute }) {
  const [postCount, setPostCount] = useState(
    normalizePostCount(initialConfig?.postCount ?? DEFAULT_POST_COUNT)
  );
  const [scheduledStartTime] = useState(
    buildScheduledStartTime(initialConfig?.scheduledStartTime)
  );

  const handleCreateRoute = () => {
    onCreateRoute({
      postCount,
      scheduledStartTime
    });
  };

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
            <Text style={styles.kickerText}>Rebusløp</Text>
          </View>
        </View>

        <Text style={styles.title}>Sett opp rebusrute</Text>
        <Text style={styles.body}>
          Velg en enkel demo-rute før postene genereres.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Demo-rute</Text>

          <Row label="Område" value="Live Rebus demo" />
          <Row label="Poster" value={`${postCount}`} />
          <Row label="Estimert tid" value="45 min" />
          <Row label="Modus" value="Web-test" />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Antall poster</Text>
          <Text style={styles.cardBody}>
            Velg 3, 5 eller 7 poster for demo-ruten.
          </Text>

          <View style={styles.optionRow}>
            {POST_OPTIONS.map((option) => {
              const selected = option === postCount;

              return (
                <TouchableOpacity
                  key={option}
                  style={[styles.optionButton, selected && styles.optionButtonSelected]}
                  onPress={() => setPostCount(option)}
                  activeOpacity={0.85}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  accessibilityLabel={`${option} poster`}
                >
                  <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Starttid</Text>
          <Text style={styles.cardBody}>
            Demo starter med valgt tidspunkt i testflyten.
          </Text>

          <View style={styles.timeRow}>
            <Text style={styles.timeLabel}>Planlagt start</Text>
            <Text style={styles.timeValue}>Om 15 min</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Web-test</Text>
          <Text style={styles.cardBody}>
            GPS og kart brukes ikke i denne web-testen.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleCreateRoute}
          activeOpacity={0.88}
          accessibilityRole="button"
          accessibilityLabel="Generer rute"
        >
          <Text style={styles.primaryButtonText}>Generer rute</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function Row({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
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
    color: colors.primary,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "800"
  },
  kickerPill: {
    minHeight: 32,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: colors.rebus,
    alignItems: "center",
    justifyContent: "center"
  },
  kickerText: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 0.4
  },
  title: {
    color: colors.text,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "900",
    marginBottom: 10
  },
  body: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 18
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    marginBottom: 16
  },
  cardTitle: {
    color: colors.text,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "900",
    marginBottom: 14
  },
  cardBody: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 14
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 44,
    borderTopWidth: 1,
    borderTopColor: colors.border
  },
  rowLabel: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "700"
  },
  rowValue: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "800"
  },
  optionRow: {
    flexDirection: "row",
    gap: 10
  },
  optionButton: {
    flex: 1,
    minHeight: 54,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceAlt,
    alignItems: "center",
    justifyContent: "center"
  },
  optionButtonSelected: {
    borderColor: colors.rebus,
    backgroundColor: "rgba(139, 92, 246, 0.22)"
  },
  optionText: {
    color: colors.text,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "900"
  },
  optionTextSelected: {
    color: colors.text
  },
  timeRow: {
    minHeight: 44,
    paddingHorizontal: 14,
    borderRadius: 18,
    backgroundColor: colors.surfaceAlt,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  timeLabel: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: "700"
  },
  timeValue: {
    color: colors.success,
    fontSize: 15,
    fontWeight: "900"
  },
  primaryButton: {
    minHeight: 54,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "900"
  }
});
