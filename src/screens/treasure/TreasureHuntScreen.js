import React, { useEffect } from "react";
import FogHuntScreen from "./FogHuntScreen";
import SonarHuntScreen from "./SonarHuntScreen";

export default function TreasureHuntScreen({ active, onBack, ...props }) {
  useEffect(() => {
    if (!active) onBack?.();
  }, [active, onBack]);

  if (!active) return null;

  return props.config?.variant === "sonar"
    ? <SonarHuntScreen {...props} onBack={onBack} />
    : <FogHuntScreen {...props} onBack={onBack} />;
}
