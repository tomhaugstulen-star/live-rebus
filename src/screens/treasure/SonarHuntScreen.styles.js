import { StyleSheet } from "react-native";

const COLORS = {
  background: "#020811",
  panel: "#071522",
  panelStrong: "#0B2030",
  border: "#1E6070",
  cyan: "#22D3EE",
  cyanSoft: "rgba(34,211,238,0.18)",
  cyanFaint: "rgba(34,211,238,0.08)",
  text: "#F4FAFC",
  muted: "#93A8B4",
  disabled: "#17313D"
};

export const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  frame: {
    flex: 1,
    width: "100%",
    maxWidth: 540,
    alignSelf: "center",
    backgroundColor: COLORS.background,
    paddingHorizontal: 18,
    paddingBottom: 18
  },
  header: {
    minHeight: 74,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.panel
  },
  iconButtonDisabled: { opacity: 0.42 },
  backIcon: { color: COLORS.cyan, fontSize: 38, lineHeight: 38, marginTop: -3 },
  calibrateIcon: { color: COLORS.cyan, fontSize: 26, fontWeight: "800" },
  calibrateIconDisabled: { color: COLORS.muted },
  titleGroup: { alignItems: "center" },
  title: { color: COLORS.text, fontSize: 25, fontWeight: "900" },
  modePill: {
    marginTop: 5,
    minHeight: 28,
    borderRadius: 14,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.cyanFaint
  },
  modeIcon: { color: COLORS.cyan, marginRight: 6, fontSize: 14 },
  modeText: { color: COLORS.cyan, fontSize: 12, fontWeight: "800" },
  statsRow: { flexDirection: "row", gap: 8 },
  statCard: {
    flex: 1,
    minHeight: 64,
    borderRadius: 13,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.panel
  },
  statIcon: { color: COLORS.cyan, fontSize: 17, marginRight: 8, fontWeight: "900" },
  statValue: { color: COLORS.text, fontSize: 16, fontWeight: "900" },
  statLabel: { color: COLORS.muted, fontSize: 11, marginTop: 2 },
  radarSection: { flex: 1, alignItems: "center", justifyContent: "center", paddingVertical: 12 },
  radarOuter: {
    width: 286,
    height: 286,
    borderRadius: 143,
    borderWidth: 2,
    borderColor: COLORS.cyan,
    backgroundColor: "#04131C",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    shadowColor: COLORS.cyan,
    shadowOpacity: 0.24,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8
  },
  radarInactive: { borderColor: COLORS.border, shadowOpacity: 0.08 },
  radarRingLarge: {
    position: "absolute",
    width: 222,
    height: 222,
    borderRadius: 111,
    borderWidth: 1,
    borderColor: "rgba(34,211,238,0.32)"
  },
  radarRingMedium: {
    position: "absolute",
    width: 156,
    height: 156,
    borderRadius: 78,
    borderWidth: 1,
    borderColor: "rgba(34,211,238,0.34)"
  },
  radarRingSmall: {
    position: "absolute",
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 1,
    borderColor: "rgba(34,211,238,0.38)"
  },
  axisHorizontal: {
    position: "absolute",
    left: 18,
    right: 18,
    height: 1,
    backgroundColor: "rgba(34,211,238,0.2)"
  },
  axisVertical: {
    position: "absolute",
    top: 18,
    bottom: 18,
    width: 1,
    backgroundColor: "rgba(34,211,238,0.2)"
  },
  pulseRing: {
    position: "absolute",
    width: 230,
    height: 230,
    borderRadius: 115,
    borderWidth: 2,
    borderColor: "rgba(34,211,238,0.72)"
  },
  sweep: {
    position: "absolute",
    width: 286,
    height: 286,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  sweepLine: {
    width: 2,
    height: 136,
    marginTop: 7,
    backgroundColor: COLORS.cyan
  },
  sweepGlow: {
    position: "absolute",
    top: 12,
    width: 34,
    height: 128,
    backgroundColor: "rgba(34,211,238,0.08)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  blip: {
    position: "absolute",
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: COLORS.cyan,
    shadowColor: COLORS.cyan,
    shadowOpacity: 0.9,
    shadowRadius: 9,
    elevation: 8
  },
  blipOne: { top: 78, right: 74, opacity: 0.72 },
  blipTwo: { bottom: 92, left: 66, opacity: 0.35 },
  playerOuter: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8FDFF",
    borderWidth: 4,
    borderColor: "rgba(34,211,238,0.28)"
  },
  playerInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: COLORS.cyan },
  distanceCard: { marginTop: 15, alignItems: "center" },
  distanceLabel: { color: COLORS.muted, fontSize: 11, fontWeight: "800", letterSpacing: 1.2 },
  distanceValue: { color: COLORS.text, fontSize: 31, fontWeight: "900", marginTop: 2 },
  distanceHint: { color: COLORS.cyan, fontSize: 12, marginTop: 2 },
  bottomPanel: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.panelStrong,
    padding: 14
  },
  signalRow: { flexDirection: "row", alignItems: "center" },
  soundIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.cyanSoft,
    marginRight: 12
  },
  soundIcon: { color: COLORS.cyan, fontSize: 15, fontWeight: "900", letterSpacing: -2 },
  signalCopy: { flex: 1 },
  signalTitle: { color: COLORS.text, fontSize: 18, fontWeight: "900" },
  signalHelp: { color: COLORS.muted, fontSize: 13, lineHeight: 18, marginTop: 2 },
  primaryButton: {
    marginTop: 13,
    minHeight: 55,
    borderRadius: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.cyan
  },
  primaryDisabled: { backgroundColor: COLORS.disabled },
  primaryIcon: { color: "#02202A", fontSize: 18, marginRight: 9, fontWeight: "900" },
  primaryText: { color: "#02202A", fontSize: 17, fontWeight: "900" },
  primaryTextDisabled: { color: COLORS.muted },
  pressed: { opacity: 0.72, transform: [{ scale: 0.97 }] }
});
