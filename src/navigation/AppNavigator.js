import React, { useMemo, useState } from "react";
import { Alert, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/home/HomeScreen";
import RebusSetupScreen from "../screens/rebus/RebusSetupScreen";
import RouteReadyScreen from "../screens/rebus/RouteReadyScreen";
import WaitingRoomScreen from "../screens/rebus/WaitingRoomScreen";
import RebusGameScreen from "../screens/rebus/RebusGameScreen.web";
import RebusResultScreen from "../screens/rebus/RebusResultScreen";
import AreaCheckScreen from "../screens/treasure/AreaCheckScreen";
import SafetyScreen from "../screens/treasure/SafetyScreen";
import TreasureFoundScreen from "../screens/treasure/TreasureFoundScreen";
import TreasureHuntScreen from "../screens/treasure/TreasureHuntScreen";
import TreasureReadyScreen from "../screens/treasure/TreasureReadyScreen";
import TreasureSetupScreen from "../screens/treasure/TreasureSetupScreen";
import TreasureResultScreen from "../screens/treasure/TreasureResultScreen";
import { resetTreasureSession } from "../utils/treasureSessionStore";

const Stack = createNativeStackNavigator();

const DEFAULT_REBUS_CONFIG = {
  postCount: 7,
  scheduledStartTime: new Date(Date.now() + 15 * 60 * 1000).toISOString()
};

const DEFAULT_TREASURE_CONFIG = {
  name: "",
  variant: "fog",
  players: "solo",
  difficulty: "medium"
};

const TREASURE_TOTALS = {
  easy: 4,
  medium: 8,
  hard: 12
};

const DEMO_ROUTE = {
  id: "demo-route-akershus",
  title: "Demo-rebus i nærområdet",
  areaName: "Live Rebus demo",
  distanceMeters: 1800,
  estimatedDurationMinutes: 45,
  checkpoints: [
    {
      id: "post-1",
      title: "Post 1",
      clue: "Kort naturord. Svaret er ås.",
      question: "Hva kalles en lav høyde i terrenget?",
      answer: "ås",
      acceptedAnswers: ["ås", "aas"],
      hint: "To bokstaver.",
      coordinates: { latitude: 59.9139, longitude: 10.7522 }
    },
    {
      id: "post-2",
      title: "Post 2",
      clue: "Noe gammelt som er verdt å ta vare på.",
      question: "Hva kaller vi et spor etter eldre tid?",
      answer: "kulturminne",
      acceptedAnswers: ["kulturminne"],
      hint: "Starter med kultur.",
      coordinates: { latitude: 59.9142, longitude: 10.753 }
    },
    {
      id: "post-3",
      title: "Post 3",
      clue: "Finnes i bekk, elv og innsjø.",
      question: "Hva er dette?",
      answer: "vann",
      acceptedAnswers: ["vann"],
      hint: "Fire bokstaver.",
      coordinates: { latitude: 59.9146, longitude: 10.7536 }
    },
    {
      id: "post-4",
      title: "Post 4",
      clue: "Et minne på en gravplass.",
      question: "Hva heter dette?",
      answer: "gravminne",
      acceptedAnswers: ["gravminne"],
      hint: "Satt sammen av grav + minne.",
      coordinates: { latitude: 59.915, longitude: 10.7542 }
    },
    {
      id: "post-5",
      title: "Post 5",
      clue: "Gammel betegnelse for bukt.",
      question: "Hva er ordet?",
      answer: "vik",
      acceptedAnswers: ["vik"],
      hint: "Tre bokstaver.",
      coordinates: { latitude: 59.9154, longitude: 10.7548 }
    },
    {
      id: "post-6",
      title: "Post 6",
      clue: "En rund forhøyning i landskapet.",
      question: "Hva kalles dette?",
      answer: "haug",
      acceptedAnswers: ["haug"],
      hint: "Fire bokstaver.",
      coordinates: { latitude: 59.9158, longitude: 10.7554 }
    },
    {
      id: "post-7",
      title: "Post 7",
      clue: "Et sted der mennesker bor.",
      question: "Hva kalles dette?",
      answer: "bosetning",
      acceptedAnswers: ["bosetning"],
      hint: "Starter med bo.",
      coordinates: { latitude: 59.9162, longitude: 10.756 }
    }
  ]
};

function calculateRebusXp(completedCount, wrongAnswers) {
  const baseXp = completedCount * 50;
  const penalty = wrongAnswers * 10;
  return Math.max(0, baseXp - penalty);
}

function showAppAlert(title, message) {
  if (Platform.OS === "web" && typeof window !== "undefined") {
    window.alert(message ? `${title}\n\n${message}` : title);
    return;
  }

  Alert.alert(title, message);
}

export default function AppNavigator() {
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
        accepted: {
          ...currentRoute.accepted,
          guest: true
        }
      };
    });
  }

  function startGame(navigation) {
    setRebusStartedAt(Date.now());
    setRebusFinishedAt(null);
    navigation.navigate("RebusGame");
  }

  function startNowDemo(navigation) {
    setRebusRoute((currentRoute) => {
      const baseRoute = currentRoute || DEMO_ROUTE;

      return {
        ...baseRoute,
        scheduledStartTime: new Date().toISOString(),
        accepted: {
          host: true,
          guest: true
        },
        status: "active"
      };
    });

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

    const id =
      checkpointId || activeCheckpoint?.id || `post-${rebusActiveIndex + 1}`;

    setRebusProgress((currentProgress) => ({
      ...currentProgress,
      [id]: true
    }));

    if (rebusActiveIndex < checkpoints.length - 1) {
      setRebusActiveIndex((currentIndex) => currentIndex + 1);
    }
  }

  function finishRebus(navigation) {
    setRebusFinishedAt(Date.now());
    navigation.reset({
      index: 1,
      routes: [{ name: "Home" }, { name: "RebusResult" }]
    });
  }

  function getDemoUserPositionForActivePost() {
    const checkpoint = activeRoute?.checkpoints?.[rebusActiveIndex];

    return (
      checkpoint?.coordinates || {
        latitude: 59.9139,
        longitude: 10.7522
      }
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home">
          {({ navigation }) => {
            const homeEvents = activeTreasure
              ? [
                  {
                    id: activeTreasure.id,
                    status: "ongoing",
                    title: activeTreasure.name,
                    statusText: `${activeTreasure.treasuresFound} av ${activeTreasure.treasuresTotal} skatter funnet`,
                    buttonLabel: "Fortsett",
                    symbolName: {
                      ios: "map.fill",
                      android: "map",
                      web: "map"
                    },
                    accentColor: "#FF6800",
                    onPress: () => navigation.navigate("TreasureHunt")
                  }
                ]
              : undefined;

            return (
              <HomeScreen
                userName="Cindy"
                userAvatarUrl={null}
                level={3}
                xp={0}
                xpToNextLevel={80}
                homeEvents={homeEvents}
                onOpenProfile={() => showAppAlert("Profil")}
                onOpenSettings={() => showAppAlert("Innstillinger")}
                onStartAdventure={() => navigation.navigate("RebusSetup")}
                onStartRebus={() => navigation.navigate("RebusSetup")}
                onStartTreasure={() => navigation.navigate("TreasureSetup")}
                onOpenUpcoming={() => {
                  if (activeTreasure) {
                    navigation.navigate("TreasureHunt");
                  } else if (rebusRoute) {
                    navigation.navigate("WaitingRoom");
                  } else {
                    Alert.alert("Ingen planlagt", "Du har ingen planlagt rebus ennå.");
                  }
                }}
                onSeeAllChallenges={() =>
                  Alert.alert("Utfordringer", "Rebusløp og Skattejakt.")
                }
              />
            );
          }}
        </Stack.Screen>

        <Stack.Screen name="TreasureSetup">
          {({ navigation }) => (
            <TreasureSetupScreen
              onBack={() => navigation.navigate("Home")}
              onContinue={(config) => {
                setTreasureConfig(config);
                navigation.navigate("Safety");
              }}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="AreaCheck">
          {({ navigation }) => (
            <AreaCheckScreen
              onBack={() => navigation.navigate("TreasureSetup")}
              onContinue={() => navigation.navigate("Safety")}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Safety">
          {({ navigation }) => (
            <SafetyScreen
              onBack={() => navigation.navigate("TreasureSetup")}
              onContinue={() => navigation.navigate("TreasureReady")}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="TreasureReady">
          {({ navigation }) => (
            <TreasureReadyScreen
              config={treasureConfig}
              hostName="Cindy"
              participants={["Ida", "Sander", "Nora"]}
              onBack={() => navigation.navigate("Safety")}
              onStart={() => startTreasure(navigation)}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="TreasureHunt">
          {({ navigation }) => (
            <TreasureHuntScreen
              active={Boolean(activeTreasure)}
              config={treasureConfig}
              onBack={() => abandonTreasure(navigation)}
              onFound={() => registerTreasureFound(navigation)}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="TreasureFound">
          {({ navigation }) => (
            <TreasureFoundScreen
              onBack={() => navigation.navigate("TreasureHunt")}
              onContinue={() => navigation.navigate("TreasureResult")}
              onMenu={() => navigation.navigate("Home")}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="TreasureResult">
          {({ navigation }) => (
            <TreasureResultScreen
              foundCount={activeTreasure?.treasuresFound || 1}
              xp={120}
              elapsedSeconds={420}
              onNewHunt={() => finishTreasure(navigation, "TreasureSetup")}
              onMenu={() => finishTreasure(navigation, "Home")}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="RebusSetup">
          {({ navigation }) => (
            <RebusSetupScreen
              initialConfig={DEFAULT_REBUS_CONFIG}
              onBack={() => navigation.navigate("Home")}
              onCreateRoute={(config) => {
                const selectedCheckpoints = DEMO_ROUTE.checkpoints.slice(
                  0,
                  config.postCount
                );

                setRebusRoute({
                  ...DEMO_ROUTE,
                  scheduledStartTime: config.scheduledStartTime,
                  checkpoints: selectedCheckpoints,
                  hostOrder: selectedCheckpoints.map((post) => post.id),
                  guestOrder: selectedCheckpoints
                    .map((post) => post.id)
                    .reverse(),
                  accepted: {
                    host: true,
                    guest: false
                  },
                  status: "scheduled"
                });

                setRebusActiveIndex(0);
                setRebusProgress({});
                setRebusStartedAt(null);
                setRebusFinishedAt(null);

                navigation.navigate("RouteReady");
              }}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="RouteReady">
          {({ navigation }) => (
            <RouteReadyScreen
              route={activeRoute}
              onBack={() => navigation.navigate("RebusSetup")}
              onMarkGuestReady={markGuestReady}
              onStart={() => startGame(navigation)}
              onStartNowDemo={() => startNowDemo(navigation)}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="WaitingRoom">
          {({ navigation }) => (
            <WaitingRoomScreen
              route={activeRoute}
              onBack={() => navigation.navigate("RouteReady")}
              onStart={() => startGame(navigation)}
              onStartNowDemo={() => startNowDemo(navigation)}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="RebusGame">
          {({ navigation }) => (
            <RebusGameScreen
              route={activeRoute}
              role={rebusRole}
              userPosition={getDemoUserPositionForActivePost()}
              activeIndex={rebusActiveIndex}
              progress={rebusProgress}
              onApproveCheckpoint={approveCheckpoint}
              onFinish={() => finishRebus(navigation)}
              onBack={() => navigation.navigate("RouteReady")}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="RebusResult">
          {({ navigation }) => (
            <RebusResultScreen
              route={activeRoute}
              completedCount={completedCount}
              elapsedSeconds={elapsedSeconds}
              wrongAnswers={rebusWrongAnswers}
              xp={calculateRebusXp(completedCount, rebusWrongAnswers)}
              onNewRoute={() => navigation.navigate("RebusSetup")}
              onMenu={() => navigation.navigate("Home")}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
