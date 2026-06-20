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
import TreasureSetupDetails from "../../components/treasure/TreasureSetupDetails";
import TreasureSetupHeader from "../../components/treasure/TreasureSetupHeader";
import { Mark, Variant } from "../../components/treasure/TreasureSetupOptions";
import { styles as s } from "./TreasureSetupScreen.styles";

const BACKGROUND_IMAGE = require("../../../assets/images/treasure/treasure-setup-header.webp");
const MAX_FRIENDS = 5;

export default function TreasureSetupScreen({ initialVariant, onBack, onContinue }) {
  const lockedVariant = initialVariant === "sonar" || initialVariant === "fog";
  const [variant, setVariant] = useState(lockedVariant ? initialVariant : "fog");
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
              {lockedVariant ? null : (
                <>
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
                </>
              )}

              {lockedVariant || variant === "sonar" ? (
                <TreasureSetupDetails
                  players={players}
                  setPlayers={setPlayers}
                  loadingContacts={loadingContacts}
                  openContacts={openContacts}
                  selectedFriends={selectedFriends}
                  toggleFriend={toggleFriend}
                  difficulty={difficulty}
                  setDifficulty={setDifficulty}
                  onContinue={continueSetup}
                />
              ) : null}
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
                    style={s.contactRow}
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
