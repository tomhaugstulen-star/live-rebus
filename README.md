# Live Rebus

Live Rebus er en Expo- og React Native-app for utendørs rebusløp og skattejakt.

## Status

- V2 HomeScreen er ferdig, verifisert og merget til `main` via pull request #1.
- Aktiv arbeidsbranch for neste skjerm er `skattejakt-oppsett`.
- Gamle HomeScreen- og midlertidige recovery-brancher er slettet.
- `main` er kilde til sannhet for ferdig og godkjent funksjonalitet.

## Teknologi

- Expo
- React Native
- React Navigation
- Web-støtte via Expo

Appen bruker `App.js` som inngangspunkt. Expo Router brukes ikke.

## Kom i gang

```bash
npm install
npx expo start --web --clear
```

For mobil kan prosjektet åpnes i Expo Go eller en development build.

## Branch-strategi

- `main`: ferdig, testet og godkjent kode
- `skattejakt-oppsett`: aktiv utvikling av Skattejakt-oppsett
- Nye skjermer og større endringer utvikles i egne brancher og merges via pull request.
- Ikke merge gamle designbrancher direkte til `main`.

## Viktige filer

```text
App.js
src/navigation/AppNavigator.js
src/screens/home/HomeScreen.js
src/components/home/HomeChallengeCard.js
src/components/home/HomeUpcomingCard.js
src/screens/treasure/
docs/V2_STATUS.md
docs/DESIGN_SYSTEM.md
```

## Nåværende designstatus

Den korrekte V2 HomeScreen-versjonen ble gjenopprettet fra commit `3f51b1c` og merget til `main` gjennom en ren branch som kun inneholdt HomeScreen, Home-komponenter og nødvendige bildeassets.

Neste prioritet er å videreutvikle Skattejakt-oppsett uten å endre den ferdige HomeScreen-versjonen.

## Test før merge

Kjør alltid:

```bash
npx expo start --web --clear
```

Kontroller deretter:

- at skjermen åpner uten bundling-feil
- at det ikke finnes merge-markører
- at navigasjon og tilbakefunksjon virker
- at trykkflater og tekst er tilgjengelige
- at diffen bare inneholder planlagte filer

## Dokumentasjon

- `docs/V2_STATUS.md`: prosjektstatus og neste steg
- `docs/DESIGN_SYSTEM.md`: farger, typografi, spacing og tilgjengelighet
