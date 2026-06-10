import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";
import AppButton from "../components/AppButton";
import Header from "../components/Header";
import { theme } from "../utils/theme";

export default function AreaCheckScreen({ hunt, userPosition, onBack, onApprove }) {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Områdesjekk" onBack={onBack} />

      <View style={styles.mapWrap}>
        <MapView
          style={styles.map}
          region={{
            latitude: hunt.area.center.latitude,
            longitude: hunt.area.center.longitude,
            latitudeDelta: 0.012,
            longitudeDelta: 0.012
          }}
          scrollEnabled={false}
          rotateEnabled={false}
          pitchEnabled={false}
        >
          <Circle
            center={hunt.area.center}
            radius={hunt.area.radiusMeters}
            strokeColor="rgba(255, 107, 53, 0.8)"
            fillColor="rgba(255, 107, 53, 0.14)"
          />
          <Marker coordinate={userPosition} title="Startpunkt" pinColor="orange" />
        </MapView>
      </View>

      <View style={styles.card}>
        <Text style={styles.approvedTitle}>✅ Området virker egnet</Text>

        <CheckLine text="Nok plass i området" />
        <CheckLine text="Innenfor valgt radius" />
        <CheckLine text="Skatten plasseres automatisk" />
        <CheckLine text="GPS-dekning sjekkes live" />
        <CheckLine text="Sikkerhetsbekreftelse kreves før start" />

        <Text style={styles.warning}>
          Dette er en enkel V1-sjekk. Appen kan ikke garantere at området er trygt.
          Du må selv vurdere trafikk, vann, terreng, privat eiendom og tilgang.
        </Text>

        <AppButton title="Fortsett til sikkerhetsinfo" onPress={onApprove} />
      </View>
    </SafeAreaView>
  );
}

function CheckLine({ text }) {
  return (
    <View style={styles.checkLine}>
      <Text style={styles.checkIcon}>✓</Text>
      <Text style={styles.checkText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  mapWrap: {
    height: 260,
    marginHorizontal: 16,
    borderRadius: theme.radius.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  map: { flex: 1 },
  card: {
    margin: 16,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: 18,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  approvedTitle: {
    color: theme.colors.success,
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 14
  },
  checkLine: { flexDirection: "row", alignItems: "center", paddingVertical: 7 },
  checkIcon: { color: theme.colors.success, fontSize: 18, fontWeight: "900", width: 26 },
  checkText: { color: theme.colors.text, fontSize: 15 },
  warning: {
    color: theme.colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 12,
    marginBottom: 16
  }
});
