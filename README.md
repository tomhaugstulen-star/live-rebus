# Live Rebus

Expo/React Native-app for rebusløp og skattejakt på iOS, Android og web.

## Aktiv branch

```text
design-sonar-ui
```

Denne branchen inneholder pågående Sonar-design og app-generert signaljakt. `sonar` og `main` skal ikke endres eller merges uten eksplisitt avtale.

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
git switch design-sonar-ui
git pull origin design-sonar-ui
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
→ funnsekvens/jakt mens skatter gjenstår
→ TreasureResult/XP direkte etter siste skatt
→ Home når resultatet lukkes
```

Det skal ikke være et synlig Home-mellomsteg før XP/resultatskjermen.

## Sonar-retning

Sonar skal være en app-generert signaljakt som standard, ikke en GPS-avhengig jakt.

Standardopplevelse:

```text
Sonaren søker
→ signalet bygger seg opp
→ STOPP! Nytt signal funnet
→ spilleren snur seg rundt og sjekker området
→ funnet åpnes på samme skjerm
→ sonaren gjør klar neste signal
```

GPS kan senere bli et eget valg for foreldre-/lagspill, men er ikke standard. XP er bonus, ikke hovedmål, og skal ikke kunne farmes via løping, små områder, meter eller risting.

Se [`docs/sonar-roadmap.md`](docs/sonar-roadmap.md) for beslutninger og videre retning.

## Implementert

- riktig routing mellom Sonar og Tåkekart
- felles session for modus, vanskelighet, funn, total, tid og XP-status
- obligatorisk sikkerhetsbekreftelse før hver jakt
- manuell spillstart etter nedtelling
- fade-in fra nedtelling til spillskjerm
- Sonar med app-generert signalmotor i `src/utils/sonarSignalEngine.js`
- Sonar roterer mens skjermen er aktiv
- Sonar viser `STOPP! Nytt signal funnet` når funnet er klart
- Sonar-funn skjer på samme skjerm med kort `Skatt funnet!`-sekvens
- bare siste Sonar-funn går videre til slutt/resultatflyt
- rød målprikk og haptics ved sterkt/nært signal
- Tåkekart sin tidligere web-testknapp er deaktivert
- faktisk resultatdata via `pendingResultStore`
- resultatfade og telefon-haptics
- samme ordinære slutt-XP-regler for begge moduser
- beskyttelse mot dobbel XP
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
src/screens/treasure/SonarDisplay.js
src/screens/treasure/SonarHuntScreen.styles.js
src/screens/treasure/FogHuntScreen.js
src/screens/treasure/TreasureFoundScreen.js
src/screens/treasure/TreasureResultScreen.js
src/screens/treasure/TreasureResultScreen.styles.js
src/utils/sonarSignalEngine.js
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

Ordinær slutt-XP påvirkes ikke av modus.

Sonar-småsignal med XP er ikke implementert. Når det eventuelt kommer, skal det ikke være garantert i hvert spill og skal ha cooldown/maksgrense.

## Testing

Web:

```bash
npx expo start --web -c
```

Kontroller:

- nedtelling og `START`
- fade-in til spillskjermen
- Sonar roterer hele tiden mens skjermen er aktiv
- Sonar bygger raskt til `STOPP! Nytt signal funnet` i testtempo
- `Åpne skatten` gir funnsekvens på samme skjerm
- vanlige Sonar-funn åpner ikke ny skjerm
- siste skatt går direkte til XP/resultat
- korrekt funn, total, tid og XP
- XP bare én gang
- retur til Home uten resultat-loop

Haptics må testes i dev build på fysisk telefon.

## Bevisst utsatt

- instruksjonsbilde/animasjon på nedtellingsskjermen
- ekte GPS og GPS-lagjakt
- accelerometer/skritt/gyro som aktivitetssjekk eller bonus
- QR-deling av generert jakt
- pipelyd/sonarlyd
- global `soundEnabled` og `hapticsEnabled`
- Sonar-småsignal med XP
- persistent lagring
- backend og flerspillersynkronisering
- eksplisitt `mode`-prop til Home-kortet

## Neste arbeidsområde

```text
Sonar: test app-generert signaljakt og haptics på telefon.
Deretter: vurder timing, tekst, lyd og senere sensorer.
```

## Dokumentasjon

- [`docs/chat-handoff.md`](docs/chat-handoff.md) – start her i neste chat
- [`docs/project-status.md`](docs/project-status.md) – nåstatus og testpunkter
- [`docs/sonar-roadmap.md`](docs/sonar-roadmap.md) – Sonar-retning og videre plan
- [`docs/treasure-hunt-flow.md`](docs/treasure-hunt-flow.md) – navigasjon, session, web-test og XP
- [`docs/branch-structure.md`](docs/branch-structure.md) – brancher og arbeidsmåte
- [`docs/repo-cleanup-audit.md`](docs/repo-cleanup-audit.md) – historikk for gjennomført opprydding
