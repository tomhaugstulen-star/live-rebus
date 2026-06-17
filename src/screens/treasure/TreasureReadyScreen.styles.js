import { StyleSheet } from "react-native";

export const COLORS = {
  background: "#020A14",
  panel: "#081524",
  card: "#0A1829",
  border: "#33445C",
  text: "#F5F7FB",
  muted: "#AEB7C8",
  orange: "#FF6800",
  orangeSoft: "rgba(255,104,0,0.16)"
};

export const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flexGrow: 1, alignItems: "center", backgroundColor: COLORS.background },
  frame: { width: "100%", maxWidth: 540, minHeight: "100%" },
  header: { width: "100%", height: 172, overflow: "hidden", backgroundColor: "#06101E" },
  headerImage: { transform: [{ translateX: 50 }] },
  headerOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(1,8,18,0.16)" },
  headerBottomFade: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 76,
    backgroundColor: "rgba(2,10,20,0.68)"
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
  backIcon: { color: "#FF7200", fontSize: 39, lineHeight: 39, fontWeight: "300", marginTop: -5 },
  compassIcon: { color: "#FF7200", fontSize: 24, lineHeight: 27, fontWeight: "500" },
  headerTitle: { color: COLORS.orange, fontSize: 22, lineHeight: 27, fontWeight: "800" },
  content: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 42 },
  title: { color: COLORS.text, fontSize: 29, lineHeight: 35, fontWeight: "900", marginBottom: 14 },

  featureCard: {
    minHeight: 178,
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.panel,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 14
  },
  featureImage: { opacity: 0.38, transform: [{ scale: 1.18 }, { translateX: 60 }] },
  featureOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(2,10,20,0.58)" },
  featureCopy: { flex: 1, minWidth: 0, paddingLeft: 8 },
  chestWrap: { width: 158, height: 144, alignItems: "center", justifyContent: "center" },
  chestGlow: {
    position: "absolute",
    width: 130,
    height: 74,
    bottom: 12,
    borderRadius: 65,
    backgroundColor: "rgba(255,139,32,0.24)",
    shadowColor: COLORS.orange,
    shadowOpacity: 0.72,
    shadowRadius: 20,
    elevation: 8
  },
  chestImage: { width: 166, height: 156 },
  xpEyebrow: { color: COLORS.orange, fontSize: 11, lineHeight: 15, fontWeight: "900", letterSpacing: 1.2 },
  xpRow: { flexDirection: "row", alignItems: "flex-end", marginTop: 3 },
  xpValue: { color: COLORS.text, fontSize: 38, lineHeight: 42, fontWeight: "900" },
  xpUnit: { color: COLORS.orange, fontSize: 18, lineHeight: 25, fontWeight: "900", marginLeft: 6, marginBottom: 2 },
  xpTrack: {
    height: 12,
    marginTop: 12,
    borderRadius: 6,
    backgroundColor: "rgba(174,183,200,0.22)",
    overflow: "visible",
    position: "relative"
  },
  xpFill: {
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.orange,
    shadowColor: COLORS.orange,
    shadowOpacity: 0.65,
    shadowRadius: 8,
    elevation: 5
  },
  xpRewardMarker: {
    position: "absolute",
    right: -2,
    top: -9,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFB21A",
    borderWidth: 2,
    borderColor: "#FFE9A6"
  },
  xpRewardMarkerText: { color: "#5E2D00", fontSize: 15, lineHeight: 18, fontWeight: "900" },
  xpNext: { color: COLORS.muted, fontSize: 12, lineHeight: 17, marginTop: 10, fontWeight: "700" },

  chipGrid: { flexDirection: "row", flexWrap: "wrap", gap: 9, marginTop: 13 },
  chip: {
    minHeight: 48,
    flexGrow: 1,
    flexBasis: "29%",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center"
  },
  chipIcon: { color: COLORS.orange, fontSize: 16, marginRight: 8, fontWeight: "800" },
  chipText: { flexShrink: 1, color: COLORS.text, fontSize: 14, fontWeight: "800" },
  participantsCard: {
    marginTop: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.panel,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 4
  },
  participantsCardCompact: { paddingTop: 10, paddingBottom: 2 },
  sectionTitle: { color: COLORS.text, fontSize: 20, fontWeight: "900", marginBottom: 7 },
  sectionTitleCompact: { marginBottom: 4 },
  participantRow: {
    minHeight: 55,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "rgba(51,68,92,0.62)"
  },
  participantRowCompact: { minHeight: 46 },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#25364D",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10
  },
  avatarCompact: { width: 30, height: 30, borderRadius: 15 },
  avatarText: { color: COLORS.text, fontSize: 12, fontWeight: "800" },
  participantName: { flex: 1, minWidth: 0, color: COLORS.text, fontSize: 15, fontWeight: "700" },
  status: {
    minWidth: 68,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#263448",
    paddingHorizontal: 9
  },
  hostStatus: { backgroundColor: COLORS.orange },
  statusText: { color: COLORS.muted, fontSize: 11, fontWeight: "800" },
  hostStatusText: { color: "#111315" },
  startHint: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,104,0,0.72)",
    backgroundColor: "rgba(59,25,14,0.62)",
    paddingHorizontal: 13,
    paddingVertical: 11
  },
  startHintIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.orange,
    color: COLORS.orange,
    textAlign: "center",
    lineHeight: 21,
    fontWeight: "900",
    marginRight: 10
  },
  startHintText: { flex: 1, color: COLORS.text, fontSize: 13, lineHeight: 18 },
  startButton: {
    minHeight: 58,
    marginTop: 13,
    borderRadius: 13,
    backgroundColor: COLORS.orange,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.orange,
    shadowOpacity: 0.3,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 7 },
    elevation: 7
  },
  playIcon: { color: "#FFFFFF", fontSize: 17, marginRight: 12 },
  startButtonText: { color: "#FFFFFF", fontSize: 18, fontWeight: "900" },
  pressed: { opacity: 0.72, transform: [{ scale: 0.97 }] },
  countdownOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(2,10,20,0.97)",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
  countdownMode: { color: COLORS.orange, fontSize: 18, fontWeight: "800", marginBottom: 18, zIndex: 1 },
  countdownText: {
    color: COLORS.text,
    fontSize: 92,
    lineHeight: 104,
    fontWeight: "900",
    textShadowColor: COLORS.orange,
    textShadowRadius: 24,
    zIndex: 1
  }
});
