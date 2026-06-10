import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function SafetyScreen({ onBack, onContinue }) {
  const [confirmed, setConfirmed] = useState(false);

  const checklistRows = [
    "Jeg holder meg på lovlige og tilgjengelige områder.",
    "Jeg unngår trafikk, vannkanter og farlig terreng.",
    "Jeg avbryter hvis området ikke føles trygt."
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
          <Text style={styles.kickerText}>Sikkerhet</Text>
        </View>

        <Text style={styles.title}>Sikkerhet først</Text>
        <Text style={styles.body}>
          Bekreft at området er trygt, lovlig og tilgjengelig før skattejakten
          starter.
        </Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Før start</Text>

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

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Bekreftelse</Text>

          <TouchableOpacity
            onPress={() => setConfirmed((value) => !value)}
            style={[
              styles.confirmRow,
              confirmed && styles.confirmRowActive
            ]}
            accessibilityRole="button"
            accessibilityState={{ checked: confirmed }}
            accessibilityLabel="Jeg bekrefter at området er trygt, lovlig og tilgjengelig."
          >
            <View style={[styles.checkbox, confirmed && styles.checkboxOn]}>
              <Text style={styles.checkboxMark}>{confirmed ? "✓" : ""}</Text>
            </View>
            <Text style={styles.confirmText}>
              Jeg bekrefter at området er trygt, lovlig og tilgjengelig.
            </Text>
          </TouchableOpacity>
        </View>

        {!confirmed ? (
          <Text style={styles.helperText}>
            Du må bekrefte sikkerheten før du kan starte.
          </Text>
        ) : null}

        <TouchableOpacity
          style={[
            styles.primaryButton,
            !confirmed && styles.primaryButtonDisabled
          ]}
          onPress={onContinue}
          disabled={!confirmed}
          accessibilityRole="button"
          accessibilityState={{ disabled: !confirmed }}
          accessibilityLabel="Start skattejakt"
        >
          <Text
            style={[
              styles.primaryButtonText,
              !confirmed && styles.primaryButtonTextDisabled
            ]}
          >
            Start skattejakt
          </Text>
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
  sectionTitle: {
    color: "#E2E8F0",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 10
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
    backgroundColor: "rgba(245, 158, 11, 0.14)",
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.28)",
    marginRight: 12
  },
  checkIconText: {
    color: "#F59E0B",
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
  confirmRow: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: "#334155",
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.14)"
  },
  confirmRowActive: {
    backgroundColor: "rgba(34, 197, 94, 0.12)",
    borderColor: "rgba(34, 197, 94, 0.28)"
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#64748B",
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  checkboxOn: {
    backgroundColor: "#22C55E",
    borderColor: "#22C55E"
  },
  checkboxMark: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "900"
  },
  confirmText: {
    flex: 1,
    color: "#E2E8F0",
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "600"
  },
  helperText: {
    color: "#94A3B8",
    fontSize: 14,
    lineHeight: 20,
    marginTop: -2,
    marginBottom: 18
  },
  primaryButton: {
    minHeight: 54,
    borderRadius: 16,
    backgroundColor: "#F59E0B",
    alignItems: "center",
    justifyContent: "center"
  },
  primaryButtonDisabled: {
    backgroundColor: "#334155"
  },
  primaryButtonText: {
    color: "#111827",
    fontSize: 17,
    fontWeight: "800"
  },
  primaryButtonTextDisabled: {
    color: "#94A3B8"
  }
});
