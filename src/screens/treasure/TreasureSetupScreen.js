import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TreasureSetupHeader from "../../components/treasure/TreasureSetupHeader";

const C = { bg: "#020A14", panel: "rgba(3,13,27,0.86)", card: "#071426", border: "#33445C", text: "#F5F7FB", muted: "#AEB7C8", orange: "#FF6800", purple: "#8B4DFF", blue: "#7288AA", green: "#23C96B" };

function Mark({ selected, small }) {
  return <View style={[s.mark, small && s.markSmall, selected && s.markOn]}>{selected ? <Text style={s.check}>✓</Text> : null}</View>;
}

function VariantGraphic({ sonar }) {
  return (
    <View style={[s.graphic, sonar ? s.sonarGraphic : s.fogGraphic]}>
      <View style={[s.graphicRing, s.graphicRingOuter, sonar && s.graphicRingPurple]} />
      <View style={[s.graphicRing, s.graphicRingMiddle, sonar && s.graphicRingPurple]} />
      <View style={[s.graphicRing, s.graphicRingInner, sonar && s.graphicRingPurple]} />
      <View style={[s.graphicLineHorizontal, sonar && s.sonarBeam]} />
      {!sonar ? <View style={s.graphicLineVertical} /> : null}
      <View style={[s.graphicDot, sonar && s.sonarDot]} />
      {!sonar ? <View style={s.fogHalo} /> : null}
    </View>
  );
}

function Variant({ title, description, selected, onPress, sonar }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [s.variant, selected && s.selected, pressed && s.pressed]} accessibilityRole="button" accessibilityState={{ selected }}>
      <View style={s.visual}><VariantGraphic sonar={sonar} /></View>
      <View style={s.variantCopy}><Text style={s.variantTitle}>{title}</Text><Text style={s.variantDescription}>{description}</Text></View>
      <View style={s.variantMark}><Mark selected={selected} /></View>
    </Pressable>
  );
}

function Player({ label, icon, color, selected, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [s.player, selected && s.selected, pressed && s.pressed]} accessibilityRole="button" accessibilityState={{ selected }}>
      <Text style={[s.playerIcon, { color }]}>{icon}</Text>
      <Text numberOfLines={1} style={s.playerText}>{label}</Text>
      <View style={s.playerMark}><Mark selected={selected} small /></View>
    </Pressable>
  );
}

function Difficulty({ stars, title, subtitle, color, selected, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [s.difficulty, selected && s.selected, pressed && s.pressed]} accessibilityRole="button" accessibilityState={{ selected }}>
      <View style={s.diffTop}><Text style={[s.stars, { color }]}>{stars}</Text><Mark selected={selected} small /></View>
      <Text style={s.diffTitle}>{title}</Text><Text style={s.diffSubtitle}>{subtitle}</Text>
    </Pressable>
  );
}

