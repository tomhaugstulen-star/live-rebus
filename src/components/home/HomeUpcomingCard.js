import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SymbolView } from "expo-symbols";
import { theme } from "../../utils/designTokens";

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
  return (
    <View style={[styles.card, { borderColor: `${accentColor}44` }]}>
      <View style={styles.eventInfo}>
        <View style={styles.iconWrap}>
          <SymbolView
            name={symbolName}
            size={27}
            tintColor="rgba(203, 213, 225, 0.72)"
          />
        </View>

        <View style={styles.textBlock}>
          <Text style={styles.title}>{title}</Text>
          <Text style={[styles.statusText, { color: accentColor }]}>
            {statusText}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        activeOpacity={0.82}
        accessibilityRole="button"
        accessibilityLabel={buttonLabel}
      >
        <Text style={styles.buttonText}>{buttonLabel}</Text>
        <Text style={styles.arrow}>›</Text>
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
    justifyContent: "space-between"
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
  buttonText: {
    color: "rgba(226, 232, 240, 0.76)",
    fontSize: 11.5,
    lineHeight: 16,
    fontWeight: "500"
  },
  arrow: {
    marginLeft: 3,
    color: "rgba(226, 232, 240, 0.64)",
    fontSize: 17,
    lineHeight: 17
  }
});
