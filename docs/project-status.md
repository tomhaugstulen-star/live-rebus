# Prosjektstatus: Sonar ferdigstilt

Aktiv branch:

```text
sonar
```

## Status

Sonar- og Tåkekart-delen er funksjonelt samlet og klar for slutt-test før arbeidet går videre til Live Rebus.

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

## Sikkerhetsflyt

Adgangskontrollen er forsterket for å hindre at en gjenbrukt `TreasureReady`-rute hopper over sikkerhetsskjermen.

Filer:

```text
src/utils/treasureSafetyStore.js
src/screens/treasure/SafetyScreen.js
src/screens/treasure/TreasureReadyScreen.js
```

Regler:

- `SafetyScreen` nullstiller tidligere godkjenning ved fokus
- brukeren må krysse av på nytt
- bekreftelsen får kort levetid og kan bare brukes én gang
- `TreasureReadyScreen` tillater bare inngang med fersk bekreftelse
- manglende bekreftelse bygger en ren stack: `Home → TreasureSetup → Safety`
- `AppNavigator.js` er ikke endret i denne rettingen

Commits:

```text
bd6ce71  Add treasure safety confirmation guard
f53d217  Require fresh safety confirmation before treasure ready
4564980  Block treasure ready without fresh safety confirmation
bc38aa8  Reset treasure flow when safety is missing
```

## Implementert

- riktig routing mellom Sonar og Tåkekart
- egen `SonarHuntScreen`
- egen `FogHuntScreen`
- felles session-store for modus, vanskelighet, funn, total, starttid og XP-status
- fokusstyrt timer
- Sonar Reduce Motion
- fungerende Sonar-kalibrering
- Sonar starter manuelt med `Start spill`
- timer, signal, avstand og radaranimasjon står stille før start
- Sonar-sessionens faktiske starttid settes ved knappetrykket
- faktisk skatteteller på begge spillskjermer
- flere skatter før resultat
- faktisk modus, funn, tid og vanskelighet på resultat
- samme XP-regler for Sonar og Tåkekart
- beskyttelse mot dobbel XP-utbetaling
- profesjonelt modusvalg i oppsettet
- aktiv Sonar-jakt med cyan styling på Home
- obligatorisk, fersk sikkerhetsbekreftelse før `TreasureReady`

## Viktige filer

```text
src/utils/treasureSessionStore.js
src/utils/treasureSafetyStore.js
src/screens/treasure/SafetyScreen.js
src/screens/treasure/TreasureReadyScreen.js
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

## Slutt-test

```bash
git switch sonar
git pull origin sonar
npx expo start --web -c
```

Test:

- åpne Sonar og bekreft at tiden står på `00:00`
- bekreft at radar, signal og avstand er inaktive før `Start spill`
- bekreft teksten `Ikke start før du er der Sonar skal spilles.`
- trykk `Start spill` og bekreft at timer og sonar aktiveres
- gå ut og inn i en startet jakt; den skal fortsette uten ny startknapp
- kjør Sonar først
- start deretter Tåkekart
- sikkerhetsskjermen vises alltid
- avkryssingen er tom hver gang
- `TreasureReady` avviser inngang uten fersk bekreftelse
- gå tilbake fra `TreasureReady`; sikkerhet må bekreftes på nytt
- test både Sonar → Tåkekart og Tåkekart → Sonar
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
