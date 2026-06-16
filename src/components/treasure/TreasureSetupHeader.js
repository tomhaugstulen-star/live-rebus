import React from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  SafeAreaView,
  useSafeAreaInsets
} from "react-native-safe-area-context";

const HEADER_IMAGE = require("../../../assets/images/treasure/treasure-setup-header.webp");

export default function TreasureSetupHeader({ onBack, onHelp }) {
  const insets = useSafeAreaInsets();

  return (
    <ImageBackground
      source={HEADER_IMAGE}
      resizeMode="cover"
      style={[styles.header, { marginTop: -insets.top - 6 }]}
    >
      <LinearGradient
        colors={[
          "rgba(15,23,42,0.05)",
          "rgba(15,23,42,0.45)",
          "#0F172A"
        ]}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={styles.headerSafeArea}>
        <View style={styles.headerTopRow}>
          <Pressable
            onPress={onBack}
            style={styles.iconButton}
            accessibilityRole="button"
            accessibilityLabel="Gå tilbake"
          >
            <Text style={styles.iconText}>←</Text>
          </Pressable>

          <Pressable
            onPress={onHelp}
            style={styles.iconButton}
            accessibilityRole="button"
            accessibilityLabel="Åpne hjelp"
          >
            <Text style={styles.iconText}>?</Text>
          </Pressable>
        </View>

        <View style={styles.headerText}>
          <Text style={styles.title}>
            <Text style={styles.titleAccent}>Skatte</Text>
            jakt
          </Text>

          <Text style={styles.subtitle}>Sett opp eventyret ditt</Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 160,
    marginHorizontal: -14,
    overflow: "hidden"
  },
  headerSafeArea: {
    flex: 1,
    justifyContent: "space-between"
  },
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20
  },
  headerText: {
    paddingHorizontal: 20,
    paddingBottom: 18
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(15,23,42,0.78)",
    borderWidth: 1,
    borderColor: "#475569"
  },
  iconText: {
    color: "#E2E8F0",
    fontSize: 24,
    lineHeight: 26,
    fontWeight: "700"
  },
  title: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "700",
    color: "#E2E8F0"
  },
  titleAccent: {
    color: "#FF6B35"
  },
  subtitle: {
    marginTop: 4,
    fontSize: 17,
    lineHeight: 24,
    color: "#94A3B8"
  }
});
