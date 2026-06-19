import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Alert, Image, ImageBackground, Platform, Pressable, ScrollView, Text, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getPlayerXp, subscribeToPlayerXp } from "../../utils/playerProgressStore";
import { consumeTreasureSafetyConfirmation } from "../../utils/treasureSafetyStore";
import { styles } from "./TreasureReadyScreen.styles";

const HEADER_IMAGE = require("../../../assets/images/treasure/treasure-setup-header.webp");
const CHEST_IMAGE = require("../../../assets/images/treasure/treasure-chest.png");
const DIFFICULTY = {
  easy: { label: "Enkel", treasures: 4, radius: 100 },
  medium: { label: "Medium", treasures: 8, radius: 250 },
  hard: { label: "Vanskelig", treasures: 12, radius: 500 }
};
const COUNTDOWN = ["10", "9", "8", "7", "6", "5", "4", "3", "2", "1", "START"];
const MAX_FRIENDS = 5;
const XP_REWARD_INTERVAL = 75;
const START_DISPLAY_DURATION = 1800;

function Chip({ icon, label }) {
  return (
    <View style={styles.chip}>
      <Text style={styles.chipIcon}>{icon}</Text>
      <Text numberOfLines={1} style={styles.chipText}>{label}</Text>
    </View>
  );
}

function ReadyFeature({ totalXp }) {
  const xpInReward = totalXp % XP_REWARD_INTERVAL;
  const xpToNextReward = xpInReward === 0 ? XP_REWARD_INTERVAL : XP_REWARD_INTERVAL - xpInReward;
  const progress = xpInReward / XP_REWARD_INTERVAL;

  return (
    <ImageBackground source={HEADER_IMAGE} style={styles.featureCard} imageStyle={styles.featureImage}>
      <View style={styles.featureOverlay} />
      <View style={styles.chestWrap}>
        <View style={styles.chestGlow} />
        <Image source={CHEST_IMAGE} style={styles.chestImage} resizeMode="contain" accessibilityLabel="Åpen skattekiste" />
      </View>
      <View style={styles.featureCopy}>
        <Text style={styles.xpEyebrow}>SKATTEBONUS</Text>
        <View style={styles.xpRow}>
          <Text style={styles.xpValue}>{xpInReward}</Text>
          <Text style={styles.xpUnit}>XP</Text>
        </View>
        <View style={styles.xpTrack}>
          <View style={[styles.xpFill, { width: `${progress * 100}%` }]} />
          <View style={styles.xpRewardMarker}><Text style={styles.xpRewardMarkerText}>★</Text></View>
        </View>
        <Text style={styles.xpNext}>{xpToNextReward} XP til neste belønning</Text>
      </View>
    </ImageBackground>
  );
}

