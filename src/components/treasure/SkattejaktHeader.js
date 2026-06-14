import React, { useMemo } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View
} from "react-native";
import { theme } from "../../utils/designTokens";

const REFERANSE_BREDDE = 876;
const HERO_UTEN_STATUSLINJE = 175;

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
      radius: Math.max(10, u(18)),
      topp: Math.max(12, u(32)),
      ikon: Math.max(24, u(52)),
      tittel: Math.max(20, u(46)),
      linje: Math.max(24, u(49))
    };
  }, [width]);

  const knappstil = {
    width: maal.knappBredde,
    height: maal.knappHoyde,
    borderRadius: maal.radius,
    top: maal.topp
  };

  return (
    <View style={[styles.header, { height: maal.hoyde }]}>
      <TouchableOpacity
        onPress={onBack}
        activeOpacity={0.82}
        style={[styles.navKnapp, knappstil, { left: maal.sidemarg }]}
        accessibilityRole="button"
        accessibilityLabel="Gå tilbake"
      >
        <Text
          allowFontScaling
          style={[
            styles.tilbakeIkon,
            { fontSize: maal.ikon, lineHeight: maal.ikon + 2 }
          ]}
        >
          ←
        </Text>
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
        style={[styles.navKnapp, knappstil, { right: maal.sidemarg }]}
        accessibilityRole="button"
        accessibilityLabel="Åpne hjelp for skattejaktoppsett"
      >
        <Text
          allowFontScaling
          style={[
            styles.hjelpIkon,
            { fontSize: maal.ikon - 2, lineHeight: maal.ikon }
          ]}
        >
          ?
        </Text>
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
  navKnapp: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(4, 19, 40, 0.90)",
    borderWidth: 1,
    borderColor: "rgba(98, 95, 93, 0.88)",
    shadowColor: "#000000",
    shadowOpacity: 0.24,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3
  },
  tilbakeIkon: {
    color: theme.colors.treasure,
    fontWeight: "500",
    textAlign: "center",
    transform: [{ translateX: -1 }]
  },
  hjelpIkon: {
    color: theme.colors.treasure,
    fontWeight: "700",
    textAlign: "center"
  },
  tittel: {
    maxWidth: "58%",
    textAlign: "center",
    fontWeight: "700",
    letterSpacing: -0.4,
    textShadowColor: "rgba(0, 0, 0, 0.58)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2
  },
  tittelAksent: {
    color: theme.colors.treasure
  },
  tittelLys: {
    color: theme.colors.text
  }
});
