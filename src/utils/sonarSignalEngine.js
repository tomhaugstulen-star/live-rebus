const TEST_PROGRESS_STEP = 18;

export const SONAR_SIGNAL_RANK = {
  weak: 0,
  medium: 1,
  strong: 2,
  very_near: 3
};

export function createSonarSignalState() {
  return { progress: 0, rewardReady: false };
}

export function resetSonarSignalState() {
  return createSonarSignalState();
}

export function advanceSonarSignal(state = createSonarSignalState()) {
  const nextProgress = Math.min(100, state.progress + TEST_PROGRESS_STEP);
  return {
    ...state,
    progress: nextProgress,
    rewardReady: nextProgress >= 100
  };
}

export function getGeneratedSonarSignal(state = createSonarSignalState(), gameStarted) {
  if (!gameStarted) return {
    level: "weak",
    strength: "Klar",
    title: "På riktig sted?",
    help: "Hold telefonen foran deg som en ekte sonar.",
    hint: "Sonaren aktiveres når spillet starter"
  };

  if (state.rewardReady) return {
    level: "very_near",
    strength: "Svært nær",
    title: "STOPP! Nytt signal funnet",
    help: "Snu deg rundt og sjekk området før du åpner funnet.",
    hint: "Signalet er låst"
  };

  if (state.progress >= 70) return {
    level: "strong",
    strength: "Sterkt",
    title: "Sterkt signal",
    help: "Gå rolig. Sonaren nærmer seg et funn.",
    hint: "Pulsen blir raskere"
  };

  if (state.progress >= 35) return {
    level: "medium",
    strength: "Middels",
    title: "Middels signal",
    help: "Fortsett å lete rolig i området.",
    hint: "Signalet blir tydeligere"
  };

  return {
    level: "weak",
    strength: "Svakt",
    title: "Sonaren søker",
    help: "Gå rolig rundt. Ikke spring.",
    hint: "Søker etter neste signal"
  };
}
