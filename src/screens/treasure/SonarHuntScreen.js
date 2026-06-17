import React, { useEffect, useMemo, useRef, useState } from "react";
import { Alert, Animated, Easing, Platform, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getTreasureRules } from "../../utils/treasureRules";
import { styles } from "./SonarHuntScreen.styles";

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

function StatCard({ icon, value, label }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statIcon}>{icon}</Text>
      <View>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </View>
    </View>
  );
}

function confirmExit(onConfirm) {
  const title = "Avslutte sonarjakten?";
  const message = "Fremdriften i denne jakten blir ikke lagret.";

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
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [distance, setDistance] = useState(74);
  const [foundCount] = useState(0);
  const sweep = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const sweepLoop = Animated.loop(
      Animated.timing(sweep, {
        toValue: 1,
        duration: 2600,
        easing: Easing.linear,
        useNativeDriver: true
      })
    );

    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1100,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true
        })
      ])
    );

    sweepLoop.start();
    pulseLoop.start();

    return () => {
      sweepLoop.stop();
      pulseLoop.stop();
    };
  }, [pulse, sweep]);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((value) => value + 1);
      setDistance((value) => Math.max(4, value - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const canOpen = distance <= 5;
  const signal = useMemo(() => {
    if (distance <= 5) return { title: "Treffområde", help: "Du er nær nok til å åpne skatten.", strength: "Maks" };
    if (distance <= 15) return { title: "Svært sterkt signal", help: "Bipene kommer raskt nå.", strength: "Sterkt" };
    if (distance <= 35) return { title: "Sterkt signal", help: "Fortsett i samme område.", strength: "Godt" };
    return { title: "Svakt signal", help: "Beveg deg rundt og lytt etter raskere bip.", strength: "Svakt" };
  }, [distance]);

  const sweepRotate = sweep.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"]
  });
  const pulseScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.42, 1.16] });
  const pulseOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.62, 0] });

  function openTreasure() {
    if (!canOpen) return;
    if (typeof onFound === "function") onFound();
    else onFinish?.();
  }

  return (
    <SafeAreaView edges={["top", "left", "right", "bottom"]} style={styles.safe}>
      <View style={styles.frame}>
        <View style={styles.header}>
          <Pressable
            onPress={() => confirmExit(onBack)}
            style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
            accessibilityRole="button"
            accessibilityLabel="Avslutt sonarjakten"
          >
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>

          <View style={styles.titleGroup}>
            <Text style={styles.title}>Sonar</Text>
            <View style={styles.modePill}>
              <Text style={styles.modeIcon}>◉</Text>
              <Text style={styles.modeText}>Lytter etter signal</Text>
            </View>
          </View>

          <Pressable style={styles.iconButton} accessibilityRole="button" accessibilityLabel="Kalibrer sonar">
            <Text style={styles.calibrateIcon}>⌁</Text>
          </Pressable>
        </View>

        <View style={styles.statsRow}>
          <StatCard icon="▣" value={`${foundCount}/${rules.total}`} label="Skatter" />
          <StatCard icon="◷" value={formatTime(elapsedSeconds)} label="Tid" />
          <StatCard icon="◉" value={signal.strength} label="Signal" />
        </View>

        <View style={styles.radarSection}>
          <View style={styles.radarOuter}>
            <View style={styles.radarRingLarge} />
            <View style={styles.radarRingMedium} />
            <View style={styles.radarRingSmall} />
            <View style={styles.axisHorizontal} />
            <View style={styles.axisVertical} />

            <Animated.View
              pointerEvents="none"
              style={[styles.pulseRing, { opacity: pulseOpacity, transform: [{ scale: pulseScale }] }]}
            />

            <Animated.View style={[styles.sweep, { transform: [{ rotate: sweepRotate }] }]}>
              <View style={styles.sweepLine} />
              <View style={styles.sweepGlow} />
            </Animated.View>

            <View style={[styles.blip, styles.blipOne]} />
            <View style={[styles.blip, styles.blipTwo]} />
            <View style={styles.playerOuter}>
              <View style={styles.playerInner} />
            </View>
          </View>

          <View style={styles.distanceCard}>
            <Text style={styles.distanceLabel}>AVSTAND TIL SIGNAL</Text>
            <Text style={styles.distanceValue}>{distance} m</Text>
            <Text style={styles.distanceHint}>Bipene går raskere jo nærmere du kommer</Text>
          </View>
        </View>

        <View style={styles.bottomPanel}>
          <View style={styles.signalRow}>
            <View style={styles.soundIconWrap}>
              <Text style={styles.soundIcon}>)))</Text>
            </View>
            <View style={styles.signalCopy}>
              <Text style={styles.signalTitle}>{signal.title}</Text>
              <Text style={styles.signalHelp}>{signal.help}</Text>
            </View>
          </View>

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
        </View>
      </View>
    </SafeAreaView>
  );
}
