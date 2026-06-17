import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import FogHuntScreen from "./FogHuntScreen";
import SonarHuntScreen from "./SonarHuntScreen";

export default function TreasureHuntScreen({ active, onBack, ...props }) {
  const entrance = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!active) return undefined;

    entrance.setValue(0);
    const animation = Animated.timing(entrance, {
      toValue: 1,
      duration: 900,
      delay: 120,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true
    });

    animation.start();
    return () => animation.stop();
  }, [active, entrance]);

  if (!active) return null;

  const animatedStyle = {
    flex: 1,
    opacity: entrance,
    transform: [
      {
        scale: entrance.interpolate({
          inputRange: [0, 1],
          outputRange: [0.985, 1]
        })
      }
    ]
  };

  return (
    <Animated.View style={animatedStyle}>
      {props.config?.variant === "sonar"
        ? <SonarHuntScreen {...props} onBack={onBack} />
        : <FogHuntScreen {...props} onBack={onBack} />}
    </Animated.View>
  );
}
