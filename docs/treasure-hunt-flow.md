# Skattejaktflyt: Sonar og Tåkekart

Aktiv branch:

```text
sonar
```

## Navigasjon

```text
Home
→ TreasureSetup
→ Safety
→ TreasureReady
→ TreasureHunt
→ TreasureFound
→ TreasureHunt mens skatter gjenstår
→ TreasureResult etter siste skatt
```

## Modusruting

```text
config.variant === "sonar" → SonarHuntScreen
config.variant === "fog"   → FogHuntScreen
```

Filer:

```text
src/screens/treasure/TreasureHuntScreen.js
src/screens/treasure/TreasureHuntScreen.web.js
src/screens/treasure/SonarHuntScreen.js
src/screens/treasure/FogHuntScreen.js
```

## Felles session

Fil:

```text
src/utils/treasureSessionStore.js
```

Holder:

```text
mode
difficulty
treasuresFound
treasuresTotal
startedAt
elapsedSeconds
completed
xpAwarded
```

Begge moduser, funnskjermen og resultatet bruker samme session.

## Sonar

- rund radar
- roterende sweep
- pulserende signalring
- spiller i sentrum
- signalpunkter uten presis skattmarkør
- timer bare når skjermen er fokusert
- Reduce Motion-støtte
- fungerende kalibrering
- åpning ved 5 meter
- simulert avstand

## Tåkekart

- egen kart-/tåkevisning
- riktig områderadius og antall skatter fra `treasureRules.js`
- fokusstyrt timer
- samme funn- og resultatflyt som Sonar

## TreasureFound

- viser faktisk funnet/total
- viser XP per skatt
- går tilbake til jakt når skatter gjenstår
- går til resultat først etter siste skatt

## Resultat og XP

Resultatet bruker faktisk:

```text
mode
difficulty
treasuresFound
elapsedSeconds
completed
```

XP beregnes med `calculateTreasureXp`.

| Nivå | Fullføring | Per skatt | Maks normal XP |
|---|---:|---:|---:|
| Enkel | 60 | 10 | 100 |
| Medium | 120 | 12 | 216 |
| Vanskelig | 220 | 15 | 400 |

Sonar og Tåkekart har samme XP. Session-feltet `xpAwarded` hindrer dobbel utbetaling.

## Test

```bash
git switch sonar
git pull origin sonar
npx expo start --web -c
```

Test begge moduser, alle vanskelighetsgrader, flere funn, sluttresultat, XP, Home og `Fortsett`.

## Senere

- ekte GPS
- lyd og haptikk
- persistent lagring
- backend
- eksplisitt `mode` til Home-kortet
