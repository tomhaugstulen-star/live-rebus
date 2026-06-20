import React, { useEffect, useRef, useState } from "react";
import { Animated, Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import * as Haptics from "expo-haptics";
import { SafeAreaView } from "react-native-safe-area-context";

import { TREASURE_DIFFICULTY_AREAS, TREASURE_TOTALS } from "../../navigation/navigationConfig";

const PLAYER_CARD_IMAGES = {
  solo: require("../../../assets/images/treasure/sonar-player-solo.webp"),
  friends: require("../../../assets/images/treasure/sonar-player-friends.webp")
};
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
              <View style={styles.radarGlow} />
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
                    <View style={styles.playerCardRow}>
                      {PLAYERS.map((option) => (
                        <PlayerCard
                          key={option.key}
                          source={PLAYER_CARD_IMAGES[option.key]}
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

function PlayerCard({ source, selected, onPress, accessibilityLabel }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.playerCard, selected && styles.playerCardSelected, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ selected }}
    >
      <Image source={source} resizeMode="contain" style={styles.playerCardImage} />
    </Pressable>
  );
}

function Option({ label, meta, description, selected, onPress, accessibilityLabel }) {
  const hasDetail = Boolean(meta || description);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.option,
        hasDetail && styles.optionDetailed,
        selected && styles.optionSelected,
        pressed && styles.pressed
      ]}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ selected }}
    >
      <View style={styles.optionCopy}>
        <Text style={[styles.optionText, hasDetail && styles.optionTextDetailed, selected && styles.optionTextSelected]}>{label}</Text>
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
  foreground: { ...StyleSheet.absoluteFillObject, zIndex: 10 },
  safe: { flex: 1 },
  topBar: { minHeight: 54, paddingHorizontal: 18, justifyContent: "center" },
  backButton: { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(7,20,38,0.76)", borderWidth: 1, borderColor: "rgba(226,232,240,0.45)" },
  backIcon: { color: C.cyan, fontSize: 39, lineHeight: 39, fontWeight: "300", marginTop: -5 },
  content: { flex: 1, alignItems: "center", justifyContent: "flex-start", paddingHorizontal: 24, paddingTop: 100, paddingBottom: 24 },
  sonarWrap: { width: 196, height: 196, alignItems: "center", justifyContent: "center", marginBottom: 18, shadowColor: C.cyan, shadowOpacity: 0.34, shadowRadius: 24, shadowOffset: { width: 0, height: 0 } },
  radarGlow: { position: "absolute", width: 144, height: 144, borderRadius: 72, backgroundColor: "rgba(34,211,238,0.08)", shadowColor: C.cyan, shadowOpacity: 0.55, shadowRadius: 28, shadowOffset: { width: 0, height: 0 } },
  outerRing: { ...ring, width: 196, height: 196, borderRadius: 98, borderColor: "rgba(34,211,238,0.34)" },
  middleRing: { ...ring, width: 136, height: 136, borderRadius: 68, borderColor: "rgba(34,211,238,0.52)" },
  innerRing: { ...ring, width: 72, height: 72, borderRadius: 36, borderColor: "rgba(34,211,238,0.68)" },
  sweep: { position: "absolute", width: 196, height: 196, alignItems: "center", justifyContent: "flex-start" },
  beam: { width: 4, height: 98, borderRadius: 2, backgroundColor: C.cyan, opacity: 0.84, shadowColor: C.cyan, shadowOpacity: 0.95, shadowRadius: 14, shadowOffset: { width: 0, height: 0 } },
  coreOuter: { width: 34, height: 34, borderRadius: 17, backgroundColor: "#E8FDFF", alignItems: "center", justifyContent: "center", shadowColor: C.cyan, shadowOpacity: 0.86, shadowRadius: 18, shadowOffset: { width: 0, height: 0 } },
  coreInner: { width: 13, height: 13, borderRadius: 7, backgroundColor: C.cyan },
  kicker: { color: C.cyan, fontSize: 14, lineHeight: 18, fontWeight: "900", letterSpacing: 3, marginBottom: 8, textShadowColor: "rgba(34,211,238,0.55)", textShadowRadius: 10 },
  stepBlock: { width: "100%", alignItems: "center" },
  title: { color: C.text, fontSize: 22, lineHeight: 28, fontWeight: "900", textAlign: "center", marginBottom: 14 },
  playerCardRow: { width: "100%", maxWidth: 236, flexDirection: "row", gap: 12, alignItems: "center", justifyContent: "center", marginTop: 10 },
  playerCard: { width: 108, height: 114, borderRadius: 22, alignItems: "center", justifyContent: "center", shadowColor: C.cyan, shadowOpacity: 0.22, shadowRadius: 12, shadowOffset: { width: 0, height: 0 }, elevation: 3 },
  playerCardSelected: { shadowOpacity: 0.68, shadowRadius: 22, elevation: 7, transform: [{ scale: 1.015 }] },
  playerCardImage: { width: "90%", height: "90%", borderRadius: 22 },
  optionRow: { width: "100%", maxWidth: 360, flexDirection: "row", gap: 12 },
  optionStack: { width: "100%", maxWidth: 360, gap: 11 },
  option: { flex: 1, minHeight: 72, borderRadius: 18, borderWidth: 1.7, borderColor: C.border, backgroundColor: C.panel, paddingHorizontal: 18, paddingVertical: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between", shadowColor: C.cyan, shadowOpacity: 0.24, shadowRadius: 14, shadowOffset: { width: 0, height: 0 }, elevation: 4 },
  optionDetailed: { minHeight: 104, paddingHorizontal: 18, paddingVertical: 14, alignItems: "center" },
  optionSelected: { borderColor: C.cyan, shadowColor: C.cyan, shadowOpacity: 0.52, shadowRadius: 18, elevation: 7 },
  optionCopy: { flex: 1, paddingRight: 8 },
  optionText: { color: C.muted, fontSize: 19, lineHeight: 24, fontWeight: "900" },
  optionTextDetailed: { color: C.text, fontSize: 20, lineHeight: 24 },
  optionTextSelected: { color: C.text },
  optionMeta: { color: C.cyan, fontSize: 15, lineHeight: 20, fontWeight: "900", marginTop: 3, textShadowColor: "rgba(34,211,238,0.38)", textShadowRadius: 8 },
  optionDescription: { color: C.muted, fontSize: 14, lineHeight: 18, fontWeight: "700", marginTop: 4 },
  friendsBlock: { width: "100%", maxWidth: 360, gap: 12 },
  contactCard: { minHeight: 112, borderRadius: 18, borderWidth: 1.7, borderColor: C.border, backgroundColor: C.panel, paddingHorizontal: 18, paddingVertical: 16, justifyContent: "center", shadowColor: C.cyan, shadowOpacity: 0.24, shadowRadius: 14, shadowOffset: { width: 0, height: 0 }, elevation: 4 },
  contactTitle: { color: C.text, fontSize: 19, lineHeight: 24, fontWeight: "900" },
  contactText: { color: C.muted, fontSize: 15, lineHeight: 20, fontWeight: "700", marginTop: 5 },
  contactHint: { color: C.cyan, fontSize: 14, lineHeight: 18, fontWeight: "900", marginTop: 7 },
  statusDot: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: "rgba(174,183,200,0.7)", marginLeft: 8 },
  statusDotSelected: { backgroundColor: C.cyan, borderColor: C.cyan, shadowColor: C.cyan, shadowOpacity: 0.8, shadowRadius: 10, shadowOffset: { width: 0, height: 0 } },
  doneBlock: { width: "100%", maxWidth: 360, alignItems: "center" },
  cta: { width: "100%", minHeight: 58, borderRadius: 18, backgroundColor: C.cyan, alignItems: "center", justifyContent: "center", shadowColor: C.cyan, shadowOpacity: 0.62, shadowRadius: 18, shadowOffset: { width: 0, height: 0 }, elevation: 7 },
  ctaText: { color: "#03121B", fontSize: 21, lineHeight: 26, fontWeight: "900" },
  pressed: { opacity: 0.68, transform: [{ scale: 0.955 }] }
});