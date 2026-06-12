import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import HomeChallengeCard from "../../components/home/HomeChallengeCard";
import HomeProgressCard from "../../components/home/HomeProgressCard";
import HomeUpcomingCard from "../../components/home/HomeUpcomingCard";
import { theme } from "../../utils/designTokens";

export default function HomeScreen({
  userName = "Eventyrer",
  userAvatarUrl = null,
  level = 3,
  xp = 420,
  xpToNextLevel = 80,
  onOpenProfile,
  onOpenSettings,
  onStartAdventure,
  onStartRebus,
  onStartTreasure,
  onOpenUpcoming,
  onSeeAllChallenges
}) {
  const displayName = userName || "Eventyrer";
  const handleStartRebus = onStartRebus || onStartAdventure;
  const handleOpenProfile = typeof onOpenProfile === "function" ? onOpenProfile : undefined;
  const handleOpenSettings = typeof onOpenSettings === "function" ? onOpenSettings : undefined;
  const canSeeAllChallenges = typeof onSeeAllChallenges === "function";
  const progressPercent = xp + xpToNextLevel > 0
    ? Math.round((xp / (xp + xpToNextLevel)) * 100)
    : 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topRow}>
          <TouchableOpacity
            style={styles.profileTouch}
            onPress={handleOpenProfile}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="Profil"
          >
            <View style={styles.avatar}>
              {userAvatarUrl ? (
                <Image source={{ uri: userAvatarUrl }} style={styles.avatarImage} />
              ) : (
                <Text style={styles.avatarFallback}>👤</Text>
              )}
            </View>

            <Text style={styles.greeting}>
              Hei, <Text style={styles.greetingAccent}>{displayName}</Text>!
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingsButton}
            onPress={handleOpenSettings}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="Innstillinger"
          >
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.hero}>
          <View style={styles.heroCopy}>
            <Text style={styles.heroTitle}>
              <Text style={styles.heroAccent}>Live</Text> Rebus
            </Text>

            <Text style={styles.heroSubtitle}>Utforsk byen som et spill.</Text>

            <Text style={styles.heroText}>
              Finn poster, løs spørsmål, jakt på skatter og samle XP ute i virkelige omgivelser.
            </Text>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={onStartAdventure}
              activeOpacity={0.88}
              accessibilityRole="button"
              accessibilityLabel="Start nytt eventyr"
            >
              <Text style={styles.primaryButtonText}>Start nytt eventyr</Text>
              <Text style={styles.primaryArrow}>›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.heroVisual} pointerEvents="none">
            <Text style={styles.heroPin}>📍</Text>
            <View style={styles.heroPath} />
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Velg utfordring</Text>
            <View style={styles.sectionUnderline} />
          </View>

          {canSeeAllChallenges ? (
            <TouchableOpacity
              style={styles.seeAllTouch}
              onPress={onSeeAllChallenges}
              activeOpacity={0.85}
              accessibilityRole="button"
              accessibilityLabel="Se alle utfordringer"
            >
              <Text style={styles.seeAllText}>Se alle</Text>
              <Text style={styles.seeAllArrow}>›</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={styles.challengeRow}>
          <HomeChallengeCard
            icon="🧩"
            title="Rebusløp"
            description="Konkurrer med en venn. Samme rute, samme spørsmål og motsatt vei."
            accentColor={theme.colors.rebus}
            buttonTitle="Velg rebusløp"
            onPress={handleStartRebus}
            backgroundHint="?"
          />

          <HomeChallengeCard
            icon="🪙"
            title="Skattejakt"
            description="Utforsk et mørklagt kart. Finn skatten som skjuler seg i tåken."
            accentColor={theme.colors.treasure}
            buttonTitle="Velg skattejakt"
            onPress={onStartTreasure}
            backgroundHint="×"
          />
        </View>

        <Text style={styles.sectionTitleStandalone}>Neste planlagte</Text>

        <HomeUpcomingCard onPress={onOpenUpcoming} />

        <Text style={styles.sectionTitleStandalone}>Din progresjon</Text>

        <HomeProgressCard
          level={level}
          xp={xp}
          xpToNextLevel={xpToNextLevel}
          progressPercent={progressPercent}
        />

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  content: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.section
  },
  topRow: {
    minHeight: theme.touch.avatar,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing.xl
  },
  profileTouch: {
    minHeight: theme.touch.min,
    flexDirection: "row",
    alignItems: "center"
  },
  avatar: {
    width: theme.touch.avatar,
    height: theme.touch.avatar,
    borderRadius: theme.touch.avatar / 2,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.surface,
    marginRight: theme.spacing.md,
    overflow: "hidden"
  },
  avatarImage: {
    width: "100%",
    height: "100%"
  },
  avatarFallback: {
    fontSize: 24
  },
  greeting: {
    color: theme.colors.text,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "500"
  },
  greetingAccent: {
    color: theme.colors.primary,
    fontWeight: "500"
  },
  settingsButton: {
    width: theme.touch.iconButton,
    height: theme.touch.iconButton,
    borderRadius: theme.touch.iconButton / 2,
    borderWidth: 1,
    borderColor: "rgba(226, 232, 240, 0.36)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(30, 41, 59, 0.48)"
  },
  settingsIcon: {
    fontSize: 26
  },
  hero: {
    minHeight: 300,
    borderRadius: theme.radius.xl,
    marginBottom: theme.spacing.section,
    overflow: "hidden",
    position: "relative"
  },
  heroCopy: {
    flex: 1,
    paddingVertical: theme.spacing.lg,
    justifyContent: "center"
  },
  heroTitle: {
    ...theme.typography.hero,
    color: theme.colors.text,
    marginBottom: theme.spacing.md
  },
  heroAccent: {
    color: theme.colors.primary
  },
  heroSubtitle: {
    color: theme.colors.primary,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "800",
    marginBottom: theme.spacing.sm
  },
  heroText: {
    ...theme.typography.body,
    color: theme.colors.text,
    maxWidth: 360,
    marginBottom: theme.spacing.xl
  },
  primaryButton: {
    minHeight: theme.touch.buttonHeight,
    alignSelf: "flex-start",
    minWidth: 292,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.xl,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: theme.colors.primary,
    shadowOpacity: 0.28,
    shadowRadius: 22,
    elevation: 8
  },
  primaryButtonText: {
    ...theme.typography.button,
    color: theme.colors.white
  },
  primaryArrow: {
    color: theme.colors.white,
    fontSize: 34,
    lineHeight: 36,
    marginLeft: theme.spacing.md
  },
  heroVisual: {
    position: "absolute",
    right: 0,
    top: 48,
    bottom: 0,
    width: "52%",
    opacity: 0.98
  },
  heroPin: {
    position: "absolute",
    right: 102,
    top: 58,
    fontSize: 54
  },
  heroPath: {
    position: "absolute",
    right: -20,
    bottom: 54,
    width: 260,
    height: 84,
    borderBottomWidth: 5,
    borderColor: "rgba(255, 107, 53, 0.72)",
    borderRadius: 120,
    transform: [{ rotate: "-12deg" }]
  },
  sectionHeader: {
    minHeight: theme.touch.min,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: theme.spacing.md
  },
  sectionTitle: {
    ...theme.typography.sectionTitle,
    color: theme.colors.text
  },
  sectionUnderline: {
    width: 48,
    height: 3,
    borderRadius: 2,
    backgroundColor: theme.colors.primary,
    marginTop: theme.spacing.sm
  },
  seeAllTouch: {
    minHeight: theme.touch.min,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: theme.spacing.md
  },
  seeAllText: {
    color: theme.colors.primary,
    fontSize: 17,
    fontWeight: "800"
  },
  seeAllArrow: {
    color: theme.colors.primary,
    fontSize: 30,
    marginLeft: theme.spacing.sm
  },
  challengeRow: {
    flexDirection: "row",
    gap: theme.spacing.md,
    marginBottom: theme.spacing.section
  },
  sectionTitleStandalone: {
    ...theme.typography.sectionTitle,
    color: theme.colors.text,
    marginBottom: theme.spacing.md
  },
  bottomSpacer: {
    height: theme.spacing.section
  }
});