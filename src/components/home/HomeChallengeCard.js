import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SymbolView } from "expo-symbols";
import { triggerLightImpact } from "../../utils/haptics";
import { theme } from "../../utils/designTokens";

const CARD_HEIGHT = 116;
const rebusIcon = require("../../../assets/images/home/cards/rebus-card-icon.png");
const treasureIcon = require("../../../assets/images/home/cards/treasure-card-icon.png");

export default function HomeChallengeCard({
  title,
  description,
  actionText,
  accentColor,
  artwork,
  symbolName,
  onPress
}) {
  const iconArtwork = title === "Skattejakt" ? treasureIcon : rebusIcon;

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
          {symbolName ? (
            <SymbolView name={symbolName} size={34} tintColor={accentColor} />
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
    marginBottom: 16,
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
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.2,
    backgroundColor: "rgba(2, 9, 20, 0.8)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    overflow: "hidden"
  },
  iconImage: {
    width: 38,
    height: 38
  },
  copyPanel: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 8,
    paddingHorizontal: 12,
    paddingRight: 8,
    borderRadius: 16,
    backgroundColor: "rgba(2, 9, 20, 0.46)"
  },
  title: {
    fontSize: 21,
    lineHeight: 25,
    fontWeight: "900",
    marginBottom: 3
  },
  description: {
    color: theme.colors.text,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "500"
  },
  actionPill: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    backgroundColor: "rgba(2, 9, 20, 0.8)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8
  },
  arrow: {
    fontSize: 23,
    lineHeight: 25,
    fontWeight: "700"
  }
});
