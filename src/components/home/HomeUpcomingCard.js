import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SymbolView } from "expo-symbols";
import { theme } from "../../utils/designTokens";
import { getPendingResult } from "../../utils/pendingResultStore";

const SONAR_PREFIX = "Sonar · ";
const SONAR_COLOR = "#22D3EE";

export default function HomeUpcomingCard({
  title = "Rebusløp",
  statusText = "Starter om 2 t 14 min",
  buttonLabel = "Gå til venterom",
  symbolName = {
    ios: "calendar.badge.clock",
    android: "event",
    web: "event"
  },
  accentColor = theme.colors.primary,
  onPress
}) {
  const isSonar = title.startsWith(SONAR_PREFIX);
  const isTreasureCard = isSonar || symbolName?.web === "map";
  const pendingResult = getPendingResult();

  if (pendingResult?.gameType === "treasure" && isTreasureCard) {
    return null;
  }

  const displayTitle = isSonar ? title.slice(SONAR_PREFIX.length) : title;
  const resolvedAccent = isSonar ? SONAR_COLOR : accentColor;
  const resolvedSymbol = isSonar
    ? { ios: "dot.radiowaves.left.and.right", android: "radar", web: "radar" }
    : symbolName;
  const resolvedStatus = isSonar ? `Sonar · ${statusText}` : statusText;

  return (
    <View
      style={[
        styles.card,
        { borderColor: `${resolvedAccent}44` },
        isSonar && styles.sonarCard
      ]}
    >
      {isSonar ? <View pointerEvents="none" style={styles.sonarGlow} /> : null}

      <View style={styles.eventInfo}>
        <View style={[styles.iconWrap, isSonar && styles.sonarIconWrap]}>
          <SymbolView
            name={resolvedSymbol}
            size={27}
            tintColor={isSonar ? resolvedAccent : "rgba(203, 213, 225, 0.72)"}
          />
        </View>

        <View style={styles.textBlock}>
          <Text style={[styles.title, isSonar && styles.sonarTitle]}>{displayTitle}</Text>
          <Text style={[styles.statusText, { color: resolvedAccent }]}>
            {resolvedStatus}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, isSonar && styles.sonarButton]}
        onPress={onPress}
        activeOpacity={0.82}
        accessibilityRole="button"
        accessibilityLabel={buttonLabel}
      >
        <Text style={[styles.buttonText, isSonar && styles.sonarButtonText]}>{buttonLabel}</Text>
        <Text style={[styles.arrow, isSonar && styles.sonarButtonText]}>›</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 66,
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 13,
    borderWidth: 1,
    backgroundColor: "rgba(8, 15, 27, 0.92)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    overflow: "hidden"
  },
  sonarCard: {
    backgroundColor: "rgba(3, 22, 31, 0.96)",
    shadowColor: SONAR_COLOR,
    shadowOpacity: 0.22,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6
  },
  sonarGlow: {
    position: "absolute",
    left: -20,
    top: -30,
    width: 118,
    height: 118,
    borderRadius: 59,
    backgroundColor: "rgba(34, 211, 238, 0.07)"
  },
  eventInfo: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center"
  },
  iconWrap: {
    width: 38,
    height: 38,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  sonarIconWrap: {
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "rgba(34, 211, 238, 0.32)",
    backgroundColor: "rgba(34, 211, 238, 0.08)"
  },
  textBlock: {
    flex: 1,
    minWidth: 0
  },
  title: {
    color: theme.colors.text,
    fontSize: 15,
    lineHeight: 19,
    fontWeight: "800"
  },
  sonarTitle: {
    color: "#ECFEFF"
  },
  statusText: {
    marginTop: 2,
    fontSize: 12.5,
    lineHeight: 17,
    fontWeight: "500"
  },
  button: {
    minWidth: 94,
    minHeight: 44,
    marginLeft: 8,
    paddingHorizontal: 9,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "rgba(203, 213, 225, 0.48)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  sonarButton: {
    borderColor: "rgba(34, 211, 238, 0.58)",
    backgroundColor: "rgba(34, 211, 238, 0.08)"
  },
  buttonText: {
    color: "rgba(226, 232, 240, 0.76)",
    fontSize: 11.5,
    lineHeight: 16,
    fontWeight: "500"
  },
  sonarButtonText: {
    color: SONAR_COLOR,
    fontWeight: "800"
  },
  arrow: {
    marginLeft: 3,
    color: "rgba(226, 232, 240, 0.64)",
    fontSize: 17,
    lineHeight: 17
  }
});
