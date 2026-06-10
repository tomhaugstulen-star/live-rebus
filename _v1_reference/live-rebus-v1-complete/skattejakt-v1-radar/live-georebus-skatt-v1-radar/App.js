import React, { useEffect, useMemo, useRef, useState } from "react";
import { Alert, SafeAreaView, StyleSheet, View, ActivityIndicator, Text } from "react-native";
import * as Location from "expo-location";
import ChallengeSelectScreen from "./src/screens/ChallengeSelectScreen";
import TreasureSetupScreen from "./src/screens/TreasureSetupScreen";
import AreaCheckScreen from "./src/screens/AreaCheckScreen";
import SafetyScreen from "./src/screens/SafetyScreen";
import TreasureHuntScreen from "./src/screens/TreasureHuntScreen";
import TreasureFoundScreen from "./src/screens/TreasureFoundScreen";
import TreasureResultScreen from "./src/screens/TreasureResultScreen";
import { theme } from "./src/utils/theme";
import { createRandomPointWithinRadius, distanceMeters } from "./src/utils/geo";

const DEFAULT_HUNT_CONFIG = {
  areaRadiusMeters: 500,
  sightRadiusMeters: 60,
  difficulty: "medium",
  lockedMap: true
};

function calculateXp(hintsUsed) {
  const baseXp = 75;
  const bonus = hintsUsed === 0 ? 10 : 0;
  const penalty = hintsUsed >= 3 ? 20 : hintsUsed === 2 ? 10 : 0;
  return Math.max(25, baseXp + bonus - penalty);
}

