import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { theme } from "../../utils/theme";

export default function AppButton({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  style
}) {
  const buttonStyle = variant === "secondary" ? styles.secondaryButton : styles.primaryButton;
  const textStyle = variant === "secondary" ? styles.secondaryText : styles.primaryText;

  return (
    <TouchableOpacity
      style={[buttonStyle, disabled && styles.disabled, style]}
      onPress={disabled ? undefined : onPress}
      activeOpacity={0.85}
    >
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: theme.colors.primary,
    minHeight: 54,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: theme.radius.pill,
    alignItems: "center",
    justifyContent: "center"
  },
  secondaryButton: {
    backgroundColor: "transparent",
    minHeight: 48,
    paddingVertical: 13,
    paddingHorizontal: 18,
    borderRadius: theme.radius.pill,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  primaryText: {
    color: theme.colors.white,
    fontWeight: "900",
    fontSize: 16
  },
  secondaryText: {
    color: theme.colors.text,
    fontWeight: "800",
    fontSize: 15
  },
  disabled: {
    opacity: 0.45
  }
});
