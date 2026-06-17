import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Easing,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Contacts from "expo-contacts/legacy";
import TreasureSetupHeader from "../../components/treasure/TreasureSetupHeader";

const MAX_FRIENDS = 5;
const C = {
  bg: "#020A14",
  panel: "rgba(3,13,27,0.86)",
  card: "#071426",
  border: "#33445C",
  text: "#F5F7FB",
  muted: "#AEB7C8",
  orange: "#FF6800",
  purple: "#8B4DFF",
  cyan: "#22D3EE",
  cyanSoft: "rgba(34,211,238,0.14)",
  blue: "#7288AA",
  green: "#23C96B"
};

function Mark({ selected, small, sonar }) {
  return (
    <View
      style={[
        s.mark,
        small && s.markSmall,
        selected && s.markOn,
        selected && sonar && s.markOnSonar
      ]}
    >
      {selected ? <Text style={[s.check, sonar && s.checkSonar]}>✓</Text> : null}
    </View>
  );
}

function FogGraphic({ active }) {
  const breathe = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!active) {
      breathe.setValue(0);
      return undefined;
    }

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(breathe, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true
        }),
        Animated.timing(breathe, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true
        })
      ])
    );

    loop.start();
    return () => loop.stop();
  }, [active, breathe]);

  const haloScale = breathe.interpolate({ inputRange: [0, 1], outputRange: [0.88, 1.12] });
  const haloOpacity = breathe.interpolate({ inputRange: [0, 1], outputRange: [0.18, 0.42] });

  return (
    <Animated.View style={[s.graphic, s.fogGraphic, active && s.fogGraphicActive]}>
      <Animated.View
        style={[
          s.fogHalo,
          active && s.fogHaloActive,
          { opacity: haloOpacity, transform: [{ scale: haloScale }] }
        ]}
      />
      <View style={[s.graphicRing, s.graphicRingOuter]} />
      <View style={[s.graphicRing, s.graphicRingMiddle]} />
      <View style={[s.graphicRing, s.graphicRingInner]} />
      <View style={s.graphicLineHorizontal} />
      <View style={s.graphicLineVertical} />
      <View style={s.graphicDot} />
      {active ? <View style={s.fogMistBandOne} /> : null}
      {active ? <View style={s.fogMistBandTwo} /> : null}
    </Animated.View>
  );
}

function SonarGraphic({ active }) {
  const sweep = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!active) {
      sweep.setValue(0);
      pulse.setValue(0);
      return undefined;
    }

    const sweepLoop = Animated.loop(
      Animated.timing(sweep, {
        toValue: 1,
        duration: 2200,
        easing: Easing.linear,
        useNativeDriver: true
      })
    );
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1050,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true
        })
      ])
    );

    sweepLoop.start();
    pulseLoop.start();

    return () => {
      sweepLoop.stop();
      pulseLoop.stop();
    };
  }, [active, pulse, sweep]);

  const rotate = sweep.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });
  const pulseScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.35, 1.18] });
  const pulseOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.75, 0] });

  return (
    <Animated.View style={[s.graphic, s.sonarGraphic, active && s.sonarGraphicActive]}>
      <View style={[s.graphicRing, s.sonarRingOuter]} />
      <View style={[s.graphicRing, s.sonarRingMiddle]} />
      <View style={[s.graphicRing, s.sonarRingInner]} />
      <View style={s.sonarAxisHorizontal} />
      <View style={s.sonarAxisVertical} />
      <Animated.View style={[s.sonarPulse, { opacity: pulseOpacity, transform: [{ scale: pulseScale }] }]} />
      <Animated.View style={[s.sonarSweep, { transform: [{ rotate }] }]}>
        <View style={s.sonarBeam} />
      </Animated.View>
      <View style={s.sonarBlip} />
      <View style={s.sonarCoreOuter}><View style={s.sonarCoreInner} /></View>
    </Animated.View>
  );
}

