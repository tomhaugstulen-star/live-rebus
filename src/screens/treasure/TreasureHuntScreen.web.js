import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function TreasureHuntScreen({ onBack, onFound }) {
  const [showHint, setShowHint] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Skattejakt</Text>
        <Text style={styles.text}>Web-testmodus uten kart og GPS.</Text>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Avstand til skatt</Text>
          <Text style={styles.distance}>12 meter</Text>
          <Text style={styles.signal}>Signal: Sterkt</Text>
        </View>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => setShowHint((value) => !value)}
        >
          <Text style={styles.secondaryButtonText}>Vis hint</Text>
        </TouchableOpacity>

        {showHint ? (
          <View style={styles.hintBox}>
            <Text style={styles.hintText}>
              Se etter et tydelig landemerke i nærheten.
            </Text>
          </View>
        ) : null}

        <TouchableOpacity style={styles.primaryButton} onPress={onFound}>
          <Text style={styles.primaryButtonText}>Åpne skatt</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Tilbake</Text>
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
    flexGrow: 1,
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
  card: {
    backgroundColor: "#1E293B",
    borderRadius: 18,
    padding: 20,
    marginBottom: 16
  },
  cardLabel: {
    color: "#94A3B8",
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "700"
  },
  distance: {
    color: "#E2E8F0",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 6
  },
  signal: {
    color: "#22C55E",
    fontSize: 16,
    fontWeight: "800"
  },
  secondaryButton: {
    minHeight: 54,
    borderRadius: 16,
    backgroundColor: "#334155",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12
  },
  secondaryButtonText: {
    color: "#E2E8F0",
    fontSize: 17,
    fontWeight: "800"
  },
  hintBox: {
    backgroundColor: "#1E293B",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#334155"
  },
  hintText: {
    color: "#E2E8F0",
    fontSize: 16,
    lineHeight: 23
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
  backButton: {
    minHeight: 54,
    borderRadius: 16,
    backgroundColor: "#1E293B",
    alignItems: "center",
    justifyContent: "center"
  },
  backButtonText: {
    color: "#E2E8F0",
    fontSize: 17,
    fontWeight: "800"
  }
});
