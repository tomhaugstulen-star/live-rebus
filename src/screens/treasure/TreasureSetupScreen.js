import React, { useMemo, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import TreasureChoiceCard from "../../components/treasure/TreasureChoiceCard";
import { theme } from "../../utils/designTokens";
import {
  ANTALL_SKATTER,
  DELTAKERVALG,
  SPILLMODUSER,
  VANSKELIGHETSGRADER
} from "./treasureSetup.constants";

const skattejaktBakgrunn = require(
  "../../../assets/images/treasure/treasure-setup-background.png"
);

function OppsettDel({ ikon, tittel, children }) {
  return (
    <View style={styles.del}>
      <View style={styles.delTopp}>
        <Text style={styles.delIkon}>{ikon}</Text>
        <Text style={styles.delTittel}>{tittel}</Text>
      </View>
      {children}
    </View>
  );
}

export default function TreasureSetupScreen({ onBack, onContinue }) {
  const [jaktNavn, setJaktNavn] = useState("");
  const [deltakertype, setDeltakertype] = useState("alene");
  const [spillmodus, setSpillmodus] = useState("taakekart");
  const [vanskelighetsgrad, setVanskelighetsgrad] = useState("middels");

  const oppsett = useMemo(
    () => ({
      navn: jaktNavn.trim() || "Min skattejakt",
      deltakertype,
      spillmodus,
      vanskelighetsgrad,
      antallSkatter: ANTALL_SKATTER[vanskelighetsgrad]
    }),
    [jaktNavn, deltakertype, spillmodus, vanskelighetsgrad]
  );

  function visHjelp() {
    Alert.alert(
      "Om skattejaktoppsettet",
      "Velg hvordan du vil spille, hvilken spillmodus du ønsker, og hvor mange skatter jakten skal inneholde. Du kan endre valgene før jakten starter.",
      [{ text: "Lukk" }]
    );
  }

  function fortsett() {
    if (typeof onContinue === "function") onContinue(oppsett);
  }

  return (
    <SafeAreaView style={styles.sikkertOmrade}>
      <View style={styles.bakgrunn}>
        <Image
          source={skattejaktBakgrunn}
          style={styles.bakgrunnsbilde}
          resizeMode="cover"
          pointerEvents="none"
        />
        <View style={styles.bakgrunnsdemping} pointerEvents="none" />

        <KeyboardAvoidingView
          style={styles.fyll}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.toppfelt}>
            <TouchableOpacity
              onPress={onBack}
              style={[styles.ikonKnapp, styles.tilbakeKnapp]}
              accessibilityRole="button"
              accessibilityLabel="Gå tilbake"
            >
              <Text style={styles.toppIkon}>←</Text>
            </TouchableOpacity>

            <Text style={styles.skjermTittel}>
              <Text style={styles.tittelAksent}>Skattejakt</Text>
              <Text> – oppsett</Text>
            </Text>

            <TouchableOpacity
              onPress={visHjelp}
              style={styles.ikonKnapp}
              accessibilityRole="button"
              accessibilityLabel="Åpne hjelp for skattejaktoppsett"
            >
              <Text style={styles.hjelpIkon}>?</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={styles.innhold}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <OppsettDel ikon="▤" tittel="Navn på skattejakten">
              <View style={styles.tekstfeltRamme}>
                <TextInput
                  value={jaktNavn}
                  onChangeText={setJaktNavn}
                  placeholder="F.eks. Byjakten"
                  placeholderTextColor={theme.colors.textMuted}
                  style={styles.tekstfelt}
                  maxLength={40}
                  returnKeyType="done"
                  autoCapitalize="sentences"
                  accessibilityLabel="Navn på skattejakten"
                />
                <Text style={styles.blyant}>✎</Text>
              </View>
            </OppsettDel>

            <OppsettDel ikon="✥" tittel="Valg">
              <View style={styles.toKolonner} accessibilityRole="radiogroup">
                {DELTAKERVALG.map((valg, indeks) => (
                  <View key={valg.id} style={[styles.valgBredde, indeks > 0 && styles.mellomromVenstre]}>
                    <TreasureChoiceCard
                      {...valg}
                      valgt={deltakertype === valg.id}
                      vedTrykk={() => setDeltakertype(valg.id)}
                    />
                  </View>
                ))}
              </View>
            </OppsettDel>

            <OppsettDel ikon="⚔" tittel="Spillmodus">
              <View style={styles.toKolonner} accessibilityRole="radiogroup">
                {SPILLMODUSER.map((valg, indeks) => (
                  <View key={valg.id} style={[styles.valgBredde, indeks > 0 && styles.mellomromVenstre]}>
                    <TreasureChoiceCard
                      {...valg}
                      valgt={spillmodus === valg.id}
                      vedTrykk={() => setSpillmodus(valg.id)}
                    />
                  </View>
                ))}
              </View>
            </OppsettDel>

            <OppsettDel ikon="▥" tittel="Vanskelighetsgrad">
              <View style={styles.treKolonner} accessibilityRole="radiogroup">
                {VANSKELIGHETSGRADER.map((valg, indeks) => (
                  <View key={valg.id} style={[styles.vanskelighetsBredde, indeks > 0 && styles.mellomromLite]}>
                    <TreasureChoiceCard
                      {...valg}
                      kompakt
                      valgt={vanskelighetsgrad === valg.id}
                      vedTrykk={() => setVanskelighetsgrad(valg.id)}
                    />
                  </View>
                ))}
              </View>
            </OppsettDel>
          </ScrollView>

          <View style={styles.bunnfelt}>
            <TouchableOpacity
              onPress={fortsett}
              activeOpacity={0.88}
              style={styles.hovedknapp}
              accessibilityRole="button"
              accessibilityLabel="Gå videre til neste steg i skattejaktoppsettet"
            >
              <Text style={styles.knappIkon}>▤</Text>
              <Text style={styles.knappTekst}>Gå videre</Text>
              <Text style={styles.knappPil}>›</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sikkertOmrade: { flex: 1, backgroundColor: theme.colors.background },
  fyll: { flex: 1 },
  bakgrunn: { flex: 1, backgroundColor: theme.colors.background, overflow: "hidden" },
  bakgrunnsbilde: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "104%",
    top: -18
  },
  bakgrunnsdemping: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15, 23, 42, 0.44)"
  },
  toppfelt: {
    minHeight: 64,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  ikonKnapp: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(15, 23, 42, 0.92)",
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.55)"
  },
  tilbakeKnapp: {
    backgroundColor: "rgba(15, 23, 42, 0.58)",
    borderWidth: 1.2,
    borderColor: "rgba(245, 158, 11, 0.42)"
  },
  toppIkon: {
    color: theme.colors.treasure,
    fontSize: 25,
    lineHeight: 28,
    fontWeight: "500",
    transform: [{ translateX: -1 }]
  },
  hjelpIkon: {
    color: theme.colors.treasure,
    fontSize: 25,
    lineHeight: 28,
    fontWeight: "700"
  },
  skjermTittel: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 21,
    lineHeight: 26,
    fontWeight: "800",
    textAlign: "center",
    paddingHorizontal: 12
  },
  tittelAksent: { color: theme.colors.treasure },
  innhold: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 102
  },
  del: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 18,
    backgroundColor: "rgba(30, 41, 59, 0.78)",
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.24)"
  },
  delTopp: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12
  },
  delIkon: {
    width: 32,
    marginRight: 10,
    color: theme.colors.treasure,
    fontSize: 23,
    lineHeight: 26,
    textAlign: "center",
    fontWeight: "700"
  },
  delTittel: {
    color: theme.colors.text,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "700"
  },
  tekstfeltRamme: {
    minHeight: 54,
    borderRadius: 14,
    backgroundColor: "rgba(15, 23, 42, 0.90)",
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.30)",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 14
  },
  tekstfelt: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 16,
    lineHeight: 22,
    paddingVertical: 13
  },
  blyant: {
    color: theme.colors.textMuted,
    fontSize: 23,
    lineHeight: 26,
    marginLeft: 8
  },
  toKolonner: { flexDirection: "row" },
  valgBredde: { flex: 1 },
  mellomromVenstre: { marginLeft: 12 },
  treKolonner: { flexDirection: "row" },
  vanskelighetsBredde: { flex: 1 },
  mellomromLite: { marginLeft: 10 },
  bunnfelt: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 7,
    paddingBottom: 10,
    backgroundColor: "rgba(15, 23, 42, 0.94)",
    borderTopWidth: 1,
    borderTopColor: "rgba(148, 163, 184, 0.18)"
  },
  hovedknapp: {
    minHeight: 56,
    borderRadius: 14,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.primary,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.36)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: theme.colors.primary,
    shadowOpacity: 0.28,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5
  },
  knappIkon: {
    width: 34,
    color: theme.colors.background,
    fontSize: 23,
    lineHeight: 26,
    fontWeight: "800"
  },
  knappTekst: {
    flex: 1,
    color: theme.colors.background,
    fontSize: 18,
    lineHeight: 23,
    fontWeight: "800",
    textAlign: "center"
  },
  knappPil: {
    width: 34,
    color: theme.colors.background,
    fontSize: 32,
    lineHeight: 34,
    textAlign: "right"
  }
});
