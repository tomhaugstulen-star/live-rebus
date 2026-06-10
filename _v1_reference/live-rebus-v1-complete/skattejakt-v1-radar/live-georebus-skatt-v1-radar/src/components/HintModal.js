import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../utils/theme";

export default function HintModal({
  visible,
  hintText,
  currentIndex,
  total,
  onClose,
  onNext,
  canGoNext
}) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.kicker}>💡 Hint {currentIndex + 1} av {total}</Text>
          <Text style={styles.text}>{hintText}</Text>

          <View style={styles.row}>
            <TouchableOpacity style={styles.secondaryButton} onPress={onClose} activeOpacity={0.85}>
              <Text style={styles.secondaryText}>Lukk</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.primaryButton, !canGoNext && styles.disabled]}
              onPress={canGoNext ? onNext : onClose}
              activeOpacity={0.85}
            >
              <Text style={styles.primaryText}>{canGoNext ? "Neste hint" : "Ferdig"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.72)",
    justifyContent: "center",
    padding: 24
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 20
  },
  kicker: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 10
  },
  text: {
    color: theme.colors.text,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 18
  },
  row: {
    flexDirection: "row",
    gap: 10
  },
  secondaryButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: "center",
    justifyContent: "center"
  },
  primaryButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center"
  },
  secondaryText: {
    color: theme.colors.text,
    fontWeight: "800",
    fontSize: 15
  },
  primaryText: {
    color: theme.colors.white,
    fontWeight: "900",
    fontSize: 15
  },
  disabled: {
    opacity: 0.75
  }
});
