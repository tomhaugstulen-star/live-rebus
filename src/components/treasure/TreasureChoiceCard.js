import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../utils/designTokens";

function ValgIkon({ type, valgt }) {
  const farge = valgt ? theme.colors.background : theme.colors.textMuted;

  if (type === "person") {
    return (
      <View style={styles.personIkon}>
        <View style={[styles.personHode, { backgroundColor: farge }]} />
        <View style={[styles.personKropp, { backgroundColor: farge }]} />
      </View>
    );
  }

  if (type === "gruppe") {
    return (
      <View style={styles.gruppeIkon}>
        <View style={[styles.gruppeHode, styles.gruppeVenstre, { borderColor: farge }]} />
        <View style={[styles.gruppeHode, styles.gruppeHoyre, { borderColor: farge }]} />
        <View style={[styles.gruppeKropp, { borderColor: farge }]} />
      </View>
    );
  }

  if (type === "kart") {
    return (
      <View style={styles.kartIkon}>
        <View style={[styles.kartPanel, styles.kartVenstre, { borderColor: farge }]} />
        <View style={[styles.kartPanel, styles.kartMidt, { borderColor: farge }]} />
        <View style={[styles.kartPanel, styles.kartHoyre, { borderColor: farge }]} />
      </View>
    );
  }

  return (
    <View style={[styles.sonarYtre, { borderColor: farge }]}>
      <View style={[styles.sonarIndre, { borderColor: farge }]}>
        <View style={[styles.sonarPunkt, { backgroundColor: farge }]} />
      </View>
    </View>
  );
}

export default function TreasureChoiceCard({
  valgt,
  tittel,
  undertittel,
  ikon,
  stjerner,
  stjernefarge,
  vedTrykk,
  kompakt = false
}) {
  const tilgjengelighetstekst = [tittel, undertittel, valgt ? "valgt" : "ikke valgt"]
    .filter(Boolean)
    .join(", ");

  return (
    <TouchableOpacity
      onPress={vedTrykk}
      activeOpacity={0.86}
      style={[
        styles.kort,
        !kompakt && styles.bredtKort,
        kompakt && styles.kompaktKort,
        valgt && styles.valgtKort
      ]}
      accessibilityRole="radio"
      accessibilityState={{ selected: valgt }}
      accessibilityLabel={tilgjengelighetstekst}
    >
      {valgt ? (
        <View style={styles.hake}>
          <Text style={styles.hakeTekst}>✓</Text>
        </View>
      ) : null}

      {typeof stjerner === "number" ? (
        <Text
          style={[
            styles.stjerner,
            stjerner === 1 && styles.enkelStjerne,
            stjerner === 3 && styles.treStjerner,
            valgt && kompakt && styles.valgteStjerner,
            { color: stjernefarge || theme.colors.treasure }
          ]}
        >
          {"★".repeat(stjerner)}
        </Text>
      ) : (
        <View style={styles.ikonRamme}>
          <ValgIkon type={ikon} valgt={valgt} />
        </View>
      )}

      <View style={!kompakt ? styles.tekstKolonne : undefined}>
        <Text
          numberOfLines={kompakt ? 1 : 2}
          adjustsFontSizeToFit
          minimumFontScale={0.86}
          style={[
            styles.tittel,
            !kompakt && styles.bredTittel,
            kompakt && styles.kompaktTittel,
            valgt && styles.valgtMorkTekst
          ]}
        >
          {tittel}
        </Text>
        {undertittel ? (
          <Text style={[styles.undertittel, valgt && styles.valgtMorkTekst]}>{undertittel}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  kort: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.28)",
    backgroundColor: "rgba(30, 41, 59, 0.92)",
    overflow: "hidden"
  },
  bredtKort: {
    minHeight: 78,
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center"
  },
  kompaktKort: {
    minHeight: 82,
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center"
  },
  valgtKort: {
    backgroundColor: "#FF7A1A",
    borderColor: "#FF9A55",
    shadowColor: "#FF7A1A",
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4
  },
  hake: {
    position: "absolute",
    top: 7,
    right: 7,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2
  },
  hakeTekst: {
    color: theme.colors.treasure,
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "900"
  },
  ikonRamme: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    flexShrink: 0
  },
  tekstKolonne: {
    flex: 1,
    minWidth: 0,
    paddingRight: 8
  },
  stjerner: {
    marginBottom: 5,
    textAlign: "center"
  },
  enkelStjerne: {
    fontSize: 21,
    lineHeight: 24
  },
  treStjerner: {
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: 1.5
  },
  valgteStjerner: {
    fontSize: 17,
    lineHeight: 21,
    letterSpacing: 1,
    paddingRight: 24,
    transform: [{ translateX: -3 }]
  },
  tittel: {
    color: theme.colors.text,
    fontSize: 15,
    lineHeight: 19,
    fontWeight: "800",
    textAlign: "center"
  },
  bredTittel: { textAlign: "left" },
  kompaktTittel: { fontSize: 15, lineHeight: 20 },
  undertittel: {
    color: theme.colors.textMuted,
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "600",
    marginTop: 2,
    textAlign: "center"
  },
  valgtMorkTekst: { color: theme.colors.background },
  personIkon: { width: 32, height: 38, alignItems: "center", justifyContent: "flex-end" },
  personHode: { width: 13, height: 13, borderRadius: 7, marginBottom: 3 },
  personKropp: { width: 27, height: 17, borderTopLeftRadius: 14, borderTopRightRadius: 14 },
  gruppeIkon: { width: 38, height: 36, position: "relative" },
  gruppeHode: { position: "absolute", top: 2, width: 13, height: 13, borderRadius: 7, borderWidth: 2 },
  gruppeVenstre: { left: 4 },
  gruppeHoyre: { right: 4 },
  gruppeKropp: { position: "absolute", left: 3, right: 3, bottom: 2, height: 16, borderWidth: 2, borderRadius: 9 },
  kartIkon: { width: 38, height: 32, flexDirection: "row", alignItems: "stretch" },
  kartPanel: { width: 13, borderWidth: 2, backgroundColor: "transparent" },
  kartVenstre: { transform: [{ skewY: "-12deg" }] },
  kartMidt: { marginLeft: -1, transform: [{ skewY: "12deg" }] },
  kartHoyre: { marginLeft: -1, transform: [{ skewY: "-12deg" }] },
  sonarYtre: { width: 36, height: 36, borderRadius: 18, borderWidth: 2, alignItems: "center", justifyContent: "center" },
  sonarIndre: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, alignItems: "center", justifyContent: "center" },
  sonarPunkt: { width: 6, height: 6, borderRadius: 3 }
});