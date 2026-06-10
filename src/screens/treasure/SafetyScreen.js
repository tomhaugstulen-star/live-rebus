import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function SafetyScreen({ onBack, onContinue }) {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Sikkerhet først</Text>
        <Text style={styles.text}>
          Bekreft at området er trygt, lovlig og tilgjengelig før skattejakten
          starter.
        </Text>

        <TouchableOpacity
          style={styles.confirmRow}
          onPress={() => setConfirmed((value) => !value)}
          activeOpacity={0.8}
        >
          <View style={[styles.checkbox, confirmed && styles.checkboxOn]}>
            <Text style={styles.checkboxMark}>{confirmed ? "✓" : ""}</Text>
          </View>
          <Text style={styles.confirmText}>
            Jeg bekrefter at området er trygt, lovlig og tilgjengelig.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.primaryButton, !confirmed && styles.primaryButtonDisabled]}
          onPress={onContinue}
          disabled={!confirmed}
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

        <TouchableOpacity style={styles.secondaryButton} onPress={onBack}>
          <Text style={styles.secondaryButtonText}>Tilbake</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0F172A"
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center"
  },
  title: {
    color: "#E2E8F0",
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 12
  },
  text: {
    color: "#94A3B8",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24
  },
  confirmRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: "#111827",
    marginBottom: 18,
    minHeight: 44
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#475569",
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  checkboxOn: {
    backgroundColor: "#F59E0B",
    borderColor: "#F59E0B"
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
  primaryButton: {
    minHeight: 54,
    borderRadius: 16,
    backgroundColor: "#F59E0B",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12
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
  },
  secondaryButton: {
    minHeight: 54,
    borderRadius: 16,
    backgroundColor: "#1E293B",
    alignItems: "center",
    justifyContent: "center"
  },
  secondaryButtonText: {
    color: "#E2E8F0",
    fontSize: 17,
    fontWeight: "800"
  }
});
