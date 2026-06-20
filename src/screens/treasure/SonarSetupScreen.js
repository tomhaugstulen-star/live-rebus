import React, { useEffect, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CYAN = "#22D3EE";
const BG = "#020A14";
const TEXT = "#F5F7FB";
const MUTED = "#AEB7C8";
const PANEL = "rgba(7,20,38,0.94)";
const BORDER = "rgba(34,211,238,0.35)";

export default function SonarSetupScreen({ onBack }) {
  const [players, setPlayers] = useState(null);
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 2600,
        useNativeDriver: true
      })
    );

    loop.start();
    return () => loop.stop();
  }, [spin]);

  const rotate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"]
  });

  return (
    <View style={styles.screen}>
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

        <View style={styles.content}>
          <View style={styles.sonarWrap} pointerEvents="none">
            <View style={styles.outerRing} />
            <View style={styles.middleRing} />
            <View style={styles.innerRing} />
            <Animated.View style={[styles.sweep, { transform: [{ rotate }] }]}>
              <View style={styles.beam} />
            </Animated.View>
            <View style={styles.coreOuter}>
              <View style={styles.coreInner} />
            </View>
          </View>

          <Text style={styles.kicker}>SONAR</Text>
          <Text style={styles.title}>Velg hvordan dere spiller</Text>

          <View style={styles.optionRow}>
            <PlayerOption
              label="Alene"
              selected={players === "solo"}
              onPress={() => setPlayers("solo")}
              accessibilityLabel="Spill alene"
            />
            <PlayerOption
              label="Venner"
              selected={players === "friends"}
              onPress={() => setPlayers("friends")}
              accessibilityLabel="Spill med venner"
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

function PlayerOption({ label, selected, onPress, accessibilityLabel }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.option,
        selected && styles.optionSelected,
        pressed && styles.pressed
      ]}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ selected }}
    >
      <Text style={[styles.optionText, selected && styles.optionTextSelected]}>{label}</Text>
      <View style={[styles.statusDot, selected && styles.statusDotSelected]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: BG
  },
  safe: {
    flex: 1
  },
  topBar: {
    minHeight: 52,
    paddingHorizontal: 18,
    justifyContent: "center"
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(7,20,38,0.82)",
    borderWidth: 1,
    borderColor: "rgba(226,232,240,0.45)"
  },
  backIcon: {
    color: CYAN,
    fontSize: 39,
    lineHeight: 39,
    fontWeight: "300",
    marginTop: -5
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingBottom: 42
  },
  sonarWrap: {
    width: 210,
    height: 210,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28
  },
  outerRing: {
    position: "absolute",
    width: 210,
    height: 210,
    borderRadius: 105,
    borderWidth: 1.5,
    borderColor: "rgba(34,211,238,0.28)"
  },
  middleRing: {
    position: "absolute",
    width: 142,
    height: 142,
    borderRadius: 71,
    borderWidth: 1.5,
    borderColor: "rgba(34,211,238,0.44)"
  },
  innerRing: {
    position: "absolute",
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 1.5,
    borderColor: "rgba(34,211,238,0.62)"
  },
  sweep: {
    position: "absolute",
    width: 210,
    height: 210,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  beam: {
    width: 3,
    height: 104,
    borderRadius: 2,
    backgroundColor: CYAN,
    opacity: 0.78,
    shadowColor: CYAN,
    shadowOpacity: 0.9,
    shadowRadius: 10
  },
  coreOuter: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#E8FDFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: CYAN,
    shadowOpacity: 0.8,
    shadowRadius: 14
  },
  coreInner: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: CYAN
  },
  kicker: {
    color: CYAN,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "900",
    letterSpacing: 3,
    marginBottom: 10
  },
  title: {
    color: TEXT,
    fontSize: 26,
    lineHeight: 32,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 22
  },
  optionRow: {
    width: "100%",
    maxWidth: 360,
    flexDirection: "row",
    gap: 10
  },
  option: {
    flex: 1,
    minHeight: 58,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: BORDER,
    backgroundColor: PANEL,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  optionSelected: {
    borderColor: CYAN,
    shadowColor: CYAN,
    shadowOpacity: 0.45,
    shadowRadius: 12
  },
  optionText: {
    flex: 1,
    color: MUTED,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "800"
  },
  optionTextSelected: {
    color: TEXT
  },
  statusDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: "rgba(174,183,200,0.7)",
    marginLeft: 8
  },
  statusDotSelected: {
    backgroundColor: CYAN,
    borderColor: CYAN
  },
  pressed: {
    opacity: 0.78,
    transform: [{ scale: 0.98 }]
  }
});