function normalizeParticipant(participant) {
  if (typeof participant === "string") return { id: participant, name: participant, status: "accepted" };
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

function ParticipantRow({ participant, host, compact }) {
  const name = participant.name;
  const initials = name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  const accepted = host || participant.status === "accepted";
  const statusLabel = host ? "Vert" : accepted ? "Bekreftet" : "Venter";

  return (
    <View style={[styles.participantRow, compact && styles.participantRowCompact]}>
      <View style={[styles.avatar, compact && styles.avatarCompact]}><Text style={styles.avatarText}>{initials}</Text></View>
      <Text numberOfLines={1} style={styles.participantName}>{name}</Text>
      <View style={[styles.status, accepted && styles.hostStatus]}>
        <Text style={[styles.statusText, accepted && styles.hostStatusText]}>{statusLabel}</Text>
      </View>
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
  navigation.reset({ index: 2, routes: [{ name: "Home" }, { name: "TreasureSetup" }, { name: "Safety" }] });
}

export default function TreasureReadyScreen({ config, hostName = "Tom", participants = [], onBack, onStart }) {
  const navigation = useNavigation();
  const startTriggeredRef = useRef(false);
  const participantSource = getParticipantSource(config, participants);
  const [invited, setInvited] = useState(() => participantSource.slice(0, MAX_FRIENDS).map(normalizeParticipant));
  const [countdownIndex, setCountdownIndex] = useState(null);
  const [safetyAccepted, setSafetyAccepted] = useState(false);
  const [playerXp, setPlayerXp] = useState(() => getPlayerXp());
  const difficulty = DIFFICULTY[config?.difficulty] || DIFFICULTY.medium;
  const isFriends = config?.players === "friends";
  const compactParticipants = isFriends && invited.length >= 3;
  const acceptedParticipants = useMemo(() => invited.filter((item) => item.status === "accepted"), [invited]);
  const pendingCount = invited.length - acceptedParticipants.length;
  const chips = useMemo(() => [
    { icon: isFriends ? "●●" : "●", label: isFriends ? "Med venner" : "Alene" },
    { icon: config?.variant === "sonar" ? "◉" : "◌", label: config?.variant === "sonar" ? "Sonar" : "Tåkekart" },
    { icon: "▥", label: difficulty.label },
    { icon: "▣", label: `${difficulty.treasures} skatter` },
    { icon: "◎", label: `${difficulty.radius} m` }
  ], [config?.variant, difficulty, isFriends]);

  useFocusEffect(useCallback(() => {
    const accepted = consumeTreasureSafetyConfirmation();
    setSafetyAccepted(accepted);
    setPlayerXp(getPlayerXp());
    if (!accepted) requestAnimationFrame(() => resetToSafety(navigation));
    return undefined;
  }, [navigation]));

  useEffect(() => subscribeToPlayerXp(setPlayerXp), []);

  useEffect(() => {
    setInvited(getParticipantSource(config, participants).slice(0, MAX_FRIENDS).map(normalizeParticipant));
  }, [config, participants]);

  useEffect(() => {
    if (!safetyAccepted || countdownIndex === null) return undefined;
    if (countdownIndex >= COUNTDOWN.length) {
      if (!startTriggeredRef.current) {
        startTriggeredRef.current = true;
        onStart?.(acceptedParticipants);
      }
      return undefined;
    }
    const delay = countdownIndex === COUNTDOWN.length - 1 ? START_DISPLAY_DURATION : 1000;
    const timer = setTimeout(() => setCountdownIndex((value) => value + 1), delay);
    return () => clearTimeout(timer);
  }, [acceptedParticipants, countdownIndex, onStart, safetyAccepted]);

  function beginCountdown() {
    if (!safetyAccepted) return resetToSafety(navigation);
    if (countdownIndex === null) {
      startTriggeredRef.current = false;
      setCountdownIndex(0);
    }
  }

  function startCountdown() {
    if (!safetyAccepted) return resetToSafety(navigation);
    if (!isFriends || pendingCount === 0) return beginCountdown();
    showStartAnywayConfirmation(beginCountdown, pendingCount);
  }

  if (!safetyAccepted) return null;

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} bounces={false}>
        <View style={styles.frame}>
          <ImageBackground source={HEADER_IMAGE} style={styles.header} imageStyle={styles.headerImage} resizeMode="cover">
            <View style={styles.headerOverlay} /><View style={styles.headerBottomFade} />
            <SafeAreaView edges={["top"]} style={styles.headerSafe}>
              <View style={styles.headerRow}>
                <Pressable onPress={onBack} style={({ pressed }) => [styles.headerButton, pressed && styles.pressed]} accessibilityRole="button" accessibilityLabel="Gå tilbake">
                  <Text style={styles.backIcon}>‹</Text>
                </Pressable>
                <Text style={styles.headerTitle}>Skattejakt</Text>
                <View style={styles.headerButton}><Text style={styles.compassIcon}>⌖</Text></View>
              </View>
            </SafeAreaView>
          </ImageBackground>

          <View style={styles.content}>
            <Text style={styles.title}>Før dere starter</Text>
            <ReadyFeature totalXp={playerXp} />
            <View style={styles.chipGrid}>{chips.map((chip) => <Chip key={chip.label} {...chip} />)}</View>

            <View style={[styles.participantsCard, compactParticipants && styles.participantsCardCompact]}>
              <Text style={[styles.sectionTitle, compactParticipants && styles.sectionTitleCompact]}>{isFriends ? "Deltakere" : "Spiller"}</Text>
              {isFriends
                ? invited.map((participant) => <ParticipantRow key={participant.id} participant={participant} compact={compactParticipants} />)
                : <ParticipantRow participant={{ name: hostName, status: "accepted" }} host />}
            </View>

            <View style={styles.startHint}>
              <Text style={styles.startHintIcon}>!</Text>
              <Text style={styles.startHintText}>Ikke start skattejakt før du er der du skal spille.</Text>
            </View>

            <Pressable onPress={startCountdown} disabled={countdownIndex !== null} style={({ pressed }) => [styles.startButton, pressed && countdownIndex === null && styles.pressed]} accessibilityRole="button" accessibilityLabel="Start skattejakt">
              <Text style={styles.playIcon}>▶</Text><Text style={styles.startButtonText}>Start skattejakt</Text>
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