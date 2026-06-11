import React from "react";
import {
  Image,
  ImageBackground,
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

const palette = {
  background: "#020A14",
  deep: "#06101F",
  surface: "rgba(12, 18, 38, 0.72)",
  surfaceStrong: "#091426",
  textPrimary: "#F7F7F2",
  textSecondary: "#BFC3CC",
  orange: "#FF6A00",
  orangeDeep: "#FF3D00",
  purple: "#8E2DFF",
  treasure: "#F59E0B",
  border: "rgba(247, 247, 242, 0.10)"
};

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
  const handleStartAdventure = onStartAdventure || onStartRebus;
  const handleStartRebus = onStartRebus || onStartAdventure;
  const handleOpenProfile =
    typeof onOpenProfile === "function" ? () => onOpenProfile() : undefined;
  const handleOpenSettings =
    typeof onOpenSettings === "function" ? () => onOpenSettings() : undefined;
  const progressPercent =
    xp + xpToNextLevel > 0 ? Math.round((xp / (xp + xpToNextLevel)) * 100) : 0;
  const showSeeAll = typeof onSeeAllChallenges === "function";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
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

        <View style={styles.heroSection}>
          <ImageBackground
            source={require("../../../assets/images/home/hero_background.png")}
            resizeMode="cover"
            style={styles.heroArt}
            imageStyle={styles.heroArtImage}
          >
            <View style={styles.heroArtOverlay} />
          </ImageBackground>

          <View style={styles.heroDarkLeft} />

          <View style={styles.heroTextWrap}>
            <Text style={styles.heroKicker}>Utendørs spill</Text>
            <Text style={styles.heroTitle}>
              <Text style={styles.heroTitleAccent}>Live</Text> Rebus
            </Text>
            <Text style={styles.heroSubtitle}>Utforsk byen som et spill.</Text>
            <Text style={styles.heroBody}>
              Finn poster, løs spørsmål, jakt på skatter og samle XP ute i virkelige omgivelser.
            </Text>

            <TouchableOpacity
              style={styles.primaryCta}
              onPress={handleStartAdventure}
              activeOpacity={0.9}
              accessibilityRole="button"
              accessibilityLabel="Start nytt eventyr"
            >
              <View style={styles.primaryCtaIcon}>
                <Text style={styles.primaryCtaIconText}>→</Text>
              </View>
              <Text style={styles.primaryCtaText}>Start nytt eventyr</Text>
              <Text style={styles.primaryCtaArrow}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Velg utfordring</Text>
          {showSeeAll ? (
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

        <View style={styles.challengeGrid}>
          <View style={[styles.challengeColumn, styles.challengeColumnLeft]}>
            <HomeChallengeCard
              icon="🧩"
              kicker="Lilla rute"
              title="Rebusløp"
              description="Konkurrer med en venn. Samme rute, samme spørsmål og motsatt vei."
              accentColor={palette.purple}
              buttonTitle="Velg rebusløp"
              onPress={handleStartRebus}
              backgroundHint="?"
              backgroundImage={require("../../../assets/images/home/rebuslop_card_background.png")}
            />
          </View>

          <View style={[styles.challengeColumn, styles.challengeColumnRight]}>
            <HomeChallengeCard
              icon="🧭"
              kicker="Gulljakt"
              title="Skattejakt"
              description="Utforsk området, følg signalet og finn skatten."
              accentColor={palette.treasure}
              buttonTitle="Velg skattejakt"
              onPress={onStartTreasure}
              backgroundHint="✦"
              backgroundImage={require("../../../assets/images/home/skattejakt_card_background.png")}
            />
          </View>
        </View>

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

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 24
  },
  topRow: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14
  },
  profileTouch: {
    minHeight: 52,
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  profileCopy: {
    flex: 1,
    marginLeft: 12
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: palette.orange,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.surfaceStrong,
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
    color: palette.textPrimary,
    fontSize: 18,
    lineHeight: 23,
    fontWeight: "900"
  },
  profileMeta: {
    color: palette.textSecondary,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 1
  },
  settingsButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: palette.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.surface
  },
  settingsIcon: {
    fontSize: 22
  },
  heroSection: {
    position: "relative",
    minHeight: 286,
    borderRadius: 28,
    overflow: "hidden",
    marginBottom: 18,
    backgroundColor: palette.deep
  },
  heroArt: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: "63%"
  },
  heroArtImage: {
    borderTopRightRadius: 28,
    borderBottomRightRadius: 28
  },
  heroArtOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(2, 10, 20, 0.14)"
  },
  heroDarkLeft: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "60%",
    backgroundColor: "rgba(2, 10, 20, 0.86)"
  },
  heroTextWrap: {
    position: "relative",
    zIndex: 2,
    width: "60%",
    paddingTop: 12,
    paddingBottom: 18,
    paddingRight: 10
  },
  heroKicker: {
    alignSelf: "flex-start",
    color: palette.orange,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "900",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 10
  },
  heroTitle: {
    color: palette.textPrimary,
    fontSize: 38,
    lineHeight: 42,
    fontWeight: "900",
    letterSpacing: -1,
    marginBottom: 8,
    maxWidth: 240
  },
  heroTitleAccent: {
    color: palette.orange
  },
  heroSubtitle: {
    color: palette.orange,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "900",
    marginBottom: 6,
    maxWidth: 230
  },
  heroBody: {
    color: palette.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    maxWidth: 240
  },
  primaryCta: {
    minHeight: 56,
    marginTop: 14,
    borderRadius: 22,
    paddingLeft: 16,
    paddingRight: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: palette.orange,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    shadowColor: palette.orangeDeep,
    shadowOpacity: 0.36,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10
  },
  primaryCtaIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.65)",
    backgroundColor: "rgba(255,255,255,0.12)"
  },
  primaryCtaIconText: {
    color: palette.textPrimary,
    fontSize: 16,
    fontWeight: "900"
  },
  primaryCtaText: {
    flex: 1,
    color: palette.textPrimary,
    fontSize: 15,
    lineHeight: 19,
    fontWeight: "900",
    textAlign: "center",
    marginHorizontal: 10
  },
  primaryCtaArrow: {
    color: palette.textPrimary,
    fontSize: 28,
    lineHeight: 30,
    fontWeight: "900"
  },
  sectionHeader: {
    minHeight: 36,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10
  },
  sectionTitle: {
    color: palette.textPrimary,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "900"
  },
  seeAllTouch: {
    minHeight: 36,
    minWidth: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  seeAllText: {
    color: palette.orange,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "900"
  },
  seeAllArrow: {
    color: palette.orange,
    fontSize: 26,
    lineHeight: 28,
    marginLeft: 6
  },
  challengeGrid: {
    flexDirection: "row",
    marginBottom: 14,
    alignItems: "stretch"
  },
  challengeColumn: {
    flex: 1
  },
  challengeColumnLeft: {
    marginRight: 10
  },
  challengeColumnRight: {
    marginLeft: 10
  },
  secondaryBlock: {
    marginBottom: 12
  },
  secondaryTitle: {
    color: palette.textPrimary,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "900",
    marginBottom: 8
  },
  bottomSpacer: {
    height: 6
  }
});
