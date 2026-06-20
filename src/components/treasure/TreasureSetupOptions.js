import React, { useEffect, useRef } from "react";
import { Animated, Easing, Pressable, Text, View } from "react-native";
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

export function Player({ label, icon, color, selected, onPress }) {
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

export function Difficulty({ stars, title, subtitle, color, selected, onPress }) {
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
