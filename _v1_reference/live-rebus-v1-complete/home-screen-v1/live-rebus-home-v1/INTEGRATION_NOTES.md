# Integration notes

Denne Home Screen-pakken er separat.

## Ikke overskriv disse filene

Hvis du allerede har Rebusløp V1 eller Skattejakt V1, ikke overskriv:

```txt
App.js
package.json
app.json
src/services/
src/screens/Rebus*
src/screens/Treasure*
```

## Trygg innlegging

Kopier bare disse filene inn i eksisterende prosjekt:

```txt
src/screens/HomeScreen.js
src/components/HomeChallengeCard.js
src/components/HomeProgressCard.js
src/components/HomeUpcomingCard.js
src/utils/designTokens.js
docs/DESIGN_SYSTEM.md
```

Hvis du allerede har `src/utils/theme.js`, behold den. Denne pakken bruker `designTokens.js` for å unngå konflikt.

## Koble Home inn i App.js manuelt

Eksempel:

```jsx
import HomeScreen from "./src/screens/HomeScreen";

<HomeScreen
  userName="Cindy"
  onOpenProfile={() => setScreen("profile")}
  onOpenSettings={() => setScreen("settings")}
  onStartAdventure={() => setScreen("challenge")}
  onStartRebus={() => setScreen("rebusSetup")}
  onStartTreasure={() => setScreen("treasureSetup")}
  onOpenUpcoming={() => setScreen("waiting")}
  onSeeAllChallenges={() => setScreen("challenge")}
/>
```

## Videre

Senere kan `userName`, `avatar`, `level` og `xp` hentes fra backend.
