import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../utils/designTokens";

export default function HomeChallengeCard({
  icon,
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
      activeOpacity={0.86}
      accessibilityRole="button"
      accessibilityLabel={buttonTitle}
    >
      <View style={[styles.iconCircle, { backgroundColor: `${accentColor}26` }]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: accentColor }]}>{title}</Text>
        <Text style={styles.description}>{description}</Text>

        <View
          style={[
            styles.button,
            {
              backgroundColor:
                accentColor === theme.colors.rebus
                  ? theme.colors.rebus
                  : theme.colors.primary
            }
          ]}
        >
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
    flex: 1,
    minHeight: 236,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    padding: theme.spacing.lg,
    overflow: "hidden"
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.lg
  },
  icon: {
    fontSize: 34
  },
  content: {
    flex: 1,
    justifyContent: "space-between"
  },
  title: {
    ...theme.typography.cardTitle,
    marginBottom: theme.spacing.sm
  },
  description: {
    ...theme.typography.body,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg
  },
  button: {
    minHeight: theme.touch.buttonHeight,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    ...theme.typography.button,
    color: theme.colors.white
  },
  arrow: {
    color: theme.colors.white,
    fontSize: 32,
    lineHeight: 34,
    marginLeft: theme.spacing.md
  },
  backgroundHint: {
    position: "absolute",
    right: 16,
    top: 16,
    opacity: 0.12,
    fontSize: 72,
    fontWeight: "900"
  }
});