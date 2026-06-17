import React, { useEffect, useMemo, useState } from "react";
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HEADER_IMAGE = require("../../../assets/images/treasure/treasure-setup-header.webp");

const COLORS = {
  background: "#020A14",
  panel: "#081524",
  card: "#0A1829",
  border: "#33445C",
  text: "#F5F7FB",
  muted: "#AEB7C8",
  orange: "#FF6800",
  blue: "#3B82F6"
};

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

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flexGrow: 1, alignItems: "center", backgroundColor: COLORS.background },
  frame: { width: "100%", maxWidth: 540, minHeight: "100%" },
  header: { height: 126, backgroundColor: COLORS.background },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(2,10,20,0.34)"
  },
  headerSafe: { flex: 1 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 6
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(3,11,23,0.72)",
    borderWidth: 1,
    borderColor: "rgba(226,232,240,0.72)"
  },
  backIcon: { color: COLORS.orange, fontSize: 38, lineHeight: 39, marginTop: -3 },
  compassIcon: { color: COLORS.orange, fontSize: 24, lineHeight: 26 },
  headerTitle: { color: COLORS.orange, fontSize: 18, fontWeight: "800" },
  content: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 42 },
  title: { color: COLORS.text, fontSize: 29, lineHeight: 34, fontWeight: "900" },
  subtitle: { color: COLORS.muted, fontSize: 15, lineHeight: 21, marginTop: 5 },
  map: {
    height: 184,
    marginTop: 16,
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "#18263A"
  },
  road: { position: "absolute", height: 4, backgroundColor: "#65748A", borderRadius: 4 },
  roadOne: { width: "115%", top: 44, left: -20, transform: [{ rotate: "-12deg" }] },
  roadTwo: { width: "110%", top: 108, left: -8, transform: [{ rotate: "9deg" }] },
  roadThree: { width: "72%", top: 82, left: 62, transform: [{ rotate: "-52deg" }] },
  block: { position: "absolute", backgroundColor: "#27364A", borderRadius: 8 },
  blockOne: { width: 82, height: 44, top: 18, left: 24 },
  blockTwo: { width: 92, height: 50, bottom: 20, right: 24 },
  blockThree: { width: 58, height: 72, top: 52, right: 50 },
  radiusCircle: {
    position: "absolute",
    width: 116,
    height: 116,
    borderRadius: 58,
    left: "50%",
    top: "50%",
    marginLeft: -58,
    marginTop: -58,
    backgroundColor: "rgba(59,130,246,0.13)",
    borderWidth: 1,
    borderColor: "rgba(147,197,253,0.36)"
  },
  locationOuter: {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: 22,
    height: 22,
    marginLeft: -11,
    marginTop: -11,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center"
  },
  locationInner: { width: 13, height: 13, borderRadius: 7, backgroundColor: COLORS.blue },
  chipGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 12 },
  chip: {
    minHeight: 42,
    flexGrow: 1,
    flexBasis: "29%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
    paddingHorizontal: 11,
    flexDirection: "row",
    alignItems: "center"
  },
  chipIcon: { color: COLORS.orange, fontSize: 15, marginRight: 7, fontWeight: "800" },
  chipText: { color: COLORS.text, fontSize: 13, fontWeight: "700" },
  participantsCard: {
    marginTop: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.panel,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 4
  },
  sectionTitle: { color: COLORS.text, fontSize: 20, fontWeight: "900", marginBottom: 7 },
  participantRow: {
    minHeight: 55,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "rgba(51,68,92,0.62)"
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#25364D",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10
  },
  avatarText: { color: COLORS.text, fontSize: 12, fontWeight: "800" },
  participantName: { flex: 1, color: COLORS.text, fontSize: 15, fontWeight: "700" },
  status: {
    minWidth: 46,
    height: 27,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#263448"
  },
  hostStatus: { backgroundColor: COLORS.orange },
  statusText: { color: COLORS.muted, fontSize: 12, fontWeight: "800" },
  hostStatusText: { color: "#111315" },
  removeButton: {
    minWidth: 54,
    height: 34,
    marginLeft: 8,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#60708A"
  },
  removeText: { color: COLORS.text, fontSize: 12, fontWeight: "700" },
  startHint: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 13,
    borderRadius: 10,
    backgroundColor: "rgba(10,24,41,0.78)",
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  startHintIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.orange,
    color: COLORS.orange,
    textAlign: "center",
    lineHeight: 18,
    fontWeight: "900",
    marginRight: 9
  },
  startHintText: { flex: 1, color: COLORS.muted, fontSize: 13, lineHeight: 18 },
  startButton: {
    minHeight: 56,
    marginTop: 13,
    borderRadius: 11,
    backgroundColor: COLORS.orange,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.orange,
    shadowOpacity: 0.26,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6
  },
  playIcon: { color: "#FFFFFF", fontSize: 17, marginRight: 12 },
  startButtonText: { color: "#FFFFFF", fontSize: 18, fontWeight: "900" },
  pressed: { opacity: 0.78, transform: [{ scale: 0.985 }] },
  countdownOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(2,10,20,0.97)",
    alignItems: "center",
    justifyContent: "center"
  },
  countdownMode: { color: COLORS.orange, fontSize: 18, fontWeight: "800", marginBottom: 18 },
  countdownText: {
    color: COLORS.text,
    fontSize: 92,
    lineHeight: 104,
    fontWeight: "900",
    textShadowColor: COLORS.orange,
    textShadowRadius: 24
  }
});
