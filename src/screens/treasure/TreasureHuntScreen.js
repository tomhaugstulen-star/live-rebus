import AppButton from "../../components/common/AppButton";
import Header from "../../components/common/Header";
import HintModal from "../../components/common/HintModal";
import FogOfWarMap from "../../components/treasure/FogOfWarMap";
import RadarMode from "../../components/treasure/RadarMode";
import { theme } from "../../utils/theme";
import { bearingText, buildHintSteps, distanceMeters, formatDuration, getSignalLevel } from "../../utils/geo";

export default function TreasureHuntScreen({
  hunt,
  userPosition,
  elapsedSeconds,
  distanceWalkedEstimate,
  onFinish,
  onBack,
  onHintsUsedChange
}) {
  const [mode, setMode] = useState("map");
  const [hintVisible, setHintVisible] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);

  const distanceToTreasure = useMemo(() => {
    return distanceMeters(
      userPosition.latitude,
      userPosition.longitude,
      hunt.treasurePoint.latitude,
      hunt.treasurePoint.longitude
    );
  }, [userPosition, hunt]);

  const direction = useMemo(() => {
    return bearingText(
      userPosition.latitude,
      userPosition.longitude,
      hunt.treasurePoint.latitude,
      hunt.treasurePoint.longitude
    );
  }, [userPosition, hunt]);

  const signal = useMemo(() => getSignalLevel(distanceToTreasure), [distanceToTreasure]);
  const hintSteps = useMemo(() => buildHintSteps(hunt), [hunt]);

  const foundRadius = Math.max(20, Math.min(Number(userPosition.accuracy ?? 25), 40));
  const canOpenTreasure = distanceToTreasure <= foundRadius;

  function openHint() {
    setHintVisible(true);
    if (typeof onHintsUsedChange === "function") {
      onHintsUsedChange((value) => value + 1);
    }
  }

  function nextHint() {
    if (hintIndex < hintSteps.length - 1) {
      setHintIndex((value) => value + 1);
    } else {
      setHintVisible(false);
    }
  }

  async function tryOpenTreasure() {
    if (!canOpenTreasure) {
      Alert.alert("Ikke nær nok", "Gå nærmere skatten for å åpne den.");
      return;
    }

    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    } catch {}

    onFinish();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flex}>
        <Header title="Skattejakt" onBack={onBack} rightText={mode === "map" ? "Kompass" : mode === "compass" ? "Sonar" : "Kart"} onRight={() => setMode(mode === "map" ? "compass" : mode === "compass" ? "sonar" : "map")} />

        {mode === "map" && (
          <>
            <FogOfWarMap
              userPosition={userPosition}
              treasurePoint={hunt.treasurePoint}
              sightRadiusMeters={hunt.sightRadiusMeters}
              treasureRadiusMeters={hunt.treasureRadiusMeters}
              lockedMap={hunt.lockedMap}
            />

            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>🗺️ Kartmodus</Text>
              <Text style={styles.infoText}>
                Fog of War brukes bare her. Utforsk området og avdekk kartet rundt deg.
              </Text>

              <View style={styles.divider} />

              <Row label="Signal" value={signal.label} />
              <Row label="Sikt" value={`${hunt.sightRadiusMeters} m`} />
              <Row label="Tid" value={formatDuration(elapsedSeconds)} />

              <Text style={styles.status}>{signal.helper}</Text>

              <View style={styles.modeButtons}>
                <AppButton title="💡 Hint" variant="secondary" onPress={openHint} style={styles.halfButton} />
                <AppButton title="Kompass" variant="secondary" onPress={() => setMode("compass")} style={styles.halfButton} />
              </View>

              <AppButton title="Sonar" onPress={() => setMode("sonar")} style={styles.buttonTop} />

              <AppButton
                title={canOpenTreasure ? "Åpne skatten" : "Gå nærmere"}
                onPress={tryOpenTreasure}
                disabled={!canOpenTreasure}
                style={styles.buttonTop}
              />
            </View>
          </>
        )}

        {mode === "compass" && (
          <ScrollView contentContainerStyle={styles.compassContainer}>
            <Text style={styles.compassTitle}>KOMPASSMODUS</Text>
            <Text style={styles.compassHelper}>Bruk retningen og signalet til å finne skatten.</Text>

            <View style={styles.bigDirectionCard}>
              <Text style={styles.dirLabel}>Retning</Text>
              <Text style={styles.dirValue}>🧭 {direction}</Text>
              <Text style={styles.dirSignal}>{signal.label}</Text>
            </View>

            <View style={styles.infoBlock}>
              <Text style={styles.infoBlockTitle}>Status</Text>
              <Text style={styles.infoBlockText}>{signal.helper}</Text>
            </View>

            <View style={styles.modeButtons}>
              <AppButton title="💡 Hint" variant="secondary" onPress={openHint} style={styles.halfButton} />
              <AppButton title="Vis kart" variant="secondary" onPress={() => setMode("map")} style={styles.halfButton} />
            </View>

            <AppButton title="Sonar" onPress={() => setMode("sonar")} style={styles.buttonTop} />
            <AppButton
              title={canOpenTreasure ? "Åpne skatten" : "Gå nærmere"}
              onPress={tryOpenTreasure}
              disabled={!canOpenTreasure}
              style={styles.buttonTop}
            />

            <Text style={styles.walked}>Avstand gått ca. {Math.round(distanceWalkedEstimate)} m</Text>
          </ScrollView>
        )}

        {mode === "sonar" && (
          <ScrollView contentContainerStyle={styles.radarContainer}>
            <RadarMode distance={distanceToTreasure} />

            <View style={styles.modeButtonsSingle}>
              <AppButton title="💡 Hint" variant="secondary" onPress={openHint} style={styles.halfButtonLarge} />
              <AppButton title="Vis kart" onPress={() => setMode("map")} style={styles.halfButtonLarge} />
            </View>

            <AppButton
              title={canOpenTreasure ? "Åpne skatten" : "Gå nærmere"}
              onPress={tryOpenTreasure}
              disabled={!canOpenTreasure}
              style={styles.buttonTop}
            />
          </ScrollView>
        )}

        <HintModal
          visible={hintVisible}
          hintText={hintSteps[hintIndex]}
          currentIndex={hintIndex}
          total={hintSteps.length}
          onClose={() => setHintVisible(false)}
          onNext={nextHint}
          canGoNext={hintIndex < hintSteps.length - 1}
        />
      </View>
    </SafeAreaView>
  );
}

