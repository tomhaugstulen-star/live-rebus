import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SymbolView } from "expo-symbols";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeChallengeCard from "../../components/home/HomeChallengeCard";
import HomeUpcomingCard from "../../components/home/HomeUpcomingCard";
import { theme } from "../../utils/designTokens";
import { getPlayerXp, setPlayerXp, subscribeToPlayerXp } from "../../utils/playerProgressStore";
import { styles } from "./HomeScreen.styles";

const homeBackground = require("../../../assets/images/home/home-background.webp");
const homeRebusArt = require("../../../assets/images/home/cards/rebus-card-background.png");
const homeTreasureArt = require("../../../assets/images/home/cards/treasure-card-background.png");

function getEventPresentation(event) {
  const normalizedStatus = event.status || "planned";

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
}

export default function HomeScreen({
  userName = "Eventyrer",
  userAvatarUrl = null,
  onOpenProfile,
  onOpenSettings,
  onStartAdventure,
  onStartRebus,
  onStartFogTreasure,
  onStartSonarTreasure,
  onStartTreasure,
  onOpenUpcoming,
  homeEvents,
  xp = 420
}) {
  const displayName = userName?.trim() || "Eventyrer";
  const fallbackInitial = displayName.charAt(0).toUpperCase();
  const handleStartRebus = onStartRebus || onStartAdventure;
  const handleStartFogTreasure = onStartFogTreasure || onStartTreasure;
  const handleStartSonarTreasure = onStartSonarTreasure || onStartTreasure;
  const [displayXp, setDisplayXp] = useState(() => {
    const storedXp = getPlayerXp();
    return Number.isFinite(storedXp) ? storedXp : Math.max(0, Number(xp) || 0);
  });

  useEffect(() => {
    if (getPlayerXp() === 0 && Number(xp) > 0) setPlayerXp(xp);
    setDisplayXp(getPlayerXp());
    return subscribeToPlayerXp(setDisplayXp);
  }, [xp]);

  const visibleHomeEvents = Array.isArray(homeEvents) ? homeEvents.slice(0, 2) : [];
  const hasHomeEvents = visibleHomeEvents.length > 0;
  const eventSectionTitle = visibleHomeEvents.some((event) => event.status === "planned" || event.status === "ongoing")
    ? "Dine neste eventyr"
    : "Dine siste eventyr";

  return (
    <View style={styles.screen}>
      <View style={styles.topBackdrop} pointerEvents="none">
        <Image source={homeBackground} style={styles.topBackdropImage} resizeMode="cover" />
        <View style={styles.topBackdropFade} />
      </View>

      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.profileGroup}>
              <TouchableOpacity
                style={styles.profileButton}
                onPress={typeof onOpenProfile === "function" ? onOpenProfile : undefined}
                activeOpacity={0.85}
                accessibilityRole="button"
                accessibilityLabel="Åpne profil"
              >
                <View style={styles.avatar}>
                  {userAvatarUrl ? (
                    <Image source={{ uri: userAvatarUrl }} style={styles.avatarImage} resizeMode="cover" />
                  ) : (
                    <Text style={styles.avatarFallback}>{fallbackInitial}</Text>
                  )}
                </View>
              </TouchableOpacity>

              <View style={styles.greetingBlock}>
                <Text style={styles.greeting} numberOfLines={1} ellipsizeMode="tail">
                  Hei, <Text style={styles.userName}>{displayName}!</Text>
                </Text>
                <Text style={styles.xpText}>{displayXp} XP</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.settingsButton}
              onPress={typeof onOpenSettings === "function" ? onOpenSettings : undefined}
              activeOpacity={0.85}
              accessibilityRole="button"
              accessibilityLabel="Åpne innstillinger"
            >
              <SymbolView
                name={{ ios: "gearshape", android: "settings", web: "settings" }}
                size={30}
                tintColor="rgba(203, 213, 225, 0.72)"
                style={styles.settingsIcon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.hero}>
            <Text style={styles.heroTitle}><Text style={styles.heroAccent}>Live </Text>Rebus</Text>
            <Text style={styles.heroSubtitle}>Finn poster, løs oppgaver{"\n"}og samle XP i virkelige omgivelser.</Text>
          </View>

          <View style={styles.challengeSection}>
            <View style={styles.challengeRow}>
              <HomeChallengeCard
                title="Rebus"
                description="Løs oppgaver langs ruten."
                actionText="Velg rebus"
                accentColor={theme.colors.rebus}
                artwork={homeRebusArt}
                onPress={handleStartRebus}
              />
              <HomeChallengeCard
                title="Tåkejakt"
                description="Kartet åpnes mens du beveger deg."
                actionText="Velg tåkejakt"
                accentColor={theme.colors.primary}
                artwork={homeTreasureArt}
                onPress={handleStartFogTreasure}
              />
              <HomeChallengeCard
                title="Sonar"
                description="Bruk signaler for å finne skattene."
                actionText="Velg sonar"
                accentColor={theme.colors.treasure || theme.colors.primary}
                artwork={homeTreasureArt}
                onPress={handleStartSonarTreasure}
              />
            </View>
          </View>

          {hasHomeEvents ? (
            <View style={styles.upcomingSection}>
              <Text style={styles.upcomingSectionTitle}>{eventSectionTitle}</Text>
              <View style={styles.upcomingStack}>
                {visibleHomeEvents.map((event, index) => {
                  const presentation = getEventPresentation(event);
                  return (
                    <View key={event.id || `${event.title}-${index}`} style={index > 0 ? styles.upcomingCardSpacing : null}>
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
          ) : null}
        </View>
      </SafeAreaView>
    </View>
  );
}
