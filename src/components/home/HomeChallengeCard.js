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
    minHeight: 238,
    backgroundColor: "rgba(30, 41, 59, 0.94)",
    borderRadius: 28,
    borderWidth: 1,
    padding: 20,
    overflow: "hidden"
  },
  accentBar: {
    position: "absolute",
    left: 20,
    right: 20,
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
    marginBottom: 20
  },
  iconWrap: {
    width: 68,
    height: 68,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(226, 232, 240, 0.16)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(15, 23, 42, 0.58)"
  },
  icon: {
    fontSize: 34
  },
  kickerPill: {
    minHeight: 34,
    paddingHorizontal: 12,
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(15, 23, 42, 0.46)"
  },
  kickerText: {
    fontSize: 12,
    lineHeight: 17,
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
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "900",
    marginBottom: 10
  },
  description: {
    color: theme.colors.textMuted,
    fontSize: 16,
    lineHeight: 25,
    marginBottom: 20
  },
  button: {
    minHeight: 56,
    borderRadius: 18,
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
    fontSize: 31,
    lineHeight: 32,
    marginLeft: 10,
    marginTop: -1
  },
  backgroundHint: {
    position: "absolute",
    right: 10,
    bottom: 28,
    opacity: 0.11,
    fontSize: 92,
    fontWeight: "900"
  }
});