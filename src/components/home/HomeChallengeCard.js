import React from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const palette = {
  surface: "rgba(12, 18, 38, 0.72)",
  surfaceStrong: "#091426",
  textPrimary: "#F7F7F2",
  textSecondary: "#BFC3CC",
  border: "rgba(247, 247, 242, 0.10)"
};

export default function HomeChallengeCard({
  icon,
  kicker,
  title,
  description,
  accentColor,
  buttonTitle,
  onPress,
  backgroundHint,
  backgroundImage
}) {
  return (
    <TouchableOpacity
      style={[styles.card, { borderColor: accentColor }]}
      onPress={onPress}
      activeOpacity={0.88}
      accessibilityRole="button"
      accessibilityLabel={buttonTitle}
    >
      <View style={[styles.accentGlow, { backgroundColor: accentColor }]} />
      <View style={[styles.innerGlow, { borderColor: accentColor }]} />

      {backgroundImage ? (
        <ImageBackground
          source={backgroundImage}
          resizeMode="cover"
          style={styles.backgroundArt}
          imageStyle={styles.backgroundArtImage}
        >
          <View style={styles.backgroundScrim} />
        </ImageBackground>
      ) : null}

      <View style={styles.cardContent}>
        <View style={styles.header}>
          <View style={styles.iconWrap}>
            <Text style={styles.icon}>{icon}</Text>
          </View>

          <View style={[styles.kickerPill, { borderColor: accentColor }]}>
            <Text style={[styles.kickerText, { color: accentColor }]}>{kicker}</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>

          <View style={[styles.button, { backgroundColor: accentColor }]}>
            <Text style={styles.buttonText}>{buttonTitle}</Text>
            <Text style={styles.arrow}>›</Text>
          </View>
        </View>
      </View>

      {backgroundHint ? <Text style={[styles.backgroundHint, { color: accentColor }]}>{backgroundHint}</Text> : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 188,
    backgroundColor: "rgba(9, 20, 38, 0.96)",
    borderRadius: 26,
    borderWidth: 1,
    padding: 14,
    overflow: "hidden"
  },
  accentGlow: {
    position: "absolute",
    left: -8,
    top: -8,
    width: 90,
    height: 90,
    borderRadius: 45,
    opacity: 0.16
  },
  innerGlow: {
    position: "absolute",
    left: 10,
    right: 10,
    top: 10,
    bottom: 10,
    borderRadius: 22,
    borderWidth: 1,
    opacity: 0.12
  },
  backgroundArt: {
    ...StyleSheet.absoluteFillObject
  },
  backgroundArtImage: {
    opacity: 0.34,
    borderRadius: 26
  },
  backgroundScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(2, 10, 20, 0.38)"
  },
  cardContent: {
    flex: 1,
    position: "relative",
    zIndex: 1
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: palette.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(6, 16, 31, 0.68)"
  },
  icon: {
    fontSize: 27
  },
  kickerPill: {
    minHeight: 29,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(15, 23, 42, 0.46)"
  },
  kickerText: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "900",
    letterSpacing: 0.5,
    textTransform: "uppercase"
  },
  content: {
    flex: 1,
    justifyContent: "space-between"
  },
  title: {
    color: palette.textPrimary,
    fontSize: 24,
    lineHeight: 28,
    fontWeight: "900",
    marginBottom: 6
  },
  description: {
    color: palette.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12
  },
  button: {
    minHeight: 44,
    borderRadius: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: palette.textPrimary,
    fontSize: 15,
    lineHeight: 19,
    fontWeight: "900"
  },
  arrow: {
    color: palette.textPrimary,
    fontSize: 28,
    lineHeight: 30,
    marginLeft: 8,
    marginTop: -1
  },
  backgroundHint: {
    position: "absolute",
    right: 8,
    bottom: 16,
    opacity: 0.08,
    fontSize: 72,
    fontWeight: "900"
  }
});
