import React, { useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  ImageBackground,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Contacts from "expo-contacts/legacy";
import TreasureSetupHeader from "../../components/treasure/TreasureSetupHeader";
import { Difficulty, Mark, Player, Variant } from "../../components/treasure/TreasureSetupOptions";
import { getTreasureRules } from "../../utils/treasureRules";
import { C, styles as s } from "./TreasureSetupScreen.styles";

const BACKGROUND_IMAGE = require("../../../assets/images/treasure/treasure-setup-header.webp");
const MAX_FRIENDS = 5;
const DIFFICULTIES = [
  { key: "easy", stars: "★", title: "Enkel", color: C.green, place: "Bakgård eller liten lekeplass" },
  { key: "medium", stars: "★★", title: "Medium", color: C.orange, place: "Skolegård, park eller større hage" },
  { key: "hard", stars: "★★★", title: "Vanskelig", color: C.purple, place: "Stor park eller åpent uteområde" }
];

function formatMeters(value) {
  return String(value).replace(".", ",");
}

export default function TreasureSetupScreen({ onBack, onContinue }) {
  const [variant, setVariant] = useState("fog");
  const [players, setPlayers] = useState("solo");
  const [difficulty, setDifficulty] = useState("medium");
  const [contacts, setContacts] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [loadingContacts, setLoadingContacts] = useState(false);

  const selectedDifficulty = DIFFICULTIES.find((item) => item.key === difficulty) || DIFFICULTIES[1];
  const selectedRules = getTreasureRules(selectedDifficulty.key);
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
    onContinue?.({
      variant,
      players,
      difficulty,
      invitedContacts: players === "friends" ? selectedFriends : []
    });
  }

  return (
    <ImageBackground
      source={BACKGROUND_IMAGE}
      resizeMode="cover"
      style={s.background}
      imageStyle={s.backgroundImage}
    >
      <View pointerEvents="none" style={s.backgroundOverlay} />
      <SafeAreaView edges={["left", "right", "bottom"]} style={s.safe}>
        <ScrollView
          contentContainerStyle={s.scroll}
          showsVerticalScrollIndicator={false}
          bounces={false}
          alwaysBounceVertical={false}
          overScrollMode="never"
        >
          <View style={s.frame}>
            <TreasureSetupHeader onBack={onBack} onHelp={() => {}} />
            <View style={s.panel}>
              <Text style={s.sectionTitle}>Velg jaktmodus</Text>
              <Variant
                title="Tåkejakt"
                description={"Kartet åpnes gradvis\nmens du beveger deg."}
                selected={variant === "fog"}
                onPress={() => setVariant("fog")}
              />
              <Variant
                title="Sonar"
                description={"Bruk signaler for\nå finne skattene."}
                selected={variant === "sonar"}
                onPress={() => setVariant("sonar")}
                sonar
              />

              <Text style={s.subhead}>Hvem spiller?</Text>
              <View style={s.row}>
                {players === "solo" ? (
                  <Player label="Alene" icon="●" color={C.orange} selected onPress={() => setPlayers("solo")} />
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
                      subtitle={`${rules.total} skatter`}
                      color={option.color}
                      selected={difficulty === option.key}
                      onPress={() => setDifficulty(option.key)}
                    />
                  );
                })}
              </View>

              <View style={s.difficultyInfo}>
                <Text style={s.difficultyInfoTitle}>{selectedDifficulty.title} valgt</Text>
                <Text style={s.difficultyInfoText}>{selectedDifficulty.place}</Text>
                <View style={s.infoRow}>
                  <Text style={s.infoLabel}>Område</Text>
                  <Text style={s.infoValue}>ca. {selectedRules.recommendedAreaDiameterMeters} m</Text>
                </View>
                <View style={s.infoRow}>
                  <Text style={s.infoLabel}>Sonar</Text>
                  <Text style={s.infoValue}>ca. {formatMeters(selectedRules.sonarForwardVisibilityMeters)} m foran deg</Text>
                </View>
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
    </ImageBackground>
  );
}
