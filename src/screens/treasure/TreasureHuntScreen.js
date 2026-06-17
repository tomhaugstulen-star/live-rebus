import React, { useEffect, useMemo, useState } from "react";
import { Alert, Platform, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./TreasureHuntScreen.styles";

const DIFFICULTY = {
  easy: { total: 4, radius: 100, revealRadius: 10 },
  medium: { total: 8, radius: 250, revealRadius: 6 },
  hard: { total: 12, radius: 500, revealRadius: 4 }
};

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

function StatCard({ icon, value, label }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statIcon} accessibilityElementsHidden>
        {icon}
      </Text>
      <View style={styles.statCopy}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </View>
    </View>
  );
}

function confirmExit(onConfirm) {
  const title = "Avslutte skattejakten?";
  const message = "Fremdriften i denne jakten blir ikke lagret.";

  if (Platform.OS === "web" && typeof window !== "undefined") {
    if (window.confirm(`${title}\n\n${message}`)) onConfirm?.();
    return;
  }

  Alert.alert(title, message, [
    { text: "Fortsett å spille", style: "cancel" },
    { text: "Avslutt", style: "destructive", onPress: onConfirm }
  ]);
}

export default function TreasureHuntScreen({
  config,
  onBack,
  onFound,
  onFinish
}) {
  const difficulty = DIFFICULTY[config?.difficulty] || DIFFICULTY.medium;
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [distance, setDistance] = useState(74);
  const [foundCount] = useState(0);
  const [mapCentered, setMapCentered] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((value) => value + 1);
      setDistance((value) => Math.max(18, value - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const canOpen = distance <= 25;

  const signal = useMemo(() => {
    if (distance <= 25) {
      return {
        title: "Skatten er nær",
        help: "Du er nær nok til å åpne skatten."
      };
    }

    if (distance <= 50) {
      return {
        title: "Sterkt signal",
        help: "Fortsett å utforske området."
      };
    }

    return {
      title: "Svakt signal",
      help: "Utforsk området for å komme nærmere."
    };
  }, [distance]);

  function completeTreasure() {
    if (!canOpen) return;
    if (typeof onFound === "function") onFound();
    else onFinish?.();
  }

  function recenterMap() {
    setMapCentered(false);
    requestAnimationFrame(() => setMapCentered(true));
  }

  return (
    <SafeAreaView edges={["top", "left", "right", "bottom"]} style={styles.safe}>
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

          <View style={[styles.treeCluster, styles.treeClusterOne]}>
            <Text style={styles.treeText}>▲ ▲</Text>
            <Text style={styles.treeText}> ▲ ▲ ▲</Text>
          </View>
          <View style={[styles.treeCluster, styles.treeClusterTwo]}>
            <Text style={styles.treeText}>▲ ▲ ▲</Text>
            <Text style={styles.treeText}> ▲ ▲</Text>
          </View>

          <View style={styles.fog} />
          <View style={styles.revealOuter} />
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
                <Text style={styles.modeText}>Tåkekart</Text>
              </View>
            </View>

            <View style={styles.headerSpacer} />
          </View>

          <View style={styles.statsRow}>
            <StatCard icon="▣" value={`${foundCount}/${difficulty.total}`} label="Skatter" />
            <StatCard icon="◷" value={formatTime(elapsedSeconds)} label="Tid" />
            <StatCard icon="◎" value={`${difficulty.radius} m`} label="Område" />
          </View>

          <Pressable
            onPress={recenterMap}
            style={({ pressed }) => [styles.recenterButton, pressed && styles.pressed]}
            accessibilityRole="button"
            accessibilityLabel="Sentrer kartet på spilleren"
          >
            <Text style={styles.recenterText}>➤</Text>
          </Pressable>

          <View style={styles.bottomPanel}>
            <View style={styles.signalGraphic} accessibilityElementsHidden>
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
                  <Text style={styles.distanceText}>{distance} m</Text>
                </View>
              </View>

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
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
