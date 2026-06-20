import React, { useEffect, useRef, useState } from "react";
import { Animated, Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import * as Haptics from "expo-haptics";
import { SafeAreaView } from "react-native-safe-area-context";

import { TREASURE_DIFFICULTY_AREAS, TREASURE_TOTALS } from "../../navigation/navigationConfig";

const BG_IMAGE = require("../../../assets/images/treasure/sonar-setup-background.webp");
const C = {
  bg: "#020A14",
  cyan: "#22D3EE",
  text: "#F5F7FB",
  muted: "#AEB7C8",
  panel: "rgba(7,20,38,0.84)",
  border: "rgba(34,211,238,0.42)"
};
const PLAYERS = [
  { key: "solo", label: "Alene", a11y: "Spill alene" },
  { key: "friends", label: "Venner", a11y: "Spill med venner" }
];
const DIFFICULTIES = [
  { key: "easy", label: "Enkel" },
  { key: "medium", label: "Medium" },
  { key: "hard", label: "Vanskelig" }
];

function pressFeedback() {
  if (Platform.OS !== "web") Haptics.selectionAsync().catch(() => {});
}

export default function SonarSetupScreen({ onBack, onContinue }) {
  const [step, setStep] = useState("players");
  const [players, setPlayers] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const spin = useRef(new Animated.Value(0)).current;
  const ping = useRef(new Animated.Value(0)).current;
  const stepFade = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(spin, { toValue: 1, duration: 2600, useNativeDriver: true })
    );
    loop.start();
    return () => loop.stop();
  }, [spin]);

  function runPing() {
    Animated.sequence([
      Animated.timing(ping, { toValue: 1, duration: 150, useNativeDriver: true }),
      Animated.timing(ping, { toValue: 0, duration: 180, useNativeDriver: true })
    ]).start();
  }

  function transitionTo(nextStep) {
    Animated.timing(stepFade, { toValue: 0, duration: 170, useNativeDriver: true }).start(() => {
      setStep(nextStep);
      stepFade.setValue(0);
      Animated.timing(stepFade, { toValue: 1, duration: 210, useNativeDriver: true }).start();
    });
  }

  function goToNextAfterPlayers(choice) {
    pressFeedback();
    setPlayers(choice);
    runPing();
    transitionTo(choice === "friends" ? "friends" : "difficulty");
  }

  function continueFromFriends() {
    pressFeedback();
    runPing();
    transitionTo("difficulty");
  }

  function chooseDifficulty(choice) {
    pressFeedback();
    setDifficulty(choice);
    runPing();
    transitionTo("done");
  }

  function continueSetup() {
    pressFeedback();
    runPing();
    onContinue?.({ variant: "sonar", players, difficulty });
  }

  function handleBack() {
    pressFeedback();
    onBack?.();
  }

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });
  const sonarScale = ping.interpolate({ inputRange: [0, 1], outputRange: [1, 1.08] });
  const stepY = stepFade.interpolate({ inputRange: [0, 1], outputRange: [10, 0] });
  const title = step === "players" ? "Velg hvordan dere spiller" : step === "friends" ? "Velg venner" : "Velg vanskelighetsgrad";

  return (
    <View style={styles.screen}>
      <Image pointerEvents="none" source={BG_IMAGE} resizeMode="cover" style={styles.backgroundImage} />
      <View pointerEvents="none" style={styles.backgroundShade} />

      <View style={styles.foreground}>
        <SafeAreaView style={styles.safe} edges={["top", "left", "right", "bottom"]}>
          <View style={styles.topBar}>
            <Pressable
              onPress={handleBack}
              style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
              accessibilityRole="button"
              accessibilityLabel="Gå tilbake"
              hitSlop={8}
            >
              <Text style={styles.backIcon}>‹</Text>
            </Pressable>
          </View>

          <View style={styles.content}>
            <Animated.View style={[styles.sonarWrap, { transform: [{ scale: sonarScale }] }]} pointerEvents="none">
              <View style={styles.outerRing} />
              <View style={styles.middleRing} />
              <View style={styles.innerRing} />
              <Animated.View style={[styles.sweep, { transform: [{ rotate }] }]}>
                <View style={styles.beam} />
              </Animated.View>
              <View style={styles.coreOuter}><View style={styles.coreInner} /></View>
            </Animated.View>

            <Text style={styles.kicker}>SONAR</Text>
            <Animated.View style={[styles.stepBlock, { opacity: stepFade, transform: [{ translateY: stepY }] }]}> 
              {step === "done" ? (
                <View style={styles.doneBlock}>
                  <Text style={styles.title}>Klar</Text>
                  <Pressable
                    onPress={continueSetup}
                    style={({ pressed }) => [styles.cta, pressed && styles.pressed]}
                    accessibilityRole="button"
                    accessibilityLabel="Fortsett"
                  >
                    <Text style={styles.ctaText}>Fortsett</Text>
                  </Pressable>
                </View>
              ) : (
                <>
                  <Text style={styles.title}>{title}</Text>

                  {step === "players" ? (
                    <View style={styles.optionRow}>
                      {PLAYERS.map((option) => (
                        <Option
                          key={option.key}
                          label={option.label}
                          selected={players === option.key}
                          onPress={() => goToNextAfterPlayers(option.key)}
                          accessibilityLabel={option.a11y}
                        />
                      ))}
                    </View>
                  ) : step === "friends" ? (
                    <View style={styles.friendsBlock}>
                      <Pressable
                        onPress={() => {
                          pressFeedback();
                          runPing();
                        }}
                        style={({ pressed }) => [styles.contactCard, pressed && styles.pressed]}
                        accessibilityRole="button"
                        accessibilityLabel="Åpne telefonbok"
                      >
                        <Text style={styles.contactTitle}>Åpne telefonbok</Text>
                        <Text style={styles.contactText}>Velg hvem som skal være med på Sonar-jakten.</Text>
                        <Text style={styles.contactHint}>Telefonbok kobles til her.</Text>
                      </Pressable>
                      <Pressable
                        onPress={continueFromFriends}
                        style={({ pressed }) => [styles.cta, pressed && styles.pressed]}
                        accessibilityRole="button"
                        accessibilityLabel="Fortsett til vanskelighetsgrad"
                      >
                        <Text style={styles.ctaText}>Fortsett</Text>
                      </Pressable>
                    </View>
                  ) : (
                    <View style={styles.optionStack}>
                      {DIFFICULTIES.map((option) => (
                        <Option
                          key={option.key}
                          label={option.label}
                          meta={`${TREASURE_TOTALS[option.key]} skatter · ${TREASURE_DIFFICULTY_AREAS[option.key].diameterMeters} m diameter`}
                          description={TREASURE_DIFFICULTY_AREAS[option.key].description}
                          selected={difficulty === option.key}
                          onPress={() => chooseDifficulty(option.key)}
                          accessibilityLabel={`Velg ${option.label.toLowerCase()} vanskelighetsgrad`}
                        />
                      ))}
                    </View>
                  )}
                </>
              )}
            </Animated.View>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
}

