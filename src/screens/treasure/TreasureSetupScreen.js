import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import TreasureSetupHeader from "../../components/treasure/TreasureSetupHeader";

const COLORS = {
  background: "#020A14",
  backgroundDeep: "#06101F",
  surface: "rgba(12, 18, 38, 0.72)",
  surfaceCard: "#091426",
  surfaceCardAlt: "#0E1126",
  stroke: "rgba(255, 255, 255, 0.12)",
  strokeSoft: "rgba(148, 163, 184, 0.16)",
  textPrimary: "#F7F7F2",
  textSecondary: "#BFC3CC",
  textMuted: "#8D94A3",
  orange: "#FF6A00",
  orangeHot: "#FF3D00",
  orangeLight: "#FFC04A",
  purple: "#8E2DFF",
  purpleLight: "#B760FF",
  green: "#22C55E",
  greenDark: "#45C84A",
  amberGlow: "rgba(255, 106, 0, 0.42)"
};

function OptionCard({ label, icon, selected, onPress, selectedAccent }) {
  return (
    <TouchableOpacity
      style={[
        styles.optionCard,
        selected ? styles.optionCardSelected : styles.optionCardInactive,
        selected && { borderColor: selectedAccent }
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      activeOpacity={0.88}
    >
      <View style={[styles.optionIconWrap, selected && { borderColor: selectedAccent }]}>
        <Text style={[styles.optionIcon, selected && { color: selectedAccent }]}>{icon}</Text>
      </View>
      <Text style={styles.optionLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

function SegmentButton({ label, selected, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.segmentButton, selected ? styles.segmentButtonSelected : styles.segmentButtonIdle]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      activeOpacity={0.88}
    >
      <Text style={[styles.segmentLabel, selected && styles.segmentLabelSelected]} numberOfLines={1}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function DifficultyCard({ label, stars, accentColor, selected, onPress }) {
  return (
    <TouchableOpacity
      style={[
        styles.difficultyCard,
        selected ? styles.difficultyCardSelected : styles.difficultyCardIdle,
        { borderColor: selected ? COLORS.orangeLight : "rgba(148, 163, 184, 0.18)" }
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      activeOpacity={0.88}
    >
      <Text style={[styles.difficultyStars, { color: accentColor }]}>{stars}</Text>
      <Text style={[styles.difficultyLabel, { color: accentColor }, selected && styles.difficultyLabelSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function FieldCard({ title, helper, children, style }) {
  return (
    <View style={[styles.fieldCard, style]}>
      <Text style={styles.fieldTitle}>{title}</Text>
      {helper ? <Text style={styles.fieldHelper}>{helper}</Text> : null}
      {children}
    </View>
  );
}

export default function TreasureSetupScreen({ onBack, onContinue }) {
  const [selectedArea, setSelectedArea] = useState("Rundt meg");
  const [selectedRadius, setSelectedRadius] = useState("500 m");
  const [selectedSightRadius, setSelectedSightRadius] = useState("60 m");
  const [difficulty, setDifficulty] = useState("Medium");

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.backgroundGlowTop} />
      <View style={styles.backgroundGlowBottom} />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <TreasureSetupHeader onBack={onBack} onHelp={() => {}} />

        <Text style={styles.sectionHeading}>1. Velg område</Text>
        <View style={styles.areaRow}>
          <View style={styles.areaColumn}>
            <OptionCard
              label="Rundt meg"
              icon="⌖"
              selected={selectedArea === "Rundt meg"}
              onPress={() => setSelectedArea("Rundt meg")}
              selectedAccent={COLORS.orangeLight}
            />
          </View>
          <View style={styles.areaColumn}>
            <OptionCard
              label="Velg på kart"
              icon="🗺"
              selected={selectedArea === "Velg på kart"}
              onPress={() => setSelectedArea("Velg på kart")}
              selectedAccent={COLORS.orangeLight}
            />
          </View>
        </View>

        <FieldCard
          title="Radius på jaktområde"
          helper="Hvor stort område skal vi lete i?"
          style={styles.radiusCard}
        >
          <View style={styles.segmentRow}>
            {["300 m", "500 m", "800 m"].map((option, index) => (
              <View key={option} style={[styles.segmentColumn, index > 0 && styles.segmentColumnGap]}>
                <SegmentButton
                  label={option}
                  selected={selectedRadius === option}
                  onPress={() => setSelectedRadius(option)}
                />
              </View>
            ))}
          </View>
        </FieldCard>

        <FieldCard
          title="2. Sikt-radius (hvor langt du ser)"
          style={styles.tightFieldCard}
        >
          <View style={styles.segmentRow}>
            {["40 m", "60 m", "80 m"].map((option, index) => (
              <View key={option} style={[styles.segmentColumn, index > 0 && styles.segmentColumnGap]}>
                <SegmentButton
                  label={option}
                  selected={selectedSightRadius === option}
                  onPress={() => setSelectedSightRadius(option)}
                />
              </View>
            ))}
          </View>
        </FieldCard>

        <FieldCard title="3. Vanskelighetsgrad" style={styles.tightFieldCard}>
          <View style={styles.difficultyRow}>
            <View style={styles.difficultyColumn}>
              <DifficultyCard
                label="Lett"
                stars="★"
                accentColor={COLORS.greenDark}
                selected={difficulty === "Lett"}
                onPress={() => setDifficulty("Lett")}
              />
            </View>
            <View style={styles.difficultyColumn}>
              <DifficultyCard
                label="Medium"
                stars="★★"
                accentColor={COLORS.orange}
                selected={difficulty === "Medium"}
                onPress={() => setDifficulty("Medium")}
              />
            </View>
            <View style={styles.difficultyColumn}>
              <DifficultyCard
                label="Vanskelig"
                stars="★★★"
                accentColor={COLORS.purple}
                selected={difficulty === "Vanskelig"}
                onPress={() => setDifficulty("Vanskelig")}
              />
            </View>
          </View>
        </FieldCard>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={onContinue}
          accessibilityRole="button"
          accessibilityLabel="Sjekk området"
          activeOpacity={0.9}
        >
          <Text style={styles.primaryButtonIcon}>▶</Text>
          <Text style={styles.primaryButtonText}>Sjekk området</Text>
        </TouchableOpacity>

        <Text style={styles.footerHelper}>Vi plasserer skatten tilfeldig i området.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  backgroundGlowTop: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(255, 106, 0, 0.08)"
  },
  backgroundGlowBottom: {
    position: "absolute",
    left: 0,
    bottom: 90,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(142, 45, 255, 0.06)"
  },
  container: {
    paddingHorizontal: 14,
    paddingTop: 6,
    paddingBottom: 56,
    width: "100%",
    alignSelf: "stretch"
  },
  header: {
    minHeight: 84,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    position: "relative"
  },
  headerTitle: {
    position: "absolute",
    left: 56,
    right: 56,
    textAlign: "center",
    color: COLORS.orange,
    fontSize: 28,
    lineHeight: 35,
    fontWeight: "900",
    letterSpacing: -0.5
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(9, 20, 38, 0.72)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    zIndex: 2
  },
  headerButtonText: {
    color: COLORS.textPrimary,
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 24
  },
  sectionHeading: {
    color: COLORS.textPrimary,
    fontSize: 23,
    lineHeight: 29,
    fontWeight: "800",
    marginBottom: 12
  },
  areaRow: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 16
  },
  areaColumn: {
    flex: 1,
    minWidth: 0
  },
  optionCard: {
    width: "100%",
    alignSelf: "stretch",
    minHeight: 110,
    borderRadius: 22,
    borderWidth: 1.5,
    paddingHorizontal: 12,
    paddingTop: 18,
    paddingBottom: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.surfaceCard,
    shadowColor: "#000",
    shadowOpacity: 0.24,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4
  },
  optionCardInactive: {
    borderColor: "rgba(148, 163, 184, 0.22)"
  },
  optionCardSelected: {
    backgroundColor: "rgba(12, 18, 38, 0.98)",
    shadowColor: COLORS.orange,
    shadowOpacity: 0.26,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8
  },
  optionIconWrap: {
    width: 84,
    height: 84,
    borderRadius: 42,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    backgroundColor: "rgba(255,255,255,0.02)"
  },
  optionIcon: {
    color: COLORS.textSecondary,
    fontSize: 42,
    lineHeight: 44,
    fontWeight: "700"
  },
  optionLabel: {
    color: COLORS.textPrimary,
    fontSize: 17,
    lineHeight: 22,
    textAlign: "center",
    fontWeight: "500"
  },
  fieldCard: {
    width: "100%",
    alignSelf: "stretch",
    borderRadius: 24,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.22,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4
  },
  radiusCard: {
    paddingBottom: 16
  },
  tightFieldCard: {
    paddingBottom: 16
  },
  fieldTitle: {
    color: COLORS.textPrimary,
    fontSize: 21,
    lineHeight: 27,
    fontWeight: "800"
  },
  fieldHelper: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
    marginBottom: 14
  },
  segmentRow: {
    flexDirection: "row"
  },
  segmentColumn: {
    flex: 1,
    minWidth: 0
  },
  segmentColumnGap: {
    marginLeft: 10
  },
  segmentButton: {
    width: "100%",
    alignSelf: "stretch",
    minHeight: 56,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.18)",
    backgroundColor: COLORS.surfaceCardAlt
  },
  segmentButtonIdle: {
    backgroundColor: COLORS.surfaceCardAlt
  },
  segmentButtonSelected: {
    backgroundColor: COLORS.orange,
    borderColor: COLORS.orangeLight,
    shadowColor: COLORS.orange,
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8
  },
  segmentLabel: {
    color: COLORS.textPrimary,
    fontSize: 17,
    lineHeight: 21,
    fontWeight: "700"
  },
  segmentLabelSelected: {
    color: "#FFFFFF",
    fontWeight: "800"
  },
  difficultyRow: {
    flexDirection: "row",
    width: "100%",
    marginTop: 8
  },
  difficultyColumn: {
    flex: 1,
    minWidth: 0
  },
  difficultyColumnGap: {
    marginLeft: 10
  },
  difficultyCard: {
    width: "100%",
    alignSelf: "stretch",
    minHeight: 80,
    borderRadius: 17,
    borderWidth: 1.5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.surfaceCard,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3
  },
  difficultyCardIdle: {
    backgroundColor: COLORS.surfaceCard
  },
  difficultyCardSelected: {
    backgroundColor: "rgba(12, 18, 38, 0.98)",
    shadowColor: COLORS.orange,
    shadowOpacity: 0.28,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8
  },
  difficultyStars: {
    fontSize: 26,
    lineHeight: 30,
    marginBottom: 6,
    letterSpacing: 2
  },
  difficultyLabel: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "700"
  },
  difficultyLabelSelected: {
    color: COLORS.orangeLight
  },
  primaryButton: {
    width: "100%",
    alignSelf: "stretch",
    minHeight: 66,
    borderRadius: 19,
    backgroundColor: COLORS.orange,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 22,
    marginBottom: 16,
    shadowColor: COLORS.orangeHot,
    shadowOpacity: 0.38,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
    elevation: 9
  },
  primaryButtonIcon: {
    color: "#FFFFFF",
    fontSize: 26,
    lineHeight: 26,
    marginRight: 14,
    marginTop: -1
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 21,
    lineHeight: 25,
    fontWeight: "800"
  },
  footerHelper: {
    color: COLORS.textMuted,
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center",
    marginBottom: 4
  }
});
