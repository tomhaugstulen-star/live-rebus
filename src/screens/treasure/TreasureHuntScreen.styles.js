import { StyleSheet } from "react-native";

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
  safe: {
    flex: 1,
    backgroundColor: COLORS.background
  },
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
  roadOne: {
    width: "132%",
    top: "35%",
    left: -64,
    transform: [{ rotate: "-17deg" }]
  },
  roadTwo: {
    width: "126%",
    top: "57%",
    left: -22,
    transform: [{ rotate: "12deg" }]
  },
  roadThree: {
    width: "92%",
    top: "48%",
    left: "29%",
    transform: [{ rotate: "-58deg" }]
  },
  roadFour: {
    width: "86%",
    top: "67%",
    left: -90,
    transform: [{ rotate: "-48deg" }]
  },
  block: {
    position: "absolute",
    borderRadius: 10,
    backgroundColor: "rgba(48,67,91,0.7)",
    borderWidth: 1,
    borderColor: "rgba(126,148,177,0.13)"
  },
  blockOne: {
    width: 96,
    height: 64,
    top: "28%",
    left: "15%",
    transform: [{ rotate: "-10deg" }]
  },
  blockTwo: {
    width: 122,
    height: 74,
    top: "39%",
    right: "12%",
    transform: [{ rotate: "17deg" }]
  },
  blockThree: {
    width: 90,
    height: 58,
    top: "62%",
    left: "20%",
    transform: [{ rotate: "12deg" }]
  },
  blockFour: {
    width: 108,
    height: 66,
    top: "72%",
    right: "18%",
    transform: [{ rotate: "-14deg" }]
  },
  blockFive: {
    width: 74,
    height: 52,
    top: "51%",
    right: "33%",
    transform: [{ rotate: "39deg" }]
  },
  treeCluster: {
    position: "absolute",
    opacity: 0.38
  },
  treeClusterOne: {
    top: "24%",
    right: "6%",
    transform: [{ rotate: "-8deg" }]
  },
  treeClusterTwo: {
    bottom: "18%",
    left: "5%",
    transform: [{ rotate: "9deg" }]
  },
  treeText: {
    color: "#07111D",
    fontSize: 24,
    lineHeight: 26,
    letterSpacing: 2
  },
  fog: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(2,10,20,0.68)"
  },
  revealOuter: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 125,
    left: "50%",
    top: "51%",
    marginLeft: -125,
    marginTop: -125,
    backgroundColor: "rgba(36,87,143,0.12)",
    borderWidth: 1,
    borderColor: "rgba(96,165,250,0.34)",
    shadowColor: COLORS.blue,
    shadowOpacity: 0.18,
    shadowRadius: 24
  },
  revealInner: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    left: "50%",
    top: "51%",
    marginLeft: -75,
    marginTop: -75,
    backgroundColor: "rgba(59,130,246,0.08)"
  },
  playerOuter: {
    position: "absolute",
    left: "50%",
    top: "51%",
    width: 34,
    height: 34,
    marginLeft: -17,
    marginTop: -17,
    borderRadius: 17,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.blue,
    shadowOpacity: 0.9,
    shadowRadius: 14,
    elevation: 8
  },
  playerCentered: {
    transform: [{ scale: 1 }]
  },
  playerInner: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.blue
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 14,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between"
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(3,11,23,0.84)",
    borderWidth: 1.5,
    borderColor: "rgba(226,232,240,0.62)",
    alignItems: "center",
    justifyContent: "center"
  },
  backIcon: {
    color: COLORS.orange,
    fontSize: 34,
    lineHeight: 34,
    fontWeight: "600",
    marginTop: -2
  },
  headerSpacer: {
    width: 48,
    height: 48
  },
  titleGroup: {
    alignItems: "center",
    flexShrink: 1,
    marginHorizontal: 10
  },
  title: {
    color: COLORS.orange,
    fontSize: 30,
    lineHeight: 34,
    fontWeight: "900",
    letterSpacing: -0.7
  },
  modePill: {
    minHeight: 34,
    marginTop: 9,
    paddingHorizontal: 15,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "rgba(74,96,126,0.8)",
    backgroundColor: "rgba(9,23,39,0.9)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  modeDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderStyle: "dotted",
    borderColor: COLORS.muted,
    marginRight: 8
  },
  modeText: {
    color: COLORS.muted,
    fontSize: 13,
    fontWeight: "800"
  },
  statsRow: {
    position: "absolute",
    top: 112,
    left: 16,
    right: 16,
    flexDirection: "row",
    gap: 8
  },
  statCard: {
    flex: 1,
    minWidth: 0,
    minHeight: 68,
    paddingHorizontal: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(64,86,115,0.85)",
    backgroundColor: "rgba(7,20,35,0.9)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  statIcon: {
    color: COLORS.orange,
    fontSize: 22,
    fontWeight: "800",
    marginRight: 8
  },
  statCopy: {
    minWidth: 0
  },
  statValue: {
    color: COLORS.text,
    fontSize: 17,
    lineHeight: 20,
    fontWeight: "900"
  },
  statLabel: {
    color: COLORS.muted,
    fontSize: 11,
    lineHeight: 14,
    marginTop: 2
  },
  recenterButton: {
    position: "absolute",
    right: 18,
    bottom: 188,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(7,20,35,0.94)",
    borderWidth: 1.5,
    borderColor: "rgba(148,163,184,0.72)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.26,
    shadowRadius: 10,
    elevation: 6
  },
  recenterText: {
    color: COLORS.blue,
    fontSize: 24,
    lineHeight: 26,
    transform: [{ rotate: "-45deg" }]
  },
  bottomPanel: {
    position: "absolute",
    left: 14,
    right: 14,
    bottom: 14,
    minHeight: 156,
    borderRadius: 22,
    backgroundColor: "rgba(7,20,35,0.97)",
    borderWidth: 1,
    borderColor: "rgba(64,86,115,0.92)",
    padding: 16,
    flexDirection: "row",
    shadowColor: "#000000",
    shadowOpacity: 0.34,
    shadowRadius: 18,
    elevation: 10
  },
  signalGraphic: {
    width: 82,
    height: 82,
    marginRight: 14,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  signalRingLarge: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "rgba(255,104,0,0.72)"
  },
  signalRingMedium: {
    position: "absolute",
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 1.5,
    borderColor: "rgba(255,104,0,0.82)"
  },
  signalRingSmall: {
    position: "absolute",
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1.5,
    borderColor: COLORS.orange
  },
  signalCore: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.orange,
    shadowColor: COLORS.orange,
    shadowOpacity: 0.95,
    shadowRadius: 10
  },
  panelContent: {
    flex: 1,
    minWidth: 0
  },
  panelTopRow: {
    flexDirection: "row",
    alignItems: "flex-start"
  },
  signalCopy: {
    flex: 1,
    minWidth: 0,
    paddingRight: 8
  },
  signalTitle: {
    color: COLORS.text,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "900"
  },
  signalHelp: {
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 5
  },
  distancePill: {
    minHeight: 36,
    paddingHorizontal: 11,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(64,86,115,0.92)",
    backgroundColor: "rgba(19,38,60,0.96)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  distanceIcon: {
    color: COLORS.orange,
    fontSize: 18,
    marginRight: 6
  },
  distanceText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "900"
  },
  primaryButton: {
    minHeight: 50,
    marginTop: 14,
    borderRadius: 14,
    backgroundColor: COLORS.orange,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FF8A34"
  },
  primaryDisabled: {
    backgroundColor: "#6E3716",
    borderColor: "#A24B12",
    opacity: 0.78
  },
  primaryText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900"
  },
  primaryTextDisabled: {
    color: "rgba(255,255,255,0.42)"
  },
  pressed: {
    opacity: 0.76,
    transform: [{ scale: 0.98 }]
  }
});
