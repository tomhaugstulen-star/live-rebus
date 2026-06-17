import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, ImageBackground, Platform, Pressable, ScrollView, Text, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { consumeTreasureSafetyConfirmation } from "../../utils/treasureSafetyStore";
import { styles } from "./TreasureReadyScreen.styles";

const HEADER_IMAGE = require("../../../assets/images/treasure/treasure-setup-header.webp");

const DIFFICULTY = {
  easy: { label: "Enkel", treasures: 4, radius: 100 },
  medium: { label: "Medium", treasures: 8, radius: 250 },
  hard: { label: "Vanskelig", treasures: 12, radius: 500 }
};

const COUNTDOWN = ["10", "9", "8", "7", "6", "5", "4", "3", "2", "1", "START"];
const MAX_FRIENDS = 5;

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
      <View style={styles.locationOuter}><View style={styles.locationInner} /></View>
    </View>
  );
}

function normalizeParticipant(participant) {
  if (typeof participant === "string") {
    return { id: participant, name: participant, status: "accepted" };
  }

  return {
    id: participant.id || participant.phone || participant.name,
    name: participant.name || "Ukjent kontakt",
    phone: participant.phone || "",
    status: participant.status === "accepted" ? "accepted" : "pending"
  };
}

function getParticipantSource(config, participants) {
  if (Array.isArray(config?.invitedContacts)) return config.invitedContacts;
  return participants;
}

