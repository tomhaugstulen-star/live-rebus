import React from "react";
import FogHuntScreen from "./FogHuntScreen";
import SonarHuntScreen from "./SonarHuntScreen";

export default function TreasureHuntScreen(props) {
  return props.config?.variant === "sonar"
    ? <SonarHuntScreen {...props} />
    : <FogHuntScreen {...props} />;
}
