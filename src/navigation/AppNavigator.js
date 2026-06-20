import React from "react";
import { Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/home/HomeScreen";
import RebusGameScreen from "../screens/rebus/RebusGameScreen";
import RebusResultScreen from "../screens/rebus/RebusResultScreen";
import RebusSetupScreen from "../screens/rebus/RebusSetupScreen";
import RouteReadyScreen from "../screens/rebus/RouteReadyScreen";
import WaitingRoomScreen from "../screens/rebus/WaitingRoomScreen";
import SafetyScreen from "../screens/treasure/SafetyScreen";
import TreasureFoundScreen from "../screens/treasure/TreasureFoundScreen";
import TreasureHuntScreen from "../screens/treasure/TreasureHuntScreen";
import TreasureReadyScreen from "../screens/treasure/TreasureReadyScreen";
import TreasureResultScreen from "../screens/treasure/TreasureResultScreen";
import TreasureSetupScreen from "../screens/treasure/TreasureSetupScreen";
import { DEFAULT_REBUS_CONFIG, DEMO_ROUTE } from "./navigationConfig";
import { useAppNavigatorState } from "./useAppNavigatorState";

const Stack = createNativeStackNavigator();

function showAppAlert(title, message = "Kommer senere.") {
  Alert.alert(title, message);
}

function getDemoUserPositionForActivePost(activePost) {
  if (!activePost) return null;
  return {
    latitude: activePost.latitude,
    longitude: activePost.longitude,
    accuracy: 4,
    simulated: true
  };
}

function buildHomeEvents(activeTreasure, navigation) {
  if (!activeTreasure) return [];
  return [
    {
      id: "active-treasure",
      title: "Aktiv skattejakt",
      status: "ongoing",
      statusText: "Pågår nå",
      buttonLabel: "Fortsett",
      accentColor: "#FFB21A",
      symbolName: { ios: "map.fill", android: "map", web: "map" },
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
              level={3}
              xp={0}
              xpToNextLevel={80}
              homeEvents={buildHomeEvents(nav.activeTreasure, navigation)}
              onOpenProfile={() => showAppAlert("Profil")}
              onOpenSettings={() => showAppAlert("Innstillinger")}
              onStartAdventure={() => navigation.navigate("RebusSetup")}
              onStartRebus={() => navigation.navigate("RebusSetup")}
              onStartFogTreasure={() => navigation.navigate("TreasureSetup", { variant: "fog" })}
              onStartSonarTreasure={() => navigation.navigate("TreasureSetup", { variant: "sonar" })}
              onStartTreasure={() => navigation.navigate("TreasureSetup", { variant: "sonar" })}
              onOpenUpcoming={() => {
                if (nav.activeTreasure) navigation.navigate("TreasureHunt");
                else if (nav.rebusRoute) navigation.navigate("WaitingRoom");
                else showAppAlert("Ingen planlagt", "Du har ingen planlagt rebus ennå.");
              }}
              onSeeAllChallenges={() => showAppAlert("Utfordringer", "Rebusløp og Skattejakt.")}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="TreasureSetup">
          {({ navigation, route }) => (
            <TreasureSetupScreen
              initialVariant={route.params?.variant}
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
              foundCount={nav.treasureProgress.found}
              totalCount={nav.treasureProgress.total}
              onContinue={() => navigation.navigate("TreasureResult")}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="TreasureResult">
          {({ navigation }) => (
            <TreasureResultScreen
              foundCount={nav.treasureProgress.found}
              totalCount={nav.treasureProgress.total}
              xp={120}
              elapsedSeconds={420}
              onBackHome={() => nav.finishTreasure(navigation)}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="RebusSetup">
          {({ navigation }) => (
            <RebusSetupScreen
              defaultConfig={DEFAULT_REBUS_CONFIG}
              onBack={() => navigation.navigate("Home")}
              onRouteReady={(config) => nav.createRoute(config, navigation)}
              onStartNow={(config) => nav.startNowDemo(config, navigation)}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="RouteReady">
          {({ navigation }) => (
            <RouteReadyScreen
              route={nav.rebusRoute}
              selectedAreaLabel={nav.routeConfig.areaLabel}
              onBack={() => navigation.navigate("RebusSetup")}
              onInviteFriends={() => navigation.navigate("WaitingRoom")}
              onStartAlone={() => navigation.navigate("RebusGame")}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="WaitingRoom">
          {({ navigation }) => (
            <WaitingRoomScreen
              route={nav.rebusRoute}
              hostName="Cindy"
              participants={["Ida", "Sander", "Nora"]}
              onBack={() => navigation.navigate("RouteReady")}
              onStart={() => navigation.navigate("RebusGame")}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="RebusGame">
          {({ navigation }) => (
            <RebusGameScreen
              route={nav.rebusRoute}
              currentPost={nav.currentPost}
              totalPosts={DEMO_ROUTE.posts.length}
              userPosition={getDemoUserPositionForActivePost(nav.activePost)}
              onBackHome={() => navigation.navigate("Home")}
              onAnswer={(answer) => nav.handleAnswer(answer, navigation)}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="RebusResult">
          {({ navigation }) => (
            <RebusResultScreen
              route={nav.rebusRoute}
              score={nav.score}
              totalPosts={DEMO_ROUTE.posts.length}
              elapsedSeconds={nav.elapsedSeconds}
              onBackHome={() => nav.resetRebus(navigation)}
              onPlayAgain={() => nav.playRebusAgain(navigation)}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
