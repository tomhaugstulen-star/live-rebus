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
        <View style={styles.heroShell}>
          <View style={styles.heroGlowLarge} />
          <View style={styles.heroGlowSmall} />
          <View style={styles.heroPath} />
          <View style={styles.heroPin}>
            <Text style={styles.heroPinText}>⌖</Text>
          </View>

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

          <Text style={styles.greetingText}>
            Hei, <Text style={styles.greetingAccent}>{displayName}!</Text>
          </Text>

          <View style={styles.titleBlock}>
            <Text style={styles.appTitle}>
              <Text style={styles.appTitleAccent}>Live</Text> Rebus
            </Text>
            <Text style={styles.heroLead}>Utforsk byen som et spill.</Text>
            <Text style={styles.heroBody}>
              Finn poster, løs spørsmål, jakt på skatter og samle XP ute i
              virkelige omgivelser.
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Velg utfordring</Text>
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
        </View>

        <View style={styles.challengeStack}>
          <View style={styles.cardSpacing}>
            <HomeChallengeCard
              icon="🧩"
              kicker="Lilla rute"
              title="Rebusløp"
              description="Konkurrer med en venn. Samme rute, samme spørsmål og motsatt vei."
              accentColor={theme.colors.rebus}
              buttonTitle="Velg rebusløp"
              onPress={handleStartRebus}
              backgroundHint="?"
            />
          </View>

          <HomeChallengeCard
            icon="🧰"
            kicker="Gulljakt"
            title="Skattejakt"
            description="Utforsk området, følg signalet og finn skatten."
            accentColor={theme.colors.treasure}
            buttonTitle="Velg skattejakt"
            onPress={onStartTreasure}
            backgroundHint="✦"
          />
        </View>

        <View style={styles.sectionHeaderSimple}>
          <Text style={styles.sectionTitle}>Neste planlagte</Text>
        </View>

        <HomeUpcomingCard title="Rebusløp" onPress={onOpenUpcoming} />

        <View style={styles.sectionHeaderSimple}>
          <Text style={styles.sectionTitle}>Din progresjon</Text>
        </View>

        <View style={styles.progressWrap}>
          <HomeProgressCard
            level={level}
            xp={xp}
            xpToNextLevel={xpToNextLevel}
            progressPercent={progressPercent}
          />
        </View>

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
  heroShell: {
    position: "relative",
    overflow: "hidden",
    paddingBottom: 8,
    marginBottom: 20
  },
  heroGlowLarge: {
    position: "absolute",
    right: -72,
    top: 82,
    width: 230,
    height: 230,
    borderRadius: 115,
    backgroundColor: "rgba(255, 107, 53, 0.18)"
  },
  heroGlowSmall: {
    position: "absolute",
    right: 46,
    top: 138,
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(245, 158, 11, 0.18)"
  },
  heroPath: {
    position: "absolute",
    right: -8,
    top: 218,
    width: 142,
    height: 38,
    borderBottomWidth: 3,
    borderBottomColor: "rgba(255, 107, 53, 0.72)",
    borderRadius: 100,
    transform: [{ rotate: "-16deg" }]
  },
  heroPin: {
    position: "absolute",
    right: 70,
    top: 126,
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 107, 53, 0.18)",
    borderWidth: 1,
    borderColor: "rgba(255, 107, 53, 0.36)"
  },
  heroPinText: {
    color: theme.colors.primary,
    fontSize: 26,
    fontWeight: "900"
  },
  topRow: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20
  },
  profileTouch: {
    minHeight: 54,
    minWidth: 54,
    flexDirection: "row",
    alignItems: "center"
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
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
    fontSize: 24
  },
  settingsButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 1,
    borderColor: "rgba(226, 232, 240, 0.28)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(15, 23, 42, 0.62)"
  },
  settingsIcon: {
    fontSize: 24
  },
  greetingText: {
    color: theme.colors.text,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "500",
    marginBottom: 24
  },
  greetingAccent: {
    color: theme.colors.primary,
    fontWeight: "800"
  },
  titleBlock: {
    maxWidth: 500
  },
  appTitle: {
    color: theme.colors.text,
    fontSize: 50,
    lineHeight: 56,
    fontWeight: "900",
    letterSpacing: -1.3,
    marginBottom: 14
  },
  appTitleAccent: {
    color: theme.colors.primary
  },
  heroLead: {
    color: theme.colors.primary,
    fontSize: 23,
    lineHeight: 30,
    fontWeight: "900",
    marginBottom: 10
  },
  heroBody: {
    color: theme.colors.textMuted,
    fontSize: 18,
    lineHeight: 28,
    maxWidth: 460
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
  sectionHeaderSimple: {
    minHeight: 44,
    justifyContent: "center",
    marginTop: 4,
    marginBottom: 12
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: 25,
    lineHeight: 31,
    fontWeight: "900"
  },
  seeAllTouch: {
    minHeight: 44,
    minWidth: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  seeAllText: {
    color: theme.colors.primary,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "900"
  },
  seeAllArrow: {
    color: theme.colors.primary,
    fontSize: 30,
    lineHeight: 32,
    marginLeft: 8
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