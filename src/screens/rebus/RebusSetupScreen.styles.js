import { StyleSheet } from "react-native";

const colors = {
  background: "#0F172A",
  surface: "#1E293B",
  surfaceAlt: "#334155",
  text: "#E2E8F0",
  muted: "#94A3B8",
  primary: "#FF6B35",
  rebus: "#8B5CF6",
  success: "#22C55E",
  border: "rgba(226, 232, 240, 0.12)"
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    padding: 20,
    paddingBottom: 32
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
    color: colors.primary,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "800"
  },
  kickerPill: {
    minHeight: 32,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: colors.rebus,
    alignItems: "center",
    justifyContent: "center"
  },
  kickerText: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 0.4
  },
  title: {
    color: colors.text,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "900",
    marginBottom: 10
  },
  body: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 18
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    marginBottom: 16
  },
  cardTitle: {
    color: colors.text,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "900",
    marginBottom: 14
  },
  cardBody: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 14
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 44,
    borderTopWidth: 1,
    borderTopColor: colors.border
  },
  rowLabel: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "700"
  },
  rowValue: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "800"
  },
  optionRow: {
    flexDirection: "row",
    gap: 10
  },
  optionButton: {
    flex: 1,
    minHeight: 54,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceAlt,
    alignItems: "center",
    justifyContent: "center"
  },
  optionButtonSelected: {
    borderColor: colors.rebus,
    backgroundColor: "rgba(139, 92, 246, 0.22)"
  },
  optionText: {
    color: colors.text,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "900"
  },
  optionTextSelected: {
    color: colors.text
  },
  timeRow: {
    minHeight: 44,
    paddingHorizontal: 14,
    borderRadius: 18,
    backgroundColor: colors.surfaceAlt,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  timeLabel: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: "700"
  },
  timeValue: {
    color: colors.success,
    fontSize: 15,
    fontWeight: "900"
  },
  primaryButton: {
    minHeight: 54,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "900"
  }
});
