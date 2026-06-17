import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AccessibilityInfo,
  Alert,
  Animated,
  Easing,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getTreasureRules } from "../../utils/treasureRules";
import {
  ensureTreasureSession,
  getTreasureElapsedSeconds,
  registerTreasureSessionFound,
  startTreasureSession
} from "../../utils/treasureSessionStore";
import { styles } from "./SonarHuntScreen.styles";

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

function StatCard({ icon, value, label }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statIcon}>{icon}</Text>
      <View><Text style={styles.statValue}>{value}</Text><Text style={styles.statLabel}>{label}</Text></View>
    </View>
  );
}

function confirmExit(onConfirm) {
  const title = "Avslutte sonarjakten?";
  const message = "Fremdriften i denne jakten blir slettet.";
  if (Platform.OS === "web" && typeof window !== "undefined") {
    if (window.confirm(`${title}\n\n${message}`)) onConfirm?.();
    return;
  }
  Alert.alert(title, message, [
    { text: "Fortsett", style: "cancel" },
    { text: "Avslutt", style: "destructive", onPress: onConfirm }
  ]);
}

export default function SonarHuntScreen({ config, onBack, onFound, onFinish }) {
  const rules = getTreasureRules(config?.difficulty);
  const isFocused = useIsFocused();
  const initialSession = ensureTreasureSession(config);
  const [gameStarted, setGameStarted] = useState(Boolean(initialSession?.gameStarted));
  const [elapsedSeconds, setElapsedSeconds] = useState(initialSession?.elapsedSeconds || 0);
  const [distance, setDistance] = useState(74);
  const [foundCount, setFoundCount] = useState(initialSession?.treasuresFound || 0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const sweep = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let mounted = true;
    AccessibilityInfo.isReduceMotionEnabled()
      .then((enabled) => mounted && setReduceMotion(Boolean(enabled)))
      .catch(() => {});
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (!isFocused || !gameStarted || reduceMotion) {
      sweep.stopAnimation();
      pulse.stopAnimation();
      sweep.setValue(0);
      pulse.setValue(0);
      return undefined;
    }
    const sweepLoop = Animated.loop(Animated.timing(sweep, {
      toValue: 1,
      duration: 2600,
      easing: Easing.linear,
      useNativeDriver: true
    }));
    const pulseLoop = Animated.loop(Animated.sequence([
      Animated.timing(pulse, {
        toValue: 1,
        duration: 1100,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true
      }),
      Animated.timing(pulse, { toValue: 0, duration: 0, useNativeDriver: true })
    ]));
    sweepLoop.start();
    pulseLoop.start();
    return () => { sweepLoop.stop(); pulseLoop.stop(); };
  }, [gameStarted, isFocused, pulse, reduceMotion, sweep]);

  useEffect(() => {
    if (!isFocused) return undefined;
    const session = ensureTreasureSession(config);
    setGameStarted(Boolean(session?.gameStarted));
    setFoundCount(session?.treasuresFound || 0);
    setElapsedSeconds(getTreasureElapsedSeconds());
    if (!session?.gameStarted) return undefined;
    const timer = setInterval(() => {
      setElapsedSeconds(getTreasureElapsedSeconds());
      setDistance((value) => Math.max(4, value - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [config, gameStarted, isFocused]);

  const canOpen = gameStarted && distance <= 5;
  const signal = useMemo(() => {
    if (!gameStarted) return {
      title: "Klar til start",
      help: "Ikke start før du er der Sonar skal spilles.",
      strength: "Klar"
    };
    if (distance <= 5) return { title: "Treffområde", help: "Du er nær nok til å åpne skatten.", strength: "Maks" };
    if (distance <= 15) return { title: "Svært sterkt signal", help: "Bipene kommer raskt nå.", strength: "Sterkt" };
    if (distance <= 35) return { title: "Sterkt signal", help: "Fortsett i samme område.", strength: "Godt" };
    return { title: "Svakt signal", help: "Beveg deg rundt og lytt etter raskere bip.", strength: "Svakt" };
  }, [distance, gameStarted]);

  const sweepRotate = sweep.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });
  const pulseScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.42, 1.16] });
  const pulseOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.62, 0] });

  function beginGame() {
    const session = startTreasureSession(config);
    setElapsedSeconds(session?.elapsedSeconds || 0);
    setGameStarted(true);
  }

  function openTreasure() {
    if (!canOpen) return;
    const session = registerTreasureSessionFound(config);
    setFoundCount(session?.treasuresFound || 0);
    setDistance(74);
    if (typeof onFound === "function") onFound();
    else onFinish?.();
  }

  function calibrate() {
    if (!gameStarted) return;
    setDistance(74);
    sweep.setValue(0);
    pulse.setValue(0);
  }

  return (
    <SafeAreaView edges={["top", "left", "right", "bottom"]} style={styles.safe}>
      <ScrollView
        style={styles.safe}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
      >
        <View style={styles.frame}>
          <View style={styles.header}>
            <Pressable
              onPress={() => confirmExit(onBack)}
              style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
              accessibilityRole="button"
              accessibilityLabel="Avslutt sonarjakten"
            ><Text style={styles.backIcon}>‹</Text></Pressable>

            <View style={styles.titleGroup}>
              <Text style={styles.title}>Sonar</Text>
              <View style={styles.modePill}>
                <Text style={styles.modeIcon}>◉</Text>
                <Text style={styles.modeText}>{gameStarted ? "Lytter etter signal" : "Klar til start"}</Text>
              </View>
            </View>

            <Pressable
              onPress={calibrate}
              disabled={!gameStarted}
              style={({ pressed }) => [
                styles.iconButton,
                !gameStarted && styles.iconButtonDisabled,
                pressed && gameStarted && styles.pressed
              ]}
              accessibilityRole="button"
              accessibilityLabel="Kalibrer sonar"
              accessibilityState={{ disabled: !gameStarted }}
            ><Text style={[styles.calibrateIcon, !gameStarted && styles.calibrateIconDisabled]}>⌁</Text></Pressable>
          </View>

          <View style={styles.statsRow}>
            <StatCard icon="▣" value={`${foundCount}/${rules.total}`} label="Skatter" />
            <StatCard icon="◷" value={formatTime(elapsedSeconds)} label="Tid" />
            <StatCard icon="◉" value={signal.strength} label="Signal" />
          </View>

          <View style={styles.radarSection}>
            <View style={[styles.radarOuter, !gameStarted && styles.radarInactive]}>
              <View style={styles.radarRingLarge} />
              <View style={styles.radarRingMedium} />
              <View style={styles.radarRingSmall} />
              <View style={styles.axisHorizontal} />
              <View style={styles.axisVertical} />
              {gameStarted && !reduceMotion ? (
                <Animated.View
                  pointerEvents="none"
                  style={[styles.pulseRing, { opacity: pulseOpacity, transform: [{ scale: pulseScale }] }]}
                />
              ) : null}
              {gameStarted && !reduceMotion ? (
                <Animated.View style={[styles.sweep, { transform: [{ rotate: sweepRotate }] }]}>
                  <View style={styles.sweepLine} /><View style={styles.sweepGlow} />
                </Animated.View>
              ) : null}
              {gameStarted ? <View style={[styles.blip, styles.blipOne]} /> : null}
              {gameStarted ? <View style={[styles.blip, styles.blipTwo]} /> : null}
              <View style={styles.playerOuter}><View style={styles.playerInner} /></View>
            </View>

            <View style={styles.distanceCard}>
              <Text style={styles.distanceLabel}>AVSTAND TIL SIGNAL</Text>
              <Text style={styles.distanceValue}>{gameStarted ? `${distance} m` : "–"}</Text>
              <Text style={styles.distanceHint}>
                {gameStarted ? "Bipene går raskere jo nærmere du kommer" : "Sonaren aktiveres når spillet starter"}
              </Text>
            </View>
          </View>

          <View style={styles.bottomPanel}>
            <View style={styles.signalRow}>
              <View style={styles.soundIconWrap}><Text style={styles.soundIcon}>{gameStarted ? ")))" : "▶"}</Text></View>
              <View style={styles.signalCopy}>
                <Text style={styles.signalTitle}>{signal.title}</Text>
                <Text style={styles.signalHelp}>{signal.help}</Text>
              </View>
            </View>

            {gameStarted ? (
              <Pressable
                onPress={openTreasure}
                disabled={!canOpen}
                style={({ pressed }) => [
                  styles.primaryButton,
                  !canOpen && styles.primaryDisabled,
                  pressed && canOpen && styles.pressed
                ]}
                accessibilityRole="button"
                accessibilityLabel={canOpen ? "Åpne skatten" : "Gå nærmere signalet"}
                accessibilityState={{ disabled: !canOpen }}
              >
                <Text style={styles.primaryIcon}>{canOpen ? "◉" : "⌁"}</Text>
                <Text style={[styles.primaryText, !canOpen && styles.primaryTextDisabled]}>
                  {canOpen ? "Åpne skatten" : "Følg signalet"}
                </Text>
              </Pressable>
            ) : (
              <Pressable
                onPress={beginGame}
                style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
                accessibilityRole="button"
                accessibilityLabel="Start spill"
              ><Text style={styles.primaryIcon}>▶</Text><Text style={styles.primaryText}>Start spill</Text></Pressable>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
