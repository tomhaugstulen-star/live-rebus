import React, { useMemo, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import AppButton from "../../components/common/AppButton";
import Header from "../../components/common/Header";
import { theme } from "../../utils/theme";
import { bearingText, distanceMeters, normalizeText } from "../../utils/geo";

const CHECKPOINT_RADIUS_MIN = 20;
const CHECKPOINT_RADIUS_MAX = 45;

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
  const [answerInput, setAnswerInput] = useState("");
  const [approvedText, setApprovedText] = useState("");

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

  if (!route || !checkpoint || !userPosition) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.title}>Mangler spilldata</Text>
          <AppButton title="Tilbake" onPress={onBack} />
        </View>
      </SafeAreaView>
    );
  }

  const approvedRadius = Math.max(
    CHECKPOINT_RADIUS_MIN,
    Math.min(Number(userPosition?.accuracy ?? 25), CHECKPOINT_RADIUS_MAX)
  );
const isNear = true;

 function approve() {
  const normalizedAnswer = normalizeText(answerInput);
  const normalizedCorrect = normalizeText(checkpoint.answer);

  if (!normalizedAnswer) {
    Alert.alert("Mangler svar", "Skriv inn svaret først.");
    return;
  }

  if (normalizedAnswer !== normalizedCorrect) {
    Alert.alert(
      "Feil svar",
      `Du skrev: ${normalizedAnswer}\nRiktig demo-svar: ${normalizedCorrect}`
    );
    return;
  }

  setApprovedText("✅ Godkjent");

  const isLast = activeIndex + 1 >= activeOrder.length;

  setTimeout(() => {
    setApprovedText("");
    setAnswerInput("");

    onApproveCheckpoint(checkpoint.id);

    if (isLast) {
      onFinish();
    }
  }, 700);
}

  const accent =
    checkpoint.kilde === "Kartverket" ? theme.colors.success : theme.colors.history;

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Live Rebus" onBack={onBack} />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.modeCard}>
          <Text style={styles.modeLabel}>WEB TESTMODUS</Text>
          <Text style={styles.modeTitle}>Kompassvisning</Text>
          <Text style={styles.modeText}>
            Kart er deaktivert i web-test fordi react-native-maps må testes på mobil.
          </Text>
        </View>

        <View style={styles.compassCard}>
          <Text style={styles.compassLabel}>Retning</Text>
          <Text style={styles.compassValue}>🧭 {direction}</Text>
          <Text style={styles.distance}>{Math.round(distance ?? 0)} meter</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={[styles.infoTitle, { color: accent }]}>
            {checkpoint.kilde === "Kartverket"
              ? "🌲 Naturoppdrag"
              : "🏛️ Historieoppdrag"}
          </Text>

          <Text style={styles.progressText}>
            Sjekkpunkt {activeIndex + 1} av {activeOrder.length}
          </Text>

          <Text style={styles.ledetraadText}>
            {checkpoint.kilde === "Kartverket"
              ? "Du leter etter et navngitt sted eller en naturlig formasjon. Objekttypen er: "
              : "Du leter etter et registrert kulturminne. Kulturminnet er av typen: "}
            <Text style={styles.boldText}>
              {String(checkpoint.art || "ukjent").toLowerCase()}
            </Text>
            .
          </Text>

          <View style={styles.divider} />

          <Text style={styles.distanceText}>
            📏 Avstand: {Math.round(distance ?? 0)} meter
          </Text>

          <Text style={styles.statusText}>
            {isNear
              ? "Du er nær nok til å svare."
              : "Gå nærmere posten for å svare."}
          </Text>

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
  title="Godkjenn post"
  onPress={approve}
  disabled={false}
  style={styles.approveButton}
/>
          </View>

          {approvedText ? (
            <View style={styles.approvedBox}>
              <Text style={styles.approvedText}>{approvedText}</Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  content: {
    padding: 20,
    paddingBottom: 40
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24
  },
  title: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 20
  },
  modeCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 18,
    marginBottom: 16
  },
  modeLabel: {
    color: theme.colors.primary,
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1,
    marginBottom: 6
  },
  modeTitle: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: "900"
  },
  modeText: {
    color: theme.colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8
  },
  compassCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 24,
    alignItems: "center",
    marginBottom: 16
  },
  compassLabel: {
    color: theme.colors.textMuted,
    fontSize: 15,
    marginBottom: 8
  },
  compassValue: {
    color: theme.colors.text,
    fontSize: 36,
    fontWeight: "900",
    textAlign: "center"
  },
  distance: {
    color: theme.colors.primary,
    fontSize: 24,
    fontWeight: "900",
    marginTop: 12
  },
  infoCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: 20,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  infoTitle: {
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 1,
    fontWeight: "900",
    marginBottom: 6
  },
  progressText: {
    color: theme.colors.textMuted,
    fontSize: 14,
    marginBottom: 10
  },
  ledetraadText: {
    color: theme.colors.text,
    fontSize: 16,
    lineHeight: 24
  },
  boldText: {
    color: theme.colors.white,
    fontWeight: "900"
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: 14
  },
  distanceText: {
    color: theme.colors.primary,
    fontSize: 20,
    fontWeight: "900"
  },
  statusText: {
    color: theme.colors.treasure,
    fontSize: 14,
    fontWeight: "800",
    marginTop: 6
  },
  questionBox: {
    marginTop: 16,
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 14
  },
  questionTitle: {
    color: theme.colors.text,
    fontWeight: "900",
    fontSize: 16,
    marginBottom: 6
  },
  questionText: {
    color: theme.colors.textMuted,
    lineHeight: 21
  },
  input: {
    marginTop: 12,
    backgroundColor: theme.colors.surfaceAlt,
    color: theme.colors.text,
    borderRadius: theme.radius.md,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  approveButton: {
    marginTop: 14
  },
  approvedBox: {
    marginTop: 16,
    backgroundColor: "rgba(34, 197, 94, 0.14)",
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: "rgba(34, 197, 94, 0.55)",
    padding: 16,
    alignItems: "center"
  },
  approvedText: {
    color: theme.colors.success,
    fontSize: 22,
    fontWeight: "900"
  }
});