function Row({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  flex: { flex: 1 },
  infoCard: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.radius.lg,
    borderTopRightRadius: theme.radius.lg,
    padding: 20,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  infoTitle: {
    color: theme.colors.treasure,
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 8
  },
  infoText: {
    color: theme.colors.text,
    fontSize: 15,
    lineHeight: 22
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: 14
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4
  },
  metricLabel: { color: theme.colors.textMuted, fontSize: 14 },
  metricValue: { color: theme.colors.primary, fontSize: 16, fontWeight: "900" },
  status: {
    color: theme.colors.treasure,
    fontWeight: "900",
    marginTop: 12
  },
  modeButtons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16
  },
  modeButtonsSingle: {
    flexDirection: "row",
    gap: 10,
    marginHorizontal: 20,
    marginTop: 8
  },
  halfButton: { flex: 1 },
  halfButtonLarge: { flex: 1 },
  buttonTop: { marginTop: 10 },
  compassContainer: {
    padding: 20,
    paddingBottom: 34
  },
  radarContainer: {
    paddingBottom: 34
  },
  compassTitle: {
    color: theme.colors.text,
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center"
  },
  compassHelper: {
    color: theme.colors.textMuted,
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginTop: 8
  },
  bigDirectionCard: {
    marginTop: 24,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 24,
    alignItems: "center"
  },
  dirLabel: { color: theme.colors.textMuted, fontSize: 14, marginBottom: 6 },
  dirValue: { color: theme.colors.text, fontSize: 38, fontWeight: "900" },
  dirSignal: { color: theme.colors.primary, fontSize: 20, fontWeight: "900", marginTop: 10 },
  infoBlock: {
    marginTop: 16,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 18
  },
  infoBlockTitle: { color: theme.colors.text, fontWeight: "900", marginBottom: 6 },
  infoBlockText: { color: theme.colors.textMuted, lineHeight: 21 },
  walked: {
    color: theme.colors.textMuted,
    fontSize: 12,
    textAlign: "center",
    marginTop: 10
  }
});