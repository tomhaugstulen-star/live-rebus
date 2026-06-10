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
  const canSeeAllChallenges = typeof onSeeAllChallenges === "function";
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
            <View style={styles.profileCopy}>
              <Text style={styles.greetingText}>Hei, {displayName}</Text>
              <Text style={styles.profileMeta}>Klar for neste runde?</Text>
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

        <View style={styles.heroCard}>
          <View style={styles.heroGlowLarge} />
          <View style={styles.heroGlowSmall} />
          <View style={styles.heroPath} />
          <View style={styles.heroPin}>
            <Text style={styles.heroPinText}>⌖</Text>
          </View>

          <Text style={styles.heroKicker}>Utendørsspill</Text>
          <Text style={styles.appTitle}>
            <Text style={styles.appTitleAccent}>Live</Text> Rebus
          </Text>
          <Text style={styles.heroLead}>Utforsk byen som et spill.</Text>
          <Text style={styles.heroBody}>
            Finn poster, løs spørsmål, jakt på skatter og samle XP ute i
            virkelige omgivelser.
          </Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Velg utfordring</Text>
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

        <View style={styles.secondaryGrid}>
          <View style={styles.secondaryBlock}>
            <Text style={styles.secondaryTitle}>Neste planlagte</Text>
            <HomeUpcomingCard title="Rebusløp" onPress={onOpenUpcoming} />
          </View>

          <View style={styles.secondaryBlock}>
            <Text style={styles.secondaryTitle}>Din progresjon</Text>
            <HomeProgressCard
              level={level}
              xp={xp}
              xpToNextLevel={xpToNextLevel}
              progressPercent={progressPercent}
            />
          </View>
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
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 18
  },
  topRow: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10
  },
  profileTouch: {
    minHeight: 46,
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  profileCopy: {
    flex: 1,
    marginLeft: 10
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
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
    fontSize: 20
  },
  greetingText: {
    color: theme.colors.text,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "900"
  },
  profileMeta: {
    color: theme.colors.textMuted,
    fontSize: 12,
    lineHeight: 16,
    marginTop: 1
  },
  settingsButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: "rgba(226, 232, 240, 0.28)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(15, 23, 42, 0.62)"
  },
  settingsIcon: {
    fontSize: 20
  },
  heroCard: {
    position: "relative",
    overflow: "hidden",
    minHeight: 178,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 107, 53, 0.22)",
    backgroundColor: "rgba(30, 41, 59, 0.78)",
    padding: 16,
    marginBottom: 12
  },
  heroGlowLarge: {
    position: "absolute",
    right: -70,
    top: 12,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(255, 107, 53, 0.18)"
  },
  heroGlowSmall: {
    position: "absolute",
    right: 34,
    top: 58,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(245, 158, 11, 0.18)"
  },
  heroPath: {
    position: "absolute",
    right: -10,
    top: 126,
    width: 112,
    height: 28,
    borderBottomWidth: 3,
    borderBottomColor: "rgba(255, 107, 53, 0.72)",
    borderRadius: 100,
    transform: [{ rotate: "-16deg" }]
  },
  heroPin: {
    position: "absolute",
    right: 54,
    top: 52,
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 107, 53, 0.18)",
    borderWidth: 1,
    borderColor: "rgba(255, 107, 53, 0.36)"
  },
  heroPinText: {
    color: theme.colors.primary,
    fontSize: 20,
    fontWeight: "900"
  },
  heroKicker: {
    alignSelf: "flex-start",
    color: theme.colors.primary,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "900",
    letterSpacing: 0.7,
    textTransform: "uppercase",
    marginBottom: 6
  },
  appTitle: {
    color: theme.colors.text,
    fontSize: 38,
    lineHeight: 42,
    fontWeight: "900",
    letterSpacing: -1,
    marginBottom: 6,
    maxWidth: 280
  },
  appTitleAccent: {
    color: theme.colors.primary
  },
  heroLead: {
    color: theme.colors.primary,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "900",
    marginBottom: 5,
    maxWidth: 280
  },
  heroBody: {
    color: theme.colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    maxWidth: 300
  },
  sectionHeader: {
    minHeight: 34,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 9
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: 22,
    lineHeight: 27,
    fontWeight: "900"
  },
  seeAllTouch: {
    minHeight: 34,
    minWidth: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  seeAllText: {
    color: theme.colors.primary,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "900"
  },
  seeAllArrow: {
    color: theme.colors.primary,
    fontSize: 26,
    lineHeight: 28,
    marginLeft: 6
  },
  challengeStack: {
    marginBottom: 14
  },
  cardSpacing: {
    marginBottom: 10
  },
  secondaryGrid: {
    marginTop: 0
  },
  secondaryBlock: {
    marginBottom: 12
  },
  secondaryTitle: {
    color: theme.colors.text,
    fontSize: 18,
    lineHeight: 23,
    fontWeight: "900",
    marginBottom: 7
  },
  bottomSpacer: {
    height: 8
  }
});