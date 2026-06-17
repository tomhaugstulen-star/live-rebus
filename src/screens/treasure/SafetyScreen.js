import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const C = {
  bg: "#06111E",
  panel: "#081524",
  border: "#334052",
  text: "#F4F6FA",
  muted: "#C5CBD4",
  orange: "#FF6508",
  disabled: "#263241"
};

function Shield() {
  return (
    <View style={s.shield}>
      <View style={s.exclamationStem} />
      <View style={s.exclamationDot} />
    </View>
  );
}

export default function SafetyScreen({ onBack, onContinue }) {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <SafeAreaView edges={["top", "left", "right", "bottom"]} style={s.safe}>
      <View style={s.topBar}>
        <Pressable
          onPress={onBack}
          style={({ pressed }) => [s.backButton, pressed && s.pressed]}
          accessibilityRole="button"
          accessibilityLabel="Gå tilbake"
          hitSlop={6}
        >
          <Text style={s.backIcon}>‹</Text>
        </Pressable>
        <Text style={s.topTitle}>Sikkerhet først</Text>
        <View style={s.topSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={s.content}
        showsVerticalScrollIndicator={false}
        bounces={false}
        alwaysBounceVertical={false}
        overScrollMode="never"
      >
        <View style={s.panel}>
          <View style={s.hero}>
            <Shield />
          </View>

          <Text style={s.intro}>
            Skattejakten skjer ute i virkelige{`\n`}omgivelser.
          </Text>

          <Text style={s.warning}>
            Ikke gå inn på privat eiendom, farlige{`\n`}områder, vann, jernbane eller{`\n`}trafikkert vei.{`\n`}Barn bør være sammen med en voksen.
          </Text>

          <View style={s.info}>
            <View style={s.infoIcon}>
              <Text style={s.infoIconText}>i</Text>
            </View>
            <Text style={s.infoText}>
              Du er selv ansvarlig for å vurdere{`\n`}sikkerhet og tilgjengelighet i{`\n`}området.
            </Text>
          </View>

          <Pressable
            onPress={() => setConfirmed((value) => !value)}
            style={s.confirm}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: confirmed }}
          >
            <View style={[s.checkbox, confirmed && s.checkboxOn]}>
              <Text style={s.check}>{confirmed ? "✓" : ""}</Text>
            </View>
            <Text style={s.confirmText}>Jeg har lest og forstått</Text>
          </Pressable>

          <Pressable
            onPress={onContinue}
            disabled={!confirmed}
            style={({ pressed }) => [
              s.primary,
              !confirmed && s.primaryDisabled,
              pressed && confirmed && s.pressed
            ]}
            accessibilityRole="button"
            accessibilityState={{ disabled: !confirmed }}
          >
            <Text style={[s.play, !confirmed && s.disabledText]}>▶</Text>
            <Text style={[s.primaryText, !confirmed && s.disabledText]}>
              Start skattejakt
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  topBar: {
    minHeight: 60,
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 6,
    flexDirection: "row",
    alignItems: "center"
  },
  backButton: {
    width: 44,
    height: 44,
    marginLeft: -2,
    marginTop: -2,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(3,11,23,0.72)",
    borderWidth: 1,
    borderColor: "rgba(226,232,240,0.88)",
    overflow: "hidden"
  },
  backIcon: {
    width: 44,
    height: 44,
    color: C.orange,
    fontSize: 31,
    lineHeight: 42,
    fontWeight: "600",
    textAlign: "center",
    textAlignVertical: "center",
    includeFontPadding: false,
    transform: [{ translateY: -4 }]
  },
  topTitle: {
    flex: 1,
    textAlign: "center",
    color: C.orange,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "800"
  },
  topSpacer: { width: 44, height: 44 },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: C.bg,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 82
  },
  panel: {
    width: "100%",
    maxWidth: 480,
    borderWidth: 1,
    borderColor: "rgba(255,101,8,.55)",
    borderRadius: 15,
    backgroundColor: C.panel,
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 18
  },
  hero: {
    height: 78,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6
  },
  shield: {
    width: 58,
    height: 66,
    borderWidth: 2,
    borderColor: C.orange,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomLeftRadius: 29,
    borderBottomRightRadius: 29,
    alignItems: "center",
    position: "relative"
  },
  exclamationStem: {
    position: "absolute",
    top: 15,
    width: 7,
    height: 25,
    borderRadius: 4,
    backgroundColor: C.orange
  },
  exclamationDot: {
    position: "absolute",
    bottom: 12,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: C.orange
  },
  intro: {
    color: C.text,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    marginBottom: 10
  },
  warning: {
    color: C.text,
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 14
  },
  info: {
    minHeight: 78,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: "#0A1829",
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 13,
    paddingVertical: 11,
    marginBottom: 10
  },
  infoIcon: {
    width: 21,
    height: 21,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: C.orange,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    marginTop: 1
  },
  infoIconText: {
    color: C.orange,
    fontSize: 13,
    lineHeight: 14,
    fontWeight: "800"
  },
  infoText: {
    flex: 1,
    color: C.muted,
    fontSize: 14,
    lineHeight: 20
  },
  confirm: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 12
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "#657184",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    backgroundColor: "transparent"
  },
  checkboxOn: { backgroundColor: C.orange, borderColor: C.orange },
  check: { color: "#FFFFFF", fontSize: 15, lineHeight: 16, fontWeight: "900" },
  confirmText: { color: C.text, fontSize: 14, lineHeight: 19 },
  primary: {
    minHeight: 48,
    borderRadius: 9,
    backgroundColor: C.orange,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: C.orange,
    shadowOpacity: 0.28,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5
  },
  primaryDisabled: {
    backgroundColor: C.disabled,
    shadowOpacity: 0,
    elevation: 0
  },
  pressed: { opacity: 0.82, transform: [{ scale: 0.98 }] },
  play: { color: "#FFFFFF", fontSize: 16, marginRight: 12 },
  primaryText: { color: "#FFFFFF", fontSize: 15, lineHeight: 19, fontWeight: "800" },
  disabledText: { color: "#8994A4" }
});
