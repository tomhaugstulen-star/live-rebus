import React, { useMemo, useState } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

function getSignalLabel(distance) {
  if (distance <= 5) return "Veldig sterkt";
  if (distance <= 15) return "Sterkt";
  if (distance <= 30) return "Middels";
  return "Svakt";
}

export default function TreasureHuntScreen({ onBack, onFound }) {
  const [distance, setDistance] = useState(12);
  const [showHint, setShowHint] = useState(false);

  const signalLabel = useMemo(() => getSignalLabel(distance), [distance]);
  const canOpenTreasure = distance <= 5;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>Tilbake</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Skattejakt</Text>
        <Text style={styles.text}>Radarmodus i web-test uten kart og GPS.</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sonar</Text>
          <View style={styles.sonarWrap}>
            <View style={styles.sonarCenter}>
              <View style={styles.sonarDot} />
            </View>
            <View style={[styles.pulseRing, styles.pulseRing1]} />
            <View style={[styles.pulseRing, styles.pulseRing2]} />
            <View style={[styles.pulseRing, styles.pulseRing3]} />
          </View>
          <Text style={styles.metric}>Avstand til skatt: {distance} meter</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Signal</Text>
          <View style={styles.signalRow}>
            <View style={styles.signalBar}>
              <View
                style={[
                  styles.signalFill,
                  distance <= 30 && styles.signalFillOn,
                  distance <= 15 && styles.signalFillStrong,
                  distance <= 5 && styles.signalFillVeryStrong
                ]}
              />
            </View>
            <Text style={styles.metric}>{signalLabel}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => setShowHint((value) => !value)}
        >
          <Text style={styles.secondaryButtonText}>
            {showHint ? "Skjul hint" : "Vis hint"}
          </Text>
        </TouchableOpacity>

        {showHint ? (
          <View style={styles.hintBox}>
            <Text style={styles.hintText}>
              Se etter et tydelig landemerke i nærheten.
            </Text>
          </View>
        ) : null}

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() =>
            Alert.alert("Kart", "Kartmodus kobles inn senere på web.")
          }
        >
          <Text style={styles.secondaryButtonText}>Vis kart</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => setDistance(4)}
        >
          <Text style={styles.secondaryButtonText}>Demo: gå nærmere</Text>
        </TouchableOpacity>

        {!canOpenTreasure ? (
          <Text style={styles.helperText}>
            Du må være nærmere skatten for å åpne den.
          </Text>
        ) : null}

        <TouchableOpacity
          style={[
            styles.primaryButton,
            !canOpenTreasure && styles.primaryButtonDisabled
          ]}
          onPress={canOpenTreasure ? onFound : undefined}
          disabled={!canOpenTreasure}
        >
          <Text
            style={[
              styles.primaryButtonText,
              !canOpenTreasure && styles.primaryButtonTextDisabled
            ]}
          >
            Åpne skatt
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
    flexGrow: 1,
    padding: 20,
    justifyContent: "center"
  },
  topRow: {
    alignItems: "flex-start",
    marginBottom: 16
  },
  backButton: {
    minHeight: 44,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: "#1E293B",
    alignItems: "center",
    justifyContent: "center"
  },
  backButtonText: {
    color: "#E2E8F0",
    fontSize: 15,
    fontWeight: "800"
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
    marginBottom: 20
  },
  card: {
    backgroundColor: "#1E293B",
    borderRadius: 18,
    padding: 20,
    marginBottom: 16
  },
  cardTitle: {
    color: "#F59E0B",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 14
  },
  sonarWrap: {
    height: 180,
    borderRadius: 18,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    overflow: "hidden"
  },
  sonarCenter: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F59E0B",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2
  },
  sonarDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#111827"
  },
  pulseRing: {
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(34, 197, 94, 0.45)",
    borderRadius: 999
  },
  pulseRing1: {
    width: 70,
    height: 70
  },
  pulseRing2: {
    width: 110,
    height: 110
  },
  pulseRing3: {
    width: 150,
    height: 150
  },
  metric: {
    color: "#E2E8F0",
    fontSize: 16,
    fontWeight: "700"
  },
  signalRow: {
    gap: 10
  },
  signalBar: {
    height: 14,
    borderRadius: 999,
    backgroundColor: "#334155",
    overflow: "hidden"
  },
  signalFill: {
    height: "100%",
    width: "20%",
    backgroundColor: "#475569"
  },
  signalFillOn: {
    width: "45%",
    backgroundColor: "#94A3B8"
  },
  signalFillStrong: {
    width: "70%",
    backgroundColor: "#F59E0B"
  },
  signalFillVeryStrong: {
    width: "95%",
    backgroundColor: "#22C55E"
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
  helperText: {
    color: "#94A3B8",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12
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
