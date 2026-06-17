# Live Rebus

Expo/React Native-app for rebusløp og skattejakt på iOS, Android og web.

## Aktiv branch

```text
sonar
```

Denne branchen inneholder den aktive og autoritative Sonar-/Tåkekart-flyten. Skattejaktflyten er stabilisert, og neste større arbeidsområde er Live Rebus.

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

## Gjeldende skattejaktflyt

```text
Home
→ TreasureSetup
→ Safety
→ TreasureReady
→ nedtelling
→ TreasureHunt
→ SonarHuntScreen eller FogHuntScreen
→ TreasureFound
→ tilbake til jakt mens skatter gjenstår
→ TreasureResult/XP direkte etter siste skatt
→ Home når resultatet lukkes
```

Det skal ikke være et synlig Home-mellomsteg før XP/resultatskjermen.

## Implementert

- riktig routing mellom Sonar og Tåkekart
- felles session for modus, vanskelighet, funn, total, tid og XP-status
- obligatorisk sikkerhetsbekreftelse før hver jakt
- manuell spillstart etter nedtelling
- fade-in fra nedtelling til spillskjerm
- flere funn på mobil før resultat
- ett funn fullfører hele jakten på web for rask testing
- faktisk resultatdata via `pendingResultStore`
- resultatfade og telefon-haptics
- samme XP-regler for begge moduser
- beskyttelse mot dobbel XP
- direkte sluttflyt fra siste skatt til XP/resultat
- aktiv jakt kan fortsettes fra Home
- bekreftet avbrudd fjerner aktiv jakt og nullstiller session

## Viktige filer

```text
src/navigation/AppNavigator.js
src/screens/home/HomeScreen.js
src/components/home/HomeUpcomingCard.js
src/screens/treasure/TreasureSetupScreen.js
src/screens/treasure/SafetyScreen.js
src/screens/treasure/TreasureReadyScreen.js
src/screens/treasure/TreasureHuntScreen.js
src/screens/treasure/SonarHuntScreen.js
src/screens/treasure/FogHuntScreen.js
src/screens/treasure/TreasureFoundScreen.js
src/screens/treasure/TreasureResultScreen.js
src/screens/treasure/TreasureResultScreen.styles.js
src/utils/treasureSessionStore.js
src/utils/treasureSafetyStore.js
src/utils/treasureRules.js
src/utils/xpRules.js
src/utils/playerProgressStore.js
src/utils/pendingResultStore.js
```

Result-assets:

```text
assets/images/treasure/result/result-chest.png
assets/images/treasure/result/result-ribbon.png
```

## XP

| Nivå | Fullføring | Per skatt | Maks normal XP |
|---|---:|---:|---:|
| Enkel | 60 | 10 | 100 |
| Medium | 120 | 12 | 216 |
| Vanskelig | 220 | 15 | 400 |

Modus påvirker ikke XP.

## Testing

Web:

```bash
npx expo start --web -c
```

Kontroller:

- nedtelling og `START`
- fade-in til spillskjermen
- direkte web-funn
- overgang til XP/resultat etter siste skatt
- korrekt funn, total, tid og XP
- XP bare én gang
- retur til Home uten resultat-loop

Haptics må testes i dev build på fysisk telefon.

## Bevisst utsatt

- ekte GPS og faktisk distanse
- pipelyd i nedtelling
- global `soundEnabled` og `hapticsEnabled`
- persistent lagring
- backend og flerspillersynkronisering
- eksplisitt `mode`-prop til Home-kortet

## Neste arbeidsområde

```text
Live Rebus
```

## Dokumentasjon

- [`docs/chat-handoff.md`](docs/chat-handoff.md) – start her i neste chat
- [`docs/project-status.md`](docs/project-status.md) – nåstatus og testpunkter
- [`docs/treasure-hunt-flow.md`](docs/treasure-hunt-flow.md) – navigasjon, session, web-test og XP
- [`docs/branch-structure.md`](docs/branch-structure.md) – brancher og arbeidsmåte
- [`docs/repo-cleanup-audit.md`](docs/repo-cleanup-audit.md) – historikk for gjennomført opprydding