function Option({ label, meta, description, selected, onPress, accessibilityLabel }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.option, selected && styles.optionSelected, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ selected }}
    >
      <View style={styles.optionCopy}>
        <Text style={[styles.optionText, selected && styles.optionTextSelected]}>{label}</Text>
        {meta ? <Text style={styles.optionMeta}>{meta}</Text> : null}
        {description ? <Text style={styles.optionDescription}>{description}</Text> : null}
      </View>
      <View style={[styles.statusDot, selected && styles.statusDotSelected]} />
    </Pressable>
  );
}

const ring = { position: "absolute", borderWidth: 1.5, borderColor: C.border };
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bg, overflow: "hidden", position: "relative" },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: Platform.OS === "web" ? "100%" : "112%",
    top: Platform.OS === "web" ? 0 : -58,
    opacity: 0.9,
    zIndex: 0
  },
  backgroundShade: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(2,10,20,0.34)", zIndex: 1 },
  foreground: { ...StyleSheet.absoluteFillObject, zIndex: 10 },
  safe: { flex: 1 },
  topBar: { minHeight: 52, paddingHorizontal: 18, justifyContent: "center" },
  backButton: { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(7,20,38,0.76)", borderWidth: 1, borderColor: "rgba(226,232,240,0.45)" },
  backIcon: { color: C.cyan, fontSize: 39, lineHeight: 39, fontWeight: "300", marginTop: -5 },
  content: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 24, paddingBottom: 26 },
  sonarWrap: { width: 192, height: 192, alignItems: "center", justifyContent: "center", marginBottom: 18 },
  outerRing: { ...ring, width: 192, height: 192, borderRadius: 96, borderColor: "rgba(34,211,238,0.34)" },
  middleRing: { ...ring, width: 130, height: 130, borderRadius: 65, borderColor: "rgba(34,211,238,0.52)" },
  innerRing: { ...ring, width: 68, height: 68, borderRadius: 34, borderColor: "rgba(34,211,238,0.68)" },
  sweep: { position: "absolute", width: 192, height: 192, alignItems: "center", justifyContent: "flex-start" },
  beam: { width: 3, height: 96, borderRadius: 2, backgroundColor: C.cyan, opacity: 0.78, shadowColor: C.cyan, shadowOpacity: 0.9, shadowRadius: 10 },
  coreOuter: { width: 26, height: 26, borderRadius: 13, backgroundColor: "#E8FDFF", alignItems: "center", justifyContent: "center", shadowColor: C.cyan, shadowOpacity: 0.8, shadowRadius: 14 },
  coreInner: { width: 11, height: 11, borderRadius: 6, backgroundColor: C.cyan },
  kicker: { color: C.cyan, fontSize: 14, lineHeight: 18, fontWeight: "900", letterSpacing: 3, marginBottom: 8 },
  stepBlock: { width: "100%", alignItems: "center" },
  title: { color: C.text, fontSize: 24, lineHeight: 30, fontWeight: "900", textAlign: "center", marginBottom: 18 },
  optionRow: { width: "100%", maxWidth: 360, flexDirection: "row", gap: 10 },
  optionStack: { width: "100%", maxWidth: 360, gap: 8 },
  option: { flex: 1, minHeight: 54, borderRadius: 16, borderWidth: 1.5, borderColor: C.border, backgroundColor: C.panel, paddingHorizontal: 14, paddingVertical: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  optionSelected: { borderColor: C.cyan, shadowColor: C.cyan, shadowOpacity: 0.45, shadowRadius: 12 },
  optionCopy: { flex: 1 },
  optionText: { color: C.muted, fontSize: 17, lineHeight: 22, fontWeight: "800" },
  optionTextSelected: { color: C.text },
  optionMeta: { color: C.cyan, fontSize: 13, lineHeight: 17, fontWeight: "800", marginTop: 2 },
  optionDescription: { color: C.muted, fontSize: 13, lineHeight: 17, fontWeight: "600", marginTop: 2 },
  friendsBlock: { width: "100%", maxWidth: 360, gap: 10 },
  contactCard: { minHeight: 104, borderRadius: 16, borderWidth: 1.5, borderColor: C.border, backgroundColor: C.panel, paddingHorizontal: 16, paddingVertical: 14, justifyContent: "center" },
  contactTitle: { color: C.text, fontSize: 18, lineHeight: 23, fontWeight: "900" },
  contactText: { color: C.muted, fontSize: 14, lineHeight: 18, fontWeight: "700", marginTop: 5 },
  contactHint: { color: C.cyan, fontSize: 13, lineHeight: 17, fontWeight: "800", marginTop: 7 },
  statusDot: { width: 18, height: 18, borderRadius: 9, borderWidth: 1.5, borderColor: "rgba(174,183,200,0.7)", marginLeft: 8 },
  statusDotSelected: { backgroundColor: C.cyan, borderColor: C.cyan },
  doneBlock: { width: "100%", maxWidth: 360, alignItems: "center" },
  cta: { width: "100%", minHeight: 56, borderRadius: 17, backgroundColor: C.cyan, alignItems: "center", justifyContent: "center", shadowColor: C.cyan, shadowOpacity: 0.56, shadowRadius: 16 },
  ctaText: { color: "#03121B", fontSize: 21, lineHeight: 26, fontWeight: "900" },
  pressed: { opacity: 0.68, transform: [{ scale: 0.955 }] }
});
