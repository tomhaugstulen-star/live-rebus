import { StyleSheet } from "react-native";
import { bottomPanelStyles } from "./TreasureHuntBottomPanel.styles";

export const COLORS = {
  background: "#020A14",
  panel: "#081524",
  card: "#0A1829",
  border: "#33445C",
  text: "#F5F7FB",
  muted: "#AEB7C8",
  orange: "#FF6800",
  blue: "#3B82F6"
};

export const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  frame: {
    flex: 1,
    width: "100%",
    maxWidth: 540,
    alignSelf: "center",
    backgroundColor: COLORS.background
  },
  mapStage: {
    flex: 1,
    minHeight: 620,
    overflow: "hidden",
    backgroundColor: "#101D2C"
  },
  mapBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#15263A"
  },
  road: {
    position: "absolute",
    height: 8,
    borderRadius: 8,
    backgroundColor: "rgba(117,139,167,0.48)",
    borderWidth: 1,
    borderColor: "rgba(165,184,207,0.1)"
  },
  roadOne: { width: "132%", top: "33%", left: -64, transform: [{ rotate: "-17deg" }] },
  roadTwo: { width: "126%", top: "55%", left: -22, transform: [{ rotate: "12deg" }] },
  roadThree: { width: "92%", top: "46%", left: "29%", transform: [{ rotate: "-58deg" }] },
  roadFour: { width: "86%", top: "65%", left: -90, transform: [{ rotate: "-48deg" }] },
  block: {
    position: "absolute",
    borderRadius: 10,
    backgroundColor: "rgba(48,67,91,0.7)",
    borderWidth: 1,
    borderColor: "rgba(126,148,177,0.13)"
  },
  blockOne: { width: 96, height: 64, top: "26%", left: "15%", transform: [{ rotate: "-10deg" }] },
  blockTwo: { width: 122, height: 74, top: "37%", right: "12%", transform: [{ rotate: "17deg" }] },
  blockThree: { width: 90, height: 58, top: "60%", left: "20%", transform: [{ rotate: "12deg" }] },
  blockFour: { width: 108, height: 66, top: "70%", right: "18%", transform: [{ rotate: "-14deg" }] },
  blockFive: { width: 74, height: 52, top: "49%", right: "33%", transform: [{ rotate: "39deg" }] },
  treeCluster: { position: "absolute", opacity: 0.38 },
  treeClusterOne: { top: "22%", right: "6%", transform: [{ rotate: "-8deg" }] },
  treeClusterTwo: { bottom: "17%", left: "5%", transform: [{ rotate: "9deg" }] },
  treeText: { color: "#07111D", fontSize: 24, lineHeight: 26, letterSpacing: 2 },
  fog: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(2,10,20,0.68)"
  },
  revealOuter: {
    position: "absolute",
    width: 190,
    height: 190,
    borderRadius: 95,
    left: "50%",
    top: "49%",
    marginLeft: -95,
    marginTop: -95,
    backgroundColor: "rgba(36,87,143,0.1)",
    borderWidth: 1,
    borderColor: "rgba(96,165,250,0.3)",
    shadowColor: COLORS.blue,
    shadowOpacity: 0.14,
    shadowRadius: 18
  },
  revealInner: {
    position: "absolute",
    width: 112,
    height: 112,
    borderRadius: 56,
    left: "50%",
    top: "49%",
    marginLeft: -56,
    marginTop: -56,
    backgroundColor: "rgba(59,130,246,0.07)"
  },
  playerOuter: {
    position: "absolute",
    left: "50%",
    top: "49%",
    width: 32,
    height: 32,
    marginLeft: -16,
    marginTop: -16,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.blue,
    shadowOpacity: 0.9,
    shadowRadius: 12,
    elevation: 8
  },
  playerCentered: { transform: [{ scale: 1 }] },
  playerInner: { width: 20, height: 20, borderRadius: 10, backgroundColor: COLORS.blue },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between"
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(3,11,23,0.84)",
    borderWidth: 1.5,
    borderColor: "rgba(226,232,240,0.62)",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
  backIcon: {
    width: 44,
    height: 44,
    color: COLORS.orange,
    fontSize: 31,
    lineHeight: 42,
    fontWeight: "600",
    textAlign: "center",
    textAlignVertical: "center",
    includeFontPadding: false,
    transform: [{ translateY: -4 }]
  },
  headerSpacer: { width: 44, height: 44 },
  titleGroup: { alignItems: "center", flexShrink: 1, marginHorizontal: 8 },
  title: {
    color: COLORS.orange,
    fontSize: 27,
    lineHeight: 31,
    fontWeight: "900",
    letterSpacing: -0.6
  },
  modePill: {
    minHeight: 30,
    marginTop: 5,
    paddingHorizontal: 13,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(74,96,126,0.8)",
    backgroundColor: "rgba(9,23,39,0.9)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  modeDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.5,
    borderStyle: "dotted",
    borderColor: COLORS.muted,
    marginRight: 7
  },
  modeText: { color: COLORS.muted, fontSize: 12, fontWeight: "800" },
  statsRow: {
    position: "absolute",
    top: 92,
    left: 14,
    right: 14,
    flexDirection: "row",
    gap: 7
  },
  statCard: {
    flex: 1,
    minWidth: 0,
    minHeight: 60,
    paddingHorizontal: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(64,86,115,0.85)",
    backgroundColor: "rgba(7,20,35,0.9)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  statIcon: { color: COLORS.orange, fontSize: 19, fontWeight: "800", marginRight: 7 },
  statCopy: { minWidth: 0 },
  statValue: { color: COLORS.text, fontSize: 16, lineHeight: 19, fontWeight: "900" },
  statLabel: { color: COLORS.muted, fontSize: 10, lineHeight: 13, marginTop: 1 },
  recenterButton: {
    position: "absolute",
    right: 16,
    bottom: 176,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(7,20,35,0.94)",
    borderWidth: 1.5,
    borderColor: "rgba(148,163,184,0.72)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.26,
    shadowRadius: 8,
    elevation: 6
  },
  recenterText: { color: COLORS.blue, fontSize: 22, lineHeight: 24, transform: [{ rotate: "-45deg" }] },
  ...bottomPanelStyles,
  pressed: { opacity: 0.76, transform: [{ scale: 0.98 }] }
});
