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
  bakgrunnsbilde: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%"
  },
  bakgrunnsdemping: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(3, 13, 26, 0.68)"
  },
  toppfelt: {
    minHeight: 58,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  ikonKnapp: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(9, 22, 39, 0.86)",
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.22)"
  },
  toppIkon: {
    color: theme.colors.text,
    fontSize: 34,
    lineHeight: 36,
    marginTop: -3,
    fontWeight: "700"
  },
  hjelpIkon: {
    color: theme.colors.text,
    fontSize: 23,
    lineHeight: 26,
    fontWeight: "900"
  },
  skjermTittel: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 19,
    lineHeight: 24,
    fontWeight: "900",
    textAlign: "center",
    paddingHorizontal: 8
  },
  innhold: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 104
  },
  del: {
    padding: 14,
    marginBottom: 11,
    borderRadius: 17,
    backgroundColor: "rgba(10, 27, 45, 0.88)",
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.22)"
  },
  delTopp: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 11
  },
  delIkon: {
    width: 27,
    marginRight: 9,
    color: theme.colors.treasure,
    fontSize: 20,
    lineHeight: 24,
    textAlign: "center"
  },
  delTittel: {
    color: theme.colors.text,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "900"
  },
  tekstfeltRamme: {
    minHeight: 50,
    borderRadius: 13,
    backgroundColor: "rgba(2, 12, 24, 0.86)",
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.24)",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 14,
    paddingRight: 12
  },
  tekstfelt: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 15,
    paddingVertical: 12
  },
  blyant: {
    color: theme.colors.textMuted,
    fontSize: 21,
    lineHeight: 24,
    marginLeft: 8
  },
  toKolonner: { flexDirection: "row" },
  valgBredde: { flex: 1 },
  mellomromVenstre: { marginLeft: 9 },
  treKolonner: { flexDirection: "row" },
  vanskelighetsBredde: { flex: 1 },
  mellomromLite: { marginLeft: 7 },
  bunnfelt: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 9,
    paddingBottom: 10,
    backgroundColor: "rgba(3, 13, 26, 0.94)",
    borderTopWidth: 1,
    borderTopColor: "rgba(148, 163, 184, 0.16)"
  },
  hovedknapp: {
    minHeight: 54,
    borderRadius: 17,
    paddingHorizontal: 18,
    backgroundColor: theme.colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: theme.colors.primary,
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4
  },
  knappIkon: {
    width: 32,
    color: theme.colors.white,
    fontSize: 21,
    lineHeight: 24
  },
  knappTekst: {
    flex: 1,
    color: theme.colors.white,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "900",
    textAlign: "center"
  },
  knappPil: {
    width: 32,
    color: theme.colors.white,
    fontSize: 31,
    lineHeight: 33,
    textAlign: "right"
  }
});
