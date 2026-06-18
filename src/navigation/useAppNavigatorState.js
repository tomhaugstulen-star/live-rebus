import { useMemo, useState } from "react";
import { resetTreasureSession } from "../utils/treasureSessionStore";
import {
  calculateRebusXp,
  DEFAULT_TREASURE_CONFIG,
  TREASURE_TOTALS
} from "./navigationConfig";
import { DEMO_ROUTE } from "../data/rebus/demoRoute";

export function useAppNavigatorState() {
  const [rebusRoute, setRebusRoute] = useState(null);
  const [rebusRole] = useState("host");
  const [rebusActiveIndex, setRebusActiveIndex] = useState(0);
  const [rebusProgress, setRebusProgress] = useState({});
  const [rebusStartedAt, setRebusStartedAt] = useState(null);
  const [rebusFinishedAt, setRebusFinishedAt] = useState(null);
  const [rebusWrongAnswers] = useState(0);
  const [treasureConfig, setTreasureConfig] = useState(DEFAULT_TREASURE_CONFIG);
  const [activeTreasure, setActiveTreasure] = useState(null);

  const activeRoute = useMemo(() => rebusRoute || DEMO_ROUTE, [rebusRoute]);
  const completedCount = useMemo(
    () => Object.values(rebusProgress).filter(Boolean).length,
    [rebusProgress]
  );
  const elapsedSeconds = useMemo(() => {
    if (!rebusStartedAt) return 0;
    const endTime = rebusFinishedAt ? rebusFinishedAt : Date.now();
    return Math.max(0, Math.floor((endTime - rebusStartedAt) / 1000));
  }, [rebusStartedAt, rebusFinishedAt]);

  function markGuestReady() {
    setRebusRoute((currentRoute) => {
      if (!currentRoute) return currentRoute;
      return {
        ...currentRoute,
        accepted: { ...currentRoute.accepted, guest: true }
      };
    });
  }

  function startGame(navigation) {
    setRebusStartedAt(Date.now());
    setRebusFinishedAt(null);
    navigation.navigate("RebusGame");
  }

  function startNowDemo(navigation) {
    setRebusRoute((currentRoute) => ({
      ...(currentRoute || DEMO_ROUTE),
      scheduledStartTime: new Date().toISOString(),
      accepted: { host: true, guest: true },
      status: "active"
    }));
    setRebusStartedAt(Date.now());
    setRebusFinishedAt(null);
    navigation.navigate("RebusGame");
  }

  function startTreasure(navigation) {
    const total = TREASURE_TOTALS[treasureConfig.difficulty] || TREASURE_TOTALS.medium;
    setActiveTreasure({
      id: `treasure-${Date.now()}`,
      type: "treasure",
      status: "active",
      name: treasureConfig.name?.trim() || "Skattejakt",
      mode: treasureConfig.variant,
      treasuresFound: 0,
      treasuresTotal: total,
      startedAt: Date.now()
    });
    navigation.navigate("TreasureHunt");
  }

  function registerTreasureFound(navigation) {
    setActiveTreasure((current) => {
      if (!current) return current;
      return {
        ...current,
        treasuresFound: Math.min(current.treasuresFound + 1, current.treasuresTotal)
      };
    });
    navigation.navigate("TreasureFound");
  }

  function abandonTreasure(navigation) {
    resetTreasureSession();
    setActiveTreasure(null);
    navigation.reset({ index: 0, routes: [{ name: "Home" }] });
  }

  function finishTreasure(navigation, destination) {
    resetTreasureSession();
    setActiveTreasure(null);
    navigation.navigate(destination);
  }

  function approveCheckpoint(checkpointId) {
    const checkpoints = activeRoute?.checkpoints || [];
    const activeCheckpoint = checkpoints[rebusActiveIndex];
    const id = checkpointId || activeCheckpoint?.id || `post-${rebusActiveIndex + 1}`;

    setRebusProgress((currentProgress) => ({ ...currentProgress, [id]: true }));
    if (rebusActiveIndex < checkpoints.length - 1) {
      setRebusActiveIndex((currentIndex) => currentIndex + 1);
    }
  }

  function finishRebus(navigation) {
    setRebusFinishedAt(Date.now());
    navigation.reset({ index: 1, routes: [{ name: "Home" }, { name: "RebusResult" }] });
  }

  function createRoute(config, navigation) {
    const selectedCheckpoints = DEMO_ROUTE.checkpoints.slice(0, config.postCount);
    setRebusRoute({
      ...DEMO_ROUTE,
      scheduledStartTime: config.scheduledStartTime,
      checkpoints: selectedCheckpoints,
      hostOrder: selectedCheckpoints.map((post) => post.id),
      guestOrder: selectedCheckpoints.map((post) => post.id).reverse(),
      accepted: { host: true, guest: false },
      status: "scheduled"
    });
    setRebusActiveIndex(0);
    setRebusProgress({});
    setRebusStartedAt(null);
    setRebusFinishedAt(null);
    navigation.navigate("RouteReady");
  }

  function getDemoUserPositionForActivePost() {
    const checkpoint = activeRoute?.checkpoints?.[rebusActiveIndex];
    return checkpoint?.coordinates || { latitude: 59.9139, longitude: 10.7522 };
  }

  return {
    activeRoute,
    activeTreasure,
    approveCheckpoint,
    calculateRebusXp,
    completedCount,
    createRoute,
    elapsedSeconds,
    getDemoUserPositionForActivePost,
    markGuestReady,
    rebusActiveIndex,
    rebusProgress,
    rebusRole,
    rebusRoute,
    rebusWrongAnswers,
    registerTreasureFound,
    setTreasureConfig,
    startGame,
    startNowDemo,
    startTreasure,
    abandonTreasure,
    finishTreasure,
    finishRebus,
    treasureConfig
  };
}
