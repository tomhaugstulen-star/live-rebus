import React from "react";
import { Pressable, Text, View } from "react-native";
import { Difficulty, Player } from "./TreasureSetupOptions";
import { getTreasureRules } from "../../utils/treasureRules";
import { C, styles as s } from "../../screens/treasure/TreasureSetupScreen.styles";

const MAX_FRIENDS = 5;
const DIFFICULTIES = [
  { key: "easy", stars: "★", title: "Enkel", color: C.green },
  { key: "medium", stars: "★★", title: "Medium", color: C.orange },
  { key: "hard", stars: "★★★", title: "Vanskelig", color: C.purple }
];
const PLAYER_ROW_STYLE = { gap: 8, marginBottom: 8 };
const PLAYER_BUTTON_WRAP = { minHeight: 52 };

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
  return (
    <>
      <Text style={s.subhead}>Hvem spiller?</Text>
      <View style={PLAYER_ROW_STYLE}>
        <View style={PLAYER_BUTTON_WRAP}>
          <Player
            label="Alene"
            icon="●"
            color={C.orange}
            selected={players === "solo"}
            onPress={() => setPlayers("solo")}
          />
        </View>

        <View style={PLAYER_BUTTON_WRAP}>
          <Player
            label="Med venner"
            icon="●●"
            color={C.blue}
            selected={players === "friends"}
            onPress={() => setPlayers("friends")}
          />
        </View>

        {players === "friends" ? (
          <Pressable
            onPress={openContacts}
            style={s.inlineContactButton}
            accessibilityRole="button"
            accessibilityLabel="Velg venner fra telefonboken"
          >
            <Text style={s.inlineContactIcon}>＋</Text>
            <Text numberOfLines={1} style={s.inlineContactText}>
              {loadingContacts
                ? "Åpner..."
                : selectedFriends.length > 0
                  ? `${selectedFriends.length} valgt`
                  : "Velg venner fra telefonbok"}
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
