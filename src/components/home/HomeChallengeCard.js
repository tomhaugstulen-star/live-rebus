import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
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
      style={[styles.card, { borderColor: accentColor }]}
      onPress={onPress}
      activeOpacity={0.88}
      accessibilityRole="button"
      accessibilityLabel={actionText}
    >
      <View style={styles.artworkClip} pointerEvents="none">
        <Image
          source={artwork}
          style={styles.artwork}
          resizeMode="cover"
        />
        <View style={styles.overlay} />
      </View>

      <View style={[styles.iconWrap, { borderColor: accentColor }]}>
        <SymbolView
          name={symbolName}
          size={25}
          tintColor={accentColor}
        />
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: accentColor }]}>{title}</Text>
        <Text style={styles.description}>{description}</Text>

        <View style={styles.divider} />

        <View style={styles.actionRow}>
          <Text style={[styles.actionText, { color: accentColor }]}>
            {actionText}
          </Text>
          <Text style={[styles.arrow, { color: accentColor }]}>›</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 190,
    borderWidth: 1,
    borderRadius: 14,
    backgroundColor: "rgba(3, 9, 20, 0.94)",
    overflow: "hidden"
  },
  artworkClip: {
    position: "absolute",
    top: 0,
    left: 52,
    right: 0,
    height: 74,
    overflow: "hidden"
  },
  artwork: {
    width: "108%",
    height: 108,
    marginLeft: -8,
    transform: [{ translateY: -18 }],
    opacity: 0.3
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(2, 9, 20, 0.62)"
  },
  iconWrap: {
    width: 46,
    height: 46,
    marginTop: 10,
    marginLeft: 10,
    borderRadius: 23,
    borderWidth: 1,
    backgroundColor: "rgba(2, 9, 20, 0.84)",
    alignItems: "center",
    justifyContent: "center"
  },
  content: {
    flex: 1,
    paddingHorizontal: 11,
    paddingTop: 18,
    paddingBottom: 10,
    justifyContent: "flex-end"
  },
  title: {
    fontSize: 21,
    lineHeight: 25,
    fontWeight: "900",
    marginBottom: 7
  },
  description: {
    color: theme.colors.text,
    fontSize: 12.5,
    lineHeight: 18,
    fontWeight: "400"
  },
  divider: {
    height: 1,
    marginTop: 11,
    marginBottom: 8,
    backgroundColor: "rgba(226, 232, 240, 0.18)"
  },
  actionRow: {
    minHeight: 24,
    flexDirection: "row",
    alignItems: "center"
  },
  actionText: {
    flexShrink: 1,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "500"
  },
  arrow: {
    marginLeft: 5,
    fontSize: 22,
    lineHeight: 22
  }
});
