import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { triggerLightImpact } from "../../utils/haptics";
import { theme } from "../../utils/designTokens";

const CARD_HEIGHT = 132;
const rebusIcon = require("../../../assets/images/home/cards/rebus-card-icon.png");
const treasureIcon = require("../../../assets/images/home/cards/treasure-card-icon.png");

function SonarIcon({ color }) {
  return (
    <View style={[styles.sonarIcon, { borderColor: color }]}> 
      <View style={[styles.sonarRing, styles.sonarRingOuter, { borderColor: color }]} />
      <View style={[styles.sonarRing, styles.sonarRingInner, { borderColor: color }]} />
      <View style={[styles.sonarBeam, { backgroundColor: color }]} />
      <View style={styles.sonarCoreOuter}>
        <View style={[styles.sonarCoreInner, { backgroundColor: color }]} />
      </View>
    </View>
  );
}

export default function HomeChallengeCard({
  title,
  description,
  actionText,
  accentColor,
  artwork,
  mode,
  onPress
}) {
  const iconArtwork = mode === "rebus" ? rebusIcon : treasureIcon;
  const isSonar = mode === "sonar";

  const handlePress = () => {
    triggerLightImpact();
    if (typeof onPress === "function") onPress();
  };

  return (
    <TouchableOpacity
      style={[styles.card, { borderColor: accentColor }]}
      onPress={handlePress}
      activeOpacity={0.88}
      accessibilityRole="button"
      accessibilityLabel={actionText}
    >
      <Image source={artwork} style={styles.artwork} resizeMode="cover" />
      <View style={styles.overlay} />

      <View style={styles.contentRow}>
        <View style={[styles.iconWrap, { borderColor: accentColor }]}> 
          {isSonar ? (
            <SonarIcon color={accentColor} />
          ) : (
            <Image source={iconArtwork} style={styles.iconImage} resizeMode="contain" />
          )}
        </View>

        <View style={styles.copyPanel}>
          <Text
            style={[styles.title, { color: accentColor }]}
            numberOfLines={1}
            allowFontScaling={false}
          >
            {title}
          </Text>
          <Text style={styles.description} numberOfLines={2} allowFontScaling={false}>
            {description}
          </Text>
        </View>

        <View style={[styles.actionPill, { borderColor: accentColor }]}> 
          <Text style={[styles.arrow, { color: accentColor }]} allowFontScaling={false}>›</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    height: CARD_HEIGHT,
    marginBottom: 24,
    borderWidth: 1.2,
    borderRadius: 16,
    backgroundColor: "rgba(3, 9, 20, 0.94)",
    overflow: "hidden",
    position: "relative"
  },
  artwork: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: "100%",
    height: CARD_HEIGHT,
    opacity: 0.92
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(2, 9, 20, 0.42)"
  },
  contentRow: {
    zIndex: 2,
    height: CARD_HEIGHT,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center"
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1.2,
    backgroundColor: "rgba(2, 9, 20, 0.8)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    overflow: "hidden"
  },
  iconImage: {
    width: 42,
    height: 42
  },
  sonarIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.96
  },
  sonarRing: {
    position: "absolute",
    borderWidth: 1.4
  },
  sonarRingOuter: {
    width: 30,
    height: 30,
    borderRadius: 15,
    opacity: 0.62
  },
  sonarRingInner: {
    width: 18,
    height: 18,
    borderRadius: 9,
    opacity: 0.82
  },
  sonarBeam: {
    position: "absolute",
    width: 15,
    height: 3,
    left: 4,
    borderRadius: 2,
    opacity: 0.92
  },
  sonarCoreOuter: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#E8FDFF",
    alignItems: "center",
    justifyContent: "center"
  },
  sonarCoreInner: {
    width: 6,
    height: 6,
    borderRadius: 3
  },
  copyPanel: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 10,
    paddingHorizontal: 12,
    paddingRight: 8,
    borderRadius: 16,
    backgroundColor: "rgba(2, 9, 20, 0.46)"
  },
  title: {
    fontSize: 22,
    lineHeight: 26,
    fontWeight: "900",
    marginBottom: 4
  },
  description: {
    color: theme.colors.text,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500"
  },
  actionPill: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: "rgba(2, 9, 20, 0.8)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8
  },
  arrow: {
    fontSize: 24,
    lineHeight: 26,
    fontWeight: "700"
  }
});