function Variant({ title, description, selected, onPress, sonar }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        s.variant,
        selected && s.selected,
        selected && !sonar && s.fogSelected,
        selected && sonar && s.sonarSelected,
        pressed && s.pressed
      ]}
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      {selected && sonar ? <View pointerEvents="none" style={s.sonarCardGlow} /> : null}
      {selected && !sonar ? <View pointerEvents="none" style={s.fogCardGlow} /> : null}
      <View style={[s.visual, sonar && selected && s.visualSonarActive]}>
        {sonar ? <SonarGraphic active={selected} /> : <FogGraphic active={selected} />}
      </View>
      <View style={s.variantCopy}>
        <Text style={[s.variantTitle, selected && sonar && s.sonarText, selected && !sonar && s.fogText]}>{title}</Text>
        <Text style={s.variantDescription}>{description}</Text>
      </View>
      <View style={s.variantMark}><Mark selected={selected} sonar={sonar} /></View>
    </Pressable>
  );
}

function Player({ label, icon, color, selected, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [s.player, selected && s.selected, pressed && s.pressed]}
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      <Text style={[s.playerIcon, { color }]}>{icon}</Text>
      <Text numberOfLines={1} style={s.playerText}>{label}</Text>
      <View style={s.playerMark}><Mark selected={selected} small /></View>
    </Pressable>
  );
}

function Difficulty({ stars, title, subtitle, color, selected, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [s.difficulty, selected && s.selected, pressed && s.pressed]}
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      <View style={s.diffTop}>
        <Text style={[s.stars, { color }]}>{stars}</Text>
        <Mark selected={selected} small />
      </View>
      <Text style={s.diffTitle}>{title}</Text>
      <Text style={s.diffSubtitle}>{subtitle}</Text>
    </Pressable>
  );
}

