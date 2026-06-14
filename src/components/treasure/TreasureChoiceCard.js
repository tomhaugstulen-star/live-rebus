import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../utils/designTokens";

function ValgIkon({ type, valgt }) {
  const farge = valgt ? "#101827" : "#9FB1CC";

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
        <Text style={[styles.stjerner, { color: stjernefarge || theme.colors.treasure }]}>
          {"★".repeat(stjerner)}
        </Text>
      ) : (
        <View style={styles.ikonRamme}>
          <ValgIkon type={ikon} valgt={valgt} />
        </View>
      )}

      <View style={!kompakt ? styles.tekstKolonne : undefined}>
        <Text style={[styles.tittel, kompakt && styles.kompaktTittel, valgt && styles.valgtMorkTekst]}>
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
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(194, 156, 112, 0.36)",
    backgroundColor: "rgba(11, 27, 48, 0.90)",
    overflow: "hidden"
  },
  bredtKort: {
    minHeight: 90,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center"
  },
  kompaktKort: {
    minHeight: 92,
    paddingHorizontal: 8,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  valgtKort: {
    backgroundColor: theme.colors.primary,
    borderColor: "#FF9A43",
    shadowColor: theme.colors.primary,
    shadowOpacity: 0.32,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4
  },
  hake: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#0B1B30",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2
  },
  hakeTekst: {
    color: "#FF8B24",
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "900"
  },
  ikonRamme: {
    width: 52,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12
  },
  tekstKolonne: {
    flex: 1,
    paddingRight: 22
  },
  stjerner: {
    fontSize: 19,
    lineHeight: 23,
    letterSpacing: 2,
    marginBottom: 7
  },
  tittel: {
    color: theme.colors.text,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "800",
    textAlign: "center"
  },
  kompaktTittel: {
    fontSize: 15,
    lineHeight: 20
  },
  undertittel: {
    color: theme.colors.textMuted,
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "600",
    marginTop: 3,
    textAlign: "center"
  },
  valgtMorkTekst: { color: "#101827" },
  personIkon: { width: 36, height: 42, alignItems: "center", justifyContent: "flex-end" },
  personHode: { width: 14, height: 14, borderRadius: 7, marginBottom: 3 },
  personKropp: { width: 30, height: 18, borderTopLeftRadius: 15, borderTopRightRadius: 15 },
  gruppeIkon: { width: 44, height: 40, position: "relative" },
  gruppeHode: { position: "absolute", top: 2, width: 14, height: 14, borderRadius: 7, borderWidth: 2 },
  gruppeVenstre: { left: 6 },
  gruppeHoyre: { right: 6 },
  gruppeKropp: { position: "absolute", left: 4, right: 4, bottom: 2, height: 18, borderWidth: 2, borderRadius: 10 },
  kartIkon: { width: 44, height: 36, flexDirection: "row", alignItems: "stretch" },
  kartPanel: { width: 15, borderWidth: 2, backgroundColor: "transparent" },
  kartVenstre: { transform: [{ skewY: "-12deg" }] },
  kartMidt: { marginLeft: -1, transform: [{ skewY: "12deg" }] },
  kartHoyre: { marginLeft: -1, transform: [{ skewY: "-12deg" }] },
  sonarYtre: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, alignItems: "center", justifyContent: "center" },
  sonarIndre: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, alignItems: "center", justifyContent: "center" },
  sonarPunkt: { width: 6, height: 6, borderRadius: 3 }
});
