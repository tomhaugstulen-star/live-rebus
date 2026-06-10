import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppButton from "../components/AppButton";
import { theme } from "../utils/theme";

export default function ChallengeSelectScreen({ onSelectTreasure, onSelectRebus }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>2</Text>
        </View>

        <Text style={styles.kicker}>Velg utfordring</Text>
        <Text style={styles.title}>Live Rebus</Text>
        <Text style={styles.subtitle}>To utfordringer. To opplevelser.</Text>

        <TouchableOpacity style={[styles.card, styles.rebusCard]} onPress={onSelectRebus}>
          <View style={styles.iconCirclePurple}>
            <Text style={styles.icon}>🧩</Text>
          </View>
          <Text style={styles.cardTitlePurple}>Rebusløp</Text>
          <Text style={styles.cardText}>Samme rute. Samme spørsmål. Motsatt vei.</Text>
          <AppButton title="Velg rebusløp" onPress={onSelectRebus} style={styles.button} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, styles.treasureCard]} onPress={onSelectTreasure}>
          <View style={styles.iconCircleGold}>
            <Text style={styles.icon}>🪙</Text>
          </View>
          <Text style={styles.cardTitleGold}>Skattejakt</Text>
          <Text style={styles.cardText}>Utforsk kartet. Finn skatten i tåken eller på radaren.</Text>
          <AppButton title="Velg skattejakt" onPress={onSelectTreasure} style={styles.button} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: 24, paddingBottom: 40 },
  badge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18
  },
  badgeText: { color: theme.colors.white, fontWeight: "900" },
  kicker: {
    color: theme.colors.primary,
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 20
  },
  title: {
    color: theme.colors.text,
    fontSize: 34,
    fontWeight: "900"
  },
  subtitle: {
    color: theme.colors.textMuted,
    fontSize: 15,
    marginTop: 8,
    marginBottom: 24
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: 20,
    borderWidth: 1,
    marginBottom: 18
  },
  rebusCard: { borderColor: "rgba(139, 92, 246, 0.55)" },
  treasureCard: { borderColor: "rgba(245, 158, 11, 0.65)" },
  iconCirclePurple: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(139, 92, 246, 0.22)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14
  },
  iconCircleGold: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(245, 158, 11, 0.22)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14
  },
  icon: { fontSize: 30 },
  cardTitlePurple: {
    color: theme.colors.history,
    fontSize: 22,
    fontWeight: "900"
  },
  cardTitleGold: {
    color: theme.colors.treasure,
    fontSize: 22,
    fontWeight: "900"
  },
  cardText: {
    color: theme.colors.text,
    fontSize: 16,
    lineHeight: 23,
    marginTop: 8
  },
  button: { marginTop: 18 }
});
