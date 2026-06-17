import React from "react";
import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HEADER_IMAGE = require("../../../assets/images/treasure/treasure-setup-header.webp");

export default function TreasureSetupHeader({ onBack, onHelp }) {
  return (
    <ImageBackground source={HEADER_IMAGE} resizeMode="cover" style={styles.header}>
      <View style={styles.darkOverlay} />
      <View style={styles.bottomFade} />
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        <View style={styles.topRow}>
          <Pressable
            onPress={onBack}
            style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
            accessibilityRole="button"
            accessibilityLabel="Gå tilbake"
            hitSlop={6}
          >
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>
          <Pressable
            onPress={onHelp}
            style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
            accessibilityRole="button"
            accessibilityLabel="Åpne hjelp"
            hitSlop={6}
          >
            <Text style={styles.helpIcon}>?</Text>
          </Pressable>
        </View>
        <View style={styles.textBlock}>
          <Text style={styles.title}>Skatte<Text style={styles.accent}>jakt</Text></Text>
          <Text style={styles.subtitle}>Sett opp eventyret ditt</Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 236,
    overflow: "hidden",
    backgroundColor: "#06101E"
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(1, 8, 18, 0.20)"
  },
  bottomFade: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 104,
    backgroundColor: "rgba(2, 10, 20, 0.66)"
  },
  safeArea: {
    flex: 1,
    justifyContent: "space-between"
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10
  },
  iconButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(3, 11, 23, 0.78)",
    borderWidth: 1.2,
    borderColor: "rgba(226,232,240,0.88)"
  },
  pressed: { opacity: 0.72, transform: [{ scale: 0.97 }] },
  backIcon: {
    color: "#FF7200",
    fontSize: 47,
    lineHeight: 47,
    fontWeight: "300",
    marginTop: -4
  },
  helpIcon: {
    color: "#FF7200",
    fontSize: 31,
    lineHeight: 34,
    fontWeight: "500"
  },
  textBlock: {
    paddingHorizontal: 34,
    paddingBottom: 18
  },
  title: {
    color: "#F8FAFC",
    fontSize: 44,
    lineHeight: 49,
    fontWeight: "800",
    letterSpacing: -1.3
  },
  accent: { color: "#FF5A00" },
  subtitle: {
    marginTop: 3,
    color: "#BCC3D1",
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "500"
  }
});