export default function App() {
  const [screen, setScreen] = useState("challenge");
  const [loadingGps, setLoadingGps] = useState(true);
  const [userPosition, setUserPosition] = useState(null);
  const [huntConfig, setHuntConfig] = useState(DEFAULT_HUNT_CONFIG);
  const [hunt, setHunt] = useState(null);
  const [startedAt, setStartedAt] = useState(null);
  const [finishedAt, setFinishedAt] = useState(null);
  const [distanceWalkedEstimate, setDistanceWalkedEstimate] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);

  const lastPositionRef = useRef(null);
  const subscriptionRef = useRef(null);

  useEffect(() => {
    startGps();

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
      }
    };
  }, []);

  async function startGps() {
    setLoadingGps(true);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("GPS mangler", "Skattejakt krever GPS-tilgang.");
        setLoadingGps(false);
        return;
      }

      const initial = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
      });

      setUserPosition(initial.coords);
      lastPositionRef.current = initial.coords;

      subscriptionRef.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 5,
          timeInterval: 3000
        },
        (location) => {
          const next = location.coords;
          setUserPosition(next);

          const previous = lastPositionRef.current;
          if (previous) {
            const step = distanceMeters(
              previous.latitude,
              previous.longitude,
              next.latitude,
              next.longitude
            );

            if (step > 2 && step < 100) {
              setDistanceWalkedEstimate((value) => value + step);
            }
          }

          lastPositionRef.current = next;
        }
      );
    } catch (error) {
      console.error("GPS-feil:", error);
      Alert.alert("GPS-feil", "Klarte ikke å starte GPS.");
    } finally {
      setLoadingGps(false);
    }
  }

  function createHunt(config) {
    if (!userPosition) {
      Alert.alert("Mangler GPS", "Vent til appen har funnet posisjonen din.");
      return;
    }

    const treasureDistance =
      config.difficulty === "easy" ? 220 : config.difficulty === "hard" ? 650 : 420;

    const maxTreasureDistance = Math.min(Math.max(treasureDistance, 80), config.areaRadiusMeters - 40);

    const treasurePoint = createRandomPointWithinRadius(
      userPosition.latitude,
      userPosition.longitude,
      maxTreasureDistance,
      Math.max(70, maxTreasureDistance * 0.65)
    );

    const targetType = Math.random() < 0.5 ? "nature" : "history";

    const newHunt = {
      id: `treasure_${Date.now()}`,
      createdAt: new Date().toISOString(),
      area: {
        center: {
          latitude: userPosition.latitude,
          longitude: userPosition.longitude
        },
        radiusMeters: config.areaRadiusMeters,
        safetyStatus: "unchecked"
      },
      startPoint: {
        latitude: userPosition.latitude,
        longitude: userPosition.longitude
      },
      treasurePoint,
      sightRadiusMeters: config.sightRadiusMeters,
      treasureRadiusMeters: 35,
      lockedMap: config.lockedMap,
      difficulty: config.difficulty,
      targetType,
      status: "area_check"
    };

    setHuntConfig(config);
    setHunt(newHunt);
    setScreen("areaCheck");
  }

  function approveAreaCheck() {
    if (!hunt) return;

    setHunt({
      ...hunt,
      area: {
        ...hunt.area,
        safetyStatus: "approved"
      },
      status: "safety"
    });

    setScreen("safety");
  }

  function startTreasureHunt() {
    setDistanceWalkedEstimate(0);
    setHintsUsed(0);
    lastPositionRef.current = userPosition;
    setStartedAt(new Date().toISOString());

    setHunt((prev) => ({
      ...prev,
      status: "active"
    }));

    setScreen("hunt");
  }

  function finishTreasureHunt() {
    setFinishedAt(new Date().toISOString());
    setHunt((prev) => ({ ...prev, status: "finished" }));
    setScreen("found");
  }

  function goToResult() {
    setScreen("result");
  }

  function resetToMenu() {
    setHunt(null);
    setStartedAt(null);
    setFinishedAt(null);
    setDistanceWalkedEstimate(0);
    setHintsUsed(0);
    setScreen("challenge");
  }

  const elapsedSeconds = useMemo(() => {
    if (!startedAt) return 0;
    const end = finishedAt ? new Date(finishedAt).getTime() : Date.now();
    return Math.max(0, Math.round((end - new Date(startedAt).getTime()) / 1000));
  }, [startedAt, finishedAt, screen]);

  const xpAwarded = calculateXp(hintsUsed);

  if (loadingGps) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <ActivityIndicator color={theme.colors.primary} size="large" />
          <Text style={styles.statusText}>Starter GPS...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (screen === "challenge") {
    return (
      <ChallengeSelectScreen
        onSelectTreasure={() => setScreen("setup")}
        onSelectRebus={() => Alert.alert("Rebusløp", "Rebusløp bygges som egen V1-modul.")}
      />
    );
  }

  if (screen === "setup") {
    return (
      <TreasureSetupScreen
        initialConfig={huntConfig}
        onBack={() => setScreen("challenge")}
        onCreateHunt={createHunt}
      />
    );
  }

  if (screen === "areaCheck" && hunt && userPosition) {
    return (
      <AreaCheckScreen
        hunt={hunt}
        userPosition={userPosition}
        onBack={() => setScreen("setup")}
        onApprove={approveAreaCheck}
      />
    );
  }

  if (screen === "safety" && hunt) {
    return <SafetyScreen onBack={() => setScreen("areaCheck")} onStart={startTreasureHunt} />;
  }

  if (screen === "hunt" && hunt && userPosition) {
    return (
      <TreasureHuntScreen
        hunt={hunt}
        userPosition={userPosition}
        elapsedSeconds={elapsedSeconds}
        distanceWalkedEstimate={distanceWalkedEstimate}
        onFinish={finishTreasureHunt}
        onBack={() => setScreen("safety")}
        onHintsUsedChange={setHintsUsed}
      />
    );
  }

  if (screen === "found") {
    return <TreasureFoundScreen onResult={goToResult} xpAwarded={xpAwarded} />;
  }

  if (screen === "result") {
    return (
      <TreasureResultScreen
        elapsedSeconds={elapsedSeconds}
        distanceWalkedEstimate={distanceWalkedEstimate}
        hintsUsed={hintsUsed}
        xp={xpAwarded}
        onNewHunt={() => setScreen("setup")}
        onMenu={resetToMenu}
      />
    );
  }

  return (
    <ChallengeSelectScreen
      onSelectTreasure={() => setScreen("setup")}
      onSelectRebus={() => Alert.alert("Rebusløp", "Rebusløp bygges separat.")}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background
  },
  statusText: {
    color: theme.colors.textMuted,
    marginTop: 12,
    fontSize: 15
  }
});
