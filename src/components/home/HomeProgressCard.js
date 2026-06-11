import React from "react";
import { StyleSheet, Text, View } from "react-native";

const palette = {
  surface: "rgba(12, 18, 38, 0.72)",
  surfaceStrong: "#091426",
  surfaceAlt: "#334155",
  textPrimary: "#F7F7F2",
  textSecondary: "#BFC3CC",
  orange: "#FF6A00",
  border: "rgba(247, 247, 242, 0.10)"
};

export default function HomeProgressCard({
  level = 3,
  xp = 420,
  xpToNextLevel = 80,
  progressPercent = 84
}) {
  const safeProgress = Math.max(0, Math.min(100, progressPercent));

  return (
    <View style={styles.card}>
      <View style={styles.leftSide}>
        <View style={styles.badge}>
          <Text style={styles.badgeLabel}>Nivå</Text>
          <Text style={styles.badgeValue}>{level}</Text>
        </View>

        <View style={styles.copy}>
          <Text style={styles.label}>Din progresjon</Text>
          <Text style={styles.subtitle}>{xpToNextLevel} XP igjen til neste level</Text>
        </View>
      </View>

      <View style={styles.rightSide}>
        <View style={styles.xpPill}>
          <Text style={styles.xpValue}>{xp}</Text>
          <Text style={styles.xpLabel}>XP</Text>
        </View>

        <View style={styles.progressBar} accessibilityLabel={`Fremdrift ${safeProgress}%`}>
          <View style={[styles.progressFill, { width: `${safeProgress}%` }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 126,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.surface,
    padding: 14,
    overflow: "hidden"
  },
  leftSide: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12
  },
  badge: {
    width: 84,
    minHeight: 62,
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.surfaceStrong,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)"
  },
  badgeLabel: {
    color: palette.textSecondary,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "800",
    letterSpacing: 0.4,
    textTransform: "uppercase"
  },
  badgeValue: {
    color: palette.textPrimary,
    fontSize: 24,
    lineHeight: 28,
    fontWeight: "900"
  },
  copy: {
    flex: 1,
    marginLeft: 12
  },
  label: {
    color: palette.textPrimary,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "900",
    marginBottom: 4
  },
  subtitle: {
    color: palette.textSecondary,
    fontSize: 13,
    lineHeight: 18
  },
  rightSide: {
    flex: 1
  },
  xpPill: {
    alignSelf: "flex-start",
    minWidth: 80,
    minHeight: 36,
    borderRadius: 14,
    paddingHorizontal: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,106,0,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,106,0,0.30)"
  },
  xpValue: {
    color: palette.textPrimary,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "900"
  },
  xpLabel: {
    color: palette.orange,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "900",
    marginLeft: 6,
    textTransform: "uppercase"
  },
  progressBar: {
    height: 10,
    borderRadius: 999,
    backgroundColor: palette.surfaceAlt,
    overflow: "hidden"
  },
  progressFill: {
    height: "100%",
    backgroundColor: palette.orange,
    borderRadius: 999
  }
});
