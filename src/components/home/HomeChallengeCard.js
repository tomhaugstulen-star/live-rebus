import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SymbolView } from "expo-symbols";
import { theme } from "../../utils/designTokens";

export default function HomeChallengeCard({
  symbolName,
  title,
  description,
  actionText,
  accentColor,
  artwork,
  onPress
}) {
  return (
    <TouchableOpacity
      style={[styles.card, { borderColor: `${accentColor}CC` }]}
      onPress={onPress}
      activeOpacity={0.88}
      accessibilityRole="button"
      accessibilityLabel={actionText}
    >
      <Image source={artwork} style={styles.artwork} resizeMode="cover" />
      <View style={styles.scrim} />
      <View style={[styles.glow, { backgroundColor: `${accentColor}22` }]} />

      <View style={[styles.iconWrap, { borderColor: `${accentColor}AA` }]}> 
        <SymbolView name={symbolName} size={25} tintColor={accentColor} />
      </View>

      <View style={styles.copy}>
        <Text style={[styles.title, { color: accentColor }]} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
      </View>

      <View style={[styles.actionPill, { borderColor: `${accentColor}77` }]}> 
        <Text style={[styles.arrow, { color: accentColor }]}>›</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 132,
    marginBottom: 12,
    borderWidth: 1.2,
    borderRadius: 16,
    backgroundColor: "rgba(3, 9, 20, 0.94)",
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    position: "relative"
  },
  artwork: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    opacity: 0.58
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(2, 9, 20, 0.62)"
  },
  glow: {
    position: "absolute",
    left: -28,
    top: -34,
    width: 116,
    height: 116,
    borderRadius: 58
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1.2,
    backgroundColor: "rgba(2, 9, 20, 0.74)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13
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
    backgroundColor: "rgba(2, 9, 20, 0.72)",
    alignItems: "center",
    justifyContent: "center"
  },
  arrow: {
    fontSize: 26,
    lineHeight: 28,
    fontWeight: "700"
  }
});
