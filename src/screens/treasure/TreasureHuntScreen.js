import React, { useEffect, useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./TreasureHuntScreen.styles";

const DIFFICULTY = {
  easy: { total: 4, radius: 100 },
  medium: { total: 8, radius: 250 },
  hard: { total: 12, radius: 500 }
};

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

function Stat({ value, label }) {
  return (
    <View style={styles.statPill}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export default function TreasureHuntScreen({
  config,
  onBack,
  onFound,
  onFinish
}) {
  const difficulty = DIFFICULTY[config?.difficulty] || DIFFICULTY.medium;
  const initialMode = config?.variant === "sonar" ? "sonar" : "map";
  const [mode, setMode] = useState(initialMode);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [distance, setDistance] = useState(74);
  const [foundCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((value) => value + 1);
      setDistance((value) => Math.max(18, value - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const canOpen = distance <= 25;
  const modeLabel = mode === "sonar" ? "Sonar" : "Tåkekart";

  const signal = useMemo(() => {
    if (distance <= 25) return { title: "Skatten er nær", help: "Du er nær nok til å åpne skatten." };
    if (distance <= 50) return { title: "Sterkt signal", help: "Fortsett i samme retning." };
    return { title: "Svakt signal", help: "Utforsk området for å komme nærmere." };
  }, [distance]);

  function completeTreasure() {
    if (!canOpen) return;
    if (typeof onFound === "function") onFound();
    else onFinish?.();
  }

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={styles.safe}>
      <View style={styles.frame}>
        <View style={styles.mapStage}>
          <View style={styles.mapBackdrop} />
          <View style={[styles.road, styles.roadOne]} />
          <View style={[styles.road, styles.roadTwo]} />
          <View style={[styles.road, styles.roadThree]} />
          <View style={[styles.block, styles.blockOne]} />
          <View style={[styles.block, styles.blockTwo]} />
          <View style={[styles.block, styles.blockThree]} />

          {mode === "map" ? <View style={styles.fog} /> : null}
          {mode === "map" ? <View style={styles.sightCircle} /> : null}
          {mode === "sonar" ? <View style={styles.sonarRingLarge} /> : null}
          {mode === "sonar" ? <View style={styles.sonarRingSmall} /> : null}

          <View style={styles.treasurePulse}>
            <View style={styles.treasureDot} />
          </View>

          <View style={styles.playerOuter}>
            <View style={styles.playerInner} />
          </View>

          <View style={styles.topBar}>
            <Pressable
              onPress={onBack}
              style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
              accessibilityRole="button"
              accessibilityLabel="Gå tilbake"
            >
              <Text style={styles.iconText}>‹</Text>
            </Pressable>

            <View style={styles.titleGroup}>
              <Text style={styles.title}>Skattejakt</Text>
              <Text style={styles.subtitle}>{modeLabel}</Text>
            </View>

            <Pressable
              onPress={() => setMode((value) => (value === "map" ? "sonar" : "map"))}
              style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
              accessibilityRole="button"
              accessibilityLabel={mode === "map" ? "Bytt til sonar" : "Bytt til kart"}
            >
              <Text style={styles.iconText}>{mode === "map" ? "⌁" : "⌖"}</Text>
            </Pressable>
          </View>

          <View style={styles.statsRow}>
            <Stat value={`${foundCount}/${difficulty.total}`} label="Skatter" />
            <Stat value={formatTime(elapsedSeconds)} label="Tid" />
            <Stat value={`${difficulty.radius} m`} label="Område" />
          </View>

          <Pressable
            onPress={() => setDistance((value) => Math.max(18, value - 10))}
            style={({ pressed }) => [styles.recenterButton, pressed && styles.pressed]}
            accessibilityRole="button"
            accessibilityLabel="Sentrer posisjonen"
          >
            <Text style={styles.recenterText}>⌖</Text>
          </Pressable>

          <View style={styles.bottomPanel}>
            <View style={styles.panelTop}>
              <View style={styles.signalDot} />
              <View style={styles.signalTextWrap}>
                <Text style={styles.signalTitle}>{signal.title}</Text>
                <Text style={styles.signalHelp}>{signal.help}</Text>
              </View>
              <View style={styles.modeBadge}>
                <Text style={styles.modeBadgeText}>{distance} m</Text>
              </View>
            </View>

            <View style={styles.actionRow}>
              <Pressable
                onPress={() => setMode((value) => (value === "map" ? "sonar" : "map"))}
                style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}
                accessibilityRole="button"
              >
                <Text style={styles.secondaryText}>{mode === "map" ? "Vis sonar" : "Vis kart"}</Text>
              </Pressable>

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
              >
                <Text style={styles.primaryText}>{canOpen ? "Åpne skatten" : "Gå nærmere"}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
