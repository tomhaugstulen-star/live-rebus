import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../utils/designTokens";

const CARD_HEIGHT = 132;
const rebusIcon = require("../../../assets/images/home/cards/rebus-card-icon.png");
const treasureIcon = require("../../../assets/images/home/cards/treasure-card-icon.png");

export default function HomeChallengeCard({
  title,
  description,
  actionText,
  accentColor,
  artwork,
  onPress
}) {
  const iconArtwork = title === "Skattejakt" ? treasureIcon : rebusIcon;

  return (
    <TouchableOpacity
      style={[styles.card, { borderColor: accentColor }]}
      onPress={onPress}
      activeOpacity={0.88}
      accessibilityRole="button"
      accessibilityLabel={actionText}
    >
      <Image source={artwork} style={styles.artwork} resizeMode="cover" />
      <View style={styles.overlay} />

      <View style={styles.contentRow}>
        <View style={[styles.iconWrap, { borderColor: accentColor }]}> 
          <Image source={iconArtwork} style={styles.iconImage} resizeMode="contain" />
        </View>

        <View style={styles.copy}>
          <Text style={[styles.title, { color: accentColor }]} numberOfLines={1}>{title}</Text>
          <Text style={styles.description} numberOfLines={2}>{description}</Text>
        </View>

        <View style={[styles.actionPill, { borderColor: accentColor }]}> 
          <Text style={[styles.arrow, { color: accentColor }]}>›</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    height: CARD_HEIGHT,
    marginBottom: 18,
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
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center"
  },
  iconWrap: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 1.2,
    backgroundColor: "rgba(2, 9, 20, 0.8)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
    overflow: "hidden"
  },
  iconImage: {
    width: 46,
    height: 46
  },
  copy: {
    flex: 1,
    minWidth: 0,
    paddingRight: 12
  },
  title: {
    fontSize: 24,
    lineHeight: 29,
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
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    backgroundColor: "rgba(2, 9, 20, 0.8)",
    alignItems: "center",
    justifyContent: "center"
  },
  arrow: {
    fontSize: 26,
    lineHeight: 28,
    fontWeight: "700"
  }
});
