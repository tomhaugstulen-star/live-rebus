import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../utils/designTokens";

export default function HomeProgressCard({
  level = 3,
  xp = 420,
  xpToNextLevel = 80,
  progressPercent = 84
}) {
  return (
    <View style={styles.card}>
      <View style={styles.badge}>
        <Text style={styles.badgeLabel}>Level</Text>
        <Text style={styles.badgeValue}>{level}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.xp}>{xp} XP</Text>

        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
        </View>

        <Text style={styles.hint}>{xpToNextLevel} XP igjen til neste level</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 132,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    flexDirection: "row",
    alignItems: "center"
  },
  badge: {
    width: 112,
    height: 112,
    marginRight: theme.spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radius.lg,
    borderWidth: 3,
    borderColor: theme.colors.rebus,
    backgroundColor: "rgba(139, 92, 246, 0.18)"
  },
  badgeLabel: {
    color: theme.colors.text,
    fontSize: 17,
    fontWeight: "900"
  },
  badgeValue: {
    color: theme.colors.white,
    fontSize: 42,
    lineHeight: 48,
    fontWeight: "900"
  },
  content: {
    flex: 1
  },
  xp: {
    color: theme.colors.text,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "900",
    marginBottom: theme.spacing.md
  },
  progressBar: {
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.surfaceAlt,
    overflow: "hidden"
  },
  progressFill: {
    height: "100%",
    backgroundColor: theme.colors.primary,
    borderRadius: 6
  },
  hint: {
    color: theme.colors.textMuted,
    fontSize: 15,
    lineHeight: 20,
    marginTop: theme.spacing.sm
  }
});