import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const HEADER_IMAGE = require("../../../assets/images/treasure/treasure-setup-header.webp");

export default function TreasureSetupHeader({ onBack, onHelp }) {
  return (
    <ImageBackground
      source={HEADER_IMAGE}
      resizeMode="cover"
      style={styles.header}
      imageStyle={styles.headerImage}
    >
      <View style={styles.overlay} />

      <View style={styles.topRow}>
        <TouchableOpacity
          onPress={onBack}
          style={styles.iconButton}
          accessibilityRole="button"
          accessibilityLabel="Gå tilbake"
          activeOpacity={0.85}
        >
          <Text style={styles.iconText}>←</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onHelp}
          style={styles.iconButton}
          accessibilityRole="button"
          accessibilityLabel="Åpne hjelp"
          activeOpacity={0.85}
        >
          <Text style={styles.iconText}>?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.titleBlock}>
        <Text style={styles.title}>
          Skatte<Text style={styles.titleAccent}>jakt</Text>
        </Text>
        <Text style={styles.subtitle}>Sett opp eventyret ditt</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    alignSelf: "stretch",
    height: 160,
    justifyContent: "space-between",
    marginHorizontal: -14,
    marginTop: -6,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 18,
    overflow: "hidden"
  },
  headerImage: {
    backgroundColor: "#020817"
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15, 23, 42, 0.10)"
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(15, 23, 42, 0.78)",
    borderWidth: 1,
    borderColor: "#475569"
  },
  iconText: {
    color: "#E2E8F0",
    fontSize: 24,
    lineHeight: 26,
    fontWeight: "700"
  },
  titleBlock: {
    alignSelf: "stretch",
    alignItems: "flex-start"
  },
  title: {
    color: "#E2E8F0",
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "700",
    textAlign: "left"
  },
  titleAccent: {
    color: "#FF6B35"
  },
  subtitle: {
    marginTop: 4,
    color: "#94A3B8",
    fontSize: 17,
    lineHeight: 24,
    textAlign: "left"
  }
});
