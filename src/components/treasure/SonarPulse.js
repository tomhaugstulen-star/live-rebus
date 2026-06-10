import React, { useEffect, useMemo, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

const MAX_DISTANCE = 80;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getPulseDuration(distance) {
  if (distance <= 5) return 1150;
  if (distance <= 15) return 1450;
  if (distance <= 30) return 1800;
  return 2300;
}

function getRingSize(distance, baseSize) {
  const distanceFactor = clamp(distance / MAX_DISTANCE, 0, 1);
  return Math.round(baseSize + distanceFactor * 34);
}

export default function SonarPulse({ distance = MAX_DISTANCE, signalLevel = "Svakt signal", isClose = false }) {
  const pulse = useRef(new Animated.Value(0)).current;
  const safeDistance = clamp(distance, 0, MAX_DISTANCE);
  const pulseDuration = getPulseDuration(safeDistance);

  const rings = useMemo(
    () => [
      getRingSize(safeDistance, 62),
      getRingSize(safeDistance, 104),
      getRingSize(safeDistance, 146)
    ],
    [safeDistance]
  );

  useEffect(() => {
    pulse.setValue(0);

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: pulseDuration,
          useNativeDriver: true
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 260,
          useNativeDriver: true
        })
      ])
    );

    animation.start();

    return () => animation.stop();
  }, [pulse, pulseDuration]);

  const animatedScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.96, isClose ? 1.08 : 1.04]
  });

  const animatedOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.48, isClose ? 0.95 : 0.7]
  });

  return (
    <View style={styles.wrap}>
      <Animated.View
        style={[
          styles.pulseLayer,
          {
            opacity: animatedOpacity,
            transform: [{ scale: animatedScale }]
          }
        ]}
      >
        <View
          style={[
            styles.pulseRing,
            {
              width: rings[2],
              height: rings[2],
              borderRadius: rings[2] / 2,
              opacity: safeDistance <= 15 ? 0.75 : 0.35
            }
          ]}
        />
        <View
          style={[
            styles.pulseRing,
            styles.pulseRingStrong,
            {
              width: rings[1],
              height: rings[1],
              borderRadius: rings[1] / 2,
              opacity: safeDistance <= 30 ? 0.85 : 0.45
            }
          ]}
        />
        <View
          style={[
            styles.pulseRing,
            styles.pulseRingHot,
            {
              width: rings[0],
              height: rings[0],
              borderRadius: rings[0] / 2,
              opacity: isClose ? 1 : 0.55
            }
          ]}
        />
      </Animated.View>

      <View style={styles.scanLine} />

      <View style={styles.sonarCenter}>
        <View style={styles.sonarDot} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 220,
    borderRadius: 22,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.18)"
  },
  pulseLayer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center"
  },
  sonarCenter: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F59E0B",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3,
    borderWidth: 3,
    borderColor: "rgba(253, 230, 138, 0.7)"
  },
  sonarDot: {
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: "#111827"
  },
  pulseRing: {
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(34, 197, 94, 0.34)"
  },
  pulseRingStrong: {
    borderColor: "rgba(245, 158, 11, 0.48)",
    borderWidth: 2
  },
  pulseRingHot: {
    borderColor: "rgba(34, 197, 94, 0.7)",
    borderWidth: 2
  },
  scanLine: {
    position: "absolute",
    width: 2,
    height: 104,
    backgroundColor: "rgba(34, 197, 94, 0.35)",
    transform: [{ rotate: "42deg" }],
    top: 30,
    zIndex: 1
  }
});
