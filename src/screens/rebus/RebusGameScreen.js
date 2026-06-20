import React, { useMemo, useRef, useState, useEffect } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import MapView, { Circle, Marker, Polyline } from "react-native-maps";
import * as Haptics from "expo-haptics";
import AppButton from "../../components/common/AppButton";
import Header from "../../components/common/Header";
import { theme } from "../../utils/theme";
import { bearingText, distanceMeters, normalizeText } from "../../utils/geo";

const CHECKPOINT_RADIUS_MIN = 20;
const CHECKPOINT_RADIUS_MAX = 45;
const WARM_COLD_THRESHOLD_METERS = 10;

export default function RebusGameScreen({
  route,
  role,
  userPosition,
  activeIndex,
  progress,
  onApproveCheckpoint,
  onFinish,
  onBack
}) {
  const [showMap, setShowMap] = useState(true);
  const [answerInput, setAnswerInput] = useState("");
  const [statusText, setStatusText] = useState("Finn posten og svar på spørsmålet.");
  const [approvedOverlay, setApprovedOverlay] = useState(false);

  const previousDistanceRef = useRef(null);

  const activeOrder = role === "host" ? route.hostOrder : route.guestOrder;

  const checkpoint = useMemo(() => {
    const id = activeOrder[activeIndex];
    return route.checkpoints.find((post) => post.id === id);
  }, [activeOrder, activeIndex, route]);

  const distance = useMemo(() => {
    if (!checkpoint || !userPosition) return null;
    return distanceMeters(
      userPosition.latitude,
      userPosition.longitude,
      checkpoint.latitude,
      checkpoint.longitude
    );
  }, [checkpoint, userPosition]);

  const direction = useMemo(() => {
    if (!checkpoint || !userPosition) return "";
    return bearingText(
      userPosition.latitude,
      userPosition.longitude,
      checkpoint.latitude,
      checkpoint.longitude
    );
  }, [checkpoint, userPosition]);

  const approvedRadius = Math.max(
    CHECKPOINT_RADIUS_MIN,
    Math.min(Number(userPosition?.accuracy ?? 25), CHECKPOINT_RADIUS_MAX)
  );

  const isNear = distance !== null && distance <= approvedRadius;

  useEffect(() => {
    if (distance === null) return;

    const previous = previousDistanceRef.current;

    if (previous !== null) {
      if (distance < previous - WARM_COLD_THRESHOLD_METERS) {
        setStatusText("Det brenner! 🔥 Du nærmer deg.");
      } else if (distance > previous + WARM_COLD_THRESHOLD_METERS) {
        setStatusText("Det blir kaldere... ❄️ Snu om.");
      } else {
        setStatusText("Du er omtrent like nær. Fortsett å lete.");
      }
    }

    previousDistanceRef.current = distance;
  }, [distance]);

  if (!checkpoint) return null;

  async function approve() {
    if (!isNear) {
      Alert.alert("For langt unna", "Du må være nærmere posten før du kan svare.");
      return;
    }

    const normalizedAnswer = normalizeText(answerInput);
    const normalizedCorrect = normalizeText(checkpoint.answer);

    if (!normalizedAnswer) {
      Alert.alert("Mangler svar", "Skriv inn svaret først.");
      return;
    }

    if (normalizedAnswer !== normalizedCorrect) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert("Feil svar", "Prøv igjen.");
      return;
    }

    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {}

    setApprovedOverlay(true);
    setStatusText("✅ Godkjent! Gå videre til neste post.");

    setTimeout(() => {
      setApprovedOverlay(false);
      setAnswerInput("");
      previousDistanceRef.current = null;

      const isLast = activeIndex + 1 >= activeOrder.length;

      onApproveCheckpoint(checkpoint.id);

      if (isLast) {
        onFinish();
      }
    }, 1400);
  }

  const accent =
    checkpoint.kilde === "Kartverket" ? theme.colors.nature : theme.colors.history;

  const routeCoordinates = activeOrder
    .map((id) => route.checkpoints.find((post) => post.id === id))
    .filter(Boolean)
    .map((post) => ({
      latitude: post.latitude,
      longitude: post.longitude
    }));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flex}>
        <Header
          title="Live Georebus"
          onBack={onBack}
          rightText={showMap ? "Kompass" : "Kart"}
          onRight={() => setShowMap((value) => !value)}
        />

        {showMap ? (
          <MapView
            style={styles.map}
            region={{
              latitude: userPosition.latitude,
              longitude: userPosition.longitude,
              latitudeDelta: 0.014,
              longitudeDelta: 0.014
            }}
            showsUserLocation
          >
            <Marker coordinate={userPosition} title="Deg" pinColor="blue" />

            <Polyline
              coordinates={routeCoordinates}
              strokeColor="rgba(255, 107, 53, 0.6)"
              strokeWidth={3}
            />

            <Circle
              center={{
                latitude: checkpoint.latitude,
                longitude: checkpoint.longitude
              }}
              radius={120}
              strokeColor={
                checkpoint.kilde === "Kartverket"
                  ? "rgba(34, 197, 94, 0.75)"
                  : "rgba(139, 92, 246, 0.75)"
              }
              fillColor={
                checkpoint.kilde === "Kartverket"
                  ? "rgba(34, 197, 94, 0.18)"
                  : "rgba(139, 92, 246, 0.18)"
              }
            />
          </MapView>
        ) : (
          <View style={styles.compassScreen}>
            <Text style={styles.compassLabel}>Retning</Text>
            <Text style={styles.compassValue}>🧭 {direction}</Text>
            <Text style={styles.compassDistance}>
              {Math.round(distance ?? 0)} meter
            </Text>
          </View>
        )}

        <View style={styles.infoCard}>
          <Text style={[styles.infoTitle, { color: accent }]}> 
            {checkpoint.kilde === "Kartverket" ? "🌲 Naturoppdrag" : "🏛️ Historieoppdrag"}
          </Text>

          <Text style={styles.progressText}>
            Sjekkpunkt {activeIndex + 1} av {activeOrder.length}
          </Text>

          <Text style={styles.ledetraadText}>
            {checkpoint.kilde === "Kartverket"
              ? "Du leter etter et navngitt sted eller en naturlig formasjon. Objekttypen er: "
              : "Du leter etter et registrert kulturminne. Kulturminnet er av typen: "}
            <Text style={styles.boldText}>{String(checkpoint.art || "ukjent").toLowerCase()}</Text>.
          </Text>

          <View style={styles.divider} />

          <Text style={styles.distanceText}>📏 Avstand: {Math.round(distance ?? 0)} meter</Text>
          <Text style={styles.statusText}>{statusText}</Text>

          <View style={styles.questionBox}>
            <Text style={styles.questionTitle}>Spørsmål</Text>
            <Text style={styles.questionText}>{checkpoint.question}</Text>

            <TextInput
              style={styles.input}
              placeholder="Skriv svar her"
              placeholderTextColor={theme.colors.textMuted}
              value={answerInput}
              onChangeText={setAnswerInput}
              autoCapitalize="none"
            />

            <AppButton
              title={isNear ? "Godkjenn post" : "Gå nærmere posten"}
              onPress={approve}
              disabled={!isNear}
              style={styles.approveButton}
            />
          </View>
        </View>

        {approvedOverlay && (
          <View style={styles.approvedOverlay}>
            <Text style={styles.approvedIcon}>✅</Text>
            <Text style={styles.approvedTitle}>Godkjent</Text>
            <Text style={styles.approvedText}>Posten er registrert.</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  flex: { flex: 1 },
  map: { flex: 1 },
  compassScreen: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center"
  },
  compassLabel: {
    color: theme.colors.textMuted,
    fontSize: 18,
    marginBottom: 8
  },
  compassValue: {
    color: theme.colors.primary,
    fontSize: 42,
    fontWeight: "800"
  },
  compassDistance: {
    color: theme.colors.text,
    fontSize: 24,
    marginTop: 8
  },
  infoCard: {
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: "800"
  },
  progressText: {
    color: theme.colors.textMuted,
    marginTop: 4
  },
  ledetraadText: {
    color: theme.colors.text,
    fontSize: 15,
    lineHeight: 21,
    marginTop: 10
  },
  boldText: { fontWeight: "800", color: theme.colors.text },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: 12
  },
  distanceText: {
    color: theme.colors.text,
    fontWeight: "700"
  },
  statusText: {
    color: theme.colors.textMuted,
    marginTop: 6,
    marginBottom: 12
  },
  questionBox: {
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    padding: 14
  },
  questionTitle: {
    color: theme.colors.primary,
    fontWeight: "800",
    marginBottom: 6
  },
  questionText: {
    color: theme.colors.text,
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 10
  },
  input: {
    minHeight: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    color: theme.colors.text,
    paddingHorizontal: 12,
    marginBottom: 10
  },
  approveButton: { marginTop: 2 },
  approvedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(11, 18, 32, 0.86)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24
  },
  approvedIcon: {
    fontSize: 60,
    marginBottom: 10
  },
  approvedTitle: {
    color: theme.colors.text,
    fontSize: 32,
    fontWeight: "900"
  },
  approvedText: {
    color: theme.colors.textMuted,
    fontSize: 16,
    marginTop: 8
  }
});
