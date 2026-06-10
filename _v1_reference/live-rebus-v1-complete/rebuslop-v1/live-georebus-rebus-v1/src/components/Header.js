import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../utils/theme";

export default function Header({ title, onBack, rightText, onRight }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.side} onPress={onBack} disabled={!onBack}>
        <Text style={styles.backText}>{onBack ? "‹" : ""}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity style={styles.side} onPress={onRight} disabled={!onRight}>
        <Text style={styles.rightText}>{rightText || ""}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 54,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  side: {
    width: 54,
    height: 44,
    justifyContent: "center"
  },
  backText: {
    color: theme.colors.text,
    fontSize: 34,
    lineHeight: 34
  },
  title: {
    flex: 1,
    textAlign: "center",
    color: theme.colors.primary,
    fontSize: 17,
    fontWeight: "900"
  },
  rightText: {
    color: theme.colors.textMuted,
    textAlign: "right",
    fontSize: 14,
    fontWeight: "800"
  }
});
