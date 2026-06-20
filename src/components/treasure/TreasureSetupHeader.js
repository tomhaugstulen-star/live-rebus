import React from "react";
import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HEADER_IMAGE = require("../../../assets/images/treasure/treasure-setup-header.webp");

export default function TreasureSetupHeader({
  onBack,
  title = "Skatte",
  titleAccent = "jakt",
  subtitle = "Sett opp eventyret ditt",
  accentColor = "#FF5A00"
}) {
  return (
    <ImageBackground
      source={HEADER_IMAGE}
      resizeMode="cover"
      style={styles.header}
      imageStyle={styles.headerImage}
    >
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
            <Text style={[styles.backIcon, { color: accentColor }]}>‹</Text>
          </Pressable>
          <View style={styles.iconSpacer} />
        </View>
        <View style={styles.textBlock}>
          <Text style={styles.title}>
            {title}
            {titleAccent ? <Text style={[styles.accent, { color: accentColor }]}>{titleAccent}</Text> : null}
          </Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 172,
    overflow: "hidden",
    backgroundColor: "#06101E"
  },
  headerImage: {
    transform: [{ translateX: 50 }]
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(1,8,18,0.16)"
  },
  bottomFade: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 72,
    backgroundColor: "rgba(2,10,20,0.58)"
  },
  safeArea: {
    flex: 1,
    justifyContent: "space-between"
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 6
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(3,11,23,0.72)",
    borderWidth: 1,
    borderColor: "rgba(226,232,240,0.88)"
  },
  iconSpacer: {
    width: 44,
    height: 44
  },
  pressed: { opacity: 0.72, transform: [{ scale: 0.97 }] },
  backIcon: {
    fontSize: 39,
    lineHeight: 39,
    fontWeight: "300",
    marginTop: -5
  },
  textBlock: {
    paddingHorizontal: 26,
    paddingBottom: 12
  },
  title: {
    color: "#F8FAFC",
    fontSize: 35,
    lineHeight: 39,
    fontWeight: "800",
    letterSpacing: -1
  },
  accent: { color: "#FF5A00" },
  subtitle: {
    marginTop: 2,
    color: "#BCC3D1",
    fontSize: 18,
    lineHeight: 23,
    fontWeight: "500"
  }
});