import React, { useEffect, useRef, useState } from "react";
import { AccessibilityInfo, Animated, Easing, View } from "react-native";
import { styles } from "./SonarHuntScreen.styles";

const MOTION = {
  weak: { sweep: 3600, pulse: 1800, intensity: 0.45 },
  medium: { sweep: 3000, pulse: 1450, intensity: 0.6 },
  strong: { sweep: 2400, pulse: 1100, intensity: 0.78 },
  very_near: { sweep: 1700, pulse: 760, intensity: 1 }
};

export default function SonarDisplay({ active, level = "weak" }) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const sweep = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;
  const motion = MOTION[level] || MOTION.weak;

  useEffect(() => {
    let mounted = true;
    AccessibilityInfo.isReduceMotionEnabled()
      .then((enabled) => mounted && setReduceMotion(Boolean(enabled)))
      .catch(() => undefined);
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    sweep.stopAnimation();
    pulse.stopAnimation();
    sweep.setValue(0);
    pulse.setValue(0);

    if (!active || reduceMotion) return undefined;

    const sweepLoop = Animated.loop(Animated.timing(sweep, {
      toValue: 1,
      duration: motion.sweep,
      easing: Easing.linear,
      useNativeDriver: true
    }));
    const pulseLoop = Animated.loop(Animated.sequence([
      Animated.timing(pulse, {
        toValue: 1,
        duration: motion.pulse,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true
      }),
      Animated.timing(pulse, { toValue: 0, duration: 0, useNativeDriver: true })
    ]));

    sweepLoop.start();
    pulseLoop.start();
    return () => { sweepLoop.stop(); pulseLoop.stop(); };
  }, [active, motion.pulse, motion.sweep, pulse, reduceMotion, sweep]);

  const sweepRotate = sweep.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });
  const pulseScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.35, 1.18] });
  const pulseOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [motion.intensity, 0] });

  return (
    <View style={[styles.radarOuter, !active && styles.radarInactive]}>
      <View style={styles.radarRingLarge} />
      <View style={styles.radarRingMedium} />
      <View style={styles.radarRingSmall} />
      <View style={styles.axisHorizontal} />
      <View style={styles.axisVertical} />

      {active && !reduceMotion ? (
        <Animated.View
          pointerEvents="none"
          style={[styles.pulseRing, { opacity: pulseOpacity, transform: [{ scale: pulseScale }] }]}
        />
      ) : null}

      {active && !reduceMotion ? (
        <Animated.View pointerEvents="none" style={[styles.sweep, { transform: [{ rotate: sweepRotate }] }]}>
          <View style={[styles.sweepGlow, { opacity: motion.intensity }]} />
          <View style={styles.sweepLine} />
        </Animated.View>
      ) : null}

      <View style={[styles.playerOuter, active && styles.playerOuterActive]}>
        <View style={styles.playerInner} />
      </View>
    </View>
  );
}
