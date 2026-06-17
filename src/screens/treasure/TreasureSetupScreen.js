import React, { useMemo, useState } from "react";
import {
  Alert,
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
  blue: "#7288AA",
  green: "#23C96B"
};

function Mark({ selected, small }) {
  return (
    <View style={[s.mark, small && s.markSmall, selected && s.markOn]}>
      {selected ? <Text style={s.check}>✓</Text> : null}
    </View>
  );
}

function VariantGraphic({ sonar }) {
  return (
    <View style={[s.graphic, sonar ? s.sonarGraphic : s.fogGraphic]}>
      <View style={[s.graphicRing, s.graphicRingOuter, sonar && s.graphicRingPurple]} />
      <View style={[s.graphicRing, s.graphicRingMiddle, sonar && s.graphicRingPurple]} />
      <View style={[s.graphicRing, s.graphicRingInner, sonar && s.graphicRingPurple]} />
      <View style={[s.graphicLineHorizontal, sonar && s.sonarBeam]} />
      {!sonar ? <View style={s.graphicLineVertical} /> : null}
      <View style={[s.graphicDot, sonar && s.sonarDot]} />
      {!sonar ? <View style={s.fogHalo} /> : null}
    </View>
  );
}

function Variant({ title, description, selected, onPress, sonar }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [s.variant, selected && s.selected, pressed && s.pressed]}
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      <View style={s.visual}><VariantGraphic sonar={sonar} /></View>
      <View style={s.variantCopy}>
        <Text style={s.variantTitle}>{title}</Text>
        <Text style={s.variantDescription}>{description}</Text>
      </View>
      <View style={s.variantMark}><Mark selected={selected} /></View>
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
                      {selectedFriends.length > 0
                        ? `${selectedFriends.length} valgt`
                        : "Telefonbok"}
                    </Text>
                  </Pressable>
                ) : null}
              </View>

              {players === "friends" && selectedFriends.length > 0 ? (
                <View style={s.inviteSummary}>
                  <Text style={s.inviteSummaryTitle}>
                    {`${selectedFriends.length} av ${MAX_FRIENDS} valgt`}
                  </Text>
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
  variant: { minHeight: 106, borderRadius: 12, borderWidth: 1, borderColor: C.border, backgroundColor: "rgba(5,15,29,0.92)", marginBottom: 10, paddingHorizontal: 12, paddingVertical: 7, flexDirection: "row", alignItems: "center", position: "relative" },
  selected: { borderColor: C.orange, borderWidth: 1.7 },
  pressed: { opacity: 0.78 },
  visual: { width: 98, alignItems: "center", justifyContent: "center", marginRight: 10 },
  graphic: { width: 78, height: 78, borderRadius: 39, alignItems: "center", justifyContent: "center", overflow: "hidden" },
  fogGraphic: { backgroundColor: "#303846", borderWidth: 1, borderColor: "rgba(205,214,226,0.32)", shadowColor: "#AEB7C8", shadowOpacity: 0.32, shadowRadius: 11 },
  sonarGraphic: { backgroundColor: "rgba(61,30,117,0.28)", borderWidth: 2, borderColor: C.purple },
  graphicRing: { position: "absolute", borderWidth: 1, borderRadius: 44, borderColor: "rgba(224,231,239,0.3)" },
  graphicRingOuter: { width: 64, height: 64 },
  graphicRingMiddle: { width: 44, height: 44 },
  graphicRingInner: { width: 24, height: 24 },
  graphicRingPurple: { borderColor: "rgba(139,77,255,0.72)" },
  graphicLineHorizontal: { position: "absolute", width: 54, height: 1, backgroundColor: "rgba(224,231,239,0.24)" },
  graphicLineVertical: { position: "absolute", width: 1, height: 54, backgroundColor: "rgba(224,231,239,0.24)" },
  sonarBeam: { height: 2, backgroundColor: C.purple, transform: [{ rotate: "-45deg" }, { translateX: 11 }] },
  graphicDot: { width: 14, height: 14, borderRadius: 7, backgroundColor: C.orange, borderWidth: 2, borderColor: "#FFFFFF", zIndex: 2 },
  sonarDot: { width: 9, height: 9, borderRadius: 5, backgroundColor: C.purple, borderWidth: 0 },
  fogHalo: { position: "absolute", width: 52, height: 52, borderRadius: 26, backgroundColor: "rgba(168,178,190,0.10)" },
  variantCopy: { flex: 1, minWidth: 0, paddingRight: 34 },
  variantTitle: { color: C.text, fontSize: 20, lineHeight: 24, fontWeight: "700", marginBottom: 3 },
  variantDescription: { color: C.muted, fontSize: 14, lineHeight: 19 },
  variantMark: { position: "absolute", top: 10, right: 10 },
  mark: { width: 30, height: 30, borderRadius: 15, borderWidth: 1.5, borderColor: "#6E819F", alignItems: "center", justifyContent: "center", alignSelf: "flex-start" },
  markSmall: { width: 25, height: 25, borderRadius: 13 },
  markOn: { backgroundColor: C.orange, borderColor: C.orange },
  check: { color: "#111315", fontSize: 18, fontWeight: "900" },
  subhead: { color: C.text, fontSize: 17, lineHeight: 22, fontWeight: "700", marginTop: 4, marginBottom: 7 },
  row: { flexDirection: "row", gap: 8, marginBottom: 10 },
  player: { flex: 1, minHeight: 54, borderRadius: 10, borderWidth: 1, borderColor: C.border, backgroundColor: C.card, paddingLeft: 10, paddingRight: 32, flexDirection: "row", alignItems: "center", position: "relative" },
  playerIcon: { fontSize: 14, marginRight: 5 },
  playerText: { flex: 1, minWidth: 0, color: C.text, fontSize: 14, lineHeight: 18 },
  playerMark: { position: "absolute", top: 8, right: 7 },
  inlineContactButton: { flex: 1, minHeight: 54, borderRadius: 10, borderWidth: 1, borderColor: C.orange, backgroundColor: C.card, paddingHorizontal: 10, flexDirection: "row", alignItems: "center", justifyContent: "center" },
  inlineContactIcon: { color: C.orange, fontSize: 22, lineHeight: 24, marginRight: 5, fontWeight: "700" },
  inlineContactText: { flexShrink: 1, color: C.orange, fontSize: 13, lineHeight: 16, fontWeight: "800", textAlign: "center" },
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
