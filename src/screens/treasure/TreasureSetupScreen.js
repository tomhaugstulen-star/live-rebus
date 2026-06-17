import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TreasureSetupHeader from "../../components/treasure/TreasureSetupHeader";

const C = { bg: "#020A14", panel: "rgba(3,13,27,0.86)", card: "#071426", border: "#33445C", text: "#F5F7FB", muted: "#AEB7C8", orange: "#FF6800", purple: "#8B4DFF", blue: "#7288AA", green: "#23C96B" };

function Mark({ selected, small }) {
  return <View style={[s.mark, small && s.markSmall, selected && s.markOn]}>{selected ? <Text style={s.check}>✓</Text> : null}</View>;
}

function Radar({ sonar }) {
  return (
    <View style={[s.radar, sonar && s.sonar]}>
      <View style={[s.ring, s.ring1, sonar && s.purple]} />
      <View style={[s.ring, s.ring2, sonar && s.purple]} />
      <View style={[s.ring, s.ring3, sonar && s.purple]} />
      <View style={[s.axisH, sonar && s.beam]} />
      {!sonar ? <View style={s.axisV} /> : null}
      <View style={[s.dot, sonar && s.dotPurple]} />
    </View>
  );
}

function Variant({ title, description, selected, onPress, sonar }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [s.variant, selected && s.selected, pressed && s.pressed]} accessibilityRole="button" accessibilityState={{ selected }}>
      <View style={s.visual}><Radar sonar={sonar} /></View>
      <View style={s.variantCopy}><Text style={s.variantTitle}>{title}</Text><Text style={s.variantDescription}>{description}</Text></View>
      <Mark selected={selected} />
    </Pressable>
  );
}

function Player({ label, icon, color, selected, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [s.player, selected && s.selected, pressed && s.pressed]} accessibilityRole="button" accessibilityState={{ selected }}>
      <Text style={[s.playerIcon, { color }]}>{icon}</Text><Text style={s.playerText}>{label}</Text><Mark selected={selected} small />
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
  variant: { minHeight: 145, borderRadius: 12, borderWidth: 1, borderColor: C.border, backgroundColor: "rgba(5,15,29,0.92)", marginBottom: 12, paddingHorizontal: 16, paddingVertical: 14, flexDirection: "row", alignItems: "center" },
  selected: { borderColor: C.orange, borderWidth: 1.7 },
  pressed: { opacity: 0.78 },
  visual: { width: 168, alignItems: "center" },
  variantCopy: { flex: 1 },
  variantTitle: { color: C.text, fontSize: 26, lineHeight: 32, fontWeight: "700", marginBottom: 8 },
  variantDescription: { color: C.muted, fontSize: 18, lineHeight: 27 },
  mark: { width: 30, height: 30, borderRadius: 15, borderWidth: 1.5, borderColor: "#6E819F", alignItems: "center", justifyContent: "center", alignSelf: "flex-start" },
  markSmall: { width: 25, height: 25, borderRadius: 13 },
  markOn: { backgroundColor: C.orange, borderColor: C.orange },
  check: { color: "#111315", fontSize: 18, fontWeight: "900" },
  radar: { width: 108, height: 108, borderRadius: 54, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(100,108,120,0.3)", borderWidth: 1, borderColor: "rgba(210,215,223,0.3)" },
  sonar: { backgroundColor: "rgba(69,40,128,0.16)", borderColor: C.purple, borderWidth: 2 },
  ring: { position: "absolute", borderWidth: 1, borderColor: "rgba(210,215,223,0.3)", borderRadius: 60 },
  ring1: { width: 88, height: 88 }, ring2: { width: 62, height: 62 }, ring3: { width: 36, height: 36 },
  purple: { borderColor: "rgba(139,77,255,0.68)" },
  axisH: { position: "absolute", width: 76, height: 1, backgroundColor: "rgba(210,215,223,0.25)" },
  axisV: { position: "absolute", width: 1, height: 76, backgroundColor: "rgba(210,215,223,0.25)" },
  beam: { height: 2, backgroundColor: C.purple, transform: [{ rotate: "-45deg" }, { translateX: 16 }] },
  dot: { width: 18, height: 18, borderRadius: 9, backgroundColor: C.orange, borderWidth: 2, borderColor: "#FFF" },
  dotPurple: { width: 12, height: 12, borderRadius: 6, backgroundColor: C.purple, borderWidth: 0 },
  subhead: { color: C.text, fontSize: 21, lineHeight: 27, fontWeight: "700", marginTop: 5, marginBottom: 9 },
  row: { flexDirection: "row", gap: 12, marginBottom: 10 },
  player: { flex: 1, minHeight: 61, borderRadius: 10, borderWidth: 1, borderColor: C.border, backgroundColor: C.card, paddingHorizontal: 14, flexDirection: "row", alignItems: "center" },
  playerIcon: { fontSize: 22, marginRight: 12 }, playerText: { flex: 1, color: C.text, fontSize: 18 },
  difficulty: { flex: 1, minHeight: 92, borderRadius: 10, borderWidth: 1, borderColor: C.border, backgroundColor: C.card, paddingHorizontal: 13, paddingVertical: 11 },
  diffTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", minHeight: 25 },
  stars: { fontSize: 22, letterSpacing: 1 }, diffTitle: { color: C.text, fontSize: 16, marginTop: 3 }, diffSubtitle: { color: C.muted, fontSize: 14, marginTop: 3 },
  button: { minHeight: 55, borderRadius: 10, backgroundColor: C.orange, alignItems: "center", justifyContent: "center", marginTop: 16, elevation: 6 },
  buttonPressed: { opacity: 0.82 }, buttonText: { color: "#111315", fontSize: 23, fontWeight: "800" }
});