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
→ nedtelling
→ TreasureHunt
→ TreasureFound
→ TreasureHunt mens skatter gjenstår
→ TreasureResult direkte etter siste skatt
→ Home når resultatet lukkes
```

Det skal ikke være et synlig Home-mellomsteg før XP/resultatskjermen.

## Modusruting

```text
config.variant === "sonar" → SonarHuntScreen
config.variant === "fog"   → FogHuntScreen
```

`TreasureHuntScreen.js` er felles wrapper for begge moduser og eier fade-in etter nedtellingen.

## Nedtelling og overgang

`TreasureReadyScreen` viser:

```text
10 → 9 → ... → 1 → START
```

Etter `START` navigerer `onStart` til `TreasureHunt`. Spillskjermen fader inn over omtrent 900 ms med svak skalering.

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

## Web-testmodus

På web:

- skatten kan åpnes direkte etter spillstart
- ett funn setter `treasuresFound` til `treasuresTotal`
- hele sluttflyten kan dermed testes raskt

På mobil registreres én skatt om gangen og normale avstandsgrenser beholdes.

## TreasureFound

- viser faktisk funnet/total
- viser XP per skatt
- går tilbake til jakt når skatter gjenstår
- lagrer ferdig resultat i `pendingResultStore`
- kaller `onContinue` direkte etter siste skatt

Sluttsekvens:

```text
saveCompletedResult()
→ setPendingResult(...)
→ onContinue()
→ TreasureResult
```

## Resultat og XP

Resultatskjermen prioriterer data fra `pendingResultStore`, med session og props som fallback.

Resultatet viser:

```text
variant
difficulty
foundCount
treasuresTotal
elapsedSeconds
distanceMeters
xp
```

XP beregnes med `calculateTreasureXp`.

| Nivå | Fullføring | Per skatt | Maks normal XP |
|---|---:|---:|---:|
| Enkel | 60 | 10 | 100 |
| Medium | 120 | 12 | 216 |
| Vanskelig | 220 | 15 | 400 |

`markTreasureXpAwarded()` hindrer dobbel utbetaling.

Når resultatet lukkes eller ny jakt startes:

```text
addPlayerXp(...)
clearPendingResult()
resetTreasureSession()
```

## Resultatpresentasjon

- dedikert kisteillustrasjon
- dekorativt bånd
- rolig fade-in
- suksess-haptics på telefon
- haptics kjøres ikke på web

## Test

```bash
git switch sonar
git pull origin sonar
npx expo start --web -c
```

Test:

1. nedtelling og `START`
2. fade-in til spillskjerm
3. web-funn fullfører jakten
4. direkte overgang til TreasureResult
5. korrekt funn, total, tid og XP
6. XP bare én gang
7. retur til Home uten resultat-loop
8. haptics i dev build på fysisk telefon

## Senere

- ekte GPS
- faktisk distanse
- pipelyd i nedtelling
- global `soundEnabled` og `hapticsEnabled`
- persistent lagring
- backend
- eksplisitt `mode` til Home-kortet

## Flyteierskap

Spillskjermene viser avslutningsdialogen. `AppNavigator.abandonTreasure` eier session-reset og retur til Home ved bekreftet avbrudd.

Sikkerhetsbekreftelse kreves på nytt for hver jakt. `TreasureReadyScreen` kan ikke åpnes uten fersk bekreftelse fra `SafetyScreen`.
