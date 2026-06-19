import React, { useMemo, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { theme } from "../../utils/theme";
import { normalizeText } from "../../utils/geo";
import { styles } from "./RebusGameScreen.web.styles";

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
  const [showHint, setShowHint] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [approvedText, setApprovedText] = useState("");
  const [localApprovedIds, setLocalApprovedIds] = useState({});

  const checkpoints = route?.checkpoints || [];
  const activeOrder = role === "host" ? route?.hostOrder || [] : route?.guestOrder || [];
  const checkpoint = useMemo(() => {
    const id = activeOrder[activeIndex];
    return checkpoints.find((post) => post.id === id);
  }, [activeOrder, activeIndex, checkpoints]);

  const activeCheckpointId = checkpoint?.id;
  const isCheckpointApproved = (post) =>
    Boolean(progress?.[post.id] || localApprovedIds[post.id]);
  const isActiveApproved = Boolean(activeCheckpointId && isCheckpointApproved(checkpoint));
  const allCheckpointsApproved =
    checkpoints.length > 0 && checkpoints.every(isCheckpointApproved);
  const totalPosts = activeOrder.length || checkpoints.length || 0;
  const currentPostNumber = Math.min(activeIndex + 1, totalPosts || activeIndex + 1);
  const demoAnswer = getDemoAnswer(checkpoint);
  const canFinish = allCheckpointsApproved;

  if (!route || !checkpoint || !userPosition) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.emptyTitle}>Mangler spilldata</Text>
          <TouchableOpacity
            style={styles.backButtonFallback}
            onPress={onBack}
            activeOpacity={0.86}
            accessibilityRole="button"
            accessibilityLabel="Tilbake"
          >
            <Text style={styles.backButtonText}>Tilbake</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  function approve() {
    const normalizedAnswer = normalizeText(answerInput);
    const normalizedCorrect = normalizeText(checkpoint.answer || demoAnswer);
    const acceptedAnswers = Array.isArray(checkpoint.acceptedAnswers)
      ? checkpoint.acceptedAnswers.map((value) => normalizeText(value))
      : [];

    if (!normalizedAnswer) {
      Alert.alert("Mangler svar", "Skriv inn svaret først.");
      return;
    }

    const isCorrect =
      normalizedAnswer === normalizedCorrect || acceptedAnswers.includes(normalizedAnswer);

    if (!isCorrect) {
      setErrorText("Feil svar. Prøv igjen.");
      setApprovedText("");
      return;
    }

    setErrorText("");
    setApprovedText("✓ Godkjent");

    setTimeout(() => {
      setApprovedText("");
      setAnswerInput("");
      setShowHint(false);
      setLocalApprovedIds((current) => ({
        ...current,
        [checkpoint.id]: true
      }));
      onApproveCheckpoint(checkpoint.id);
    }, 600);
  }

  const questionText =
    checkpoint.question || checkpoint.clue || "Løs posten for å gå videre.";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
            activeOpacity={0.86}
            accessibilityRole="button"
            accessibilityLabel="Tilbake"
          >
            <Text style={styles.backButtonText}>Tilbake</Text>
          </TouchableOpacity>

          <View style={styles.kickerPill}>
            <Text style={styles.kickerText}>Rebusløp</Text>
          </View>
        </View>

        <Text style={styles.title}>{checkpoint.title || `Post ${currentPostNumber}`}</Text>
        <Text style={styles.progress}>Post {currentPostNumber} av {totalPosts || currentPostNumber}</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Oppgave</Text>
          <Text style={styles.questionText}>{questionText}</Text>

          <TouchableOpacity
            style={styles.hintButton}
            onPress={() => setShowHint((current) => !current)}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="Vis hint"
          >
            <Text style={styles.hintButtonText}>Vis hint</Text>
          </TouchableOpacity>

          {showHint ? (
            <View style={styles.hintBox}>
              <Text style={styles.hintLabel}>Hint</Text>
              <Text style={styles.hintText}>{checkpoint.hint || "Ingen hint tilgjengelig."}</Text>
            </View>
          ) : null}

          {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
          {approvedText ? <Text style={styles.approvedText}>{approvedText}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="Skriv svar"
            placeholderTextColor={theme.colors.textMuted}
            value={answerInput}
            onChangeText={setAnswerInput}
            autoCapitalize="none"
            autoCorrect={false}
            accessibilityLabel="Skriv svar"
          />

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={approve}
            activeOpacity={0.88}
            accessibilityRole="button"
            accessibilityLabel="Godkjenn post"
          >
            <Text style={styles.primaryButtonText}>
              {isActiveApproved ? "Godkjent" : "Godkjenn post"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Web-test</Text>
          <Text style={styles.cardBody}>Demo-svar: {demoAnswer}</Text>
          <Text style={styles.cardNote}>GPS er deaktivert i web-test.</Text>
        </View>

        {canFinish ? (
          <TouchableOpacity
            style={styles.finishButton}
            onPress={onFinish}
            activeOpacity={0.88}
            accessibilityRole="button"
            accessibilityLabel="Fullfør rebus"
          >
            <Text style={styles.finishButtonText}>Fullfør rebus</Text>
          </TouchableOpacity>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

function getDemoAnswer(checkpoint) {
  if (!checkpoint) return "Ikke oppgitt";

  if (typeof checkpoint.answer === "string" && checkpoint.answer.trim()) {
    return checkpoint.answer.trim();
  }

  if (Array.isArray(checkpoint.acceptedAnswers) && checkpoint.acceptedAnswers.length > 0) {
    return checkpoint.acceptedAnswers[0];
  }

  return "Ikke oppgitt";
}
