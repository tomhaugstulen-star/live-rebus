import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function TreasureFoundScreen({ onBack, onContinue, onMenu }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Skatten er funnet</Text>
        <Text style={styles.text}>Du åpnet skatten i web-testmodus.</Text>

        <View style={styles.card}>
          <Text style={styles.status}>Funn registrert</Text>
          <Text style={styles.cardText}>
            Skatten er bekreftet, og neste steg kan kobles på senere.
          </Text>
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={onContinue}>
          <Text style={styles.primaryButtonText}>Fortsett</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={onMenu}>
          <Text style={styles.secondaryButtonText}>Til meny</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Tilbake</Text>
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
  card: {
    backgroundColor: "#1E293B",
    borderRadius: 18,
    padding: 20,
    marginBottom: 16
  },
  status: {
    color: "#22C55E",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 8
  },
  cardText: {
    color: "#E2E8F0",
    fontSize: 15,
    lineHeight: 22
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
    justifyContent: "center",
    marginBottom: 12
  },
  secondaryButtonText: {
    color: "#E2E8F0",
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
