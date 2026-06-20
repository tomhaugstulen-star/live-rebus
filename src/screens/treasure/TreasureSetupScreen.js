import React, { useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
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
import { Mark, Player } from "../../components/treasure/TreasureSetupOptions";
import { triggerLightImpact } from "../../utils/haptics";
import { C, styles as s } from "./TreasureSetupScreen.styles";

const MAX_FRIENDS = 5;
const SONAR_ACCENT = "#22D3EE";
const fogSetupBackground = require("../../../assets/images/home/home-background.webp");
const sonarSetupBackground = require("../../../assets/images/treasure/sonar-setup-background.webp");
const sonarPlayerSolo = require("../../../assets/images/treasure/sonar-player-solo.webp");
const sonarPlayerTeam = require("../../../assets/images/treasure/sonar-player-team.webp");
const sonarPanelStyle = { backgroundColor: "transparent", borderColor: "transparent", borderWidth: 0 };

export default function TreasureSetupScreen({ initialVariant = "fog", onBack, onContinue }) {
  const variant = initialVariant === "sonar" ? "sonar" : "fog";
  const isSonar = variant === "sonar";
  const setupBackground = isSonar ? sonarSetupBackground : fogSetupBackground;
  const [players, setPlayers] = useState(null);
  const [difficulty] = useState("medium");
  const [contacts, setContacts] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [loadingContacts, setLoadingContacts] = useState(false);

  const selectedIds = useMemo(
    () => new Set(selectedFriends.map((friend) => friend.id)),
    [selectedFriends]
  );

  function choosePlayers(nextPlayers) {
    triggerLightImpact();
    setPlayers(nextPlayers);
  }

  async function openContacts() {
    triggerLightImpact();
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
    if (!players) return;
    onContinue?.({
      variant,
      players,
      difficulty,
      invitedContacts: players === "friends" ? selectedFriends : []
    });
  }

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={s.safe}>
      <Image source={setupBackground} style={s.backgroundImage} resizeMode="cover" />
      <View pointerEvents="none" style={s.backgroundOverlay} />
      <ScrollView
        contentContainerStyle={s.scroll}
        showsVerticalScrollIndicator={false}
        bounces={false}
        alwaysBounceVertical={false}
        overScrollMode="never"
      >
        <View style={s.frame}>
          <TreasureSetupHeader
            onBack={onBack}
            title={isSonar ? "Sonar" : "Skatte"}
            titleAccent={isSonar ? "" : "jakt"}
            subtitle={isSonar ? "Kalibrer søket ditt" : "Sett opp eventyret ditt"}
            accentColor={isSonar ? SONAR_ACCENT : C.orange}
            imageSource={isSonar ? sonarSetupBackground : undefined}
            imageStyle={isSonar ? { transform: [{ translateX: 0 }] } : undefined}
          />
          <View style={[s.panel, isSonar && sonarPanelStyle]}>
            <Text style={s.subhead}>{isSonar ? "Velg sonar-team" : "Hvem spiller du med?"}</Text>
            <View style={s.row}>
              <Player
                label={isSonar ? "Solo-søk" : "Alene"}
                icon={isSonar ? "⦿" : "●"}
                color={isSonar ? SONAR_ACCENT : C.orange}
                selected={players === "solo"}
                onPress={() => choosePlayers("solo")}
                imageSource={isSonar ? sonarPlayerSolo : undefined}
              />
              <Player
                label={loadingContacts ? "Åpner..." : isSonar ? "Med team" : "Med venner"}
                icon={isSonar ? "≋" : "●●"}
                color={isSonar ? SONAR_ACCENT : C.blue}
                selected={players === "friends"}
                onPress={() => choosePlayers("friends")}
                imageSource={isSonar ? sonarPlayerTeam : undefined}
              />
            </View>

            {players === "friends" ? (
              <>
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

                {selectedFriends.length > 0 ? (
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
              </>
            ) : null}

            {players ? (
              <Pressable
                onPress={continueSetup}
                style={({ pressed }) => [s.button, pressed && s.buttonPressed]}
                accessibilityRole="button"
                accessibilityLabel="Gå videre"
              >
                <Text style={s.buttonText}>Gå videre</Text>
              </Pressable>
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
