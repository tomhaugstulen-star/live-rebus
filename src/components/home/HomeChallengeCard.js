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
    minHeight: 196,
    backgroundColor: "rgba(30, 41, 59, 0.94)",
    borderRadius: 26,
    borderWidth: 1,
    padding: 16,
    overflow: "hidden"
  },
  accentBar: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 0,
    height: 4,
    borderTopLeftRadius: 999,
    borderTopRightRadius: 999,
    opacity: 0.95
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12
  },
  iconWrap: {
    width: 54,
    height: 54,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "rgba(226, 232, 240, 0.16)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(15, 23, 42, 0.58)"
  },
  icon: {
    fontSize: 27
  },
  kickerPill: {
    minHeight: 29,
    paddingHorizontal: 10,
    borderRadius: theme.radius.pill,
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
    color: theme.colors.text,
    fontSize: 25,
    lineHeight: 30,
    fontWeight: "900",
    marginBottom: 6
  },
  description: {
    color: theme.colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12
  },
  button: {
    minHeight: 48,
    borderRadius: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 15,
    lineHeight: 19,
    fontWeight: "900"
  },
  arrow: {
    color: theme.colors.white,
    fontSize: 28,
    lineHeight: 30,
    marginLeft: 8,
    marginTop: -1
  },
  backgroundHint: {
    position: "absolute",
    right: 8,
    bottom: 24,
    opacity: 0.08,
    fontSize: 76,
    fontWeight: "900"
  }
});