# Live Rebus — Home Screen V1

Dette er en separat GitHub-klar Home Screen-modul for **Live Rebus**.

Den er laget for å kunne legges inn i eksisterende prosjekt uten å overskrive Rebusløp- eller Skattejakt-filene.

## Inneholder

```txt
src/screens/HomeScreen.js
src/components/HomeChallengeCard.js
src/components/HomeProgressCard.js
src/components/HomeUpcomingCard.js
src/utils/designTokens.js
docs/DESIGN_SYSTEM.md
```

## Viktig

Denne ZIP-en inneholder bare Home Screen og design tokens. Den overskriver ikke:

- Rebusløp V1
- Skattejakt V1
- App.js
- package.json

Du kan kopiere `src/`-mappen inn i prosjektet ditt og importere `HomeScreen`.

## Appnavn

Bruk:

```txt
Live Rebus
```

Ikke `Live Georebus`.

## Home V1-regler

- Avatar øverst til venstre
- Tannhjul øverst til høyre
- Ingen bunnmeny
- Hero-seksjon
- To hovedkort:
  - Rebusløp
  - Skattejakt
- Neste planlagte
- Din progresjon
- App Store-vennlig spacing og touch targets

## Eksempel på import

```jsx
import HomeScreen from "./src/screens/HomeScreen";

export default function App() {
  return (
    <HomeScreen
      userName="Cindy"
      userAvatarUrl={null}
      level={3}
      xp={420}
      xpToNextLevel={80}
      onOpenProfile={() => {}}
      onOpenSettings={() => {}}
      onStartAdventure={() => {}}
      onStartRebus={() => {}}
      onStartTreasure={() => {}}
      onOpenUpcoming={() => {}}
      onSeeAllChallenges={() => {}}
    />
  );
}
```
