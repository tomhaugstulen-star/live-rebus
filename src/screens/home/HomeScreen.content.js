import { theme } from "../../utils/designTokens";

export const SONAR_COLOR = "#22D3EE";
export const homeBackground = require("../../../assets/images/home/home-background.webp");

const homeRebusArt = require("../../../assets/images/home/cards/rebus-card-background.png");
const homeTreasureArt = require("../../../assets/images/home/cards/treasure-card-background.png");

export function createHomeChallenges({
  handleStartRebus,
  onStartTreasure,
  onStartSonar
}) {
  return [
    {
      id: "rebus",
      title: "Rebusløp",
      description: "Løs oppgaver langs ruten.",
      actionText: "Velg rebusløp",
      accentColor: theme.colors.rebus,
      artwork: homeRebusArt,
      onPress: handleStartRebus
    },
    {
      id: "treasure",
      title: "Skattejakt",
      description: "Finn skjulte skatter ute.",
      actionText: "Velg skattejakt",
      accentColor: theme.colors.primary,
      artwork: homeTreasureArt,
      onPress: onStartTreasure
    },
    {
      id: "sonar",
      title: "Sonar",
      description: "Bruk signaler for å finne skattene.",
      actionText: "Velg sonar",
      accentColor: SONAR_COLOR,
      artwork: homeTreasureArt,
      symbolName: {
        ios: "dot.radiowaves.left.and.right",
        android: "radar",
        web: "radar"
      },
      onPress: onStartSonar
    }
  ];
}

export function getEventPresentation(event) {
  const normalizedStatus = event.status || "planned";

  if (normalizedStatus === "ongoing") {
    return {
      statusText: event.statusText || "Pågående nå",
      buttonLabel: event.buttonLabel || "Fortsett eventyr"
    };
  }

  if (normalizedStatus === "completed") {
    return {
      statusText: event.statusText || "Fullført",
      buttonLabel: event.buttonLabel || "Se resultat"
    };
  }

  return {
    statusText: event.statusText || "Planlagt",
    buttonLabel: event.buttonLabel || "Gå til venterom"
  };
}
