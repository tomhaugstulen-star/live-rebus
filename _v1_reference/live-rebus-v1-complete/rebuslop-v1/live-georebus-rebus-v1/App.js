import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from "react-native";
import * as Location from "expo-location";

import ChallengeSelectScreen from "./src/screens/ChallengeSelectScreen";
import RebusSetupScreen from "./src/screens/RebusSetupScreen";
import RouteReadyScreen from "./src/screens/RouteReadyScreen";
import WaitingRoomScreen from "./src/screens/WaitingRoomScreen";
import RebusGameScreen from "./src/screens/RebusGameScreen";
import RebusResultScreen from "./src/screens/RebusResultScreen";

import { generateRebusCheckpoints } from "./src/services/rebusSources";
import { theme } from "./src/utils/theme";
import {
  distanceMeters,
  formatDuration,
  sortNearestNeighbor
} from "./src/utils/geo";

const XP_RULES = {
  winner: 100,
  completed: 50,
  allPostsApproved: 25,
  noWrongAnswersBonus: 10,
  perApprovedCheckpoint: 10
};

const DEFAULT_CONFIG = {
  postCount: 7,
  scheduledStartTime: new Date(Date.now() + 15 * 60 * 1000).toISOString()
};

export default function App() {
  const [screen, setScreen] = useState("challenge");
  const [loadingGps, setLoadingGps] = useState(true);
  const [loadingRoute, setLoadingRoute] = useState(false);
  const [userPosition, setUserPosition] = useState(null);
  const [route, setRoute] = useState(null);
  const [role, setRole] = useState("host");
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState({});
  const [startedAt, setStartedAt] = useState(null);
  const [finishedAt, setFinishedAt] = useState(null);
  const [wrongAnswers, setWrongAnswers] = useState(0);

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
        Alert.alert("GPS mangler", "Rebusløp krever GPS-tilgang.");
        setLoadingGps(false);
        return;
      }

      const initial = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
      });

      setUserPosition(initial.coords);

      subscriptionRef.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 5,
          timeInterval: 3000
        },
        (location) => {
          setUserPosition(location.coords);
        }
      );
    } catch (error) {
      console.error("GPS-feil:", error);
      Alert.alert("GPS-feil", "Klarte ikke å starte GPS.");
    } finally {
      setLoadingGps(false);
    }
  }

  async function createRoute(config) {
    if (!userPosition) {
      Alert.alert("Mangler GPS", "Vent til appen har funnet posisjonen din.");
      return;
    }

    setLoadingRoute(true);

    try {
      const checkpoints = await generateRebusCheckpoints(
        userPosition.latitude,
        userPosition.longitude,
        config.postCount
      );

      if (checkpoints.length < Math.min(3, config.postCount)) {
        Alert.alert(
          "For få poster",
          "Appen fant ikke nok egnede poster her. Flytt deg litt og prøv igjen."
        );
        return;
      }

      const ordered = sortNearestNeighbor(
        userPosition.latitude,
        userPosition.longitude,
        checkpoints
      );

      const newRoute = {
        id: `route_${Date.now()}`,
        createdAt: new Date().toISOString(),
        scheduledStartTime: config.scheduledStartTime,
        startPoint: {
          latitude: userPosition.latitude,
          longitude: userPosition.longitude
        },
        checkpoints: ordered,
        hostOrder: ordered.map((post) => post.id),
        guestOrder: [...ordered].reverse().map((post) => post.id),
        accepted: {
          host: true,
          guest: false
        },
        status: "scheduled"
      };

      setRoute(newRoute);
      setRole("host");
      setActiveIndex(0);
      setProgress({});
      setWrongAnswers(0);
      setStartedAt(null);
      setFinishedAt(null);
      setScreen("routeReady");
    } catch (error) {
      console.error("Rute-feil:", error);
      Alert.alert("Feil", "Klarte ikke å lage rute.");
    } finally {
      setLoadingRoute(false);
    }
  }

  function markGuestReady() {
    if (!route) return;

    setRoute({
      ...route,
      accepted: {
        host: true,
        guest: true
      }
    });
  }

  function startNowDemo() {
    if (!route) return;

    setRoute({
      ...route,
      scheduledStartTime: new Date().toISOString(),
      accepted: {
        host: true,
        guest: true
      },
      status: "active"
    });

    startGame(true);
  }

  function startGame(force = false) {
    if (!route) return;

    const start = new Date(route.scheduledStartTime).getTime();

    if (!route.accepted.host || !route.accepted.guest) {
      Alert.alert("Ikke klar", "Begge lag må godta før start.");
      return;
    }

    if (!force && Date.now() < start) {
      setScreen("waiting");
      return;
    }

    setStartedAt(new Date().toISOString());
    setFinishedAt(null);
    setActiveIndex(0);
    setProgress({});
    setWrongAnswers(0);
    setScreen("game");
  }

  function approveCheckpoint(checkpointId) {
    const now = new Date().toISOString();

    setProgress((prev) => ({
      ...prev,
      [checkpointId]: {
        checkpointId,
        reachedAt: now,
        answeredAt: now,
        isGpsApproved: true,
        isAnswerCorrect: true,
        isApproved: true
      }
    }));

    const order = role === "host" ? route.hostOrder : route.guestOrder;
    const isLast = activeIndex + 1 >= order.length;

    if (!isLast) {
      setActiveIndex((value) => value + 1);
    }
  }

  function finishRoute() {
    setFinishedAt(new Date().toISOString());
    setScreen("result");
  }

  function calculateXp() {
    const completed = Object.values(progress).filter((post) => post?.isApproved).length;

    let xp = 0;
    xp += XP_RULES.winner;
    xp += XP_RULES.allPostsApproved;
    xp += completed * XP_RULES.perApprovedCheckpoint;

    if (wrongAnswers === 0) {
      xp += XP_RULES.noWrongAnswersBonus;
    }

    return xp;
  }

  function resetToMenu() {
    setRoute(null);
    setRole("host");
    setActiveIndex(0);
    setProgress({});
    setStartedAt(null);
    setFinishedAt(null);
    setWrongAnswers(0);
    setScreen("challenge");
  }

  function newRoute() {
    setRoute(null);
    setRole("host");
    setActiveIndex(0);
    setProgress({});
    setStartedAt(null);
    setFinishedAt(null);
    setWrongAnswers(0);
    setScreen("setup");
  }

  const elapsedSeconds = useMemo(() => {
    if (!startedAt) return 0;
    const end = finishedAt ? new Date(finishedAt).getTime() : Date.now();
    return Math.max(0, Math.round((end - new Date(startedAt).getTime()) / 1000));
  }, [startedAt, finishedAt, screen]);

  const completedCount = useMemo(() => {
    return Object.values(progress).filter((post) => post?.isApproved).length;
  }, [progress]);

  if (loadingGps || loadingRoute) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <ActivityIndicator color={theme.colors.primary} size="large" />
          <Text style={styles.statusText}>
            {loadingRoute ? "Genererer rebusrute..." : "Starter GPS..."}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (screen === "challenge") {
    return (
      <ChallengeSelectScreen
        onSelectRebus={() => setScreen("setup")}
        onSelectTreasure={() =>
          Alert.alert("Skattejakt", "Skattejakt bygges som egen V1-modul.")
        }
      />
    );
  }

  if (screen === "setup") {
    return (
      <RebusSetupScreen
        initialConfig={DEFAULT_CONFIG}
        onBack={() => setScreen("challenge")}
        onCreateRoute={createRoute}
      />
    );
  }

  if (screen === "routeReady" && route) {
    return (
      <RouteReadyScreen
        route={route}
        onBack={() => setScreen("setup")}
        onMarkGuestReady={markGuestReady}
        onStart={() => startGame(false)}
        onStartNowDemo={startNowDemo}
      />
    );
  }

  if (screen === "waiting" && route) {
    return (
      <WaitingRoomScreen
        route={route}
        onBack={() => setScreen("routeReady")}
        onStart={() => startGame(false)}
        onStartNowDemo={startNowDemo}
      />
    );
  }

  if (screen === "game" && route && userPosition) {
    return (
      <RebusGameScreen
        route={route}
        role={role}
        userPosition={userPosition}
        activeIndex={activeIndex}
        progress={progress}
        onApproveCheckpoint={approveCheckpoint}
        onFinish={finishRoute}
        onBack={() => setScreen("waiting")}
      />
    );
  }

  if (screen === "result" && route) {
    return (
      <RebusResultScreen
        route={route}
        completedCount={completedCount}
        elapsedSeconds={elapsedSeconds}
        wrongAnswers={wrongAnswers}
        xp={calculateXp()}
        onNewRoute={newRoute}
        onMenu={resetToMenu}
      />
    );
  }

  return (
    <ChallengeSelectScreen
      onSelectRebus={() => setScreen("setup")}
      onSelectTreasure={() => Alert.alert("Skattejakt", "Skattejakt bygges separat.")}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
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