export default function TreasureSetupScreen({ onBack, onContinue }) {
  const [name, setName] = useState("");
  const [variant, setVariant] = useState("fog");
  const [players, setPlayers] = useState("solo");
  const [difficulty, setDifficulty] = useState("medium");
  const [contacts, setContacts] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [loadingContacts, setLoadingContacts] = useState(false);

  const selectedIds = useMemo(
    () => new Set(selectedFriends.map((friend) => friend.id)),
    [selectedFriends]
  );

  async function openContacts() {
    setPlayers("friends");

    if (Platform.OS === "web") {
      Alert.alert("Telefonbok", "Kontaktvalg må testes på iPhone eller Android-enhet.");
      return;
    }

    try {
      setLoadingContacts(true);
      const permission = await Contacts.requestPermissionsAsync();
      if (permission.status !== "granted") {
        Alert.alert(
          "Tilgang mangler",
          "Gi Live Rebus tilgang til kontakter i innstillingene for å invitere venner."
        );
        return;
      }

      const result = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
        sort: Contacts.SortTypes.FirstName,
        pageSize: 100
      });

      const available = (result.data || [])
        .filter((contact) => contact.name && contact.phoneNumbers?.[0]?.number)
        .map((contact) => ({
          id: contact.id,
          name: contact.name,
          phone: contact.phoneNumbers[0].number,
          status: "pending"
        }));

      setContacts(available);
      setContactModalOpen(true);
    } catch (error) {
      Alert.alert("Kunne ikke åpne telefonboken", "Prøv igjen på en fysisk enhet.");
    } finally {
      setLoadingContacts(false);
    }
  }

  function toggleFriend(contact) {
    setSelectedFriends((current) => {
      const exists = current.some((friend) => friend.id === contact.id);
      if (exists) return current.filter((friend) => friend.id !== contact.id);
      if (current.length >= MAX_FRIENDS) {
        Alert.alert("Maks 5 venner", "Du kan invitere opptil 5 venner til skattejakten.");
        return current;
      }
      return [...current, contact];
    });
  }

  function continueSetup() {
    onContinue?.({
      name,
      variant,
      players,
      difficulty,
      invitedContacts: players === "friends" ? selectedFriends : []
    });
  }

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={s.safe}>
      <KeyboardAvoidingView style={s.safe} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView
          contentContainerStyle={s.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
          alwaysBounceVertical={false}
          overScrollMode="never"
        >
          <View style={s.frame}>
            <TreasureSetupHeader onBack={onBack} onHelp={() => {}} />
            <View style={s.panel}>
              <Text style={s.label}>Navn på skattejakten</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="F.eks. Byjakten (vises for spillerne)"
                placeholderTextColor="#8E9AAF"
                style={s.input}
                accessibilityLabel="Navn på skattejakten"
              />

              <Text style={s.sectionTitle}>Velg spillemodus</Text>
              <Variant
                title="Tåkekart"
                description={"Kartet åpnes gradvis\nmens du beveger deg."}
                selected={variant === "fog"}
                onPress={() => setVariant("fog")}
              />
              <Variant
                title="Sonar"
                description={"Bruk signaler for å\nfinne skattene."}
                selected={variant === "sonar"}
                onPress={() => setVariant("sonar")}
                sonar
              />

              <Text style={s.subhead}>Hvem spiller?</Text>
              <View style={s.row}>
                {players === "solo" ? (
                  <Player
                    label="Alene"
                    icon="●"
                    color={C.orange}
                    selected
                    onPress={() => setPlayers("solo")}
                  />
                ) : null}

                <Player
                  label={loadingContacts ? "Åpner..." : "Med venner"}
                  icon="●●"
                  color={C.blue}
                  selected={players === "friends"}
                  onPress={openContacts}
                />

                {players === "friends" ? (
                  <Pressable
                    onPress={openContacts}
                    style={({ pressed }) => [s.inlineContactButton, pressed && s.pressed]}
                    accessibilityRole="button"
                    accessibilityLabel="Velg venner fra telefonboken"
                  >
                    <Text style={s.inlineContactIcon}>＋</Text>
                    <Text numberOfLines={2} style={s.inlineContactText}>
                      {selectedFriends.length > 0 ? `${selectedFriends.length} valgt` : "Telefonbok"}
                    </Text>
                  </Pressable>
                ) : null}
              </View>

              {players === "friends" && selectedFriends.length > 0 ? (
                <View style={s.inviteSummary}>
                  <Text style={s.inviteSummaryTitle}>{`${selectedFriends.length} av ${MAX_FRIENDS} valgt`}</Text>
                  {selectedFriends.map((friend) => (
                    <View key={friend.id} style={s.friendChip}>
                      <Text numberOfLines={1} style={s.friendChipText}>{friend.name}</Text>
                      <Pressable
                        onPress={() => toggleFriend(friend)}
                        hitSlop={8}
                        accessibilityRole="button"
                        accessibilityLabel={`Fjern ${friend.name}`}
                      >
                        <Text style={s.friendRemove}>×</Text>
                      </Pressable>
                    </View>
                  ))}
                </View>
              ) : null}

              <Text style={s.subhead}>Vanskelighetsgrad</Text>
              <View style={s.row}>
                <Difficulty stars="★" title="Enkel" subtitle="4 skatter" color={C.green} selected={difficulty === "easy"} onPress={() => setDifficulty("easy")} />
                <Difficulty stars="★★" title="Medium" subtitle="8 skatter" color={C.orange} selected={difficulty === "medium"} onPress={() => setDifficulty("medium")} />
                <Difficulty stars="★★★" title="Vanskelig" subtitle="12 skatter" color={C.purple} selected={difficulty === "hard"} onPress={() => setDifficulty("hard")} />
              </View>

              <Pressable
                onPress={continueSetup}
                style={({ pressed }) => [s.button, pressed && s.buttonPressed]}
                accessibilityRole="button"
                accessibilityLabel="Gå videre"
              >
                <Text style={s.buttonText}>Gå videre</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal visible={contactModalOpen} animationType="slide" onRequestClose={() => setContactModalOpen(false)}>
        <SafeAreaView style={s.modalSafe}>
          <View style={s.modalHeader}>
            <View>
              <Text style={s.modalTitle}>Velg venner</Text>
              <Text style={s.modalSubtitle}>{selectedFriends.length}/{MAX_FRIENDS} valgt</Text>
            </View>
            <Pressable onPress={() => setContactModalOpen(false)} style={s.doneButton} accessibilityRole="button">
              <Text style={s.doneButtonText}>Ferdig</Text>
            </Pressable>
          </View>

          <FlatList
            data={contacts}
            keyExtractor={(item) => item.id}
            contentContainerStyle={s.contactList}
            renderItem={({ item }) => {
              const selected = selectedIds.has(item.id);
              return (
                <Pressable
                  onPress={() => toggleFriend(item)}
                  style={({ pressed }) => [s.contactRow, selected && s.contactRowSelected, pressed && s.pressed]}
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: selected }}
                >
                  <View style={s.contactAvatar}><Text style={s.contactAvatarText}>{item.name.slice(0, 1).toUpperCase()}</Text></View>
                  <View style={s.contactCopy}>
                    <Text style={s.contactName}>{item.name}</Text>
                    <Text style={s.contactPhone}>{item.phone}</Text>
                  </View>
                  <Mark selected={selected} />
                </Pressable>
              );
            }}
            ListEmptyComponent={<Text style={s.emptyText}>Ingen kontakter med telefonnummer funnet.</Text>}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  scroll: { flexGrow: 1, alignItems: "center", backgroundColor: C.bg },
  frame: { width: "100%", maxWidth: 540, minHeight: "100%", backgroundColor: C.bg },
  panel: { marginHorizontal: 4, paddingHorizontal: 30, paddingTop: 18, paddingBottom: 70, borderWidth: 1, borderColor: "rgba(65,83,111,0.48)", borderRadius: 10, backgroundColor: C.panel },
  label: { color: C.text, fontSize: 17, lineHeight: 22, fontWeight: "700", marginBottom: 8 },
  input: { height: 53, borderRadius: 10, borderWidth: 1, borderColor: "#44536B", backgroundColor: "rgba(7,16,31,0.84)", color: C.text, fontSize: 18, paddingHorizontal: 18, marginBottom: 18 },
  sectionTitle: { color: C.orange, fontSize: 17, lineHeight: 22, fontWeight: "700", marginBottom: 8 },
  variant: { minHeight: 112, borderRadius: 14, borderWidth: 1, borderColor: C.border, backgroundColor: "rgba(5,15,29,0.92)", marginBottom: 10, paddingHorizontal: 12, paddingVertical: 8, flexDirection: "row", alignItems: "center", position: "relative", overflow: "visible" },
  selected: { borderColor: C.orange, borderWidth: 1.7 },
  fogSelected: { borderColor: "#B8C2CF", backgroundColor: "rgba(21,29,40,0.97)", shadowColor: "#B8C2CF", shadowOpacity: 0.28, shadowRadius: 14, shadowOffset: { width: 0, height: 0 }, elevation: 7 },
  sonarSelected: { borderColor: C.cyan, backgroundColor: "rgba(4,24,34,0.96)", shadowColor: C.cyan, shadowOpacity: 0.52, shadowRadius: 18, shadowOffset: { width: 0, height: 0 }, elevation: 10 },
  fogCardGlow: { position: "absolute", left: 7, right: 7, top: 7, bottom: 7, borderRadius: 11, borderWidth: 1, borderColor: "rgba(205,214,226,0.16)", backgroundColor: "rgba(205,214,226,0.025)" },
  sonarCardGlow: { position: "absolute", left: 7, right: 7, top: 7, bottom: 7, borderRadius: 11, borderWidth: 1, borderColor: "rgba(34,211,238,0.22)", backgroundColor: "rgba(34,211,238,0.035)" },
  pressed: { opacity: 0.78 },
  visual: { width: 100, alignItems: "center", justifyContent: "center", marginRight: 10 },
  visualSonarActive: { width: 108 },
  graphic: { width: 78, height: 78, borderRadius: 39, alignItems: "center", justifyContent: "center", overflow: "hidden" },
  fogGraphic: { backgroundColor: "#303846", borderWidth: 1, borderColor: "rgba(205,214,226,0.32)", shadowColor: "#AEB7C8", shadowOpacity: 0.32, shadowRadius: 11 },
  fogGraphicActive: { width: 88, height: 88, borderRadius: 44, borderWidth: 1.5, borderColor: "rgba(220,227,236,0.68)", shadowOpacity: 0.55, shadowRadius: 16, elevation: 8 },
  graphicRing: { position: "absolute", borderWidth: 1, borderRadius: 50, borderColor: "rgba(224,231,239,0.3)" },
  graphicRingOuter: { width: 64, height: 64 },
  graphicRingMiddle: { width: 44, height: 44 },
  graphicRingInner: { width: 24, height: 24 },
  graphicLineHorizontal: { position: "absolute", width: 54, height: 1, backgroundColor: "rgba(224,231,239,0.24)" },
  graphicLineVertical: { position: "absolute", width: 1, height: 54, backgroundColor: "rgba(224,231,239,0.24)" },
  graphicDot: { width: 14, height: 14, borderRadius: 7, backgroundColor: C.orange, borderWidth: 2, borderColor: "#FFFFFF", zIndex: 3 },
  fogHalo: { position: "absolute", width: 52, height: 52, borderRadius: 26, backgroundColor: "rgba(168,178,190,0.16)" },
  fogHaloActive: { width: 68, height: 68, borderRadius: 34, backgroundColor: "rgba(205,214,226,0.22)" },
  fogMistBandOne: { position: "absolute", width: 70, height: 14, borderRadius: 8, top: 22, backgroundColor: "rgba(225,231,238,0.09)", transform: [{ rotate: "-8deg" }] },
  fogMistBandTwo: { position: "absolute", width: 62, height: 12, borderRadius: 7, bottom: 20, backgroundColor: "rgba(225,231,238,0.07)", transform: [{ rotate: "7deg" }] },
  sonarGraphic: { width: 84, height: 84, borderRadius: 42, backgroundColor: "#04131C", borderWidth: 1.5, borderColor: "rgba(34,211,238,0.48)" },
  sonarGraphicActive: { width: 94, height: 94, borderRadius: 47, borderWidth: 2, borderColor: C.cyan, shadowColor: C.cyan, shadowOpacity: 0.75, shadowRadius: 16, shadowOffset: { width: 0, height: 0 }, elevation: 9 },
  sonarRingOuter: { width: 68, height: 68, borderColor: "rgba(34,211,238,0.32)" },
  sonarRingMiddle: { width: 46, height: 46, borderColor: "rgba(34,211,238,0.38)" },
  sonarRingInner: { width: 24, height: 24, borderColor: "rgba(34,211,238,0.44)" },
  sonarAxisHorizontal: { position: "absolute", width: 72, height: 1, backgroundColor: "rgba(34,211,238,0.18)" },
  sonarAxisVertical: { position: "absolute", width: 1, height: 72, backgroundColor: "rgba(34,211,238,0.18)" },
  sonarPulse: { position: "absolute", width: 68, height: 68, borderRadius: 34, borderWidth: 2, borderColor: "rgba(34,211,238,0.72)" },
  sonarSweep: { position: "absolute", width: 84, height: 84, alignItems: "center", justifyContent: "flex-start" },
  sonarBeam: { width: 2, height: 40, marginTop: 2, backgroundColor: C.cyan },
  sonarBlip: { position: "absolute", width: 7, height: 7, borderRadius: 4, top: 20, right: 19, backgroundColor: C.cyan, shadowColor: C.cyan, shadowOpacity: 0.9, shadowRadius: 8, elevation: 7 },
  sonarCoreOuter: { width: 18, height: 18, borderRadius: 9, backgroundColor: "#E8FDFF", alignItems: "center", justifyContent: "center", zIndex: 3 },
  sonarCoreInner: { width: 8, height: 8, borderRadius: 4, backgroundColor: C.cyan },
  variantCopy: { flex: 1, minWidth: 0, paddingRight: 34 },
  variantTitle: { color: C.text, fontSize: 20, lineHeight: 24, fontWeight: "700", marginBottom: 3 },
  fogText: { color: "#E3E8EF", textShadowColor: "rgba(205,214,226,0.28)", textShadowRadius: 6 },
  sonarText: { color: C.cyan, textShadowColor: "rgba(34,211,238,0.45)", textShadowRadius: 8 },
  variantDescription: { color: C.muted, fontSize: 14, lineHeight: 19 },
  variantMark: { position: "absolute", top: 10, right: 10 },
  mark: { width: 30, height: 30, borderRadius: 15, borderWidth: 1.5, borderColor: "#6E819F", alignItems: "center", justifyContent: "center", alignSelf: "flex-start" },
  markSmall: { width: 25, height: 25, borderRadius: 13 },
  markOn: { backgroundColor: C.orange, borderColor: C.orange },
  markOnSonar: { backgroundColor: C.cyan, borderColor: C.cyan, shadowColor: C.cyan, shadowOpacity: 0.65, shadowRadius: 8 },
  check: { color: "#111315", fontSize: 18, fontWeight: "900" },
  checkSonar: { color: "#02202A" },
  subhead: { color: C.text, fontSize: 17, lineHeight: 22, fontWeight: "700", marginTop: 4, marginBottom: 7 },
  row: { flexDirection: "row", gap: 8, marginBottom: 10 },
  player: { flex: 1, minHeight: 54, borderRadius: 10, borderWidth: 1, borderColor: C.border, backgroundColor: C.card, paddingLeft: 10, paddingRight: 32, flexDirection: "row", alignItems: "center", position: "relative" },
  playerIcon: { fontSize: 14, marginRight: 5 },
  playerText: { flex: 1, minWidth: 0, color: C.text, fontSize: 14, lineHeight: 18 },
  playerMark: { position: "absolute", top: 8, right: 7 },
  inlineContactButton: { flex: 1, minHeight: 54, borderRadius: 10, borderWidth: 1, borderColor: C.orange, backgroundColor: C.card, paddingHorizontal: 10, flexDirection: "row", alignItems: "center", justifyContent: "center" },
  inlineContactIcon: { color: C.orange, fontSize: 22, lineHeight: 24, marginRight: 5, fontWeight: "700" },
  inlineContactText: { flexShrink: 1, color: C.text, fontSize: 13, lineHeight: 16, fontWeight: "800", textAlign: "center" },
  difficulty: { flex: 1, minHeight: 60, borderRadius: 10, borderWidth: 1, borderColor: C.border, backgroundColor: C.card, paddingHorizontal: 9, paddingVertical: 3 },
  diffTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", minHeight: 16 },
  stars: { fontSize: 18, letterSpacing: 0.5 },
  diffTitle: { color: C.text, fontSize: 14, lineHeight: 17 },
  diffSubtitle: { color: C.muted, fontSize: 12, lineHeight: 15 },
  inviteSummary: { borderWidth: 1, borderColor: C.border, borderRadius: 10, padding: 10, marginBottom: 10, backgroundColor: C.card },
  inviteSummaryTitle: { color: C.text, fontSize: 14, fontWeight: "700", marginBottom: 8 },
  friendChip: { minHeight: 44, borderRadius: 10, backgroundColor: "rgba(20,39,61,0.95)", paddingHorizontal: 12, marginBottom: 6, flexDirection: "row", alignItems: "center" },
  friendChipText: { flex: 1, color: C.text, fontSize: 14 },
  friendRemove: { color: C.orange, fontSize: 26, lineHeight: 30, paddingHorizontal: 6 },
  button: { minHeight: 55, borderRadius: 10, backgroundColor: C.orange, alignItems: "center", justifyContent: "center", marginTop: 16, elevation: 6 },
  buttonPressed: { opacity: 0.82 },
  buttonText: { color: "#111315", fontSize: 23, fontWeight: "800" },
  modalSafe: { flex: 1, backgroundColor: C.bg },
  modalHeader: { minHeight: 76, paddingHorizontal: 18, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: C.border },
  modalTitle: { color: C.text, fontSize: 24, fontWeight: "900" },
  modalSubtitle: { color: C.muted, fontSize: 13, marginTop: 2 },
  doneButton: { minWidth: 64, minHeight: 44, borderRadius: 12, backgroundColor: C.orange, alignItems: "center", justifyContent: "center", paddingHorizontal: 14 },
  doneButtonText: { color: "#111315", fontSize: 15, fontWeight: "900" },
  contactList: { padding: 14 },
  contactRow: { minHeight: 66, borderRadius: 12, borderWidth: 1, borderColor: C.border, paddingHorizontal: 12, marginBottom: 8, flexDirection: "row", alignItems: "center", backgroundColor: C.card },
  contactRowSelected: { borderColor: C.orange, backgroundColor: "rgba(80,38,8,0.42)" },
  contactAvatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: "#17304E", alignItems: "center", justifyContent: "center", marginRight: 12 },
  contactAvatarText: { color: C.text, fontSize: 17, fontWeight: "900" },
  contactCopy: { flex: 1, minWidth: 0 },
  contactName: { color: C.text, fontSize: 16, fontWeight: "800" },
  contactPhone: { color: C.muted, fontSize: 13, marginTop: 2 },
  emptyText: { color: C.muted, fontSize: 15, textAlign: "center", marginTop: 40 }
});
