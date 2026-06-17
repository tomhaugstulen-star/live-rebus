import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./RebusSetupScreen.styles";

const POST_OPTIONS = [3, 5, 7];
const DEFAULT_POST_COUNT = 7;

function normalizePostCount(value) {
  if (POST_OPTIONS.includes(value)) return value;

  if (value <= 4) return 3;
  if (value <= 6) return 5;
  return 7;
}

function buildScheduledStartTime(initialValue) {
  if (initialValue) return initialValue;

  return new Date(Date.now() + 15 * 60 * 1000).toISOString();
}

export default function RebusSetupScreen({ initialConfig, onBack, onCreateRoute }) {
  const [postCount, setPostCount] = useState(
    normalizePostCount(initialConfig?.postCount ?? DEFAULT_POST_COUNT)
  );
  const [scheduledStartTime] = useState(
    buildScheduledStartTime(initialConfig?.scheduledStartTime)
  );

  const handleCreateRoute = () => {
    onCreateRoute({
      postCount,
      scheduledStartTime
    });
  };

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

        <Text style={styles.title}>Sett opp rebusrute</Text>
        <Text style={styles.body}>
          Velg en enkel demo-rute før postene genereres.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Demo-rute</Text>

          <Row label="Område" value="Live Rebus demo" />
          <Row label="Poster" value={`${postCount}`} />
          <Row label="Estimert tid" value="45 min" />
          <Row label="Modus" value="Web-test" />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Antall poster</Text>
          <Text style={styles.cardBody}>
            Velg 3, 5 eller 7 poster for demo-ruten.
          </Text>

          <View style={styles.optionRow}>
            {POST_OPTIONS.map((option) => {
              const selected = option === postCount;

              return (
                <TouchableOpacity
                  key={option}
                  style={[styles.optionButton, selected && styles.optionButtonSelected]}
                  onPress={() => setPostCount(option)}
                  activeOpacity={0.85}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  accessibilityLabel={`${option} poster`}
                >
                  <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Starttid</Text>
          <Text style={styles.cardBody}>
            Demo starter med valgt tidspunkt i testflyten.
          </Text>

          <View style={styles.timeRow}>
            <Text style={styles.timeLabel}>Planlagt start</Text>
            <Text style={styles.timeValue}>Om 15 min</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Web-test</Text>
          <Text style={styles.cardBody}>
            GPS og kart brukes ikke i denne web-testen.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleCreateRoute}
          activeOpacity={0.88}
          accessibilityRole="button"
          accessibilityLabel="Generer rute"
        >
          <Text style={styles.primaryButtonText}>Generer rute</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function Row({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}
