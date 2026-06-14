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

function BackArrowIcon({ width, height, strokeWidth }) {
  const armLength = Math.round(width * 0.42);
  const armOffset = Math.round(height * 0.24);

  return (
    <View style={{ width, height }} pointerEvents="none">
      <View
        style={[
          styles.backArrowShaft,
          {
            left: Math.round(width * 0.12),
            top: Math.round((height - strokeWidth) / 2),
            width: Math.round(width * 0.72),
            height: strokeWidth,
            borderRadius: strokeWidth / 2
          }
        ]}
      />
      <View
        style={[
          styles.backArrowArm,
          {
            left: Math.round(width * 0.1),
            top: Math.round(height / 2) - armOffset,
            width: armLength,
            height: strokeWidth,
            borderRadius: strokeWidth / 2,
            transform: [{ rotate: "-45deg" }]
          }
        ]}
      />
      <View
        style={[
          styles.backArrowArm,
          {
            left: Math.round(width * 0.1),
            top: Math.round(height / 2) + armOffset - strokeWidth,
            width: armLength,
            height: strokeWidth,
            borderRadius: strokeWidth / 2,
            transform: [{ rotate: "45deg" }]
          }
        ]}
      />
    </View>
  );
}

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
      tilbakeIkonBredde: Math.max(25, u(52)),
      tilbakeIkonHoyde: Math.max(19, u(38)),
      tilbakeIkonStrek: Math.max(3, u(5)),
      ikon: Math.max(23, u(48)),
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
        <View pointerEvents="none" style={styles.tilbakeKnappTopplys} />
        <BackArrowIcon
          width={maal.tilbakeIkonBredde}
          height={maal.tilbakeIkonHoyde}
          strokeWidth={maal.tilbakeIkonStrek}
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
        <Text
          allowFontScaling
          style={[
            styles.hjelpIkon,
            { fontSize: maal.ikon - 1, lineHeight: maal.ikon + 1 }
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
  tilbakeKnapp: {
    position: "absolute",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(4, 19, 40, 0.92)",
    borderWidth: 2,
    borderColor: "rgba(98, 95, 93, 0.96)",
    shadowColor: "#000000",
    shadowOpacity: 0.32,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4
  },
  tilbakeKnappTopplys: {
    position: "absolute",
    top: "-62%",
    left: "-18%",
    width: "136%",
    height: "112%",
    borderRadius: 999,
    backgroundColor: "rgba(16, 36, 62, 0.72)"
  },
  backArrowShaft: {
    position: "absolute",
    backgroundColor: "#F59E0B"
  },
  backArrowArm: {
    position: "absolute",
    backgroundColor: "#F59E0B"
  },
  hjelpKnapp: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(15, 23, 42, 0.72)",
    borderWidth: 1.25,
    borderColor: "rgba(245, 158, 11, 0.70)",
    shadowColor: "#000000",
    shadowOpacity: 0.18,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2
  },
  hjelpIkon: {
    color: theme.colors.treasure,
    fontWeight: "700",
    textAlign: "center"
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