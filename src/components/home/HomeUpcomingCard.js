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
    minHeight: 148,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 20,
    justifyContent: "space-between"
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  iconWrap: {
    width: 60,
    height: 60,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    backgroundColor: theme.colors.surfaceAlt
  },
  icon: {
    fontSize: 28
  },
  content: {
    flex: 1
  },
  title: {
    color: theme.colors.text,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "900",
    marginBottom: 4
  },
  timeText: {
    color: theme.colors.primary,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "800"
  },
  meta: {
    color: theme.colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4
  },
  button: {
    minHeight: 44,
    width: "100%",
    marginTop: 16,
    paddingHorizontal: 14,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: "rgba(255, 107, 53, 0.7)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: theme.colors.primary,
    fontSize: 15,
    fontWeight: "900"
  },
  arrow: {
    color: theme.colors.primary,
    fontSize: 28,
    marginLeft: 8
  }
});
