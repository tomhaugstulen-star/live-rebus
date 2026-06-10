import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppButton from "../components/AppButton";
import Header from "../components/Header";
import { theme } from "../utils/theme";

export default function SafetyScreen({ onBack, onStart }) {
  const [accepted, setAccepted] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Sikkerhet først" onBack={onBack} />

      <View style={styles.content}>
        <View style={styles.shield}>
          <Text style={styles.shieldIcon}>🚶</Text>
        </View>

        <Text style={styles.title}>Skattejakten skjer ute i virkelige omgivelser.</Text>

        <Text style={styles.text}>
          Ikke gå inn på privat eiendom, trafikkert vei, jernbaneområde, vann,
          is, byggeplasser eller annet farlig terreng.
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoIcon}>ⓘ</Text>
          <Text style={styles.infoText}>
            Appen kan ikke garantere at området er trygt. Du er selv ansvarlig for å
            vurdere sikkerhet, tilgjengelighet og lovlig ferdsel.
          </Text>
        </View>

        <TouchableOpacity style={styles.acceptRow} onPress={() => setAccepted((value) => !value)}>
          <View style={[styles.checkbox, accepted && styles.checkboxOn]}>
            <Text style={styles.checkboxText}>{accepted ? "✓" : ""}</Text>
          </View>
          <Text style={styles.acceptText}>Jeg forstår og vil bruke sunn fornuft</Text>
        </TouchableOpacity>

        <AppButton title="Start skattejakt" onPress={onStart} disabled={!accepted} />
        <AppButton title="Velg nytt område" onPress={onBack} variant="secondary" style={styles.secondary} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { flex: 1, padding: 24, justifyContent: "center" },
  shield: {
    alignSelf: "center",
    width: 110,
    height: 126,
    borderWidth: 3,
    borderColor: theme.colors.primary,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28
  },
  shieldIcon: { fontSize: 44 },
  title: {
    color: theme.colors.text,
    fontSize: 19,
    fontWeight: "900",
    textAlign: "center",
    lineHeight: 27,
    marginBottom: 16
  },
  text: {
    color: theme.colors.text,
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 28
  },
  infoBox: {
    flexDirection: "row",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 20
  },
  infoIcon: { color: theme.colors.treasure, fontSize: 18, marginRight: 10 },
  infoText: { flex: 1, color: theme.colors.textMuted, lineHeight: 20 },
  acceptRow: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  checkboxOn: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
  checkboxText: { color: theme.colors.white, fontWeight: "900" },
  acceptText: { color: theme.colors.text, fontWeight: "800", flex: 1 },
  secondary: { marginTop: 10 }
});
