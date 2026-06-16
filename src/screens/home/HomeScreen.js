import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SymbolView } from "expo-symbols";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeChallengeCard from "../../components/home/HomeChallengeCard";
import HomeUpcomingCard from "../../components/home/HomeUpcomingCard";
import { theme } from "../../utils/designTokens";

const homeBackground = require("../../../assets/images/home/home-background.png");
const homeRebusArt = require("../../../assets/images/home/home-rebus-art.png");
const homeTreasureArt = require("../../../assets/images/home/home-treasure-art.png");

export default function HomeScreen({
  userName = "Eventyrer",
  userAvatarUrl = null,
  onOpenProfile,
  onOpenSettings,
  onStartAdventure,
  onStartRebus,
  onStartTreasure,
  onSeeAllChallenges,
  onOpenUpcoming,
  homeEvents,
  xp = 420
}) {
  const displayName = userName?.trim() || "Eventyrer";
  const fallbackInitial = displayName.charAt(0).toUpperCase();
  const handleStartRebus = onStartRebus || onStartAdventure;

  const defaultHomeEvents = [
    {
      id: "rebus-first",
      status: "empty",
      title: "Rebusløp",
      statusText: "Din første rebus venter",
      buttonLabel: "Velg rebusløp",
      symbolName: {
        ios: "puzzlepiece.extension",
        android: "extension",
        web: "extension"
      },
      accentColor: theme.colors.rebus,
      onPress: handleStartRebus
    },
    {
      id: "treasure-first",
      status: "empty",
      title: "Skattejakt",
      statusText: "Klar for å finne skatten?",
      buttonLabel: "Velg skattejakt",
      symbolName: {
        ios: "map.fill",
        android: "map",
        web: "map"
      },
      accentColor: theme.colors.primary,
      onPress: onStartTreasure
    }
  ];

  const hasHomeEvents = Array.isArray(homeEvents) && homeEvents.length > 0;

  const visibleHomeEvents = hasHomeEvents
    ? homeEvents.slice(0, 2)
    : defaultHomeEvents;

  const eventSectionTitle = !hasHomeEvents
    ? "Start ditt første eventyr"
    : visibleHomeEvents.some(
        (event) => event.status === "planned" || event.status === "ongoing"
      )
      ? "Dine neste eventyr"
      : "Dine siste eventyr";

  const getEventPresentation = (event) => {
    const normalizedStatus = event.status || "planned";

    if (normalizedStatus === "empty") {
      return {
        statusText: event.statusText,
        buttonLabel: event.buttonLabel
      };
    }

    if (normalizedStatus === "ongoing") {
      return {
        statusText: event.statusText || "Pågående nå",
        buttonLabel: event.buttonLabel || "Fortsett eventyr"
      };
    }

    if (normalizedStatus === "completed") {
      return {
        statusText: event.statusText || "Fullført",
        buttonLabel: event.buttonLabel || "Se resultat"
      };
    }

    return {
      statusText: event.statusText || "Planlagt",
      buttonLabel: event.buttonLabel || "Gå til venterom"
    };
  };

  return (
    <View style={styles.screen}>
      <View style={styles.topBackdrop} pointerEvents="none">
        <Image
          source={homeBackground}
          style={styles.topBackdropImage}
          resizeMode="cover"
        />
        <View style={styles.topBackdropFade} />
      </View>

      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.profileGroup}>
              <TouchableOpacity
                style={styles.profileButton}
                onPress={
                  typeof onOpenProfile === "function"
                    ? onOpenProfile
                    : undefined
                }
                activeOpacity={0.85}
                accessibilityRole="button"
                accessibilityLabel="Åpne profil"
              >
                <View style={styles.avatar}>
                  {userAvatarUrl ? (
                    <Image
                      source={{ uri: userAvatarUrl }}
                      style={styles.avatarImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <Text style={styles.avatarFallback}>
                      {fallbackInitial}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>

              <View style={styles.greetingBlock}>
                <Text
                  style={styles.greeting}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  Hei,{" "}
                  <Text style={styles.userName}>
                    {displayName}!
                  </Text>
                </Text>
                <Text style={styles.xpText}>{xp} XP</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.settingsButton}
              onPress={
                typeof onOpenSettings === "function"
                  ? onOpenSettings
                  : undefined
              }
              activeOpacity={0.85}
              accessibilityRole="button"
              accessibilityLabel="Åpne innstillinger"
            >
              <SymbolView
                name={{
                  ios: "gearshape",
                  android: "settings",
                  web: "settings"
                }}
                size={30}
                tintColor="rgba(203, 213, 225, 0.72)"
                style={styles.settingsIcon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.hero}>
            <Text style={styles.heroTitle}>
              <Text style={styles.heroAccent}>Live </Text>
              Rebus
            </Text>

            <Text style={styles.heroSubtitle}>
              Finn poster, løs oppgaver{"\n"}
              og samle XP i virkelige omgivelser.
            </Text>
          </View>

          <View style={styles.challengeSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Velg eventyr</Text>

              <TouchableOpacity
                onPress={onSeeAllChallenges}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel="Alle utfordringer"
              >
                <Text style={styles.seeAllText}>Alle utfordringer ›</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.challengeRow}>
              <View style={styles.leftCard}>
                <HomeChallengeCard
                  symbolName={{
                    ios: "puzzlepiece.extension",
                    android: "extension",
                    web: "extension"
                  }}
                  title="Rebusløp"
                  description="Løs oppgaver langs ruten og konkurrer med andre."
                  actionText="Velg rebusløp"
                  accentColor={theme.colors.rebus}
                  artwork={homeRebusArt}
                  onPress={handleStartRebus}
                />
              </View>

              <View style={styles.rightCard}>
                <HomeChallengeCard
                  symbolName={{
                    ios: "map.fill",
                    android: "map",
                    web: "map"
                  }}
                  title="Skattejakt"
                  description="Følg kartet og finn den skjulte skatten."
                  actionText="Velg skattejakt"
                  accentColor={theme.colors.primary}
                  artwork={homeTreasureArt}
                  onPress={onStartTreasure}
                />
              </View>
            </View>
          </View>

          <View style={styles.upcomingSection}>
            <Text style={styles.upcomingSectionTitle}>{eventSectionTitle}</Text>

            <View style={styles.upcomingStack}>
              {visibleHomeEvents.map((event, index) => {
                const presentation = getEventPresentation(event);

                return (
                  <View
                    key={event.id || `${event.title}-${index}`}
                    style={index > 0 ? styles.upcomingCardSpacing : null}
                  >
                    <HomeUpcomingCard
                      title={event.title}
                      statusText={presentation.statusText}
                      buttonLabel={presentation.buttonLabel}
                      symbolName={event.symbolName}
                      accentColor={event.accentColor}
                      onPress={event.onPress || onOpenUpcoming}
                    />
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#020914"
  },
  topBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 470,
    overflow: "hidden"
  },
  topBackdropImage: {
    width: "100%",
    height: 520
  },
  topBackdropFade: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 185,
    backgroundColor: "rgba(2, 9, 20, 0.68)"
  },
  safeArea: {
    flex: 1
  },
  content: {
    flex: 1,
    paddingBottom: 20
  },
  header: {
    minHeight: 44,
    paddingTop: 10,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  profileGroup: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center"
  },
  profileButton: {
    width: 48,
    height: 48,
    marginRight: 14,
    borderRadius: 24
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.surface,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
  avatarImage: {
    width: "100%",
    height: "100%"
  },
  avatarFallback: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: "700"
  },
  greetingBlock: {
    flex: 1,
    minWidth: 0,
    maxWidth: 175
  },
  greeting: {
    color: theme.colors.text,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "400"
  },
  xpText: {
    marginTop: 0,
    color: "rgba(203, 213, 225, 0.62)",
    fontSize: 12,
    lineHeight: 15,
    fontWeight: "600"
  },
  userName: {
    color: theme.colors.primary,
    fontWeight: "500"
  },
  settingsButton: {
    width: 50,
    height: 50,
    marginLeft: 10,
    marginTop: 2,
    alignItems: "center",
    justifyContent: "center"
  },
  settingsIcon: {
    width: 30,
    height: 30,
    transform: [{ translateX: -15 }]
  },
  hero: {
    minHeight: 142,
    marginTop: 0,
    paddingHorizontal: 18,
    justifyContent: "flex-end",
    paddingBottom: 8
  },
  heroTitle: {
    color: theme.colors.text,
    fontSize: 38,
    lineHeight: 44,
    fontWeight: "900",
    letterSpacing: -0.8
  },
  heroAccent: {
    color: theme.colors.primary
  },
  heroSubtitle: {
    marginTop: 10,
    color: "rgba(226, 232, 240, 0.82)",
    fontSize: 15,
    lineHeight: 23,
    fontWeight: "400"
  },
  challengeSection: {
    marginTop: 14,
    paddingHorizontal: 18
  },
  sectionHeader: {
    minHeight: 34,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: 21,
    lineHeight: 27,
    fontWeight: "800"
  },
  seeAllText: {
    color: "rgba(241, 245, 249, 0.88)",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400"
  },
  challengeRow: {
    flexDirection: "row"
  },
  leftCard: {
    flex: 1,
    marginRight: 6
  },
  rightCard: {
    flex: 1,
    marginLeft: 6
  },
  upcomingSection: {
    marginTop: 14,
    paddingHorizontal: 18
  },
  upcomingSectionTitle: {
    marginBottom: 6,
    color: theme.colors.text,
    fontSize: 17,
    lineHeight: 21,
    fontWeight: "700"
  },
  upcomingStack: {
    width: "100%"
  },
  upcomingCardSpacing: {
    marginTop: 6
  }
});
