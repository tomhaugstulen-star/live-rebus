import React, { useEffect, useRef, useState } from "react";
import { Animated, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

export default function SonarSetupScreen({ onBack }) {
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

  function goToDifficulty(choice) {
    setPlayers(choice);
    runPing();
    transitionTo("difficulty");
  }

  function chooseDifficulty(choice) {
    setDifficulty(choice);
    runPing();
    transitionTo("done");
  }

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });
  const sonarScale = ping.interpolate({ inputRange: [0, 1], outputRange: [1, 1.08] });
  const stepY = stepFade.interpolate({ inputRange: [0, 1], outputRange: [10, 0] });

  return (
    <ImageBackground source={BG_IMAGE} resizeMode="cover" style={styles.screen} imageStyle={styles.backgroundImage}>
      <View style={styles.backgroundShade} />
      <SafeAreaView style={styles.safe} edges={["top", "left", "right", "bottom"]}>
        <View style={styles.topBar}>
          <Pressable
            onPress={onBack}
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
            accessibilityRole="button"
            accessibilityLabel="Gå tilbake"
            hitSlop={8}
          >
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
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
                  onPress={runPing}
                  style={({ pressed }) => [styles.cta, pressed && styles.pressed]}
                  accessibilityRole="button"
                  accessibilityLabel="Fortsett"
                >
                  <Text style={styles.ctaText}>Fortsett</Text>
                </Pressable>
              </View>
            ) : (
              <>
                <Text style={styles.title}>
                  {step === "players" ? "Velg hvordan dere spiller" : "Velg vanskelighetsgrad"}
                </Text>

                {step === "players" ? (
                  <View style={styles.optionRow}>
                    {PLAYERS.map((option) => (
                      <Option
                        key={option.key}
                        label={option.label}
                        selected={players === option.key}
                        onPress={() => goToDifficulty(option.key)}
                        accessibilityLabel={option.a11y}
                      />
                    ))}
                  </View>
                ) : (
                  <View style={styles.optionStack}>
                    {DIFFICULTIES.map((option) => (
                      <Option
                        key={option.key}
                        label={option.label}
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
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

function Option({ label, selected, onPress, accessibilityLabel }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.option, selected && styles.optionSelected, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ selected }}
    >
      <Text style={[styles.optionText, selected && styles.optionTextSelected]}>{label}</Text>
      <View style={[styles.statusDot, selected && styles.statusDotSelected]} />
    </Pressable>
  );
}

const ring = { position: "absolute", borderWidth: 1.5, borderColor: C.border };
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bg },
  backgroundImage: { opacity: 0.9 },
  backgroundShade: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(2,10,20,0.34)" },
  safe: { flex: 1 },
  topBar: { minHeight: 52, paddingHorizontal: 18, justifyContent: "center" },
  backButton: { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(7,20,38,0.76)", borderWidth: 1, borderColor: "rgba(226,232,240,0.45)" },
  backIcon: { color: C.cyan, fontSize: 39, lineHeight: 39, fontWeight: "300", marginTop: -5 },
  content: { flexGrow: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 24, paddingTop: 18, paddingBottom: 46 },
  sonarWrap: { width: 196, height: 196, alignItems: "center", justifyContent: "center", marginBottom: 24 },
  outerRing: { ...ring, width: 196, height: 196, borderRadius: 98, borderColor: "rgba(34,211,238,0.34)" },
  middleRing: { ...ring, width: 132, height: 132, borderRadius: 66, borderColor: "rgba(34,211,238,0.52)" },
  innerRing: { ...ring, width: 68, height: 68, borderRadius: 34, borderColor: "rgba(34,211,238,0.68)" },
  sweep: { position: "absolute", width: 196, height: 196, alignItems: "center", justifyContent: "flex-start" },
  beam: { width: 3, height: 98, borderRadius: 2, backgroundColor: C.cyan, opacity: 0.78, shadowColor: C.cyan, shadowOpacity: 0.9, shadowRadius: 10 },
  coreOuter: { width: 26, height: 26, borderRadius: 13, backgroundColor: "#E8FDFF", alignItems: "center", justifyContent: "center", shadowColor: C.cyan, shadowOpacity: 0.8, shadowRadius: 14 },
  coreInner: { width: 11, height: 11, borderRadius: 6, backgroundColor: C.cyan },
  kicker: { color: C.cyan, fontSize: 14, lineHeight: 18, fontWeight: "900", letterSpacing: 3, marginBottom: 10 },
  stepBlock: { width: "100%", alignItems: "center" },
  title: { color: C.text, fontSize: 25, lineHeight: 31, fontWeight: "900", textAlign: "center", marginBottom: 22 },
  optionRow: { width: "100%", maxWidth: 360, flexDirection: "row", gap: 10 },
  optionStack: { width: "100%", maxWidth: 360, gap: 10 },
  option: { flex: 1, minHeight: 58, borderRadius: 16, borderWidth: 1.5, borderColor: C.border, backgroundColor: C.panel, paddingHorizontal: 14, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  optionSelected: { borderColor: C.cyan, shadowColor: C.cyan, shadowOpacity: 0.45, shadowRadius: 12 },
  optionText: { flex: 1, color: C.muted, fontSize: 17, lineHeight: 22, fontWeight: "800" },
  optionTextSelected: { color: C.text },
  statusDot: { width: 18, height: 18, borderRadius: 9, borderWidth: 1.5, borderColor: "rgba(174,183,200,0.7)", marginLeft: 8 },
  statusDotSelected: { backgroundColor: C.cyan, borderColor: C.cyan },
  doneBlock: { width: "100%", maxWidth: 360, alignItems: "center" },
  cta: { width: "100%", minHeight: 58, borderRadius: 17, backgroundColor: C.cyan, alignItems: "center", justifyContent: "center", shadowColor: C.cyan, shadowOpacity: 0.56, shadowRadius: 16 },
  ctaText: { color: "#03121B", fontSize: 21, lineHeight: 26, fontWeight: "900" },
  pressed: { opacity: 0.78, transform: [{ scale: 0.98 }] }
});
