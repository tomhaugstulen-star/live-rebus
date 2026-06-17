import React, { useEffect, useMemo, useState } from "react";
import { ImageBackground, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./TreasureReadyScreen.styles";

const HEADER_IMAGE = require("../../../assets/images/treasure/treasure-setup-header.webp");

const DIFFICULTY = {
  easy: { label: "Enkel", treasures: 4, radius: 100 },
  medium: { label: "Medium", treasures: 8, radius: 250 },
  hard: { label: "Vanskelig", treasures: 12, radius: 500 }
};

const COUNTDOWN = ["3", "2", "1", "START"];

function Chip({ icon, label }) {
  return (
    <View style={styles.chip}>
      <Text style={styles.chipIcon}>{icon}</Text>
      <Text style={styles.chipText}>{label}</Text>
    </View>
  );
}

function MapPreview() {
  return (
    <View style={styles.map} accessibilityLabel="Kartforhåndsvisning">
      <View style={[styles.road, styles.roadOne]} />
      <View style={[styles.road, styles.roadTwo]} />
      <View style={[styles.road, styles.roadThree]} />
      <View style={[styles.block, styles.blockOne]} />
      <View style={[styles.block, styles.blockTwo]} />
      <View style={[styles.block, styles.blockThree]} />
      <View style={styles.radiusCircle} />
      <View style={styles.locationOuter}>
        <View style={styles.locationInner} />
      </View>
    </View>
  );
}

function ParticipantRow({ name, host, removable, onRemove }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <View style={styles.participantRow}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>
      <Text style={styles.participantName}>{name}</Text>
      <View style={[styles.status, host && styles.hostStatus]}>
        <Text style={[styles.statusText, host && styles.hostStatusText]}>
          {host ? "Vert" : "Med"}
        </Text>
      </View>
      {removable ? (
        <Pressable
          onPress={onRemove}
          style={({ pressed }) => [styles.removeButton, pressed && styles.pressed]}
          accessibilityRole="button"
          accessibilityLabel={`Fjern ${name}`}
        >
          <Text style={styles.removeText}>Fjern</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export default function TreasureReadyScreen({
  config,
  hostName = "Tom",
  participants = ["Ida", "Sander", "Nora"],
  onBack,
  onStart
}) {
  const [accepted, setAccepted] = useState(participants);
  const [countdownIndex, setCountdownIndex] = useState(null);

  const difficulty = DIFFICULTY[config?.difficulty] || DIFFICULTY.medium;
  const isFriends = config?.players === "friends";
  const modeLabel = config?.variant === "sonar" ? "Sonar" : "Fog of War";

  const chips = useMemo(
    () => [
      { icon: isFriends ? "●●" : "●", label: isFriends ? "Med venner" : "Alene" },
      { icon: "◌", label: modeLabel },
      { icon: "▥", label: difficulty.label },
      { icon: "▣", label: `${difficulty.treasures} skatter` },
      { icon: "◎", label: `${difficulty.radius} m` }
    ],
    [difficulty, isFriends, modeLabel]
  );

  useEffect(() => {
    if (countdownIndex === null) return undefined;

    if (countdownIndex >= COUNTDOWN.length) {
      onStart?.();
      return undefined;
    }

    const timer = setTimeout(() => {
      setCountdownIndex((value) => value + 1);
    }, countdownIndex === COUNTDOWN.length - 1 ? 650 : 850);

    return () => clearTimeout(timer);
  }, [countdownIndex, onStart]);

  function startCountdown() {
    if (countdownIndex === null) setCountdownIndex(0);
  }

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        bounces={false}
        alwaysBounceVertical={false}
        overScrollMode="never"
      >
        <View style={styles.frame}>
          <ImageBackground source={HEADER_IMAGE} style={styles.header} resizeMode="cover">
            <View style={styles.headerOverlay} />
            <SafeAreaView edges={["top"]} style={styles.headerSafe}>
              <View style={styles.headerRow}>
                <Pressable
                  onPress={onBack}
                  style={({ pressed }) => [styles.headerButton, pressed && styles.pressed]}
                  accessibilityRole="button"
                  accessibilityLabel="Gå tilbake"
                >
                  <Text style={styles.backIcon}>‹</Text>
                </Pressable>
                <Text style={styles.headerTitle}>Skattejakt</Text>
                <View style={styles.headerButton}>
                  <Text style={styles.compassIcon}>⌖</Text>
                </View>
              </View>
            </SafeAreaView>
          </ImageBackground>

          <View style={styles.content}>
            <Text style={styles.title}>Klar til start</Text>
            <Text style={styles.subtitle}>
              Når alle er klare, kan verten starte skattejakten.
            </Text>

            <MapPreview />

            <View style={styles.chipGrid}>
              {chips.map((chip) => (
                <Chip key={chip.label} icon={chip.icon} label={chip.label} />
              ))}
            </View>

            <View style={styles.participantsCard}>
              <Text style={styles.sectionTitle}>{isFriends ? "Deltakere" : "Spiller"}</Text>
              <ParticipantRow name={hostName} host />
              {isFriends
                ? accepted.map((name) => (
                    <ParticipantRow
                      key={name}
                      name={name}
                      removable
                      onRemove={() =>
                        setAccepted((current) => current.filter((item) => item !== name))
                      }
                    />
                  ))
                : null}
            </View>

            <View style={styles.startHint}>
              <Text style={styles.startHintIcon}>i</Text>
              <Text style={styles.startHintText}>
                {isFriends
                  ? "Trykk først på Start skattejakt når dere er på stedet der jakten skal spilles."
                  : "Trykk først på Start skattejakt når du er på stedet der jakten skal spilles."}
              </Text>
            </View>

            <Pressable
              onPress={startCountdown}
              disabled={countdownIndex !== null}
              style={({ pressed }) => [
                styles.startButton,
                pressed && countdownIndex === null && styles.pressed
              ]}
              accessibilityRole="button"
              accessibilityLabel="Start skattejakt"
            >
              <Text style={styles.playIcon}>▶</Text>
              <Text style={styles.startButtonText}>Start skattejakt</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {countdownIndex !== null && countdownIndex < COUNTDOWN.length ? (
        <View style={styles.countdownOverlay} accessibilityLiveRegion="assertive">
          <Text style={styles.countdownMode}>{modeLabel}</Text>
          <Text style={styles.countdownText}>{COUNTDOWN[countdownIndex]}</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
}
