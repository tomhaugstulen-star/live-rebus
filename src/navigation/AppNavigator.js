import React from "react";
import { Alert, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/home/HomeScreen";
import RebusSetupScreen from "../screens/rebus/RebusSetupScreen";
import RouteReadyScreen from "../screens/rebus/RouteReadyScreen";
import WaitingRoomScreen from "../screens/rebus/WaitingRoomScreen";
import RebusGameScreen from "../screens/rebus/RebusGameScreen.web";
import RebusResultScreen from "../screens/rebus/RebusResultScreen";
import SafetyScreen from "../screens/treasure/SafetyScreen";
import TreasureFoundScreen from "../screens/treasure/TreasureFoundScreen";
import TreasureHuntScreen from "../screens/treasure/TreasureHuntScreen";
import TreasureReadyScreen from "../screens/treasure/TreasureReadyScreen";
import TreasureSetupScreen from "../screens/treasure/TreasureSetupScreen";
import TreasureResultScreen from "../screens/treasure/TreasureResultScreen";
import { DEFAULT_REBUS_CONFIG } from "./navigationConfig";
import { useAppNavigatorState } from "./useAppNavigatorState";

const Stack = createNativeStackNavigator();

function showAppAlert(title, message) {
  if (Platform.OS === "web" && typeof window !== "undefined") {
    window.alert(message ? `${title}\n\n${message}` : title);
    return;
  }

  Alert.alert(title, message);
}

function buildHomeEvents(activeTreasure, navigation) {
  if (!activeTreasure) return undefined;

  return [
    {
      id: activeTreasure.id,
      status: "ongoing",
      title: "Aktiv skattejakt",
      statusText: `${activeTreasure.treasuresFound} av ${activeTreasure.treasuresTotal} skatter funnet`,
      buttonLabel: "Fortsett",
      symbolName: { ios: "map.fill", android: "map", web: "map" },
      accentColor: "#FF6800",
      onPress: () => navigation.navigate("TreasureHunt")
    }
  ];
}

export default function AppNavigator() {
  const nav = useAppNavigatorState();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home">
          {({ navigation }) => (
            <HomeScreen
              userName="Cindy"
              userAvatarUrl={null}
              xp={0}
              homeEvents={buildHomeEvents(nav.activeTreasure, navigation)}
              onOpenProfile={() => showAppAlert("Profil")}
              onOpenSettings={() => showAppAlert("Innstillinger")}
              onStartAdventure={() => navigation.navigate("RebusSetup")}
              onStartRebus={() => navigation.navigate("RebusSetup")}
              onStartTreasure={() => navigation.navigate("TreasureSetup", { initialVariant: "fog" })}
              onStartSonar={() => navigation.navigate("TreasureSetup", { initialVariant: "sonar" })}
              onOpenUpcoming={() => {
                if (nav.activeTreasure) navigation.navigate("TreasureHunt");
                else if (nav.rebusRoute) navigation.navigate("WaitingRoom");
                else showAppAlert("Ingen planlagt", "Du har ingen planlagt rebus ennå.");
              }}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="TreasureSetup">
          {({ navigation, route }) => (
            <TreasureSetupScreen
              initialVariant={route.params?.initialVariant || "fog"}
              onBack={() => navigation.navigate("Home")}
              onContinue={(config) => {
                nav.setTreasureConfig(config);
                navigation.navigate("Safety");
              }}
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
              config={nav.treasureConfig}
              hostName="Cindy"
              participants={["Ida", "Sander", "Nora"]}
              onBack={() => navigation.navigate("Safety")}
              onStart={() => nav.startTreasure(navigation)}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="TreasureHunt">
          {({ navigation }) => (
            <TreasureHuntScreen
              active={Boolean(nav.activeTreasure)}
              config={nav.treasureConfig}
              onBack={() => nav.abandonTreasure(navigation)}
              onFound={() => nav.registerTreasureFound(navigation)}
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
              foundCount={nav.activeTreasure?.treasuresFound || 1}
              xp={120}
              elapsedSeconds={420}
              onNewHunt={() => nav.finishTreasure(navigation, "TreasureSetup")}
              onMenu={() => nav.finishTreasure(navigation, "Home")}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="RebusSetup">
          {({ navigation }) => (
            <RebusSetupScreen
              initialConfig={DEFAULT_REBUS_CONFIG}
              onBack={() => navigation.navigate("Home")}
              onCreateRoute={(config) => nav.createRoute(config, navigation)}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="RouteReady">
          {({ navigation }) => (
            <RouteReadyScreen
              route={nav.activeRoute}
              onBack={() => navigation.navigate("RebusSetup")}
              onMarkGuestReady={nav.markGuestReady}
              onStart={() => nav.startGame(navigation)}
              onStartNowDemo={() => nav.startNowDemo(navigation)}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="WaitingRoom">
          {({ navigation }) => (
            <WaitingRoomScreen
              route={nav.activeRoute}
              onBack={() => navigation.navigate("RouteReady")}
              onStart={() => nav.startGame(navigation)}
              onStartNowDemo={() => nav.startNowDemo(navigation)}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="RebusGame">
          {({ navigation }) => (
            <RebusGameScreen
              route={nav.activeRoute}
              role={nav.rebusRole}
              userPosition={nav.getDemoUserPositionForActivePost()}
              activeIndex={nav.rebusActiveIndex}
              progress={nav.rebusProgress}
              onApproveCheckpoint={nav.approveCheckpoint}
              onFinish={() => nav.finishRebus(navigation)}
              onBack={() => navigation.navigate("RouteReady")}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="RebusResult">
          {({ navigation }) => (
            <RebusResultScreen
              route={nav.activeRoute}
              completedCount={nav.completedCount}
              elapsedSeconds={nav.elapsedSeconds}
              wrongAnswers={nav.rebusWrongAnswers}
              xp={nav.calculateRebusXp(nav.completedCount, nav.rebusWrongAnswers)}
              onNewRoute={() => navigation.navigate("RebusSetup")}
              onMenu={() => navigation.navigate("Home")}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
