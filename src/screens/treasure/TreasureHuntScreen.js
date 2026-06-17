import React, { useEffect } from "react";
import { Platform } from "react-native";
import FogHuntScreen from "./FogHuntScreen";
import SonarHuntScreen from "./SonarHuntScreen";
import { getTreasureRules } from "../../utils/treasureRules";
import {
  registerTreasureSessionFound,
  startTreasureSession
} from "../../utils/treasureSessionStore";

export default function TreasureHuntScreen({ active, onBack, ...props }) {
  const isWebPreview = Platform.OS === "web";

  useEffect(() => {
    if (!active || !isWebPreview) return;

    const rules = getTreasureRules(props.config?.difficulty);
    let session = startTreasureSession(props.config);

    while ((session?.treasuresFound || 0) < rules.total) {
      session = registerTreasureSessionFound(props.config);
    }

    props.onFound?.();
  }, [active, isWebPreview, props.config, props.onFound]);

  if (!active || isWebPreview) return null;

  return props.config?.variant === "sonar"
    ? <SonarHuntScreen {...props} onBack={onBack} />
    : <FogHuntScreen {...props} onBack={onBack} />;
}
