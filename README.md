# Live Rebus

Expo/React Native-app for rebusløp og skattejakt på iOS, Android og web.

## Aktiv branch

```text
sonar
```

Denne branchen inneholder ferdigstilt, testet og ryddet Sonar-/Tåkekart-flyt. Neste arbeidsområde er Live Rebus.

Ikke overskriv brukerens lokale endringer i:

```text
assets/images/treasure/treasure-chest.png
assets/images/treasure/treasure-setup-header.png
assets/images/treasure/treasure-setup-header.webp
package.json
package-lock.json
```

## Start

```bash
git switch sonar
git pull origin sonar
npx expo start --web -c
```

## Gjeldende flyt

```text
Home
→ TreasureSetup
→ Safety
→ TreasureReady
→ riktig spillskjerm etter valgt modus
→ TreasureFound
→ tilbake til jakt mens skatter gjenstår
→ TreasureResult etter siste skatt
```

## Viktige filer

```text
src/navigation/AppNavigator.js
src/utils/treasureSessionStore.js
src/utils/treasureSafetyStore.js
src/screens/treasure/SonarHuntScreen.js
src/screens/treasure/SonarHuntScreen.styles.js
src/screens/treasure/FogHuntScreen.js
src/screens/treasure/TreasureHuntScreen.js
src/screens/treasure/TreasureFoundScreen.js
src/screens/treasure/TreasureResultScreen.js
src/screens/treasure/TreasureSetupScreen.js
src/screens/treasure/SafetyScreen.js
src/screens/treasure/TreasureReadyScreen.js
src/components/home/HomeUpcomingCard.js
```

## Ferdig og verifisert

- riktig routing mellom Sonar og Tåkekart
- delt jaktstate for modus, vanskelighet, funn, total, tid og XP-status
- fokusstyrt timer og manuell spillstart
- Sonar Reduce Motion og kalibrering
- flere funn før resultat
- faktisk resultatdata
- samme XP-regler for begge moduser
- beskyttelse mot dobbel XP
- profesjonelle modusvalg i oppsettet
- aktiv Sonar-jakt på Home
- fersk sikkerhetsbekreftelse før hver jakt
- avbrutt avslutning fortsetter jakten
- bekreftet avslutning fjerner aktiv jakt fra Home
- ny jakt starter som ny session
- gammel AreaCheck-route og gamle web-duplikater er fjernet

## XP

| Nivå | Fullføring | Per skatt | Maks normal XP |
|---|---:|---:|---:|
| Enkel | 60 | 10 | 100 |
| Medium | 120 | 12 | 216 |
| Vanskelig | 220 | 15 | 400 |

## Neste arbeidsområde

```text
Live Rebus
```

## Senere

- ekte GPS
- Sonar-lyd og haptikk
- persistent lagring
- backend
- eksplisitt `mode`-prop til Home i stedet for tittel-prefiks

## Dokumentasjon

- [`docs/chat-handoff.md`](docs/chat-handoff.md) – start her i neste chat
- [`docs/project-status.md`](docs/project-status.md) – nåstatus og neste steg
- [`docs/treasure-hunt-flow.md`](docs/treasure-hunt-flow.md) – navigasjon, session og XP
- [`docs/branch-structure.md`](docs/branch-structure.md) – brancher og arbeidsmåte
- [`docs/repo-cleanup-audit.md`](docs/repo-cleanup-audit.md) – gjennomført opprydding
