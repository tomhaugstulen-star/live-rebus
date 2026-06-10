import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../utils/designTokens";

export default function HomeProgressCard({
  level = 3,
  xp = 420,
  xpToNextLevel = 80,
  progressPercent = 84
}) {
  const safeProgress = Math.max(0, Math.min(100, progressPercent));

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.label}>Progress</Text>
          <Text style={styles.level}>Nivå {level}</Text>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeValue}>{xp}</Text>
          <Text style={styles.badgeLabel}>XP</Text>
        </View>
      </View>

      <View style={styles.progressBar} accessibilityLabel={`Fremdrift ${safeProgress}%`}>
        <View style={[styles.progressFill, { width: `${safeProgress}%` }]} />
      </View>

      <Text style={styles.hint}>{xpToNextLevel} XP igjen til neste level</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 138,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 20
  },
  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 16
  },
  label: {
    color: theme.colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 4
  },
  level: {
    color: theme.colors.text,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "900"
  },
  badge: {
    minWidth: 88,
    minHeight: 64,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: theme.radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.surfaceAlt
  },
  badgeValue: {
    color: theme.colors.text,
    fontSize: 28,
    lineHeight: 32,
    fontWeight: "900"
  },
  badgeLabel: {
    color: theme.colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "800",
    marginTop: 2
  },
  progressBar: {
    height: 12,
    borderRadius: 999,
    backgroundColor: theme.colors.surfaceAlt,
    overflow: "hidden"
  },
  progressFill: {
    height: "100%",
    backgroundColor: theme.colors.primary,
    borderRadius: 999
  },
  hint: {
    color: theme.colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10
  }
});
