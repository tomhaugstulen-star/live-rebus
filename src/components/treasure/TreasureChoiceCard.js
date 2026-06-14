import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../utils/designTokens";

export default function TreasureChoiceCard({
  valgt,
  tittel,
  undertittel,
  ikon,
  stjerner,
  vedTrykk,
  kompakt = false
}) {
  const tilgjengelighetstekst = [
    tittel,
    undertittel,
    valgt ? "valgt" : "ikke valgt"
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <TouchableOpacity
      onPress={vedTrykk}
      activeOpacity={0.86}
      style={[
        styles.kort,
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
        <Text style={[styles.stjerner, valgt && styles.valgtMorkTekst]}>
          {"★".repeat(stjerner)}
        </Text>
      ) : (
        <Text style={styles.ikon}>{ikon}</Text>
      )}

      <Text
        style={[
          styles.tittel,
          kompakt && styles.kompaktTittel,
          valgt && styles.valgtMorkTekst
        ]}
      >
        {tittel}
      </Text>

      {undertittel ? (
        <Text style={[styles.undertittel, valgt && styles.valgtMorkTekst]}>
          {undertittel}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  kort: {
    flex: 1,
    minHeight: 104,
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.24)",
    backgroundColor: "rgba(30, 41, 59, 0.92)",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
  kompaktKort: {
    minHeight: 98,
    paddingHorizontal: 8
  },
  valgtKort: {
    backgroundColor: theme.colors.primary,
    borderColor: "rgba(255, 255, 255, 0.7)"
  },
  hake: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: theme.colors.white,
    alignItems: "center",
    justifyContent: "center"
  },
  hakeTekst: {
    color: theme.colors.primary,
    fontSize: 14,
    lineHeight: 17,
    fontWeight: "900"
  },
  ikon: {
    fontSize: 30,
    marginBottom: 8
  },
  stjerner: {
    color: theme.colors.treasure,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: 1,
    marginBottom: 7
  },
  tittel: {
    color: theme.colors.text,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "900",
    textAlign: "center"
  },
  kompaktTittel: {
    fontSize: 14
  },
  undertittel: {
    color: theme.colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "700",
    marginTop: 3,
    textAlign: "center"
  },
  valgtMorkTekst: {
    color: "#241208"
  }
});
