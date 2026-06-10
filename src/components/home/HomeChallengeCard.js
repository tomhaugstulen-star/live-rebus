import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../utils/designTokens";

export default function HomeChallengeCard({
  icon,
  kicker,
  title,
  description,
  accentColor,
  buttonTitle,
  onPress,
  backgroundHint
}) {
  return (
    <TouchableOpacity
      style={[styles.card, { borderColor: accentColor }]}
      onPress={onPress}
      activeOpacity={0.88}
      accessibilityRole="button"
      accessibilityLabel={buttonTitle}
    >
      <View style={[styles.accentBar, { backgroundColor: accentColor }]} />

      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <Text style={styles.icon}>{icon}</Text>
        </View>

        <View style={[styles.kickerPill, { backgroundColor: accentColor }]}>
          <Text style={styles.kickerText}>{kicker}</Text>
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

      {backgroundHint ? (
        <Text style={[styles.backgroundHint, { color: accentColor }]}>
          {backgroundHint}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 244,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    padding: 20,
    overflow: "hidden"
  },
  accentBar: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    height: 5,
    opacity: 0.9
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
    marginBottom: 18
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.surfaceAlt
  },
  icon: {
    fontSize: 32
  },
  kickerPill: {
    minHeight: 32,
    paddingHorizontal: 12,
    borderRadius: theme.radius.pill,
    alignItems: "center",
    justifyContent: "center"
  },
  kickerText: {
    color: theme.colors.white,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "900",
    letterSpacing: 0.4,
    textTransform: "uppercase"
  },
  content: {
    flex: 1,
    justifyContent: "space-between"
  },
  title: {
    color: theme.colors.text,
    fontSize: 27,
    lineHeight: 32,
    fontWeight: "900",
    marginBottom: 10
  },
  description: {
    color: theme.colors.text,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 18
  },
  button: {
    minHeight: 54,
    borderRadius: theme.radius.md,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "900"
  },
  arrow: {
    color: theme.colors.white,
    fontSize: 30,
    lineHeight: 32,
    marginLeft: 10
  },
  backgroundHint: {
    position: "absolute",
    right: 12,
    top: 12,
    opacity: 0.14,
    fontSize: 72,
    fontWeight: "900"
  }
});
