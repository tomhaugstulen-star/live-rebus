import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const palette = {
  surface: "rgba(12, 18, 38, 0.72)",
  surfaceStrong: "#091426",
  surfaceAlt: "#334155",
  textPrimary: "#F7F7F2",
  textSecondary: "#BFC3CC",
  orange: "#FF6A00",
  border: "rgba(247, 247, 242, 0.10)"
};

export default function HomeUpcomingCard({
  title = "Rebusløp",
  timeText = "Starter i 2 t 14 min",
  meta = "7 poster · Motsatt vei",
  onPress
}) {
  return (
    <View style={styles.card}>
      <View style={styles.innerGlow} />

      <View style={styles.row}>
        <View style={styles.leftSide}>
          <View style={styles.iconWrap}>
            <Text style={styles.icon}>📅</Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.timeText}>{timeText}</Text>
            <Text style={styles.meta}>{meta}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={onPress}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel="Åpne venterom"
        >
          <Text style={styles.buttonText}>Åpne</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 122,
    padding: 14,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.surface,
    overflow: "hidden"
  },
  innerGlow: {
    position: "absolute",
    right: -18,
    top: -18,
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: palette.orange,
    opacity: 0.08
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  leftSide: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingRight: 10
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)"
  },
  icon: {
    fontSize: 22
  },
  content: {
    flex: 1
  },
  title: {
    color: palette.textPrimary,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "900",
    marginBottom: 2
  },
  timeText: {
    color: palette.orange,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "900"
  },
  meta: {
    color: palette.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 2
  },
  button: {
    minHeight: 42,
    minWidth: 96,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 106, 0, 0.64)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 106, 0, 0.08)"
  },
  buttonText: {
    color: palette.orange,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "900"
  },
  arrow: {
    color: palette.orange,
    fontSize: 24,
    lineHeight: 24,
    marginLeft: 6,
    marginTop: -1
  }
});
