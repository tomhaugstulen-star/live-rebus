import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

export default function SonarSetupRadar() {
  const sweep = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const sweepLoop = Animated.loop(
      Animated.timing(sweep, {
        toValue: 1,
        duration: 2600,
        easing: Easing.linear,
        useNativeDriver: true
      })
    );
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true
        })
      ])
    );

    sweepLoop.start();
    pulseLoop.start();

    return () => {
      sweepLoop.stop();
      pulseLoop.stop();
    };
  }, [pulse, sweep]);

  const rotate = sweep.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });
  const pulseScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.55, 1.18] });
  const pulseOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.55, 0] });

  return (
    <View pointerEvents="none" style={styles.wrap}>
      <View style={styles.glow} />
      <View style={[styles.ring, styles.outerRing]} />
      <View style={[styles.ring, styles.middleRing]} />
      <View style={[styles.ring, styles.innerRing]} />
      <View style={styles.axisHorizontal} />
      <View style={styles.axisVertical} />
      <Animated.View style={[styles.pulse, { opacity: pulseOpacity, transform: [{ scale: pulseScale }] }]} />
      <Animated.View style={[styles.sweep, { transform: [{ rotate }] }]}>
        <View style={styles.beam} />
      </Animated.View>
      <View style={styles.blipOne} />
      <View style={styles.blipTwo} />
      <View style={styles.coreOuter}>
        <View style={styles.coreInner} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 230,
    height: 230,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 44
  },
  glow: {
    position: "absolute",
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: "rgba(34,211,238,0.08)"
  },
  ring: {
    position: "absolute",
    borderWidth: 2,
    borderRadius: 200,
    borderColor: "rgba(34,211,238,0.34)"
  },
  outerRing: { width: 212, height: 212 },
  middleRing: { width: 144, height: 144, borderColor: "rgba(34,211,238,0.44)" },
  innerRing: { width: 74, height: 74, borderColor: "rgba(143,255,255,0.52)" },
  axisHorizontal: { position: "absolute", width: 214, height: 1, backgroundColor: "rgba(143,255,255,0.16)" },
  axisVertical: { position: "absolute", width: 1, height: 214, backgroundColor: "rgba(143,255,255,0.16)" },
  pulse: { position: "absolute", width: 174, height: 174, borderRadius: 87, borderWidth: 2, borderColor: "rgba(143,255,255,0.7)" },
  sweep: { position: "absolute", width: 214, height: 214, alignItems: "center", justifyContent: "flex-start" },
  beam: { width: 3, height: 108, backgroundColor: "rgba(34,211,238,0.9)", shadowColor: "#22D3EE", shadowOpacity: 0.9, shadowRadius: 14 },
  blipOne: { position: "absolute", top: 62, right: 68, width: 10, height: 10, borderRadius: 5, backgroundColor: "#8FFFFF" },
  blipTwo: { position: "absolute", bottom: 72, left: 76, width: 7, height: 7, borderRadius: 4, backgroundColor: "#22D3EE" },
  coreOuter: { width: 28, height: 28, borderRadius: 14, backgroundColor: "#DFFBFF", alignItems: "center", justifyContent: "center" },
  coreInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: "#22D3EE" }
});
