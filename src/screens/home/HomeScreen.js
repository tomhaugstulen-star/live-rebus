import React from "react";
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

const homeBackground = require("../../../assets/images/home/home-background.png");

const layout = {
  screenPaddingX: 26,
  topPadding: 58,
  avatarSize: 56,
  avatarGreetingGap: 18,
  settingsSize: 60,
  heroMarginTop: 16,
  heroTitleFontSize: 42,
  heroTitleLineHeight: 46,
  heroBodyMaxWidth: 272
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
          <Text style={styles.heroSubtitle}>Utforsk byen som et spill.</Text>
          <Text style={styles.heroBody}>
            Finn poster, løs spørsmål, jakt på skatter{"\n"}
            og samle XP ute i virkelige omgivelser.
          </Text>
          <Pressable
            style={({ pressed }) => [
              styles.heroCta,
              pressed ? styles.heroCtaPressed : null
            ]}
            onPress={onStartAdventure}
            accessibilityRole="button"
            accessibilityLabel="Start nytt eventyr"
          >
            <Text style={styles.heroCtaText}>Start nytt eventyr</Text>
            <Text style={styles.heroCtaArrow}>›</Text>
          </Pressable>
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
    lineHeight: 26,
    fontWeight: "900",
    marginTop: 6
  },
  heroBody: {
    color: "rgba(255,255,255,0.78)",
    fontSize: 17,
    lineHeight: 26,
    marginTop: 8,
    maxWidth: layout.heroBodyMaxWidth
  },
  heroCta: {
    marginTop: 22,
    width: 252,
    height: 56,
    alignSelf: "flex-start",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,184,0,0.82)",
    backgroundColor: "#FF5A00",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FF5A00",
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8
  },
  heroCtaText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
    marginRight: 14
  },
  heroCtaArrow: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "900",
    marginTop: -2
  },
  heroCtaPressed: {
    opacity: 0.86,
    transform: [{ scale: 0.98 }]
  },
  pressed: {
    opacity: 0.82
  }
});
