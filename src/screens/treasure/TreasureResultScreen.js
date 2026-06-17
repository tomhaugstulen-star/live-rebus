import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View
} from "react-native";
import * as Haptics from "expo-haptics";
import { addPlayerXp } from "../../utils/playerProgressStore";
import { clearPendingResult, getPendingResult } from "../../utils/pendingResultStore";
import { calculateTreasureXp } from "../../utils/xpRules";
import {
  getTreasureSession,
  markTreasureXpAwarded,
  resetTreasureSession
} from "../../utils/treasureSessionStore";
import { styles } from "./TreasureResultScreen.styles";

const CHEST_IMAGE = require("../../../assets/images/treasure/result/result-chest.png");
const RIBBON_IMAGE = require("../../../assets/images/treasure/result/result-ribbon.png");

const RESULT_COPY = {
  solo: {
    title: "Alle skattene er funnet!",
    subtitle: "Bra jobbet. Du fant alle skattene."
  },
  winner: {
    title: "Du vant skattejakten!",
    subtitle: "Du fant den siste skatten først."
  },
  sharedWinner: {
    title: "Dere vant skattejakten!",
    subtitle: "Skatten ble funnet samtidig."
  },
  participant: {
    title: "Skattejakten er fullført",
    subtitle: "En annen spiller fant den siste skatten."
  }
};

function formatElapsedSeconds(totalSeconds) {
  const safeSeconds = Math.max(0, Number(totalSeconds) || 0);
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${minutes} min ${seconds} sek`;
}

function formatDistance(distanceMeters) {
  const safeMeters = Math.max(0, Number(distanceMeters) || 0);
  if (safeMeters < 1000) return `${Math.round(safeMeters)} m`;
  return `${(safeMeters / 1000).toFixed(2).replace(".", ",")} km`;
}

function ResultStat({ icon, label, value, valueStyle, last }) {
  return (
    <View style={[styles.statRow, last && styles.statRowLast]}>
      <View style={styles.statIcon}>
        <Text style={styles.statIconText}>{icon}</Text>
      </View>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={[styles.statValue, valueStyle]}>{value}</Text>
    </View>
  );
}

export default function TreasureResultScreen({
  variant = "solo",
  foundCount,
  treasuresTotal,
  difficulty,
  completed = true,
  winner = false,
  sharedWinner = false,
  elapsedSeconds,
  distanceMeters = 0,
  onBack,
  onShare,
  onNewHunt,
  onMenu
}) {
  const pendingResult = getPendingResult();
  const session = getTreasureSession();
  const result = pendingResult?.gameType === "treasure" ? pendingResult : null;
  const entrance = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.timing(entrance, {
      toValue: 1,
      duration: 420,
      delay: 70,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true
    });

    animation.start();
    return () => animation.stop();
  }, [entrance]);

  useEffect(() => {
    if (Platform.OS === "web") return undefined;

    let active = true;
    const timeout = setTimeout(() => {
      if (!active) return;
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }, 180);

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});

    return () => {
      active = false;
      clearTimeout(timeout);
    };
  }, []);

  const resolvedFoundCount = result?.foundCount
    ?? session?.treasuresFound
    ?? Math.max(0, Number(foundCount) || 0);
  const resolvedTreasureTotal = result?.treasuresTotal
    ?? session?.treasuresTotal
    ?? Math.max(resolvedFoundCount, Number(treasuresTotal) || 0);
  const resolvedDifficulty = result?.difficulty || session?.difficulty || difficulty || "medium";
  const resolvedCompleted = result ? true : (session?.completed ?? completed);
  const resolvedElapsedSeconds = result?.elapsedSeconds
    ?? session?.elapsedSeconds
    ?? Math.max(0, Number(elapsedSeconds) || 0);
  const resolvedDistanceMeters = result?.distanceMeters ?? distanceMeters;
  const resolvedVariant = result?.variant
    || (sharedWinner ? "sharedWinner" : winner ? "winner" : variant);
  const copy = RESULT_COPY[resolvedVariant] || RESULT_COPY.solo;

  const calculatedXp = calculateTreasureXp({
    difficulty: resolvedDifficulty,
    treasuresFound: resolvedFoundCount,
    completed: resolvedCompleted,
    winner,
    sharedWinner
  });
  const resolvedXp = Number.isFinite(result?.xp) ? result.xp : calculatedXp.totalXp;

  const animatedStyle = {
    opacity: entrance,
    transform: [
      {
        translateY: entrance.interpolate({
          inputRange: [0, 1],
          outputRange: [16, 0]
        })
      },
      {
        scale: entrance.interpolate({
          inputRange: [0, 1],
          outputRange: [0.985, 1]
        })
      }
    ]
  };

  function completeResult(onComplete) {
    if (markTreasureXpAwarded()) addPlayerXp(resolvedXp);
    clearPendingResult();
    resetTreasureSession();
    onComplete?.();
  }

  return (
    <SafeAreaView style={styles.safe}>
      <Animated.View style={[{ flex: 1 }, animatedStyle]}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          bounces={false}
          overScrollMode="never"
        >
          <View style={styles.frame}>
            <View style={styles.header}>
              <Pressable
                style={({ pressed }) => [styles.headerButton, pressed && styles.pressed]}
                onPress={() => completeResult(onBack || onMenu)}
                accessibilityRole="button"
                accessibilityLabel="Tilbake"
              >
                <Text style={styles.headerButtonText}>‹</Text>
              </Pressable>

              <Text style={styles.headerTitle}>Resultat</Text>

              <Pressable
                style={({ pressed }) => [styles.headerButton, pressed && styles.pressed]}
                onPress={onShare}
                disabled={!onShare}
                accessibilityRole="button"
                accessibilityLabel="Del resultat"
              >
                <Text style={styles.shareText}>⌯</Text>
              </Pressable>
            </View>

            <View style={styles.hero}>
              <Image source={CHEST_IMAGE} style={styles.chestImage} resizeMode="contain" />
              <Text style={styles.title}>{copy.title}</Text>
              <View style={styles.ribbonWrap}>
                <Image source={RIBBON_IMAGE} style={styles.ribbonImage} resizeMode="stretch" />
                <Text style={styles.subtitle}>{copy.subtitle}</Text>
              </View>
            </View>

            <View style={styles.statsCard}>
              <ResultStat icon="◷" label="Tid brukt" value={formatElapsedSeconds(resolvedElapsedSeconds)} />
              <ResultStat icon="⌁" label="Avstand gått (ca.)" value={formatDistance(resolvedDistanceMeters)} />
              <ResultStat
                icon="▣"
                label="Skatter funnet"
                value={`${resolvedFoundCount} / ${resolvedTreasureTotal}`}
                valueStyle={styles.statValueSuccess}
              />
              <ResultStat
                icon="XP"
                label="Samlet XP"
                value={`+${resolvedXp} XP`}
                valueStyle={styles.statValueXp}
                last
              />
            </View>

            <View style={styles.actions}>
              <Pressable
                style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
                onPress={() => completeResult(onNewHunt)}
                accessibilityRole="button"
                accessibilityLabel="Ny skattejakt"
              >
                <Text style={styles.primaryIcon}>▶</Text>
                <Text style={styles.primaryText}>Ny skattejakt</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}
                onPress={() => completeResult(onMenu)}
                accessibilityRole="button"
                accessibilityLabel="Til hovedmeny"
              >
                <Text style={styles.secondaryIcon}>⌂</Text>
                <Text style={styles.secondaryText}>Til hovedmeny</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}
