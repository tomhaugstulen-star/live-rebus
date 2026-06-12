import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const colors = {
  white: "#FFFFFF",
  textSecondary: "rgba(255,255,255,0.72)",
  cardBg: "rgba(255,255,255,0.045)",
  orange: "#FF5A00"
};

function hexToRgba(hex, alpha) {
  const clean = hex.replace("#", "");
  const value = parseInt(clean, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

export default function HomeChallengeCard({
  icon,
  title,
  description,
  accentColor = colors.orange,
  buttonText,
  onPress,
  variant = "rebus",
  style
}) {
  const softAccent = hexToRgba(accentColor, 0.18);
  const faintAccent = hexToRgba(accentColor, 0.08);
  const borderAccent = hexToRgba(accentColor, 0.78);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { borderColor: borderAccent },
        pressed ? styles.pressed : null,
        style
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={buttonText || title}
    >
      <View style={[styles.glow, { backgroundColor: faintAccent }]} />
      <View style={[styles.routeHint, variant === "treasure" ? styles.routeHintTreasure : null]}>
        <View style={[styles.routeDot, { backgroundColor: accentColor }]} />
        <View style={[styles.routeLine, { backgroundColor: accentColor }]} />
        <View style={[styles.routeDotSmall, { backgroundColor: accentColor }]} />
      </View>

      <View style={[styles.iconWrap, { borderColor: borderAccent, backgroundColor: softAccent }]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>

      <View style={styles.copy}>
        <Text style={[styles.title, { color: accentColor }]} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <View style={[styles.button, { backgroundColor: accentColor }]}> 
        <Text style={styles.buttonText}>{buttonText}</Text>
        <Text style={styles.arrow}>›</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    minWidth: 0,
    minHeight: 242,
    borderRadius: 22,
    borderWidth: 1,
    backgroundColor: colors.cardBg,
    padding: 16,
    overflow: "hidden",
    justifyContent: "space-between"
  },
  pressed: {
    opacity: 0.86,
    transform: [{ scale: 0.99 }]
  },
  glow: {
    position: "absolute",
    right: -42,
    top: 20,
    width: 144,
    height: 144,
    borderRadius: 72
  },
  routeHint: {
    position: "absolute",
    right: 10,
    top: 82,
    width: 92,
    height: 96,
    opacity: 0.36,
    transform: [{ rotate: "-20deg" }]
  },
  routeHintTreasure: {
    top: 72,
    right: -2,
    opacity: 0.28
  },
  routeDot: {
    position: "absolute",
    left: 4,
    top: 20,
    width: 7,
    height: 7,
    borderRadius: 4
  },
  routeLine: {
    position: "absolute",
    left: 18,
    top: 29,
    width: 68,
    height: 5,
    borderRadius: 999
  },
  routeDotSmall: {
    position: "absolute",
    right: 4,
    top: 46,
    width: 5,
    height: 5,
    borderRadius: 3
  },
  iconWrap: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14
  },
  icon: {
    fontSize: 34,
    lineHeight: 38
  },
  copy: {
    width: "100%",
    minWidth: 0,
    marginBottom: 14
  },
  title: {
    fontSize: 29,
    lineHeight: 34,
    fontWeight: "900",
    letterSpacing: -0.8,
    marginBottom: 10
  },
  description: {
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400"
  },
  button: {
    height: 54,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12
  },
  buttonText: {
    color: colors.white,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "900"
  },
  arrow: {
    color: colors.white,
    fontSize: 31,
    lineHeight: 31,
    fontWeight: "700",
    marginLeft: 9,
    marginTop: -2
  }
});
