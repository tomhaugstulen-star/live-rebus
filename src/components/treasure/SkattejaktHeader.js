import React, { useMemo } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View
} from "react-native";
import { theme } from "../../utils/designTokens";

const REFERANSE_BREDDE = 876;
const HERO_UTEN_STATUSLINJE = 175;
const TILBAKE_IKON = require("../../../assets/images/treasure/icons/back-arrow.png");
const HJELP_IKON = require("../../../assets/images/treasure/icons/help-icon.png");

export default function SkattejaktHeader({ onBack, onHelp }) {
  const { width } = useWindowDimensions();

  const maal = useMemo(() => {
    const skala = Math.min(width, REFERANSE_BREDDE) / REFERANSE_BREDDE;
    const u = (verdi) => Math.round(verdi * skala);

    return {
      hoyde: Math.max(78, u(HERO_UTEN_STATUSLINJE)),
      sidemarg: Math.max(14, u(31)),
      knappBredde: Math.max(46, u(103)),
      knappHoyde: Math.max(46, u(104)),
      tilbakeRadius: Math.max(8, u(18)),
      hjelpRadius: Math.max(13, u(28)),
      topp: Math.max(12, u(32)),
      tilbakeIkon: Math.max(29, u(62)),
      hjelpIkon: Math.max(31, u(64)),
      tittel: Math.max(20, u(46)),
      linje: Math.max(24, u(49))
    };
  }, [width]);

  const fellesKnappmaal = {
    width: maal.knappBredde,
    height: maal.knappHoyde,
    top: maal.topp
  };

  return (
    <View style={[styles.header, { height: maal.hoyde }]}>
      <TouchableOpacity
        onPress={onBack}
        activeOpacity={0.82}
        style={[
          styles.tilbakeKnapp,
          fellesKnappmaal,
          {
            left: maal.sidemarg,
            borderRadius: maal.tilbakeRadius
          }
        ]}
        accessibilityRole="button"
        accessibilityLabel="Gå tilbake"
      >
        <Image
          source={TILBAKE_IKON}
          resizeMode="contain"
          style={{ width: maal.tilbakeIkon, height: maal.tilbakeIkon }}
        />
      </TouchableOpacity>

      <Text
        allowFontScaling
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.82}
        style={[
          styles.tittel,
          { fontSize: maal.tittel, lineHeight: maal.linje }
        ]}
      >
        <Text style={styles.tittelAksent}>Skattejakt</Text>
        <Text style={styles.tittelLys}> – oppsett</Text>
      </Text>

      <TouchableOpacity
        onPress={onHelp}
        activeOpacity={0.82}
        style={[
          styles.hjelpKnapp,
          fellesKnappmaal,
          {
            right: maal.sidemarg,
            borderRadius: maal.hjelpRadius
          }
        ]}
        accessibilityRole="button"
        accessibilityLabel="Åpne hjelp for skattejaktoppsett"
      >
        <Image
          source={HJELP_IKON}
          resizeMode="contain"
          style={{ width: maal.hjelpIkon, height: maal.hjelpIkon }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "relative",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  tilbakeKnapp: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(4, 19, 40, 0.92)",
    borderWidth: 1.25,
    borderColor: "rgba(153, 139, 116, 0.82)",
    shadowColor: "#000000",
    shadowOpacity: 0.32,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4
  },
  hjelpKnapp: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(4, 19, 40, 0.92)",
    borderWidth: 1.25,
    borderColor: "rgba(153, 139, 116, 0.82)",
    shadowColor: "#000000",
    shadowOpacity: 0.24,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3
  },
  tittel: {
    maxWidth: "60%",
    textAlign: "center",
    fontWeight: "700",
    letterSpacing: -0.2,
    textShadowColor: "rgba(0, 0, 0, 0.44)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1
  },
  tittelAksent: {
    color: theme.colors.treasure
  },
  tittelLys: {
    color: theme.colors.text
  }
});