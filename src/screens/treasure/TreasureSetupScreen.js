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
  TouchableOpacity,
  View
} from "react-native";
import SkattejaktHeader from "../../components/treasure/SkattejaktHeader";
import SkattejaktNamePanel from "../../components/treasure/SkattejaktNamePanel";
import SkattejaktParticipantPanel from "../../components/treasure/SkattejaktParticipantPanel";
import TreasureChoiceCard from "../../components/treasure/TreasureChoiceCard";
import { theme } from "../../utils/designTokens";
import {
  ANTALL_SKATTER,
  SPILLMODUSER,
  VANSKELIGHETSGRADER
} from "./treasureSetup.constants";

const skattejaktBakgrunn = require(
  "../../../assets/images/treasure/treasure-setup-background.png"
);
const spillmodusIkon = require(
  "../../../assets/images/treasure/icons/game-mode-icon.png"
);
const vanskelighetsIkon = require(
  "../../../assets/images/treasure/icons/difficulty-icon.png"
);

function OppsettDel({ ikon, ikonBilde, ikonBildeStil, tittel, children }) {
  return (
    <View style={styles.del}>
      <View style={styles.delTopp}>
        {ikonBilde ? (
          <Image
            source={ikonBilde}
            resizeMode="contain"
            style={[styles.delIkonBilde, ikonBildeStil]}
          />
        ) : (
          <Text style={styles.delIkon}>{ikon}</Text>
        )}
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
          <SkattejaktHeader onBack={onBack} onHelp={visHjelp} />

          <ScrollView
            contentContainerStyle={styles.innhold}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <SkattejaktNamePanel value={jaktNavn} onChangeText={setJaktNavn} />

            <View style={styles.panelGap}>
              <SkattejaktParticipantPanel
                value={deltakertype}
                onChange={setDeltakertype}
              />
            </View>

            <View style={styles.etterValgpanel}>
              <OppsettDel ikonBilde={spillmodusIkon} tittel="Spillmodus">
                <View style={styles.toKolonner} accessibilityRole="radiogroup">
                  {SPILLMODUSER.map((valg, indeks) => (
                    <View
                      key={valg.id}
                      style={[styles.valgBredde, indeks > 0 && styles.mellomromVenstre]}
                    >
                      <TreasureChoiceCard
                        {...valg}
                        valgt={spillmodus === valg.id}
                        vedTrykk={() => setSpillmodus(valg.id)}
                      />
                    </View>
                  ))}
                </View>
              </OppsettDel>

              <OppsettDel
                ikonBilde={vanskelighetsIkon}
                ikonBildeStil={styles.vanskelighetsIkon}
                tittel="Vanskelighetsgrad"
              >
                <View style={styles.treKolonner} accessibilityRole="radiogroup">
                  {VANSKELIGHETSGRADER.map((valg, indeks) => (
                    <View
                      key={valg.id}
                      style={[
                        styles.vanskelighetsBredde,
                        indeks > 0 && styles.mellomromLite
                      ]}
                    >
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
            </View>
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
  sikkertOmrade: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  fyll: {
    flex: 1
  },
  bakgrunn: {
    flex: 1,
    backgroundColor: theme.colors.background,
    overflow: "hidden"
  },
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
  innhold: {
    alignItems: "center",
    paddingTop: 1,
    paddingBottom: 102
  },
  panelGap: {
    marginTop: 13
  },
  etterValgpanel: {
    width: "100%",
    paddingHorizontal: 16,
    marginTop: 13
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
  delIkonBilde: {
    width: 38,
    height: 38,
    marginRight: 4,
    transform: [{ translateX: 4 }]
  },
  vanskelighetsIkon: {
    width: 34,
    height: 34,
    marginRight: 10,
    transform: [{ translateX: 0 }]
  },
  delTittel: {
    color: theme.colors.text,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "700"
  },
  toKolonner: {
    flexDirection: "row"
  },
  valgBredde: {
    flex: 1
  },
  mellomromVenstre: {
    marginLeft: 12
  },
  treKolonner: {
    flexDirection: "row"
  },
  vanskelighetsBredde: {
    flex: 1
  },
  mellomromLite: {
    marginLeft: 10
  },
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