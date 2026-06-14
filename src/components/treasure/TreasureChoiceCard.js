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
        <Text style={[styles.ikon, valgt && styles.valgtMorkTekst]}>{ikon}</Text>
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
    minHeight: 88,
    paddingHorizontal: 10,
    paddingVertical: 11,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.24)",
    backgroundColor: "rgba(22, 38, 58, 0.92)",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
  kompaktKort: {
    minHeight: 82,
    paddingHorizontal: 6,
    paddingVertical: 9
  },
  valgtKort: {
    backgroundColor: theme.colors.primary,
    borderColor: "rgba(255, 196, 156, 0.95)",
    shadowColor: theme.colors.primary,
    shadowOpacity: 0.22,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3
  },
  hake: {
    position: "absolute",
    top: 7,
    right: 7,
    width: 20,
    height: 20,
    borderRadius: 10,
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
    fontSize: 27,
    lineHeight: 32,
    marginBottom: 6
  },
  stjerner: {
    color: theme.colors.treasure,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 1,
    marginBottom: 5
  },
  tittel: {
    color: theme.colors.text,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "800",
    textAlign: "center"
  },
  kompaktTittel: {
    fontSize: 13,
    lineHeight: 17
  },
  undertittel: {
    color: theme.colors.textMuted,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "700",
    marginTop: 2,
    textAlign: "center"
  },
  valgtMorkTekst: {
    color: "#241208"
  }
});
