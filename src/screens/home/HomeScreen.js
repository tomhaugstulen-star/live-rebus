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
  const handleOpenProfile =
    typeof onOpenProfile === "function" ? () => onOpenProfile() : undefined;
  const handleOpenSettings =
    typeof onOpenSettings === "function" ? () => onOpenSettings() : undefined;
  const progressPercent =
    xp + xpToNextLevel > 0 ? Math.round((xp / (xp + xpToNextLevel)) * 100) : 0;

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
            hitSlop={8}
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
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingsButton}
            onPress={handleOpenSettings}
            activeOpacity={0.85}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Innstillinger"
          >
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.greetingBlock}>
          <Text style={styles.greetingTitle}>Hei, {displayName}</Text>
          <Text style={styles.greetingSubtitle}>
            Velg en aktivitet og start en trygg web-test.
          </Text>
        </View>

        <View style={styles.progressWrap}>
          <HomeProgressCard
            level={level}
            xp={xp}
            xpToNextLevel={xpToNextLevel}
            progressPercent={progressPercent}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Aktiviteter</Text>
          <TouchableOpacity
            style={styles.seeAllTouch}
            onPress={onSeeAllChallenges}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="Se alle utfordringer"
          >
            <Text style={styles.seeAllText}>Se alle utfordringer</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.challengeStack}>
          <View style={styles.cardSpacing}>
            <HomeChallengeCard
              icon="🧩"
              kicker="Lilla rute"
              title="Rebusløp"
              description="Løs poster i riktig rekkefølge og fullfør ruten."
              accentColor={theme.colors.rebus}
              buttonTitle="Start Rebusløp"
              onPress={handleStartRebus}
              backgroundHint="◌"
            />
          </View>

          <HomeChallengeCard
            icon="🪙"
            kicker="Gulljakt"
            title="Skattejakt"
            description="Bruk radar, signal og hint i web-testmodus."
            accentColor={theme.colors.treasure}
            buttonTitle="Start Skattejakt"
            onPress={onStartTreasure}
            backgroundHint="✦"
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Planlagt aktivitet</Text>
        </View>

        <HomeUpcomingCard title="Planlagt aktivitet" onPress={onOpenUpcoming} />

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
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32
  },
  topRow: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18
  },
  profileTouch: {
    minHeight: 44,
    minWidth: 44,
    flexDirection: "row",
    alignItems: "center"
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.surface,
    overflow: "hidden"
  },
  avatarImage: {
    width: "100%",
    height: "100%"
  },
  avatarFallback: {
    fontSize: 22
  },
  settingsButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(226, 232, 240, 0.18)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(30, 41, 59, 0.6)"
  },
  settingsIcon: {
    fontSize: 22
  },
  greetingBlock: {
    marginBottom: 18
  },
  greetingTitle: {
    color: theme.colors.text,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "900",
    marginBottom: 8
  },
  greetingSubtitle: {
    color: theme.colors.textMuted,
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 380
  },
  progressWrap: {
    marginBottom: 26
  },
  sectionHeader: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "900"
  },
  seeAllTouch: {
    minHeight: 44,
    minWidth: 44,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  seeAllText: {
    color: theme.colors.primary,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "800"
  },
  challengeStack: {
    marginBottom: 26
  },
  cardSpacing: {
    marginBottom: 16
  },
  bottomSpacer: {
    height: 16
  }
});
