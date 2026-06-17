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
  safe: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flexGrow: 1, alignItems: "center", backgroundColor: COLORS.background },
  frame: { width: "100%", maxWidth: 540, minHeight: "100%" },
  header: {
    width: "100%",
    height: 172,
    overflow: "hidden",
    backgroundColor: "#06101E"
  },
  headerImage: {
    transform: [{ translateX: 50 }]
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(1,8,18,0.16)"
  },
  headerBottomFade: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 72,
    backgroundColor: "rgba(2,10,20,0.58)"
  },
  headerSafe: { flex: 1 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 6
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(3,11,23,0.72)",
    borderWidth: 1,
    borderColor: "rgba(226,232,240,0.88)"
  },
  backIcon: {
    color: "#FF7200",
    fontSize: 39,
    lineHeight: 39,
    fontWeight: "300",
    marginTop: -3
  },
  compassIcon: { color: "#FF7200", fontSize: 24, lineHeight: 27, fontWeight: "500" },
  headerTitle: { color: COLORS.orange, fontSize: 22, lineHeight: 27, fontWeight: "800" },
  content: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 42 },
  title: { color: COLORS.text, fontSize: 29, lineHeight: 34, fontWeight: "900" },
  subtitle: { color: COLORS.muted, fontSize: 15, lineHeight: 21, marginTop: 5 },
  map: {
    height: 184,
    marginTop: 16,
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "#18263A"
  },
  road: { position: "absolute", height: 4, backgroundColor: "#65748A", borderRadius: 4 },
  roadOne: { width: "115%", top: 44, left: -20, transform: [{ rotate: "-12deg" }] },
  roadTwo: { width: "110%", top: 108, left: -8, transform: [{ rotate: "9deg" }] },
  roadThree: { width: "72%", top: 82, left: 62, transform: [{ rotate: "-52deg" }] },
  block: { position: "absolute", backgroundColor: "#27364A", borderRadius: 8 },
  blockOne: { width: 82, height: 44, top: 18, left: 24 },
  blockTwo: { width: 92, height: 50, bottom: 20, right: 24 },
  blockThree: { width: 58, height: 72, top: 52, right: 50 },
  radiusCircle: {
    position: "absolute",
    width: 116,
    height: 116,
    borderRadius: 58,
    left: "50%",
    top: "50%",
    marginLeft: -58,
    marginTop: -58,
    backgroundColor: "rgba(59,130,246,0.13)",
    borderWidth: 1,
    borderColor: "rgba(147,197,253,0.36)"
  },
  locationOuter: {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: 22,
    height: 22,
    marginLeft: -11,
    marginTop: -11,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center"
  },
  locationInner: { width: 13, height: 13, borderRadius: 7, backgroundColor: COLORS.blue },
  chipGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 12 },
  chip: {
    minHeight: 42,
    flexGrow: 1,
    flexBasis: "29%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
    paddingHorizontal: 11,
    flexDirection: "row",
    alignItems: "center"
  },
  chipIcon: { color: COLORS.orange, fontSize: 15, marginRight: 7, fontWeight: "800" },
  chipText: { color: COLORS.text, fontSize: 13, fontWeight: "700" },
  participantsCard: {
    marginTop: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.panel,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 4
  },
  sectionTitle: { color: COLORS.text, fontSize: 20, fontWeight: "900", marginBottom: 7 },
  participantRow: {
    minHeight: 55,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "rgba(51,68,92,0.62)"
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#25364D",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10
  },
  avatarText: { color: COLORS.text, fontSize: 12, fontWeight: "800" },
  participantName: { flex: 1, color: COLORS.text, fontSize: 15, fontWeight: "700" },
  status: {
    minWidth: 46,
    height: 27,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#263448"
  },
  hostStatus: { backgroundColor: COLORS.orange },
  statusText: { color: COLORS.muted, fontSize: 12, fontWeight: "800" },
  hostStatusText: { color: "#111315" },
  removeButton: {
    minWidth: 54,
    height: 34,
    marginLeft: 8,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#60708A"
  },
  removeText: { color: COLORS.text, fontSize: 12, fontWeight: "700" },
  startHint: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 13,
    borderRadius: 10,
    backgroundColor: "rgba(10,24,41,0.78)",
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  startHintIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.orange,
    color: COLORS.orange,
    textAlign: "center",
    lineHeight: 18,
    fontWeight: "900",
    marginRight: 9
  },
  startHintText: { flex: 1, color: COLORS.muted, fontSize: 13, lineHeight: 18 },
  startButton: {
    minHeight: 56,
    marginTop: 13,
    borderRadius: 11,
    backgroundColor: COLORS.orange,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.orange,
    shadowOpacity: 0.26,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6
  },
  playIcon: { color: "#FFFFFF", fontSize: 17, marginRight: 12 },
  startButtonText: { color: "#FFFFFF", fontSize: 18, fontWeight: "900" },
  pressed: { opacity: 0.72, transform: [{ scale: 0.97 }] },
  countdownOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(2,10,20,0.97)",
    alignItems: "center",
    justifyContent: "center"
  },
  countdownMode: { color: COLORS.orange, fontSize: 18, fontWeight: "800", marginBottom: 18 },
  countdownText: {
    color: COLORS.text,
    fontSize: 92,
    lineHeight: 104,
    fontWeight: "900",
    textShadowColor: COLORS.orange,
    textShadowRadius: 24
  }
});
