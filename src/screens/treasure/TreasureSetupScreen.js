import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function TreasureSetupScreen({ onBack, onContinue }) {
  const [difficulty, setDifficulty] = useState("Lett");

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          onPress={onBack}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Tilbake"
        >
          <Text style={styles.backButtonText}>Tilbake</Text>
        </TouchableOpacity>

        <View style={styles.kicker}>
          <Text style={styles.kickerText}>Skattejakt</Text>
        </View>

        <Text style={styles.title}>Sett opp skattejakt</Text>
        <Text style={styles.body}>
          Velg en enkel demo-konfigurasjon før området sjekkes.
        </Text>

        <View style={styles.card}>
          <View style={styles.cardAccent} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Modus</Text>
            <Text style={styles.summaryValue}>Sonar</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Område</Text>
            <Text style={styles.summaryValue}>Demo-område</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Skatter</Text>
            <Text style={styles.summaryValue}>1</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Estimert tid</Text>
            <Text style={styles.summaryValue}>10–15 min</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Velg vanskelighetsgrad</Text>
          <View style={styles.difficultyRow}>
            {["Lett", "Middels", "Vanskelig"].map((option, index) => {
              const selected = option === difficulty;
              return (
                <TouchableOpacity
                  key={option}
                  onPress={() => setDifficulty(option)}
                  style={[
                    styles.difficultyButton,
                    index > 0 && styles.difficultyButtonSpaced,
                    selected && styles.difficultyButtonSelected
                  ]}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                >
                  <Text
                    style={[
                      styles.difficultyText,
                      selected && styles.difficultyTextSelected
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.noteCard}>
          <Text style={styles.noteTitle}>Før du starter</Text>
          <Text style={styles.noteText}>
            Neste steg kontrollerer at området er trygt, lovlig og tilgjengelig.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={onContinue}
          accessibilityRole="button"
          accessibilityLabel="Fortsett"
        >
          <Text style={styles.primaryButtonText}>Fortsett</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0F172A"
  },
  container: {
    padding: 20,
    paddingBottom: 28
  },
  backButton: {
    minHeight: 44,
    alignSelf: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 8,
    marginBottom: 16
  },
  backButtonText: {
    color: "#F59E0B",
    fontSize: 16,
    fontWeight: "700"
  },
  kicker: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(245, 158, 11, 0.14)",
    borderColor: "rgba(245, 158, 11, 0.35)",
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 14
  },
  kickerText: {
    color: "#F59E0B",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0.6,
    textTransform: "uppercase"
  },
  title: {
    color: "#E2E8F0",
    fontSize: 29,
    fontWeight: "800",
    lineHeight: 34,
    marginBottom: 10
  },
  body: {
    color: "#94A3B8",
    fontSize: 16,
    lineHeight: 23,
    marginBottom: 18
  },
  card: {
    backgroundColor: "#1E293B",
    borderRadius: 20,
    padding: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.12)"
  },
  cardAccent: {
    height: 4,
    width: 56,
    borderRadius: 999,
    backgroundColor: "#F59E0B",
    marginBottom: 16
  },
  summaryRow: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(148, 163, 184, 0.12)"
  },
  summaryLabel: {
    color: "#94A3B8",
    fontSize: 15,
    fontWeight: "600"
  },
  summaryValue: {
    color: "#E2E8F0",
    fontSize: 15,
    fontWeight: "700"
  },
  section: {
    marginBottom: 18
  },
  sectionTitle: {
    color: "#E2E8F0",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 12
  },
  difficultyRow: {
    flexDirection: "row"
  },
  difficultyButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#334155",
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.16)"
  },
  difficultyButtonSpaced: {
    marginLeft: 10
  },
  difficultyButtonSelected: {
    backgroundColor: "#F59E0B",
    borderColor: "#F59E0B"
  },
  difficultyText: {
    color: "#E2E8F0",
    fontSize: 15,
    fontWeight: "700"
  },
  difficultyTextSelected: {
    color: "#111827"
  },
  noteCard: {
    backgroundColor: "#1E293B",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(34, 197, 94, 0.22)"
  },
  noteTitle: {
    color: "#22C55E",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 8
  },
  noteText: {
    color: "#94A3B8",
    fontSize: 16,
    lineHeight: 23
  },
  primaryButton: {
    minHeight: 54,
    borderRadius: 16,
    backgroundColor: "#F59E0B",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2
  },
  primaryButtonText: {
    color: "#111827",
    fontSize: 17,
    fontWeight: "800"
  }
});