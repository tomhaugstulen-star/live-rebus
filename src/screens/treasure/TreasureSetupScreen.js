import React, { useMemo, useState } from "react";
import {
  Alert,
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
        <View style={styles.bakgrunnLysEn} />
        <View style={styles.bakgrunnLysTo} />

        <KeyboardAvoidingView
          style={styles.fyll}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.toppfelt}>
            <TouchableOpacity
              onPress={onBack}
              style={styles.ikonKnapp}
              accessibilityRole="button"
              accessibilityLabel="Gå tilbake"
            >
              <Text style={styles.toppIkon}>‹</Text>
            </TouchableOpacity>

            <Text style={styles.skjermTittel}>Skattejakt – oppsett</Text>

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
            <OppsettDel ikon="🧰" tittel="Navn på skattejakten">
              <View style={styles.tekstfeltRamme}>
                <TextInput
                  value={jaktNavn}
                  onChangeText={setJaktNavn}
                  placeholder="For eksempel Byjakten"
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

            <OppsettDel ikon="👥" tittel="Valg">
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

            <OppsettDel ikon="✦" tittel="Spillmodus">
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

            <OppsettDel ikon="✦" tittel="Vanskelighetsgrad">
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
              <Text style={styles.knappIkon}>🧰</Text>
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
  bakgrunn: { flex: 1, backgroundColor: "#07131F", overflow: "hidden" },
  bakgrunnLysEn: {
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: "rgba(255,107,53,0.13)",
    left: -140,
    bottom: 90
  },
  bakgrunnLysTo: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "rgba(59,130,246,0.10)",
    right: -120,
    top: 110
  },
  toppfelt: {
    minHeight: 64,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  ikonKnapp: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(15,23,42,0.78)",
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  toppIkon: { color: theme.colors.text, fontSize: 38, lineHeight: 40, marginTop: -4 },
  hjelpIkon: {
    width: 26,
    height: 26,
    borderRadius: 13,
    textAlign: "center",
    color: theme.colors.text,
    fontSize: 18,
    lineHeight: 25,
    fontWeight: "900",
    borderWidth: 2,
    borderColor: theme.colors.text
  },
  skjermTittel: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 20,
    lineHeight: 25,
    fontWeight: "900",
    textAlign: "center",
    paddingHorizontal: 8
  },
  innhold: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 18 },
  del: {
    padding: 16,
    marginBottom: 14,
    borderRadius: 18,
    backgroundColor: "rgba(15, 30, 48, 0.90)",
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.20)"
  },
  delTopp: { flexDirection: "row", alignItems: "center", marginBottom: 14 },
  delIkon: { fontSize: 22, marginRight: 10 },
  delTittel: { color: theme.colors.text, fontSize: 16, lineHeight: 22, fontWeight: "900" },
  tekstfeltRamme: {
    minHeight: 54,
    borderRadius: 14,
    backgroundColor: "rgba(2, 12, 24, 0.84)",
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.24)",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 14
  },
  tekstfelt: { flex: 1, color: theme.colors.text, fontSize: 16, paddingVertical: 14 },
  blyant: { color: theme.colors.textMuted, fontSize: 23, marginLeft: 8 },
  toKolonner: { flexDirection: "row" },
  valgBredde: { flex: 1 },
  mellomromVenstre: { marginLeft: 10 },
  treKolonner: { flexDirection: "row" },
  vanskelighetsBredde: { flex: 1 },
  mellomromLite: { marginLeft: 8 },
  bunnfelt: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 12,
    backgroundColor: "rgba(4, 14, 28, 0.94)",
    borderTopWidth: 1,
    borderTopColor: "rgba(148, 163, 184, 0.16)"
  },
  hovedknapp: {
    minHeight: 58,
    borderRadius: 18,
    paddingHorizontal: 18,
    backgroundColor: theme.colors.primary,
    flexDirection: "row",
    alignItems: "center"
  },
  knappIkon: { fontSize: 22, width: 34 },
  knappTekst: {
    flex: 1,
    color: theme.colors.white,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "900",
    textAlign: "center"
  },
  knappPil: { color: theme.colors.white, fontSize: 34, lineHeight: 36, width: 34, textAlign: "right" }
});
