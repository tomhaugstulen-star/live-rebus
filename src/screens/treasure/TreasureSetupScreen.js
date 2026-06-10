import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function TreasureSetupScreen({ onBack, onContinue }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Skattejakt setup</Text>
        <Text style={styles.text}>Denne skjermen rendres nå.</Text>

        <TouchableOpacity style={styles.primaryButton} onPress={onContinue}>
          <Text style={styles.primaryButtonText}>Fortsett</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onBack}>
          <Text style={styles.buttonText}>Tilbake</Text>
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
    marginBottom: 24
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
  button: {
    minHeight: 54,
    borderRadius: 16,
    backgroundColor: "#1E293B",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: "#111827",
    fontSize: 17,
    fontWeight: "800"
  }
});
