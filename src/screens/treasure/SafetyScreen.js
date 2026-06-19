import React, { useCallback, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { confirmTreasureSafety, resetTreasureSafety } from "../../utils/treasureSafetyStore";
import { s } from "./SafetyScreen.styles";

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

  useFocusEffect(useCallback(() => {
    setConfirmed(false);
    resetTreasureSafety();
  }, []));

  function continueSafely() {
    if (!confirmed) return;
    confirmTreasureSafety();
    onContinue?.();
  }

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
          <View style={s.hero}><Shield /></View>

          <Text style={s.intro}>Skattejakten skjer ute i virkelige{`\n`}omgivelser.</Text>

          <Text style={s.warning}>
            Ikke gå inn på privat eiendom, farlige{`\n`}områder, vann, jernbane eller{`\n`}trafikkert vei.{`\n`}Barn bør være sammen med en voksen.
          </Text>

          <View style={s.info}>
            <View style={s.infoIcon}><Text style={s.infoIconText}>i</Text></View>
            <Text style={s.infoText}>Du er selv ansvarlig for å vurdere{`\n`}sikkerhet og tilgjengelighet i{`\n`}området.</Text>
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

          <View style={s.playHint}>
            <Text style={s.playHintIcon}>!</Text>
            <Text style={s.playHintText}>Når dere er på riktig sted, kan jakten på skattene begynne!</Text>
          </View>

          <Pressable
            onPress={continueSafely}
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
            <Text style={[s.primaryText, !confirmed && s.disabledText]}>Neste</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
