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
      <View style={styles.iconWrap}>
        <Text style={styles.icon}>📅</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>

        <Text style={styles.timeText} numberOfLines={1}>
          {timeText}
        </Text>

        <Text style={styles.meta} numberOfLines={1}>
          {meta}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel="Åpne venterom"
      >
        <Text style={styles.buttonText} numberOfLines={1}>
          Åpne venterom
        </Text>

        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 108,
    backgroundColor: "rgba(10, 18, 31, 0.9)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center"
  },

  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    backgroundColor: "rgba(124, 58, 237, 0.16)"
  },

  icon: {
    fontSize: 26
  },

  content: {
    flex: 1,
    minWidth: 0,
    paddingRight: 10
  },

  title: {
    color: "#A855F7",
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
    minHeight: 48,
    minWidth: 128,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },

  buttonText: {
    color: theme.colors.primary,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "900"
  },

  arrow: {
    color: theme.colors.primary,
    fontSize: 28,
    lineHeight: 28,
    fontWeight: "700",
    marginLeft: 8,
    marginTop: -1
  }
});