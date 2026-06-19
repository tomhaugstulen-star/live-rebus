import React, { useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Contacts from "expo-contacts/legacy";
import TreasureSetupHeader from "../../components/treasure/TreasureSetupHeader";
import { Difficulty, Mark, Player, Variant } from "../../components/treasure/TreasureSetupOptions";
import { getTreasureRules } from "../../utils/treasureRules";
import { C, styles as s } from "./TreasureSetupScreen.styles";

const MAX_FRIENDS = 5;
const DIFFICULTIES = [
  { key: "easy", stars: "★", title: "Enkel", color: C.green },
  { key: "medium", stars: "★★", title: "Medium", color: C.orange },
  { key: "hard", stars: "★★★", title: "Vanskelig", color: C.purple }
];

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
    } catch {
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
    const cleanName = name.trim() || "Skattejakt";

    onContinue?.({
      name: variant === "sonar" ? `Sonar · ${cleanName}` : cleanName,
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
                {DIFFICULTIES.map((option) => {
                  const rules = getTreasureRules(option.key);
                  return (
                    <Difficulty
                      key={option.key}
                      stars={option.stars}
                      title={option.title}
                      subtitle={`${rules.total} skatter · ${rules.areaLabel}`}
                      color={option.color}
                      selected={difficulty === option.key}
                      onPress={() => setDifficulty(option.key)}
                    />
                  );
                })}
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
                  <View style={s.contactAvatar}>
                    <Text style={s.contactAvatarText}>{item.name.slice(0, 1).toUpperCase()}</Text>
                  </View>
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
