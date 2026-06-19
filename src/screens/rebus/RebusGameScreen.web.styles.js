import { StyleSheet } from "react-native";
import { theme } from "../../utils/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  content: {
    padding: 20,
    paddingBottom: 32
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24
  },
  emptyTitle: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 18
  },
  backButtonFallback: {
    minHeight: 44,
    minWidth: 44,
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: theme.colors.surface
  },
  topBar: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20
  },
  backButton: {
    minHeight: 44,
    minWidth: 44,
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  backButtonText: {
    color: theme.colors.primary,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "800"
  },
  kickerPill: {
    minHeight: 32,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: theme.colors.rebus,
    alignItems: "center",
    justifyContent: "center"
  },
  kickerText: {
    color: theme.colors.text,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 0.4
  },
  title: {
    color: theme.colors.text,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "900",
    marginBottom: 6
  },
  progress: {
    color: theme.colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 18
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 20,
    marginBottom: 16
  },
  cardTitle: {
    color: theme.colors.text,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "900",
    marginBottom: 14
  },
  questionText: {
    color: theme.colors.text,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 14
  },
  hintButton: {
    minHeight: 44,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(139, 92, 246, 0.55)",
    backgroundColor: "rgba(139, 92, 246, 0.16)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12
  },
  hintButtonText: {
    color: theme.colors.text,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "900"
  },
  hintBox: {
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12
  },
  hintLabel: {
    color: theme.colors.rebus,
    fontSize: 13,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 4
  },
  hintText: {
    color: theme.colors.text,
    fontSize: 15,
    lineHeight: 22
  },
  errorText: {
    color: "#EF4444",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
    marginBottom: 10
  },
  approvedText: {
    color: theme.colors.success,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "900",
    marginBottom: 10
  },
  input: {
    minHeight: 54,
    marginBottom: 14,
    backgroundColor: theme.colors.surfaceAlt,
    color: theme.colors.text,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  primaryButton: {
    minHeight: 54,
    borderRadius: 18,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "900"
  },
  cardBody: {
    color: theme.colors.text,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 6
  },
  cardNote: {
    color: theme.colors.textMuted,
    fontSize: 14,
    lineHeight: 20
  },
  finishButton: {
    minHeight: 54,
    borderRadius: 18,
    backgroundColor: theme.colors.success,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18
  },
  finishButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "900"
  }
});
