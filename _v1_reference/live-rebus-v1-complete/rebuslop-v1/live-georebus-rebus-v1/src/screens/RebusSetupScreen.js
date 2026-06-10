import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppButton from "../components/AppButton";
import Header from "../components/Header";
import { theme } from "../utils/theme";
import { formatDateTime } from "../utils/geo";

export default function RebusSetupScreen({ initialConfig, onBack, onCreateRoute }) {
  const [postCount, setPostCount] = useState(initialConfig.postCount);
  const [scheduledStartTime, setScheduledStartTime] = useState(initialConfig.scheduledStartTime);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Rebusløp – oppsett" onBack={onBack} />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>Lag rebusløp</Text>
          <Text style={styles.subtitle}>
            Samme rute. Samme spørsmål. Motsatt vei.
          </Text>

          <Text style={styles.label}>Antall poster</Text>
          <View style={styles.stepper}>
            <TouchableOpacity
              style={styles.stepperButton}
              onPress={() => setPostCount((value) => Math.max(3, value - 1))}
            >
              <Text style={styles.stepperText}>−</Text>
            </TouchableOpacity>

            <Text style={styles.postCount}>{postCount}</Text>

            <TouchableOpacity
              style={styles.stepperButton}
              onPress={() => setPostCount((value) => Math.min(10, value + 1))}
            >
              <Text style={styles.stepperText}>+</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Starttidspunkt</Text>
          <View style={styles.chipRow}>
            <TimeChip
              label="+15 min"
              onPress={() => setScheduledStartTime(new Date(Date.now() + 15 * 60 * 1000).toISOString())}
            />
            <TimeChip
              label="+1 time"
              onPress={() => setScheduledStartTime(new Date(Date.now() + 60 * 60 * 1000).toISOString())}
            />
            <TimeChip
              label="Nå"
              onPress={() => setScheduledStartTime(new Date().toISOString())}
            />
          </View>

          <View style={styles.timeBox}>
            <Text style={styles.timeLabel}>Valgt start</Text>
            <Text style={styles.timeValue}>{formatDateTime(scheduledStartTime)}</Text>
          </View>

          <View style={styles.ruleBox}>
            <Text style={styles.ruleTitle}>Spillmodus</Text>
            <Text style={styles.ruleText}>Host går 1 → {postCount}</Text>
            <Text style={styles.ruleText}>Venn går {postCount} → 1</Text>
          </View>

          <AppButton
            title="Generer rute"
            onPress={() => onCreateRoute({ postCount, scheduledStartTime })}
            style={styles.mainButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function TimeChip({ label, onPress }) {
  return (
    <TouchableOpacity style={styles.timeChip} onPress={onPress}>
      <Text style={styles.timeChipText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: 18, paddingBottom: 34 },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: 20,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  title: {
    color: theme.colors.text,
    fontSize: 28,
    fontWeight: "900"
  },
  subtitle: {
    color: theme.colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 24
  },
  label: {
    color: theme.colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    fontSize: 12,
    fontWeight: "900",
    marginTop: 18,
    marginBottom: 10
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18
  },
  stepperButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: theme.colors.surfaceAlt,
    alignItems: "center",
    justifyContent: "center"
  },
  stepperText: {
    color: theme.colors.text,
    fontWeight: "900",
    fontSize: 26
  },
  postCount: {
    color: theme.colors.primary,
    fontSize: 34,
    fontWeight: "900"
  },
  chipRow: {
    flexDirection: "row",
    gap: 10
  },
  timeChip: {
    flex: 1,
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: theme.radius.md,
    paddingVertical: 13,
    alignItems: "center"
  },
  timeChipText: {
    color: theme.colors.text,
    fontWeight: "800"
  },
  timeBox: {
    marginTop: 14,
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 14
  },
  timeLabel: {
    color: theme.colors.textMuted,
    fontSize: 12,
    marginBottom: 4
  },
  timeValue: {
    color: theme.colors.primary,
    fontWeight: "900",
    fontSize: 16
  },
  ruleBox: {
    marginTop: 16,
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 14
  },
  ruleTitle: {
    color: theme.colors.text,
    fontWeight: "900",
    marginBottom: 6
  },
  ruleText: {
    color: theme.colors.textMuted,
    lineHeight: 21
  },
  mainButton: {
    marginTop: 20
  }
});
