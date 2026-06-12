import React, { useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const COLORS = {
  background: "#0F172A",
  backgroundDeep: "#06131E",
  surface: "#1E293B",
  surfaceAlt: "#334155",
  text: "#E2E8F0",
  muted: "#94A3B8",
  primary: "#FF6B35",
  treasure: "#F59E0B",
  success: "#22C55E",
  danger: "#EF4444",
  border: "rgba(148,163,184,0.24)"
};

export default function SafetyScreen({ onBack, onContinue }) {
  const [confirmed, setConfirmed] = useState(false);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safe}>
      <ImageBackground
        source={require("../../../assets/images/treasure/safety_background.png")}
        resizeMode="cover"
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        <View style={styles.backgroundOverlay} />
      </ImageBackground>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={onBack}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Tilbake"
            activeOpacity={0.85}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle} numberOfLines={1}>
            Sikkerhet først
          </Text>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.heroIconWrap}>
          <View style={styles.heroIconGlow} />
          <View style={styles.heroShield}>
            <Text style={styles.heroShieldIcon}>🛡</Text>
            <Text style={styles.heroWalker}>🚶</Text>
          </View>
        </View>

        <Text style={styles.body} numberOfLines={2}>
          Skattejakten skjer ute i virkelige omgivelser.
        </Text>

        <Text style={styles.warning} numberOfLines={3}>
          Ikke gå inn på privat eiendom, farlige områder, vann, jernbane eller
          trafikkert vei.
        </Text>

        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Text style={styles.infoIconText}>i</Text>
          </View>
          <Text style={styles.infoText}>
            Du er selv ansvarlig for å vurdere sikkerhet og tilgjengelighet i området.
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => setConfirmed((value) => !value)}
          style={[styles.confirmRow, confirmed && styles.confirmRowActive]}
          accessibilityRole="button"
          accessibilityState={{ checked: confirmed }}
          accessibilityLabel="Jeg har lest og forstått"
          activeOpacity={0.88}
        >
          <View style={[styles.checkbox, confirmed && styles.checkboxOn]}>
            <Text style={styles.checkboxMark}>{confirmed ? "✓" : ""}</Text>
          </View>
          <Text style={styles.confirmText}>Jeg har lest og forstått</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.primaryButton, !confirmed && styles.primaryButtonDisabled]}
          onPress={onContinue}
          disabled={!confirmed}
          accessibilityRole="button"
          accessibilityState={{ disabled: !confirmed }}
          accessibilityLabel="Start skattejakt"
          activeOpacity={0.9}
        >
          <Text style={[styles.primaryButtonIcon, !confirmed && styles.primaryButtonIconDisabled]}>
            ▶
          </Text>
          <Text style={[styles.primaryButtonText, !confirmed && styles.primaryButtonTextDisabled]}>
            Start skattejakt
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("TreasureSetup")}
          style={styles.secondaryButton}
          accessibilityRole="button"
          accessibilityLabel="Velg nytt område"
          activeOpacity={0.85}
        >
          <Text style={styles.secondaryButtonText}>Velg nytt område</Text>
          <Text style={styles.secondaryArrow}>›</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  background: {
    ...StyleSheet.absoluteFillObject
  },
  backgroundImage: {
    opacity: 0.22
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(3,10,18,0.92)"
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 34
  },
  header: {
    minHeight: 92,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.22)",
    backgroundColor: "rgba(15,23,42,0.55)"
  },
  backButtonText: {
    color: COLORS.treasure,
    fontSize: 28,
    lineHeight: 28,
    fontWeight: "700",
    marginTop: -2
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: COLORS.treasure,
    fontSize: 26,
    lineHeight: 30,
    fontWeight: "800",
    marginHorizontal: 12
  },
  headerSpacer: {
    width: 44,
    height: 44
  },
  heroIconWrap: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30
  },
  heroIconGlow: {
    position: "absolute",
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: "rgba(245,158,11,0.10)",
    shadowColor: COLORS.treasure,
    shadowOpacity: 0.28,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 0 },
    elevation: 7
  },
  heroShield: {
    width: 150,
    height: 180,
    alignItems: "center",
    justifyContent: "center"
  },
  heroShieldIcon: {
    color: COLORS.treasure,
    fontSize: 138,
    lineHeight: 146,
    textShadowColor: "rgba(245,158,11,0.28)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 18
  },
  heroWalker: {
    position: "absolute",
    color: COLORS.treasure,
    fontSize: 52,
    lineHeight: 56,
    bottom: 34,
    left: 56
  },
  body: {
    color: COLORS.text,
    fontSize: 22,
    lineHeight: 30,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 26
  },
  warning: {
    color: COLORS.muted,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 22
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "rgba(15,23,42,0.66)",
    paddingHorizontal: 18,
    paddingVertical: 18,
    marginBottom: 22
  },
  infoIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: COLORS.treasure,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16
  },
  infoIconText: {
    color: COLORS.treasure,
    fontSize: 24,
    lineHeight: 24,
    fontWeight: "800"
  },
  infoText: {
    flex: 1,
    color: COLORS.textSecondary,
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "500"
  },
  confirmRow: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    paddingHorizontal: 14,
    marginBottom: 20,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  confirmRowActive: {
    borderColor: "rgba(245,158,11,0.38)",
    backgroundColor: "rgba(245,158,11,0.12)"
  },
  checkbox: {
    width: 30,
    height: 30,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "rgba(148,163,184,0.42)",
    backgroundColor: COLORS.surfaceAlt,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14
  },
  checkboxOn: {
    backgroundColor: COLORS.orangeHot,
    borderColor: COLORS.orangeHot,
    shadowColor: COLORS.orangeHot,
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4
  },
  checkboxMark: {
    color: "#FFFFFF",
    fontSize: 18,
    lineHeight: 18,
    fontWeight: "900"
  },
  confirmText: {
    flex: 1,
    color: COLORS.text,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "500"
  },
  primaryButton: {
    minHeight: 68,
    borderRadius: 20,
    backgroundColor: COLORS.orangeHot,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 18,
    shadowColor: COLORS.orangeHot,
    shadowOpacity: 0.38,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8
  },
  primaryButtonDisabled: {
    opacity: 0.42
  },
  primaryButtonIcon: {
    color: "#FFFFFF",
    fontSize: 24,
    lineHeight: 24,
    marginRight: 14,
    marginTop: -1
  },
  primaryButtonIconDisabled: {
    color: "#E2E8F0"
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 22,
    lineHeight: 26,
    fontWeight: "800"
  },
  primaryButtonTextDisabled: {
    color: "#E2E8F0"
  },
  secondaryButton: {
    minHeight: 48,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16
  },
  secondaryButtonText: {
    color: COLORS.treasure,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "700"
  },
  secondaryArrow: {
    color: COLORS.treasure,
    fontSize: 28,
    lineHeight: 28,
    marginLeft: 10,
    marginTop: -1
  },
  bottomSpacer: {
    height: 6
  }
});
