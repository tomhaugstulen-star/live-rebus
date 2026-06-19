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
    title: "SONAR KLAR",
    help: "Hold telefonen foran deg som en ekte sonar.",
    hint: "Sonaren aktiveres når spillet starter"
  };

  if (state.rewardReady) return {
    level: "very_near",
    strength: "Låst",
    title: "STOPP!",
    help: "Nytt signal funnet",
    hint: "Snu deg rolig rundt og sjekk området"
  };

  if (state.progress >= 70) return {
    level: "strong",
    strength: "Sterkt",
    title: "SIGNAL ØKER",
    help: "Hold telefonen foran deg.",
    hint: "Fortsett rolig"
  };

  if (state.progress >= 35) return {
    level: "medium",
    strength: "Øker",
    title: "SIGNAL BYGGER",
    help: "Fortsett å søke rolig.",
    hint: "Signalet blir tydeligere"
  };

  return {
    level: "weak",
    strength: "Søker",
    title: "SONAR SØKER",
    help: "Gå rolig og hold telefonen foran deg.",
    hint: "Søker etter neste signal"
  };
}
