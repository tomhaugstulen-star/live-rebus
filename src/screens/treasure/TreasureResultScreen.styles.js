import { StyleSheet } from "react-native";

export const COLORS = {
  background: "#020A14",
  panel: "rgba(5, 17, 31, 0.94)",
  border: "#35465D",
  text: "#F5F7FB",
  muted: "#AEB7C8",
  orange: "#FF6800",
  orangeLight: "#FFB000",
  green: "#36D56B"
};

export const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flexGrow: 1, alignItems: "center", backgroundColor: COLORS.background },
  frame: { width: "100%", maxWidth: 540, minHeight: "100%", paddingBottom: 30 },
  header: {
    minHeight: 72,
    paddingHorizontal: 20,
    paddingTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  headerButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(5, 17, 31, 0.9)",
    borderWidth: 1,
    borderColor: "rgba(174,183,200,0.42)"
  },
  headerButtonText: { color: COLORS.text, fontSize: 30, lineHeight: 32, fontWeight: "500" },
  shareText: { color: COLORS.text, fontSize: 23, lineHeight: 25, fontWeight: "700" },
  headerTitle: { color: COLORS.text, fontSize: 23, lineHeight: 28, fontWeight: "900" },
  hero: { alignItems: "center", paddingHorizontal: 20, marginTop: 2 },
  chestImage: { width: "100%", height: 302 },
  title: {
    color: COLORS.text,
    fontSize: 34,
    lineHeight: 40,
    textAlign: "center",
    fontWeight: "900",
    marginTop: -18,
    paddingHorizontal: 8
  },
  ribbonWrap: { width: "100%", height: 70, marginTop: 8, justifyContent: "center" },
  ribbonImage: { ...StyleSheet.absoluteFillObject, width: "100%", height: "100%" },
  subtitle: {
    color: COLORS.text,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "700",
    textAlign: "center",
    paddingHorizontal: 42
  },
  statsCard: {
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.panel,
    paddingHorizontal: 18,
    paddingVertical: 8
  },
  statRow: {
    minHeight: 66,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(53,70,93,0.62)"
  },
  statRowLast: { borderBottomWidth: 0 },
  statIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(2,10,20,0.9)",
    borderWidth: 1,
    borderColor: "rgba(255,104,0,0.62)",
    marginRight: 13
  },
  statIconText: { color: COLORS.orange, fontSize: 16, lineHeight: 19, fontWeight: "900" },
  statLabel: { flex: 1, color: COLORS.text, fontSize: 15, lineHeight: 20, fontWeight: "700" },
  statValue: { color: COLORS.text, fontSize: 16, lineHeight: 21, fontWeight: "900", marginLeft: 12 },
  statValueSuccess: { color: COLORS.green },
  statValueXp: { color: COLORS.orange, fontSize: 20 },
  actions: { marginHorizontal: 20, marginTop: 18 },
  primaryButton: {
    minHeight: 60,
    borderRadius: 15,
    backgroundColor: COLORS.orange,
    borderWidth: 1,
    borderColor: COLORS.orangeLight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.orange,
    shadowOpacity: 0.32,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 7 },
    elevation: 7
  },
  primaryIcon: { color: COLORS.text, fontSize: 18, marginRight: 12 },
  primaryText: { color: COLORS.text, fontSize: 19, lineHeight: 24, fontWeight: "900" },
  secondaryButton: {
    minHeight: 58,
    marginTop: 12,
    borderRadius: 15,
    backgroundColor: "rgba(5,17,31,0.9)",
    borderWidth: 1,
    borderColor: COLORS.orange,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  secondaryIcon: { color: COLORS.text, fontSize: 20, marginRight: 12 },
  secondaryText: { color: COLORS.text, fontSize: 18, lineHeight: 23, fontWeight: "800" },
  pressed: { opacity: 0.72, transform: [{ scale: 0.985 }] }
});
