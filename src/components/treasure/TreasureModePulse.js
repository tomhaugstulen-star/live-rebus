import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

export default function TreasureModePulse({
  variant = "fog",
  size = 220,
  repeat = false,
  style
}) {
  const progress = useRef(new Animated.Value(0)).current;
  const isSonar = variant === "sonar";

  useEffect(() => {
    const animation = Animated.timing(progress, {
      toValue: 1,
      duration: isSonar ? 1450 : 1100,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true
    });

    if (repeat || isSonar) {
      const loop = Animated.loop(
        Animated.sequence([
          animation,
          Animated.delay(isSonar ? 260 : 500),
          Animated.timing(progress, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true
          })
        ])
      );

      loop.start();
      return () => loop.stop();
    }

    animation.start();
    return () => animation.stop();
  }, [isSonar, progress, repeat]);

  const scale = progress.interpolate({
    inputRange: [0, 1],
    outputRange: isSonar ? [0.35, 1.45] : [0.18, 1.7]
  });

  const opacity = progress.interpolate({
    inputRange: [0, 0.58, 1],
    outputRange: isSonar ? [0.9, 0.45, 0] : [0.72, 0.26, 0]
  });

  return (
    <View pointerEvents="none" style={[styles.container, { width: size, height: size }, style]}>
      <Animated.View
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderColor: isSonar ? "rgba(34, 211, 238, 0.85)" : "rgba(148, 163, 184, 0.72)",
            backgroundColor: isSonar ? "rgba(34, 211, 238, 0.08)" : "rgba(148, 163, 184, 0.16)",
            opacity,
            transform: [{ scale }]
          }
        ]}
      />
      {isSonar ? <View style={[styles.core, { borderColor: "rgba(34, 211, 238, 0.8)" }]} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center"
  },
  circle: {
    position: "absolute",
    borderWidth: 2
  },
  core: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    backgroundColor: "rgba(34, 211, 238, 0.18)"
  }
});
