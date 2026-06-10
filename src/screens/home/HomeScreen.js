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
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 28
  },
  topRow: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14
  },
  profileTouch: {
    minHeight: 50,
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  profileCopy: {
    flex: 1,
    marginLeft: 12
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
  greetingText: {
    color: theme.colors.text,
    fontSize: 18,
    lineHeight: 23,
    fontWeight: "900"
  },
  profileMeta: {
    color: theme.colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 1
  },
  settingsButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "rgba(226, 232, 240, 0.28)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(15, 23, 42, 0.62)"
  },
  settingsIcon: {
    fontSize: 22
  },
  heroCard: {
    position: "relative",
    overflow: "hidden",
    minHeight: 238,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "rgba(255, 107, 53, 0.22)",
    backgroundColor: "rgba(30, 41, 59, 0.78)",
    padding: 20,
    marginBottom: 18
  },
  heroGlowLarge: {
    position: "absolute",
    right: -74,
    top: 30,
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: "rgba(255, 107, 53, 0.18)"
  },
  heroGlowSmall: {
    position: "absolute",
    right: 42,
    top: 86,
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "rgba(245, 158, 11, 0.18)"
  },
  heroPath: {
    position: "absolute",
    right: -8,
    top: 164,
    width: 132,
    height: 34,
    borderBottomWidth: 3,
    borderBottomColor: "rgba(255, 107, 53, 0.72)",
    borderRadius: 100,
    transform: [{ rotate: "-16deg" }]
  },
  heroPin: {
    position: "absolute",
    right: 64,
    top: 76,
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 107, 53, 0.18)",
    borderWidth: 1,
    borderColor: "rgba(255, 107, 53, 0.36)"
  },
  heroPinText: {
    color: theme.colors.primary,
    fontSize: 24,
    fontWeight: "900"
  },
  heroKicker: {
    alignSelf: "flex-start",
    color: theme.colors.primary,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "900",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 10
  },
  appTitle: {
    color: theme.colors.text,
    fontSize: 45,
    lineHeight: 49,
    fontWeight: "900",
    letterSpacing: -1.2,
    marginBottom: 9,
    maxWidth: 300
  },
  appTitleAccent: {
    color: theme.colors.primary
  },
  heroLead: {
    color: theme.colors.primary,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "900",
    marginBottom: 7,
    maxWidth: 310
  },
  heroBody: {
    color: theme.colors.textMuted,
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 340
  },
  sectionHeader: {
    minHeight: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "900"
  },
  seeAllTouch: {
    minHeight: 40,
    minWidth: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  seeAllText: {
    color: theme.colors.primary,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "900"
  },
  seeAllArrow: {
    color: theme.colors.primary,
    fontSize: 28,
    lineHeight: 30,
    marginLeft: 7
  },
  challengeStack: {
    marginBottom: 20
  },
  cardSpacing: {
    marginBottom: 14
  },
  secondaryGrid: {
    marginTop: 2
  },
  secondaryBlock: {
    marginBottom: 16
  },
  secondaryTitle: {
    color: theme.colors.text,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "900",
    marginBottom: 10
  },
  bottomSpacer: {
    height: 12
  }
});