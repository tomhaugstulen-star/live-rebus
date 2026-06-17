import React, { useEffect, useMemo, useState } from "react";
import { Alert, Platform, Pressable, ScrollView, Text, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getTreasureRules } from "../../utils/treasureRules";
import {
  ensureTreasureSession,
  getTreasureElapsedSeconds,
  registerTreasureSessionFound,
  startTreasureSession
} from "../../utils/treasureSessionStore";
import { styles } from "./TreasureHuntScreen.styles";

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

function StatCard({ icon, value, label }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statIcon}>{icon}</Text>
      <View style={styles.statCopy}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </View>
    </View>
  );
}

function confirmExit(onConfirm) {
  const title = "Avslutte skattejakten?";
  const message = "Fremdriften i denne jakten blir slettet.";

  if (Platform.OS === "web" && typeof window !== "undefined") {
    if (window.confirm(`${title}\n\n${message}`)) onConfirm?.();
    return;
  }

  Alert.alert(title, message, [
    { text: "Fortsett å spille", style: "cancel" },
    { text: "Avslutt", style: "destructive", onPress: onConfirm }
  ]);
}

export default function FogHuntScreen({ config, onBack, onFound, onFinish }) {
  const rules = getTreasureRules(config?.difficulty);
  const isFocused = useIsFocused();
  const initialSession = ensureTreasureSession(config);
  const [gameStarted, setGameStarted] = useState(Boolean(initialSession?.gameStarted));
  const [elapsedSeconds, setElapsedSeconds] = useState(initialSession?.elapsedSeconds || 0);
  const [distance, setDistance] = useState(74);
  const [foundCount, setFoundCount] = useState(initialSession?.treasuresFound || 0);
  const [mapCentered, setMapCentered] = useState(true);

  useEffect(() => {
    if (!isFocused) return undefined;

    const session = ensureTreasureSession(config);
    setGameStarted(Boolean(session?.gameStarted));
    setFoundCount(session?.treasuresFound || 0);
    setElapsedSeconds(getTreasureElapsedSeconds());

    if (!session?.gameStarted) return undefined;

    const timer = setInterval(() => {
      setElapsedSeconds(getTreasureElapsedSeconds());
      setDistance((value) => Math.max(18, value - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [config, gameStarted, isFocused]);

  const canOpen = gameStarted && (Platform.OS === "web" || distance <= 25);
  const signal = useMemo(() => {
    if (!gameStarted) return {
      title: "Klar til start",
      help: "Start når dere er på riktig sted."
    };
    if (Platform.OS === "web") return { title: "Testmodus", help: "Skatten kan åpnes direkte på web." };
    if (distance <= 25) return { title: "Skatten er nær", help: "Du er nær nok til å åpne skatten." };
    if (distance <= 50) return { title: "Sterkt signal", help: "Fortsett å utforske området." };
    return { title: "Svakt signal", help: "Utforsk området for å komme nærmere." };
  }, [distance, gameStarted]);

  function beginGame() {
    const session = startTreasureSession(config);
    setElapsedSeconds(session?.elapsedSeconds || 0);
    setGameStarted(true);
  }

  function completeTreasure() {
    if (!canOpen) return;
    const session = registerTreasureSessionFound(config);
    setFoundCount(session?.treasuresFound || 0);
    setDistance(74);
    if (typeof onFound === "function") onFound();
    else onFinish?.();
  }

  function recenterMap() {
    if (!gameStarted) return;
    setMapCentered(false);
    requestAnimationFrame(() => setMapCentered(true));
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
          <View style={styles.mapStage}>
            <View style={styles.mapBackdrop} />
            <View style={[styles.road, styles.roadOne]} />
            <View style={[styles.road, styles.roadTwo]} />
            <View style={[styles.road, styles.roadThree]} />
            <View style={[styles.road, styles.roadFour]} />
            <View style={[styles.block, styles.blockOne]} />
            <View style={[styles.block, styles.blockTwo]} />
            <View style={[styles.block, styles.blockThree]} />
            <View style={[styles.block, styles.blockFour]} />
            <View style={[styles.block, styles.blockFive]} />
            <View style={styles.fog} />
            <View style={styles.revealOuter} accessibilityLabel={`Synlig område ${rules.revealRadiusMeters} meter`} />
            <View style={styles.revealInner} />
            <View style={[styles.playerOuter, mapCentered && styles.playerCentered]}>
              <View style={styles.playerInner} />
            </View>

            <View style={styles.header}>
              <Pressable
                onPress={() => confirmExit(onBack)}
                style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
                accessibilityRole="button"
                accessibilityLabel="Avslutt skattejakten"
              >
                <Text style={styles.backIcon}>‹</Text>
              </Pressable>

              <View style={styles.titleGroup}>
                <Text style={styles.title}>Skattejakt</Text>
                <View style={styles.modePill}>
                  <View style={styles.modeDot} />
                  <Text style={styles.modeText}>{gameStarted ? "Tåkekart" : "Klar til start"}</Text>
                </View>
              </View>
              <View style={styles.headerSpacer} />
            </View>

            <View style={styles.statsRow}>
              <StatCard icon="▣" value={`${foundCount}/${rules.total}`} label="Skatter" />
              <StatCard icon="◷" value={formatTime(elapsedSeconds)} label="Tid" />
              <StatCard icon="◎" value={`${rules.areaRadiusMeters} m`} label="Område" />
            </View>

            <Pressable
              onPress={recenterMap}
              disabled={!gameStarted}
              style={({ pressed }) => [
                styles.recenterButton,
                !gameStarted && styles.primaryDisabled,
                pressed && gameStarted && styles.pressed
              ]}
              accessibilityRole="button"
              accessibilityLabel="Sentrer kartet på spilleren"
              accessibilityState={{ disabled: !gameStarted }}
            >
              <Text style={styles.recenterText}>➤</Text>
            </Pressable>

            <View style={styles.bottomPanel}>
              <View style={styles.signalGraphic}>
                <View style={styles.signalRingLarge} />
                <View style={styles.signalRingMedium} />
                <View style={styles.signalRingSmall} />
                <View style={styles.signalCore} />
              </View>

              <View style={styles.panelContent}>
                <View style={styles.panelTopRow}>
                  <View style={styles.signalCopy}>
                    <Text style={styles.signalTitle}>{signal.title}</Text>
                    <Text style={styles.signalHelp}>{signal.help}</Text>
                  </View>
                  <View style={styles.distancePill}>
                    <Text style={styles.distanceIcon}>◎</Text>
                    <Text style={styles.distanceText}>{gameStarted ? `${distance} m` : "–"}</Text>
                  </View>
                </View>

                {gameStarted ? (
                  <Pressable
                    onPress={completeTreasure}
                    disabled={!canOpen}
                    style={({ pressed }) => [
                      styles.primaryButton,
                      !canOpen && styles.primaryDisabled,
                      pressed && canOpen && styles.pressed
                    ]}
                    accessibilityRole="button"
                    accessibilityLabel={canOpen ? "Åpne skatten" : "Gå nærmere skatten"}
                    accessibilityState={{ disabled: !canOpen }}
                  >
                    <Text style={[styles.primaryText, !canOpen && styles.primaryTextDisabled]}>
                      {canOpen ? "Åpne skatten" : "Gå nærmere"}
                    </Text>
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={beginGame}
                    style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
                    accessibilityRole="button"
                    accessibilityLabel="Start spill"
                  >
                    <Text style={styles.primaryText}>Start spill</Text>
                  </Pressable>
                )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
