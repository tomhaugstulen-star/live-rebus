import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function AreaCheckScreen({ onBack, onContinue }) {
  const areaRows = [
    { label: "Tilgjengelighet", value: "Åpent" },
    { label: "Terreng", value: "Lett" },
    { label: "Sikt", value: "God" },
    { label: "Risiko", value: "Lav" }
  ];

  const checklistRows = [
    "Ingen private soner i demo",
    "Ingen krevende terrengpunkter",
    "Passer for kort testøkt"
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
          <Text style={styles.kickerText}>Områdesjekk</Text>
        </View>

        <Text style={styles.title}>Sjekk område</Text>
        <Text style={styles.body}>
          Kontroller at området egner seg for skattejakt før du går videre.
        </Text>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardBadge}>
              <Text style={styles.cardBadgeText}>Demo-område</Text>
            </View>
          </View>

          {areaRows.map((row, index) => (
            <View
              key={row.label}
              style={[
                styles.summaryRow,
                index === areaRows.length - 1 && styles.summaryRowLast
              ]}
            >
              <Text style={styles.summaryLabel}>{row.label}</Text>
              <Text style={styles.summaryValue}>{row.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Kontrollpunkter</Text>

          {checklistRows.map((item, index) => (
            <View
              key={item}
              style={[
                styles.checkRow,
                index === checklistRows.length - 1 && styles.checkRowLast
              ]}
            >
              <View style={styles.checkIcon}>
                <Text style={styles.checkIconText}>✓</Text>
              </View>
              <Text style={styles.checkText}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.noteCard}>
          <Text style={styles.noteTitle}>Neste steg</Text>
          <Text style={styles.noteText}>
            På neste skjerm må brukeren bekrefte at området faktisk er trygt,
            lovlig og tilgjengelig.
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
  cardHeader: {
    marginBottom: 10
  },
  cardBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#334155",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  cardBadgeText: {
    color: "#E2E8F0",
    fontSize: 13,
    fontWeight: "800"
  },
  summaryRow: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(148, 163, 184, 0.12)"
  },
  summaryRowLast: {
    borderBottomWidth: 0
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
  sectionTitle: {
    color: "#E2E8F0",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 8
  },
  checkRow: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(148, 163, 184, 0.12)"
  },
  checkRowLast: {
    borderBottomWidth: 0,
    paddingBottom: 0
  },
  checkIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(34, 197, 94, 0.14)",
    borderWidth: 1,
    borderColor: "rgba(34, 197, 94, 0.28)",
    marginRight: 12
  },
  checkIconText: {
    color: "#22C55E",
    fontSize: 14,
    fontWeight: "900",
    lineHeight: 16
  },
  checkText: {
    flex: 1,
    color: "#E2E8F0",
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "600"
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
