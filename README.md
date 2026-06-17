# Live Rebus

Expo/React Native-app for rebusløp og skattejakt på iOS, Android og web.

## Aktiv branch

```text
sonar
```

Denne branchen inneholder ferdigstilt Sonar-/Tåkekart-flyt før prosjektet går videre til Live Rebus.

Ikke overskriv brukerens lokale endringer i:

```text
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
src/utils/treasureSessionStore.js
src/screens/treasure/SonarHuntScreen.js
src/screens/treasure/SonarHuntScreen.styles.js
src/screens/treasure/FogHuntScreen.js
src/screens/treasure/TreasureHuntScreen.js
src/screens/treasure/TreasureHuntScreen.web.js
src/screens/treasure/TreasureFoundScreen.js
src/screens/treasure/TreasureResultScreen.js
src/screens/treasure/TreasureSetupScreen.js
src/components/home/HomeUpcomingCard.js
```

## Ferdig

- riktig routing mellom Sonar og Tåkekart
- delt jaktstate for modus, vanskelighet, funn, total, tid og XP-status
- fokusstyrt timer
- Sonar Reduce Motion
- fungerende Sonar-kalibrering
- flere funn før resultat
- faktisk resultatdata
- samme XP-regler for begge moduser
- beskyttelse mot dobbel XP
- profesjonelle modusvalg i oppsettet
- aktiv Sonar-jakt på Home

## XP

| Nivå | Fullføring | Per skatt | Maks normal XP |
|---|---:|---:|---:|
| Enkel | 60 | 10 | 100 |
| Medium | 120 | 12 | 216 |
| Vanskelig | 220 | 15 | 400 |

## Slutt-test

- Tåkekart åpner Tåkekart
- Sonar åpner Sonar
- flere funn går tilbake til jakt
- siste funn går til resultat
- XP er riktig og legges til én gang
- Home viser aktiv Sonar-jakt
- `Fortsett` åpner riktig jakt
- 320–430 px
- fysisk enhet

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

- [`docs/chat-handoff.md`](docs/chat-handoff.md)
- [`docs/project-status.md`](docs/project-status.md)
- [`docs/treasure-hunt-flow.md`](docs/treasure-hunt-flow.md)
- [`docs/branch-structure.md`](docs/branch-structure.md)
