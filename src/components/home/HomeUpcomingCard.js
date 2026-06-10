import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../utils/designTokens";

export default function HomeUpcomingCard({
  title = "Rebusløp",
  timeText = "Starter i 2 t 14 min",
  meta = "7 poster · Motsatt vei",
  onPress
}) {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
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
        <Text style={styles.buttonText}>Åpne venterom</Text>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 112,
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 14,
    justifyContent: "space-between"
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
    backgroundColor: theme.colors.surfaceAlt
  },
  icon: {
    fontSize: 22
  },
  content: {
    flex: 1
  },
  title: {
    color: theme.colors.text,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "900",
    marginBottom: 2
  },
  timeText: {
    color: theme.colors.primary,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "900"
  },
  meta: {
    color: theme.colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 2
  },
  button: {
    minHeight: 36,
    width: "100%",
    marginTop: 10,
    paddingHorizontal: 12,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "rgba(255, 107, 53, 0.7)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: "900"
  },
  arrow: {
    color: theme.colors.primary,
    fontSize: 24,
    marginLeft: 7,
    marginTop: -1
  }
});