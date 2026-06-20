import React from "react";
import { Pressable, Text, View } from "react-native";
import { Difficulty, Player } from "./TreasureSetupOptions";
import { getTreasureRules } from "../../utils/treasureRules";
import { C, styles as s } from "../../screens/treasure/TreasureSetupScreen.styles";

const MAX_FRIENDS = 5;
const DIFFICULTIES = [
  { key: "easy", stars: "★", title: "Enkel", color: C.green, place: "Bakgård eller liten lekeplass" },
  { key: "medium", stars: "★★", title: "Medium", color: C.orange, place: "Skolegård, park eller større hage" },
  { key: "hard", stars: "★★★", title: "Vanskelig", color: C.purple, place: "Stor park eller åpent uteområde" }
];

function formatMeters(value) {
  return String(value).replace(".", ",");
}

export default function TreasureSetupDetails({
  players,
  setPlayers,
  loadingContacts,
  openContacts,
  selectedFriends,
  toggleFriend,
  difficulty,
  setDifficulty,
  onContinue
}) {
  const selectedDifficulty = DIFFICULTIES.find((item) => item.key === difficulty) || DIFFICULTIES[1];
  const selectedRules = getTreasureRules(selectedDifficulty.key);

  return (
    <>
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
            style={s.inlineContactButton}
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
      <View style={s.difficultyRow}>
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
        onPress={onContinue}
        style={s.button}
        accessibilityRole="button"
        accessibilityLabel="Gå videre"
      >
        <Text style={s.buttonText}>Gå videre</Text>
      </Pressable>
    </>
  );
}
