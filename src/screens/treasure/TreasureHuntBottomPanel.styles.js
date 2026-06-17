import { StyleSheet } from "react-native";
import { COLORS } from "./TreasureHuntScreen.styles";

export const bottomPanelStyles = StyleSheet.create({
  bottomPanel: {
    position: "absolute",
    left: 14,
    right: 14,
    bottom: 12,
    minHeight: 148,
    borderRadius: 20,
    backgroundColor: "rgba(7,20,35,0.97)",
    borderWidth: 1,
    borderColor: "rgba(64,86,115,0.92)",
    padding: 14,
    shadowColor: "#000000",
    shadowOpacity: 0.34,
    shadowRadius: 16,
    elevation: 10
  },
  panelTopRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  signalGraphic: {
    width: 62,
    height: 62,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center"
  },
  signalRingLarge: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "rgba(255,104,0,0.72)"
  },
  signalRingMedium: {
    position: "absolute",
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: "rgba(255,104,0,0.82)"
  },
  signalRingSmall: {
    position: "absolute",
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: COLORS.orange
  },
  signalCore: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.orange,
    shadowColor: COLORS.orange,
    shadowOpacity: 0.95,
    shadowRadius: 8
  },
  panelContent: {
    flex: 1,
    minWidth: 0
  },
  signalCopy: {
    flex: 1,
    minWidth: 0,
    paddingRight: 8
  },
  signalTitle: {
    color: COLORS.text,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "900"
  },
  signalHelp: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 16,
    marginTop: 3
  },
  distancePill: {
    minHeight: 32,
    paddingHorizontal: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(64,86,115,0.92)",
    backgroundColor: "rgba(19,38,60,0.96)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  distanceIcon: {
    color: COLORS.orange,
    fontSize: 16,
    marginRight: 5
  },
  distanceText: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "900"
  },
  primaryButton: {
    width: "100%",
    minHeight: 44,
    marginTop: 12,
    borderRadius: 13,
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
    fontSize: 15,
    fontWeight: "900",
    textAlign: "center"
  },
  primaryTextDisabled: {
    color: "rgba(255,255,255,0.42)"
  }
});
