import { StyleSheet } from "react-native";
import { theme } from "../../utils/designTokens";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#020914"
  },
  topBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "100%",
    overflow: "hidden"
  },
  topBackdropImage: {
    width: "100%",
    height: "100%"
  },
  topBackdropFade: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 185,
    backgroundColor: "rgba(2, 9, 20, 0.68)"
  },
  safeArea: {
    flex: 1
  },
  content: {
    flex: 1,
    paddingBottom: 20
  },
  header: {
    minHeight: 44,
    paddingTop: 10,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  profileGroup: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center"
  },
  profileButton: {
    width: 48,
    height: 48,
    marginRight: 14,
    borderRadius: 24
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.surface,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
  avatarImage: {
    width: "100%",
    height: "100%"
  },
  avatarFallback: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: "700"
  },
  greetingBlock: {
    flex: 1,
    minWidth: 0,
    maxWidth: 175
  },
  greeting: {
    color: theme.colors.text,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "400"
  },
  xpText: {
    marginTop: 0,
    color: "rgba(203, 213, 225, 0.62)",
    fontSize: 12,
    lineHeight: 15,
    fontWeight: "600"
  },
  userName: {
    color: theme.colors.primary,
    fontWeight: "500"
  },
  settingsButton: {
    width: 50,
    height: 50,
    marginLeft: 10,
    marginTop: 2,
    alignItems: "center",
    justifyContent: "center"
  },
  settingsIcon: {
    width: 30,
    height: 30,
    transform: [{ translateX: -15 }]
  },
  hero: {
    minHeight: 142,
    marginTop: 0,
    paddingHorizontal: 18,
    justifyContent: "flex-end",
    paddingBottom: 8
  },
  heroTitle: {
    color: theme.colors.text,
    fontSize: 38,
    lineHeight: 44,
    fontWeight: "900",
    letterSpacing: -0.8
  },
  heroAccent: {
    color: theme.colors.primary
  },
  heroSubtitle: {
    marginTop: 10,
    color: "rgba(226, 232, 240, 0.82)",
    fontSize: 15,
    lineHeight: 23,
    fontWeight: "400"
  },
  challengeSection: {
    marginTop: 26,
    paddingHorizontal: 18
  },
  challengeRow: {
    width: "100%"
  },
  upcomingSection: {
    marginTop: 14,
    paddingHorizontal: 18
  },
  upcomingSectionTitle: {
    marginBottom: 6,
    color: theme.colors.text,
    fontSize: 17,
    lineHeight: 21,
    fontWeight: "700"
  },
  upcomingStack: {
    width: "100%"
  },
  upcomingCardSpacing: {
    marginTop: 6
  }
});
