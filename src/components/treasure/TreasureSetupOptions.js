import React from "react";
import { Pressable, Text, View } from "react-native";
import { styles as s } from "../../screens/treasure/TreasureSetupScreen.styles";

export function Mark({ selected, small, sonar }) {
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
  return (
    <View style={[s.graphic, s.fogGraphic, active && s.fogGraphicActive]}>
      <View style={[s.graphicRing, s.graphicRingOuter]} />
      <View style={[s.graphicRing, s.graphicRingMiddle]} />
      <View style={[s.graphicRing, s.graphicRingInner]} />
      <View style={s.graphicLineHorizontal} />
      <View style={s.graphicLineVertical} />
      <View style={s.graphicDot} />
    </View>
  );
}

function SonarGraphic({ active }) {
  return (
    <View style={[s.graphic, s.sonarGraphic, active && s.sonarGraphicActive]}>
      <View style={[s.graphicRing, s.sonarRingOuter]} />
      <View style={[s.graphicRing, s.sonarRingMiddle]} />
      <View style={[s.graphicRing, s.sonarRingInner]} />
      <View style={s.sonarAxisHorizontal} />
      <View style={s.sonarAxisVertical} />
      <View style={s.sonarSweep}>
        <View style={s.sonarBeam} />
      </View>
      <View style={s.sonarBlip} />
      <View style={s.sonarCoreOuter}>
        <View style={s.sonarCoreInner} />
      </View>
    </View>
  );
}

export function Variant({ title, description, selected, onPress, sonar }) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        s.variant,
        selected && s.selected,
        selected && !sonar && s.fogSelected,
        selected && sonar && s.sonarSelected
      ]}
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      <View style={[s.visual, sonar && selected && s.visualSonarActive]}>
        {sonar ? <SonarGraphic active={selected} /> : <FogGraphic active={selected} />}
      </View>
      <View style={s.variantCopy}>
        <Text style={[s.variantTitle, selected && sonar && s.sonarText, selected && !sonar && s.fogText]}>
          {title}
        </Text>
        <Text style={s.variantDescription}>{description}</Text>
      </View>
      <View style={s.variantMark}>
        <Mark selected={selected} sonar={sonar} />
      </View>
    </Pressable>
  );
}

export function Player({ label, accessibilityLabel, selected, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={[s.player, selected && s.selected]}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || label}
      accessibilityState={{ selected }}
    >
      <Text numberOfLines={1} style={s.playerText}>{label}</Text>
      <View style={s.playerMark}><Mark selected={selected} small /></View>
    </Pressable>
  );
}

export function Difficulty({ stars, title, subtitle, color, selected, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={[s.difficulty, selected && s.selected]}
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      <View style={s.diffStarsBox}>
        <Text numberOfLines={1} style={[s.stars, { color }]}>{stars}</Text>
      </View>
      <View style={s.diffCopy}>
        <Text numberOfLines={1} style={s.diffTitle}>{title}</Text>
        <Text numberOfLines={1} style={s.diffSubtitle}>{subtitle}</Text>
      </View>
      <View style={s.diffMark}><Mark selected={selected} small /></View>
    </Pressable>
  );
}
