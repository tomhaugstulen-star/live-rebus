# Live Rebus – V2-status

## Appstruktur

- Expo / React Native
- React Navigation
- `App.js` + `src/navigation/AppNavigator.js`
- Expo Router brukes ikke som aktiv navigasjonsløsning
- Web-safe filer brukes for skjermbilder som ellers ville lastet native-only kode

## Milepæler

- V1: stabile grunnflyter og teknisk sammenheng
- V1 web/demo: ferdig og bekreftet
- V2: aktiv design- og poleringsrunde
- V3: kart, ekte GPS, full native Fog of War og tyngre teknisk videreutvikling

## Home Screen V2

Status: ferdigstilt og visuelt godkjent.

Godkjent:

- safe-area-header
- avatar og settings-handlinger
- dynamisk brukernavn
- avkorting av lange navn uten kollisjon
- XP i header
- hero og mørk adventure-bakgrunn
- Rebusløp- og Skattejakt-kort
- dynamisk førstegangsvisning
- planlagt, pågående og fullført status
- to aktiviteter av samme type
- statusknappene `Fortsett eventyr` og `Se resultat`
- minimum 44 pt trykkflater
- 375 × 812 uten scrolling
- stabil korthøyde og ingen tekstkollisjoner

Home bruker en vanlig `View`, ikke `ScrollView`.

## Home-komponenter

Primære filer:

```text
src/screens/home/HomeScreen.js
src/components/home/HomeChallengeCard.js
src/components/home/HomeUpcomingCard.js
```

Visuell referanse:

```text
docs/references/home-screen-reference.png
```

## Web-testede flyter

Rebusløp:

`Home → Rebusløp → RebusSetup → RouteReady → WaitingRoom → RebusGame → RebusResult`

Skattejakt:

`Home → Skattejakt → TreasureSetup → AreaCheck → Safety → TreasureHunt → TreasureFound → TreasureResult`

Web-test bruker demo-data og web-safe visninger. Ekte GPS og native kart er ikke del av V2-webtesten.

## Web-safe filer

```text
src/screens/rebus/RebusGameScreen.web.js
src/screens/treasure/TreasureHuntScreen.web.js
src/components/treasure/SonarPulse.js
```

## Regresjonstest

Start web med tom cache:

```bash
npx expo start --web -c
```

Kontroller:

- Home vises uten scrolling
- Rebusløp kan fullføres
- Skattejakt kan fullføres
- Kart, Kompass og Sonar fungerer i web-safe demo
- profil- og settings-handlinger fungerer på web
- ingen native kartimport lastes i web-safe kode

## Neste steg

1. Commit og lås Home Screen V2.
2. Fortsett med neste skjerm i V2-designrunden.
3. Hold kart, ekte GPS og full native Fog of War til V3.
