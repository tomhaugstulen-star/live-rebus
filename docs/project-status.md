# Prosjektstatus: Sonar ferdigstilt

Aktiv branch:

```text
sonar
```

## Status

Sonar- og Tåkekart-delen er nå funksjonelt samlet og klar for slutt-test før arbeidet går videre til Live Rebus.

Gjeldende flyt:

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

## Implementert

- riktig routing mellom Sonar og Tåkekart
- egen `SonarHuntScreen`
- egen `FogHuntScreen`
- felles session-store for modus, vanskelighet, funn, total, starttid og XP-status
- fokusstyrt timer
- Sonar Reduce Motion
- fungerende Sonar-kalibrering
- faktisk skatteteller på begge spillskjermer
- flere skatter før resultat
- faktisk modus, funn, tid og vanskelighet på resultat
- samme XP-regler for Sonar og Tåkekart
- beskyttelse mot dobbel XP-utbetaling
- profesjonelt modusvalg i oppsettet
- aktiv Sonar-jakt med cyan styling på Home

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

## XP

| Nivå | Fullføring | Per skatt | Maks normal XP |
|---|---:|---:|---:|
| Enkel | 60 | 10 | 100 |
| Medium | 120 | 12 | 216 |
| Vanskelig | 220 | 15 | 400 |

Modus påvirker ikke XP.

## Skatteregler

| Nivå | Skatter | Område | Tåkeradius | Minste avstand |
|---|---:|---:|---:|---:|
| Enkel | 4 | 50 m | 10 m | 15 m |
| Medium | 8 | 150 m | 6 m | 20 m |
| Vanskelig | 12 | 300 m | 4 m | 50 m |

## Nye sluttcommits

```text
d3d90f1  Add shared treasure session state
0411aa7  Connect sonar screen to shared hunt state
1598739  Add dedicated fog hunt screen
d23320a  Route treasure hunt by selected mode
098c031  Route web treasure hunt by selected mode
c9dd81b  Continue hunt until final treasure
38670af  Use shared hunt data for treasure result XP
cca80f2  Avoid recursive web treasure screen export
```

## Slutt-test

```bash
git switch sonar
git pull origin sonar
npx expo start --web -c
```

Test:

- begge moduser åpner riktig spillskjerm
- flere funn returnerer til jakt
- siste funn åpner resultat
- riktig XP for alle vanskelighetsgrader
- XP legges til én gang
- Home viser aktiv Sonar-jakt
- `Fortsett` åpner riktig jakt
- 320–430 px
- fysisk enhet

## Senere

- ekte GPS
- Sonar-lyd og haptikk
- persistent lagring
- backend og flerspillersynkronisering
- eksplisitt `mode`-prop til Home i stedet for tittel-prefiks

Neste arbeidsområde etter godkjent test:

```text
Live Rebus
```
