# Live Rebus – V2 status

## Appstruktur

- Appen er bygget med Expo / React Native.
- Navigasjonen er satt opp med `App.js` + React Navigation.
- Expo Router brukes ikke.
- `package.json` skal fortsatt ha:

```json
"main": "node_modules/expo/AppEntry.js"
```

## Web-konfigurasjon

- `app.json` sin web-konfigurasjon skal fortsatt være:

```json
"web": {
  "output": "single",
  "favicon": "./assets/images/favicon.png"
}
```

## Ferdig web-testet flyt: Rebusløp

Flyt:

`Home → Rebusløp → RebusSetup → RouteReady → WaitingRoom → RebusGame → RebusResult`

- `RebusGame` bruker web-safe fil:

```text
src/screens/rebus/RebusGameScreen.web.js
```

- Web-test bruker demo-posisjon, ikke ekte GPS.
- Demo-svar:
  1. ås
  2. kulturminne
  3. vann
  4. gravminne
  5. vik
  6. haug
  7. bosetning

## Ferdig web-testet flyt: Skattejakt

Flyt:

`Home → Skattejakt → TreasureSetup → AreaCheck → Safety → TreasureHunt → TreasureFound → TreasureResult`

- `TreasureHunt` bruker web-safe fil:

```text
src/screens/treasure/TreasureHuntScreen.web.js
```

- Safety-bekreftelse kreves før start.
- `TreasureHunt` i web-modus bruker radar/sonar-demo, signal, hint og teksten `Demo: gå nærmere`.
- Ingen ekte map eller GPS brukes i v2.

## Home-handlinger på web

- Profil/avatar på Home åpner `Profil`-alert på web.
- Settings/tannhjul på Home åpner `Innstillinger`-alert på web.
- `AppNavigator` bruker en web-safe alert-helper for disse handlingene.

## Designstatus

Følgende skjermer er refined i v2:

- Home screen
- TreasureSetup
- AreaCheck
- Safety
- TreasureHunt web
- TreasureFound
- TreasureResult

Palett:

- background: `#0F172A`
- surface/card: `#1E293B`
- surfaceAlt: `#334155`
- text: `#E2E8F0`
- muted: `#94A3B8`
- primary/orange: `#FF6B35`
- treasure/gold: `#F59E0B`
- success/green: `#22C55E`
- rebus/purple: `#8B5CF6`

## Viktige v2-avgrensninger

- No Expo Router.
- No `react-native-maps` i web-safe paths.
- No real GPS i web-test.
- No Fog of War/tåke i v2 web mode.
- Kart, GPS, Fog of War og mobil/native map-implementasjon er utsatt til v3.

## Web-safe filer

- `src/screens/rebus/RebusGameScreen.web.js`
- `src/screens/treasure/TreasureHuntScreen.web.js`

Noter:

- Unngå å lage gamle `.web.js`-filer som skygger normale skjermer, med mindre det er eksplisitt nødvendig.
- Tidligere lagde `TreasureSetupScreen.web.js` en white screen og ble fjernet.

## V2-regresjon

Full v2 web-regresjon er passert:

- Rebus-flyt fra Home til RebusResult.
- Skattejakt-flyt fra Home til TreasureResult.
- Home profile/settings-handlinger på web.

## Manuell regresjonstest

Kjør:

```bash
npx expo start --web -c
```

Rebus:

`Home → Rebusløp → Generer rute → Demo: start nå → RebusGame → godkjenn alle poster → RebusResult → Til meny`

Skattejakt:

`Home → Skattejakt → Fortsett → AreaCheck → Fortsett → Safety → huk av → Start skattejakt → Demo: gå nærmere → Åpne skatt → TreasureFound → Fortsett → TreasureResult → Til meny`

## Neste anbefalte steg

1. Full web-regresjon før mer UI-arbeid.
2. Visuell forbedring av Rebus-skjermene.
3. Deretter felles design tokens/styles.
4. v3: kart, GPS, Fog of War og mobil/native map-implementasjon.