export default function TreasureSetupScreen({ onBack, onContinue }) {
  const [name, setName] = useState("");
  const [variant, setVariant] = useState("fog");
  const [players, setPlayers] = useState("solo");
  const [difficulty, setDifficulty] = useState("medium");

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={s.safe}>
      <KeyboardAvoidingView style={s.safe} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={s.frame}>
            <TreasureSetupHeader onBack={onBack} onHelp={() => {}} />
            <View style={s.panel}>
              <Text style={s.label}>Navn på skattejakten</Text>
              <TextInput value={name} onChangeText={setName} placeholder="F.eks. Byjakten" placeholderTextColor="#8E9AAF" style={s.input} accessibilityLabel="Navn på skattejakten" />
              <Text style={s.helper}>Dette navnet vises for spillerne</Text>
              <Text style={s.sectionTitle}>Velg spillvariant</Text>
              <Variant title="Tåkekart" description={"Kartet åpnes gradvis\nmens du beveger deg."} selected={variant === "fog"} onPress={() => setVariant("fog")} />
              <Variant title="Sonar" description={"Bruk signaler for å\nfinne skattene."} selected={variant === "sonar"} onPress={() => setVariant("sonar")} sonar />
              <Text style={s.subhead}>Hvem spiller?</Text>
              <View style={s.row}>
                <Player label="Alene" icon="●" color={C.orange} selected={players === "solo"} onPress={() => setPlayers("solo")} />
                <Player label="Med venner" icon="●●" color={C.blue} selected={players === "friends"} onPress={() => setPlayers("friends")} />
              </View>
              <Text style={s.subhead}>Vanskelighetsgrad</Text>
              <View style={s.row}>
                <Difficulty stars="★" title="Enkel" subtitle="4 skatter" color={C.green} selected={difficulty === "easy"} onPress={() => setDifficulty("easy")} />
                <Difficulty stars="★★" title="Medium" subtitle="8 skatter" color={C.orange} selected={difficulty === "medium"} onPress={() => setDifficulty("medium")} />
                <Difficulty stars="★★★" title="Vanskelig" subtitle="12 skatter" color={C.purple} selected={difficulty === "hard"} onPress={() => setDifficulty("hard")} />
              </View>
              <Pressable onPress={() => onContinue?.({ name, variant, players, difficulty })} style={({ pressed }) => [s.button, pressed && s.buttonPressed]} accessibilityRole="button" accessibilityLabel="Gå videre">
                <Text style={s.buttonText}>Gå videre</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  scroll: { flexGrow: 1, alignItems: "center", backgroundColor: C.bg },
  frame: { width: "100%", maxWidth: 540, minHeight: "100%", backgroundColor: C.bg },
  panel: { marginHorizontal: 4, paddingHorizontal: 30, paddingTop: 18, paddingBottom: 46, borderWidth: 1, borderColor: "rgba(65,83,111,0.48)", borderRadius: 10, backgroundColor: C.panel },
  label: { color: C.text, fontSize: 22, lineHeight: 28, fontWeight: "700", marginBottom: 9 },
  input: { height: 53, borderRadius: 10, borderWidth: 1, borderColor: "#44536B", backgroundColor: "rgba(7,16,31,0.84)", color: C.text, fontSize: 18, paddingHorizontal: 18 },
  helper: { color: C.muted, fontSize: 16, lineHeight: 22, marginTop: 11, marginBottom: 18 },
  sectionTitle: { color: C.orange, fontSize: 23, lineHeight: 29, fontWeight: "700", marginBottom: 10 },
  variant: { minHeight: 118, borderRadius: 12, borderWidth: 1, borderColor: C.border, backgroundColor: "rgba(5,15,29,0.92)", marginBottom: 12, paddingHorizontal: 13, paddingVertical: 10, flexDirection: "row", alignItems: "center", position: "relative" },
  selected: { borderColor: C.orange, borderWidth: 1.7 },
  pressed: { opacity: 0.78 },
  visual: { width: 108, alignItems: "center", justifyContent: "center", marginRight: 12 },
  graphic: { width: 88, height: 88, borderRadius: 44, alignItems: "center", justifyContent: "center", overflow: "hidden" },
  fogGraphic: { backgroundColor: "#303846", borderWidth: 1, borderColor: "rgba(205,214,226,0.32)", shadowColor: "#AEB7C8", shadowOpacity: 0.32, shadowRadius: 13 },
  sonarGraphic: { backgroundColor: "rgba(61,30,117,0.28)", borderWidth: 2, borderColor: C.purple },
  graphicRing: { position: "absolute", borderWidth: 1, borderRadius: 50, borderColor: "rgba(224,231,239,0.3)" },
  graphicRingOuter: { width: 72, height: 72 },
  graphicRingMiddle: { width: 50, height: 50 },
  graphicRingInner: { width: 28, height: 28 },
  graphicRingPurple: { borderColor: "rgba(139,77,255,0.72)" },
  graphicLineHorizontal: { position: "absolute", width: 62, height: 1, backgroundColor: "rgba(224,231,239,0.24)" },
  graphicLineVertical: { position: "absolute", width: 1, height: 62, backgroundColor: "rgba(224,231,239,0.24)" },
  sonarBeam: { height: 2, backgroundColor: C.purple, transform: [{ rotate: "-45deg" }, { translateX: 13 }] },
  graphicDot: { width: 15, height: 15, borderRadius: 8, backgroundColor: C.orange, borderWidth: 2, borderColor: "#FFFFFF", zIndex: 2 },
  sonarDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: C.purple, borderWidth: 0 },
  fogHalo: { position: "absolute", width: 60, height: 60, borderRadius: 30, backgroundColor: "rgba(168,178,190,0.10)" },
  variantCopy: { flex: 1, minWidth: 0, paddingRight: 34 },
  variantTitle: { color: C.text, fontSize: 21, lineHeight: 25, fontWeight: "700", marginBottom: 4 },
  variantDescription: { color: C.muted, fontSize: 15, lineHeight: 21 },
  variantMark: { position: "absolute", top: 12, right: 12 },
  mark: { width: 30, height: 30, borderRadius: 15, borderWidth: 1.5, borderColor: "#6E819F", alignItems: "center", justifyContent: "center", alignSelf: "flex-start" },
  markSmall: { width: 25, height: 25, borderRadius: 13 },
  markOn: { backgroundColor: C.orange, borderColor: C.orange },
  check: { color: "#111315", fontSize: 18, fontWeight: "900" },
  subhead: { color: C.text, fontSize: 21, lineHeight: 27, fontWeight: "700", marginTop: 5, marginBottom: 9 },
  row: { flexDirection: "row", gap: 12, marginBottom: 10 },
  player: { flex: 1, minHeight: 54, borderRadius: 10, borderWidth: 1, borderColor: C.border, backgroundColor: C.card, paddingLeft: 12, paddingRight: 36, flexDirection: "row", alignItems: "center", position: "relative" },
  playerIcon: { fontSize: 16, marginRight: 7 },
  playerText: { flex: 1, minWidth: 0, color: C.text, fontSize: 15, lineHeight: 19 },
  playerMark: { position: "absolute", top: 8, right: 8 },
  difficulty: { flex: 1, minHeight: 92, borderRadius: 10, borderWidth: 1, borderColor: C.border, backgroundColor: C.card, paddingHorizontal: 13, paddingVertical: 11 },
  diffTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", minHeight: 25 },
  stars: { fontSize: 22, letterSpacing: 1 },
  diffTitle: { color: C.text, fontSize: 16, marginTop: 3 },
  diffSubtitle: { color: C.muted, fontSize: 14, marginTop: 3 },
  button: { minHeight: 55, borderRadius: 10, backgroundColor: C.orange, alignItems: "center", justifyContent: "center", marginTop: 16, elevation: 6 },
  buttonPressed: { opacity: 0.82 },
  buttonText: { color: "#111315", fontSize: 23, fontWeight: "800" }
});