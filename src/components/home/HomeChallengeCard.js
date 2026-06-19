import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SymbolView } from "expo-symbols";
import { theme } from "../../utils/designTokens";

const CARD_HEIGHT = 132;

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
          <SymbolView name={symbolName} size={24} tintColor={accentColor} />
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
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 1.2,
    backgroundColor: "rgba(2, 9, 20, 0.8)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15
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
