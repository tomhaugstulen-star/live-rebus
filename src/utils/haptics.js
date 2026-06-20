import * as Haptics from "expo-haptics";

export function triggerLightImpact() {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => null);
}