function ParticipantRow({ participant, host, removable, compact, onRemove }) {
  const name = participant.name;
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const statusLabel = host
    ? "Vert"
    : participant.status === "accepted"
      ? "Bekreftet"
      : "Venter";

  return (
    <View style={[styles.participantRow, compact && styles.participantRowCompact]}>
      <View style={[styles.avatar, compact && styles.avatarCompact]}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>
      <Text style={styles.participantName}>{name}</Text>
      <View style={[styles.status, (host || participant.status === "accepted") && styles.hostStatus]}>
        <Text style={[styles.statusText, (host || participant.status === "accepted") && styles.hostStatusText]}>
          {statusLabel}
        </Text>
      </View>
      {removable ? (
        <Pressable
          onPress={onRemove}
          style={({ pressed }) => [styles.removeButton, compact && styles.removeButtonCompact, pressed && styles.pressed]}
          accessibilityRole="button"
          accessibilityLabel={`Fjern ${name}`}
        >
          <Text style={styles.removeText}>Fjern</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

function showStartAnywayConfirmation(onConfirm, pendingCount) {
  const title = "Start likevel?";
  const message = pendingCount === 1
    ? "Én invitert venn har ikke svart ennå. Bare bekreftede deltakere blir med i jakten."
    : `${pendingCount} inviterte venner har ikke svart ennå. Bare bekreftede deltakere blir med i jakten.`;

  if (Platform.OS === "web" && typeof window !== "undefined") {
    if (window.confirm(`${title}\n\n${message}`)) onConfirm();
    return;
  }

  Alert.alert(title, message, [
    { text: "Vent litt", style: "cancel" },
    { text: "Start likevel", onPress: onConfirm }
  ]);
}

function resetToSafety(navigation) {
  navigation.reset({
    index: 2,
    routes: [
      { name: "Home" },
      { name: "TreasureSetup" },
      { name: "Safety" }
    ]
  });
}

export default function TreasureReadyScreen({
  config,
  hostName = "Tom",
  participants = [],
  onBack,
  onStart
}) {
  const navigation = useNavigation();
  const participantSource = getParticipantSource(config, participants);
  const [invited, setInvited] = useState(() =>
    participantSource.slice(0, MAX_FRIENDS).map(normalizeParticipant)
  );
  const [countdownIndex, setCountdownIndex] = useState(null);
  const [safetyAccepted, setSafetyAccepted] = useState(false);

  const difficulty = DIFFICULTY[config?.difficulty] || DIFFICULTY.medium;
  const isFriends = config?.players === "friends";
  const modeLabel = config?.variant === "sonar" ? "Sonar" : "Tåkekart";
  const compactParticipants = invited.length >= 3;
  const acceptedParticipants = useMemo(
    () => invited.filter((participant) => participant.status === "accepted"),
    [invited]
  );
  const pendingCount = invited.length - acceptedParticipants.length;

  const chips = useMemo(
    () => [
      { icon: isFriends ? "●●" : "●", label: isFriends ? "Med venner" : "Alene" },
      { icon: config?.variant === "sonar" ? "◉" : "◌", label: modeLabel },
      { icon: "▥", label: difficulty.label },
      { icon: "▣", label: `${difficulty.treasures} skatter` },
      { icon: "◎", label: `${difficulty.radius} m` }
    ],
    [config?.variant, difficulty, isFriends, modeLabel]
  );

  useFocusEffect(
    useCallback(() => {
      const accepted = consumeTreasureSafetyConfirmation();
      setSafetyAccepted(accepted);

      if (!accepted) {
        requestAnimationFrame(() => resetToSafety(navigation));
      }

      return undefined;
    }, [navigation])
  );

  useEffect(() => {
    setInvited(
      getParticipantSource(config, participants)
        .slice(0, MAX_FRIENDS)
        .map(normalizeParticipant)
    );
  }, [config, participants]);

  useEffect(() => {
    if (!safetyAccepted || countdownIndex === null) return undefined;

    if (countdownIndex >= COUNTDOWN.length) {
      onStart?.(acceptedParticipants);
      return undefined;
    }

    const timer = setTimeout(() => {
      setCountdownIndex((value) => value + 1);
    }, countdownIndex === COUNTDOWN.length - 1 ? 650 : 1000);

    return () => clearTimeout(timer);
  }, [acceptedParticipants, countdownIndex, onStart, safetyAccepted]);

  function beginCountdown() {
    if (!safetyAccepted) {
      resetToSafety(navigation);
      return;
    }

    if (countdownIndex === null) setCountdownIndex(0);
  }

  function startCountdown() {
    if (!safetyAccepted) {
      resetToSafety(navigation);
      return;
    }

    if (!isFriends || pendingCount === 0) {
      beginCountdown();
      return;
    }

    showStartAnywayConfirmation(beginCountdown, pendingCount);
  }

  if (!safetyAccepted) return null;

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
          <ImageBackground source={HEADER_IMAGE} style={styles.header} imageStyle={styles.headerImage} resizeMode="cover">
            <View style={styles.headerOverlay} />
            <View style={styles.headerBottomFade} />
            <SafeAreaView edges={["top"]} style={styles.headerSafe}>
              <View style={styles.headerRow}>
                <Pressable
                  onPress={onBack}
                  style={({ pressed }) => [styles.headerButton, pressed && styles.pressed]}
                  accessibilityRole="button"
                  accessibilityLabel="Gå tilbake"
                  hitSlop={6}
                >
                  <Text style={styles.backIcon}>‹</Text>
                </Pressable>
                <Text style={styles.headerTitle}>Skattejakt</Text>
                <View style={styles.headerButton}><Text style={styles.compassIcon}>⌖</Text></View>
              </View>
            </SafeAreaView>
          </ImageBackground>

          <View style={styles.content}>
            <Text style={styles.title}>Klar til start</Text>
            <Text style={styles.subtitle}>
              {isFriends
                ? "Verten kan starte når som helst. Bare bekreftede venner blir med i jakten."
                : "Når du er klar, kan du starte skattejakten."}
            </Text>

            <MapPreview />

            <View style={styles.chipGrid}>
              {chips.map((chip) => <Chip key={chip.label} icon={chip.icon} label={chip.label} />)}
            </View>

            <View style={[styles.participantsCard, compactParticipants && styles.participantsCardCompact]}>
              <Text style={[styles.sectionTitle, compactParticipants && styles.sectionTitleCompact]}>
                {isFriends ? "Deltakere" : "Spiller"}
              </Text>
              <ParticipantRow participant={{ name: hostName, status: "accepted" }} host compact={compactParticipants} />
              {isFriends
                ? invited.map((participant) => (
                    <ParticipantRow
                      key={participant.id}
                      participant={participant}
                      removable
                      compact={compactParticipants}
                      onRemove={() => setInvited((current) => current.filter((item) => item.id !== participant.id))}
                    />
                  ))
                : null}
            </View>

            <View style={styles.startHint}>
              <Text style={styles.startHintIcon}>i</Text>
              <Text style={styles.startHintText}>
                {isFriends
                  ? pendingCount > 0
                    ? `${pendingCount} venter fortsatt på å svare. Du kan starte likevel.`
                    : "Alle inviterte har bekreftet. Dere kan starte når dere er på stedet."
                  : "Start først når du er på stedet der jakten skal spilles."}
              </Text>
            </View>

            <Pressable
              onPress={startCountdown}
              disabled={countdownIndex !== null}
              style={({ pressed }) => [styles.startButton, pressed && countdownIndex === null && styles.pressed]}
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
          <Text style={styles.countdownMode}>Gjør dere klare</Text>
          <Text style={styles.countdownText}>{COUNTDOWN[countdownIndex]}</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
}
