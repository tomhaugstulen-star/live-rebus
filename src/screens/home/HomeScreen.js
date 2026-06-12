import React from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from "react-native";

const homeBackground = require("../../../assets/images/home/home-background.png");
const rebusCardBackground = require("../../../assets/images/home/rebus-card-bg.png");
const treasureCardBackground = require("../../../assets/images/home/treasure-card-bg.png");

const layout = {
  screenPaddingX: 26,
  topPadding: 58,
  avatarSize: 56,
  avatarGreetingGap: 18,
  settingsSize: 60,
  heroMarginTop: 16,
  heroTitleFontSize: 42,
  heroTitleLineHeight: 46
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
  const rawDisplayName = userName || "Eventyrer";
  const displayName = rawDisplayName.endsWith("!")
    ? rawDisplayName
    : `${rawDisplayName}!`;
  const handleStartRebus = onStartRebus || onStartAdventure;

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={homeBackground}
        style={styles.backgroundImage}
        resizeMode="cover"
        pointerEvents="none"
      />
      <View style={styles.backgroundOverlay} pointerEvents="none" />

      <View style={styles.contentWrap}>
        <View style={styles.topBar}>
          <Pressable
            onPress={onOpenProfile}
            accessibilityRole="button"
            accessibilityLabel="Profil"
            style={({ pressed }) => [styles.profileButton, pressed && styles.pressed]}
          >
            <View style={styles.profileRow}>
              <View style={styles.avatar}>
                {userAvatarUrl ? (
                  <Image source={{ uri: userAvatarUrl }} style={styles.avatarImage} />
                ) : (
                  <Text style={styles.avatarFallback}>👤</Text>
                )}
              </View>

              <View style={styles.greetingWrap}>
                <Text numberOfLines={1} style={styles.greeting}>
                  Hei, <Text style={styles.greetingAccent}>{displayName}</Text>
                </Text>
              </View>
            </View>
          </Pressable>

          <Pressable
            onPress={onOpenSettings}
            accessibilityRole="button"
            accessibilityLabel="Innstillinger"
            style={({ pressed }) => [styles.settingsButton, pressed && styles.pressed]}
          >
            <Text style={styles.settingsIcon}>⚙</Text>
          </Pressable>
        </View>

        <View style={styles.heroTextBlock}>
          <Text style={styles.heroTitle}>
            <Text style={styles.heroTitleAccent}>Live</Text> Rebus
          </Text>
          <Text style={styles.heroSubtitle}>
            Finn skatter og fullfør oppdrag i virkeligheten.
          </Text>
        </View>

        <View style={styles.challengeSection}>
          <Text style={styles.sectionTitle}>Velg utfordring</Text>

          <View style={styles.challengeRow}>
            <Pressable
              onPress={handleStartRebus}
              accessibilityRole="button"
              accessibilityLabel="Start Rebusløp"
              style={({ pressed }) => [
                styles.challengeCard,
                pressed && styles.pressed
              ]}
            >
              <ImageBackground
                source={rebusCardBackground}
                style={styles.challengeCardBackground}
                imageStyle={styles.challengeCardImage}
                resizeMode="cover"
              >
                <View style={styles.challengeOverlay} />
                <View style={styles.challengeContent}>
                  <Text style={styles.challengeTitle}>Rebusløp</Text>
                  <Text style={styles.challengeDescription}>
                    Konkurrer med en venn. Samme rute, motsatt vei.
                  </Text>
                  <View style={[styles.challengeButton, styles.rebusButton]}>
                    <Text style={styles.challengeButtonText}>Velg</Text>
                    <Text style={styles.challengeButtonArrow}>›</Text>
                  </View>
                </View>
              </ImageBackground>
            </Pressable>

            <Pressable
              onPress={onStartTreasure}
              accessibilityRole="button"
              accessibilityLabel="Start Skattejakt"
              style={({ pressed }) => [
                styles.challengeCard,
                pressed && styles.pressed
              ]}
            >
              <ImageBackground
                source={treasureCardBackground}
                style={styles.challengeCardBackground}
                imageStyle={styles.challengeCardImage}
                resizeMode="cover"
              >
                <View style={styles.challengeOverlay} />
                <View style={styles.challengeContent}>
                  <Text style={styles.challengeTitle}>Skattejakt</Text>
                  <Text style={styles.challengeDescription}>
                    Følg signalet og finn skatten i området.
                  </Text>
                  <View style={[styles.challengeButton, styles.treasureButton]}>
                    <Text style={styles.challengeButtonText}>Velg</Text>
                    <Text style={styles.challengeButtonArrow}>›</Text>
                  </View>
                </View>
              </ImageBackground>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020914",
    overflow: "hidden"
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%"
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.08)"
  },
  contentWrap: {
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    paddingHorizontal: layout.screenPaddingX,
    paddingTop: layout.topPadding
  },
  topBar: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  profileButton: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 12
  },
  profileRow: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center"
  },
  avatar: {
    width: layout.avatarSize,
    height: layout.avatarSize,
    borderRadius: layout.avatarSize / 2,
    borderWidth: 2,
    borderColor: "#FF5A00",
    backgroundColor: "rgba(255,255,255,0.045)",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
  avatarImage: {
    width: "100%",
    height: "100%"
  },
  avatarFallback: {
    color: "#FFFFFF",
    fontSize: 22,
    lineHeight: 22,
    fontWeight: "900"
  },
  greetingWrap: {
    flex: 1,
    minWidth: 0,
    marginLeft: layout.avatarGreetingGap
  },
  greeting: {
    color: "#FFFFFF",
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "900"
  },
  greetingAccent: {
    color: "#FF5A00"
  },
  settingsButton: {
    width: layout.settingsSize,
    height: layout.settingsSize,
    borderRadius: layout.settingsSize / 2,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.34)",
    backgroundColor: "rgba(255,255,255,0.045)",
    alignItems: "center",
    justifyContent: "center"
  },
  settingsIcon: {
    color: "#FF5A00",
    fontSize: 32,
    fontWeight: "900"
  },
  heroTextBlock: {
    marginTop: layout.heroMarginTop,
    maxWidth: 380
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: layout.heroTitleFontSize,
    lineHeight: layout.heroTitleLineHeight,
    fontWeight: "900",
    letterSpacing: -1.5
  },
  heroTitleAccent: {
    color: "#FF5A00"
  },
  heroSubtitle: {
    color: "#FF5A00",
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "900",
    marginTop: 8,
    maxWidth: 330
  },
  challengeSection: {
    marginTop: 32
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "900",
    marginBottom: 14
  },
  challengeRow: {
    flexDirection: "row",
    gap: 10
  },
  challengeCard: {
    flex: 1,
    aspectRatio: 0.84,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#08101C"
  },
  challengeCardBackground: {
    flex: 1,
    justifyContent: "flex-end"
  },
  challengeCardImage: {
    borderRadius: 20
  },
  challengeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.34)"
  },
  challengeContent: {
    padding: 14
  },
  challengeTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    lineHeight: 27,
    fontWeight: "900"
  },
  challengeDescription: {
    color: "rgba(255,255,255,0.82)",
    fontSize: 13,
    lineHeight: 18,
    marginTop: 6
  },
  challengeButton: {
    minHeight: 42,
    marginTop: 12,
    borderRadius: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  rebusButton: {
    backgroundColor: "#7C3AED"
  },
  treasureButton: {
    backgroundColor: "#F97316"
  },
  challengeButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "900"
  },
  challengeButtonArrow: {
    color: "#FFFFFF",
    fontSize: 24,
    lineHeight: 24,
    fontWeight: "900"
  },
  pressed: {
    opacity: 0.82
  }
});
