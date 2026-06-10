import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppButton from "../components/AppButton";
import Header from "../components/Header";
import { theme } from "../utils/theme";

export default function TreasureSetupScreen({ initialConfig, onBack, onCreateHunt }) {
  const [areaRadiusMeters, setAreaRadiusMeters] = useState(initialConfig.areaRadiusMeters);
  const [sightRadiusMeters, setSightRadiusMeters] = useState(initialConfig.sightRadiusMeters);
  const [difficulty, setDifficulty] = useState(initialConfig.difficulty);
  const [lockedMap, setLockedMap] = useState(initialConfig.lockedMap);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Skattejakt – oppsett" onBack={onBack} />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>1. Velg område</Text>

        <View style={styles.segmentRow}>
          <ChoiceCard selected title="Rundt meg" icon="⌖" />
          <ChoiceCard title="Velg på kart" icon="🗺️" disabled />
        </View>

        <Text style={styles.label}>Radius på jaktområde</Text>
        <View style={styles.chipRow}>
          {[300, 500, 800].map((value) => (
            <Chip key={value} selected={areaRadiusMeters === value} label={`${value} m`} onPress={() => setAreaRadiusMeters(value)} />
          ))}
        </View>

        <Text style={styles.sectionTitle}>2. Sikt-radius</Text>
        <View style={styles.chipRow}>
          {[40, 60, 80].map((value) => (
            <Chip key={value} selected={sightRadiusMeters === value} label={`${value} m`} onPress={() => setSightRadiusMeters(value)} />
          ))}
        </View>

        <Text style={styles.sectionTitle}>3. Vanskelighetsgrad</Text>
        <View style={styles.chipRow}>
          {[["easy", "Lett"], ["medium", "Medium"], ["hard", "Vanskelig"]].map(([value, label]) => (
            <Chip key={value} selected={difficulty === value} label={label} onPress={() => setDifficulty(value)} />
          ))}
        </View>

        <TouchableOpacity style={styles.lockRow} onPress={() => setLockedMap((value) => !value)}>
          <Text style={styles.lockIcon}>{lockedMap ? "🔒" : "🔓"}</Text>
          <Text style={styles.lockText}>Låst kart under jakten</Text>
          <View style={[styles.switch, lockedMap && styles.switchOn]}>
            <View style={[styles.switchKnob, lockedMap && styles.switchKnobOn]} />
          </View>
        </TouchableOpacity>

        <AppButton
          title="Sjekk området"
          onPress={() => onCreateHunt({ areaRadiusMeters, sightRadiusMeters, difficulty, lockedMap })}
          style={styles.mainButton}
        />

        <Text style={styles.hint}>Vi plasserer skatten tilfeldig i området.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function ChoiceCard({ title, icon, selected, disabled }) {
  return (
    <View style={[styles.choiceCard, selected && styles.choiceSelected, disabled && styles.disabled]}>
      <Text style={styles.choiceIcon}>{icon}</Text>
      <Text style={styles.choiceText}>{title}</Text>
    </View>
  );
}

function Chip({ label, selected, onPress }) {
  return (
    <TouchableOpacity style={[styles.chip, selected && styles.chipSelected]} onPress={onPress}>
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: 18, paddingBottom: 34 },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: "900",
    marginTop: 12,
    marginBottom: 10
  },
  segmentRow: { flexDirection: "row", gap: 10, marginBottom: 18 },
  choiceCard: {
    flex: 1,
    minHeight: 82,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: "center",
    justifyContent: "center"
  },
  choiceSelected: { borderColor: theme.colors.primary },
  disabled: { opacity: 0.45 },
  choiceIcon: { fontSize: 28, marginBottom: 8 },
  choiceText: { color: theme.colors.text, fontWeight: "800" },
  label: {
    color: theme.colors.textMuted,
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 8
  },
  chipRow: { flexDirection: "row", gap: 9, marginBottom: 16 },
  chip: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 13,
    borderRadius: theme.radius.md,
    alignItems: "center"
  },
  chipSelected: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
  chipText: { color: theme.colors.text, fontWeight: "800" },
  chipTextSelected: { color: theme.colors.white },
  lockRow: {
    marginTop: 8,
    marginBottom: 18,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  lockIcon: { fontSize: 22, marginRight: 10 },
  lockText: { flex: 1, color: theme.colors.text, fontWeight: "800" },
  switch: {
    width: 46,
    height: 26,
    borderRadius: 13,
    backgroundColor: theme.colors.surfaceAlt,
    padding: 3
  },
  switchOn: { backgroundColor: theme.colors.primary },
  switchKnob: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.white
  },
  switchKnobOn: { transform: [{ translateX: 20 }] },
  mainButton: { marginTop: 6 },
  hint: {
    color: theme.colors.textMuted,
    textAlign: "center",
    marginTop: 12
  }
});
