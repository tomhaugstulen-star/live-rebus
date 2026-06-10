import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function TreasureFoundScreen({ onBack, onContinue, onMenu }) {
  const rewardRows = [
    { label: "XP", value: "+120" },
    { label: "Skatter", value: "1" },
    { label: "Status", value: "Fullført" }
  ];

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
          <Text style={styles.kickerText}>Funn</Text>
        </View>

        <Text style={styles.title}>Skatten er funnet</Text>
        <Text style={styles.body}>Du åpnet skatten i web-testmodus.</Text>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.successMark}>
              <Text style={styles.successMarkText}>✓</Text>
            </View>
            <Text style={styles.sectionTitle}>Funn registrert</Text>
          </View>
          <Text style={styles.cardText}>
            Skatten er markert som åpnet, og resultatet er klart.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Belønning</Text>

          {rewardRows.map((row, index) => (
            <View
              key={row.label}
              style={[
                styles.rewardRow,
                index === rewardRows.length - 1 && styles.rewardRowLast
              ]}
            >
              <Text style={styles.rewardLabel}>{row.label}</Text>
              <Text style={styles.rewardValue}>{row.value}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={onContinue}
          accessibilityRole="button"
          accessibilityLabel="Fortsett"
        >
          <Text style={styles.primaryButtonText}>Fortsett</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={onMenu}
          accessibilityRole="button"
          accessibilityLabel="Til meny"
        >
          <Text style={styles.secondaryButtonText}>Til meny</Text>
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
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  successMark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(34, 197, 94, 0.14)",
    borderWidth: 1,
    borderColor: "rgba(34, 197, 94, 0.3)",
    marginRight: 10
  },
  successMarkText: {
    color: "#22C55E",
    fontSize: 16,
    fontWeight: "900",
    lineHeight: 18
  },
  sectionTitle: {
    color: "#E2E8F0",
    fontSize: 16,
    fontWeight: "800"
  },
  cardText: {
    color: "#E2E8F0",
    fontSize: 15,
    lineHeight: 22
  },
  rewardRow: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(148, 163, 184, 0.12)"
  },
  rewardRowLast: {
    borderBottomWidth: 0
  },
  rewardLabel: {
    color: "#94A3B8",
    fontSize: 15,
    fontWeight: "600"
  },
  rewardValue: {
    color: "#E2E8F0",
    fontSize: 15,
    fontWeight: "700"
  },
  primaryButton: {
    minHeight: 54,
    borderRadius: 16,
    backgroundColor: "#F59E0B",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12
  },
  primaryButtonText: {
    color: "#111827",
    fontSize: 17,
    fontWeight: "800"
  },
  secondaryButton: {
    minHeight: 54,
    borderRadius: 16,
    backgroundColor: "#334155",
    alignItems: "center",
    justifyContent: "center"
  },
  secondaryButtonText: {
    color: "#E2E8F0",
    fontSize: 17,
    fontWeight: "800"
  }
});
