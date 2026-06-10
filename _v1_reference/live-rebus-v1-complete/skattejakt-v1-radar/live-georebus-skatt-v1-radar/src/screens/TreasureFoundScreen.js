import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";
import { theme } from "../utils/theme";

export default function TreasureFoundScreen({ onResult, xpAwarded = 75 }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.topTitle}>Skatt funnet</Text>

        <View style={styles.chestCircle}>
          <Text style={styles.chest}>🧰</Text>
        </View>

        <Text style={styles.title}>Skatt funnet!</Text>
        <Text style={styles.subtitle}>Skatten er registrert.</Text>
        <Text style={styles.xp}>+{xpAwarded} XP</Text>

        <View style={styles.feedbackRow}>
          <Feedback icon="🔊" label="Lyd" />
          <Feedback icon="📳" label="Vibrasjon" />
          <Feedback icon="✅" label="Godkjent" />
        </View>

        <AppButton title="Se resultat" onPress={onResult} style={styles.button} />
      </View>
    </SafeAreaView>
  );
}

function Feedback({ icon, label }) {
  return (
    <View style={styles.feedback}>
      <Text style={styles.feedbackIcon}>{icon}</Text>
      <Text style={styles.feedbackLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center"
  },
  topTitle: {
    color: theme.colors.treasure,
    fontWeight: "900",
    fontSize: 17,
    marginBottom: 28
  },
  chestCircle: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: "rgba(245, 158, 11, 0.16)",
    borderWidth: 2,
    borderColor: theme.colors.treasure,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24
  },
  chest: { fontSize: 52 },
  title: {
    color: theme.colors.treasure,
    fontSize: 34,
    fontWeight: "900",
    marginBottom: 8
  },
  subtitle: {
    color: theme.colors.text,
    fontSize: 16,
    marginBottom: 18
  },
  xp: {
    color: theme.colors.primary,
    fontSize: 34,
    fontWeight: "900",
    marginBottom: 30
  },
  feedbackRow: {
    flexDirection: "row",
    gap: 18,
    marginBottom: 26
  },
  feedback: { alignItems: "center", minWidth: 78 },
  feedbackIcon: { fontSize: 28 },
  feedbackLabel: { color: theme.colors.textMuted, fontSize: 13, marginTop: 6 },
  button: { width: "100%" }
});
