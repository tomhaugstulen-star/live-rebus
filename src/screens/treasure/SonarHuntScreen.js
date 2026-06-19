import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  Text,
  Vibration,
  View
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  advanceSonarSignal,
  createSonarSignalState,
  getGeneratedSonarSignal,
  resetSonarSignalState,
  SONAR_SIGNAL_RANK
} from "../../utils/sonarSignalEngine";
import { getTreasureRules } from "../../utils/treasureRules";
import {
  ensureTreasureSession,
  getTreasureElapsedSeconds,
  registerTreasureSessionFound,
  startTreasureSession
} from "../../utils/treasureSessionStore";
import SonarDisplay from "./SonarDisplay";
import { styles } from "./SonarHuntScreen.styles";

const FOUND_SEQUENCE_MS = 950;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
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

function vibrateForSignal(level) {
  if (Platform.OS === "web") return;
  if (level === "medium") Vibration.vibrate(35);
  if (level === "strong") Vibration.vibrate([0, 45, 55, 45]);
  if (level === "very_near") Vibration.vibrate([0, 65, 45, 65, 45, 90]);
}

export default function SonarHuntScreen({ config, onBack, onFound, onFinish }) {
  const rules = getTreasureRules(config?.difficulty);
  const isFocused = useIsFocused();
  const initialSession = ensureTreasureSession(config);
  const previousSignalRef = useRef("weak");
  const foundTimerRef = useRef(null);
  const [gameStarted, setGameStarted] = useState(Boolean(initialSession?.gameStarted));
  const [elapsedSeconds, setElapsedSeconds] = useState(initialSession?.elapsedSeconds || 0);
  const [signalState, setSignalState] = useState(createSonarSignalState);
  const [foundCount, setFoundCount] = useState(initialSession?.treasuresFound || 0);
  const [foundSequenceActive, setFoundSequenceActive] = useState(false);

  useEffect(() => () => {
    if (foundTimerRef.current) clearTimeout(foundTimerRef.current);
  }, []);

  useEffect(() => {
    if (!isFocused) return undefined;
    const session = ensureTreasureSession(config);
    setGameStarted(Boolean(session?.gameStarted));
    setFoundCount(session?.treasuresFound || 0);
    setElapsedSeconds(getTreasureElapsedSeconds());
    if (!session?.gameStarted) return undefined;

    const timer = setInterval(() => {
      setElapsedSeconds(getTreasureElapsedSeconds());
      setSignalState((value) => advanceSonarSignal(value));
    }, 1000);
    return () => clearInterval(timer);
  }, [config, gameStarted, isFocused]);

  const signal = useMemo(
    () => getGeneratedSonarSignal(signalState, gameStarted),
    [gameStarted, signalState]
  );
  const canOpen = gameStarted && signal.level === "very_near" && !foundSequenceActive;

  useEffect(() => {
    const previousLevel = previousSignalRef.current;
    const gotStronger = SONAR_SIGNAL_RANK[signal.level] > SONAR_SIGNAL_RANK[previousLevel];

    if (gameStarted && isFocused && gotStronger) {
      vibrateForSignal(signal.level);
    }

    previousSignalRef.current = signal.level;
  }, [gameStarted, isFocused, signal.level]);

  function beginGame() {
    const session = startTreasureSession(config);
    previousSignalRef.current = "weak";
    setElapsedSeconds(session?.elapsedSeconds || 0);
    setGameStarted(true);
    if (Platform.OS !== "web") Vibration.vibrate(35);
  }

  function completeTreasureOpen() {
    const session = registerTreasureSessionFound(config);
    setFoundCount(session?.treasuresFound || 0);
    setSignalState(resetSonarSignalState());
    setFoundSequenceActive(false);
    previousSignalRef.current = "weak";

    if (session?.completed) {
      if (typeof onFound === "function") onFound();
      else onFinish?.();
    }
  }

  function openTreasure() {
    if (!canOpen) return;
    setFoundSequenceActive(true);
    if (Platform.OS !== "web") Vibration.vibrate([0, 80, 55, 120]);
    foundTimerRef.current = setTimeout(completeTreasureOpen, FOUND_SEQUENCE_MS);
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
            >
              <Text style={styles.backIcon}>‹</Text>
            </Pressable>

            <View style={styles.titleGroup}>
              <Text style={styles.title}>Sonar</Text>
              <View style={[styles.modePill, gameStarted && styles.modePillActive]}>
                <Text style={[styles.modeIcon, gameStarted && styles.modeIconActive]}>◉</Text>
                <Text style={[styles.modeText, gameStarted && styles.modeTextActive]}>
                  {gameStarted ? "Sonar aktiv" : "Klar til start"}
                </Text>
              </View>
            </View>
            <View style={styles.headerSpacer} />
          </View>

          <View style={styles.statsRow}>
            <StatCard icon="▣" value={`${foundCount}/${rules.total}`} label="Skatter" />
            <StatCard icon="◷" value={formatTime(elapsedSeconds)} label="Tid" />
            <StatCard icon="◉" value={signal.strength} label="Signal" />
          </View>

          <View style={styles.radarSection}>
            <SonarDisplay
              active={isFocused}
              foundActive={foundSequenceActive}
              level={gameStarted ? signal.level : "weak"}
            />
            <View style={[styles.statusCard, canOpen && styles.statusCardLocked]}>
              <Text style={styles.statusLabel}>SIGNALSTATUS</Text>
              <Text style={[styles.statusTitle, gameStarted && styles.statusTitleActive]}>
                {foundSequenceActive ? "SKATT FUNNET!" : signal.title}
              </Text>
              <Text style={styles.statusHelp}>{foundSequenceActive ? "Sonaren gjør klar neste signal" : signal.help}</Text>
              {canOpen ? <Text style={styles.statusHint}>{signal.hint}</Text> : null}
            </View>
          </View>

          {!gameStarted ? (
            <View style={styles.startPanel}>
              <Text style={styles.startTitle}>Klar til sonarjakt</Text>
              <Text style={styles.startHelp}>Gå rolig og hold telefonen foran deg.</Text>
              <Pressable
                onPress={beginGame}
                style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
                accessibilityRole="button"
                accessibilityLabel="Start spill"
              >
                <Text style={styles.primaryIcon}>▶</Text>
                <Text style={styles.primaryText}>Start spill</Text>
              </Pressable>
            </View>
          ) : null}

          {gameStarted && (canOpen || foundSequenceActive) ? (
            <Pressable
              onPress={openTreasure}
              disabled={!canOpen}
              style={({ pressed }) => [
                styles.primaryButton,
                styles.openButton,
                !canOpen && styles.primaryDisabled,
                pressed && canOpen && styles.pressed
              ]}
              accessibilityRole="button"
              accessibilityLabel={canOpen ? "Åpne skatten" : "Skatt funnet"}
              accessibilityState={{ disabled: !canOpen }}
            >
              <Text style={styles.primaryIcon}>{canOpen ? "◉" : "✓"}</Text>
              <Text style={[styles.primaryText, !canOpen && styles.primaryTextDisabled]}>
                {foundSequenceActive ? "Skatt funnet" : "Åpne skatten"}
              </Text>
            </Pressable>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
