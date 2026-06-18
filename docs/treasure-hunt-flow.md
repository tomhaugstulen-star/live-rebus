# Skattejaktflyt: Sonar og Tåkekart

Aktiv branch:

```text
design-sonar-ui
```

## Navigasjon

```text
Home
→ TreasureSetup
→ Safety
→ TreasureReady
→ nedtelling
→ TreasureHunt
→ SonarHuntScreen eller FogHuntScreen
→ funnsekvens/jakt mens skatter gjenstår
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

## Sonar-flyt

Sonar er nå en app-generert signaljakt som standard. Den bruker `src/utils/sonarSignalEngine.js` for å styre signalprogresjon.

```text
Klar
→ Svakt
→ Middels
→ Sterkt
→ Svært nær / STOPP! Nytt signal funnet
→ Åpne skatten
→ Skatt funnet!
→ neste signal hvis skatter gjenstår
→ resultat etter siste skatt
```

Sonar viser ikke meter eller GPS-retning. Den skal føles som en signaljakt:

```text
Gå rolig rundt. Ikke spring.
STOPP! Nytt signal funnet.
Snu deg rundt og sjekk området før du åpner funnet.
```

Vanlige Sonar-funn skjer på samme skjerm. De skal ikke åpne en separat funnskjerm. Bare siste skatt går videre til slutt/resultatflyt.

Testtempoet i `sonarSignalEngine.js` er raskt med vilje for designarbeid.

## Tåkekart/Fog-flyt

Tåkekart bruker fortsatt den eksisterende skattejaktflyten og skal ikke refaktoreres bredt uten konkret feil.

Den tidligere gule web-testknappen er deaktivert og skal ikke gjeninnføres før v3 og etter at skattejakt er merget.

## Nedtelling og overgang

`TreasureReadyScreen` viser:

```text
10 → 9 → ... → 1 → START
```

Etter `START` navigerer `onStart` til `TreasureHunt`. Spillskjermen fader inn over omtrent 900 ms med svak skalering.

Nedtellingslyd er koblet via `expo-av` og bruker:

```text
assets/audio/treasure/countdown.mp3
```

Instruksjonsbilde/animasjon på nedtellingsskjermen er utsatt.

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

Begge moduser, funnskjerm/resultat og sluttflyt bruker samme session.

Hvert registrerte funn øker `treasuresFound` med én både på web og mobil. Den gamle web-spesialregelen som satte funntallet direkte til `treasuresTotal` er fjernet.

## Web-testkontroller

Den tidligere web-testmodusen er deaktivert for Tåkekart:

- Tåkekart viser ikke lenger `Testmodus`
- den gule `Åpne skatten`-knappen vises ikke på web
- web-funn fullfører ikke hele jakten automatisk
- testkontrollen skal ikke gjeninnføres før v3 og etter at skattejakt er merget

Sonar bruker app-generert testtempo, ikke web-testknapp.

## TreasureFound

`TreasureFoundScreen` brukes fortsatt i den ordinære skattejakt-/sluttflyten, spesielt for siste funn/resultatflyt. Sonar bruker nå egen kort funnsekvens på `SonarHuntScreen` for vanlige funn.

TreasureFound:

- viser faktisk funnet/total
- viser XP per skatt
- går tilbake til jakt når skatter gjenstår i ordinær flyt
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

Ved åpning:

```text
useRef(getPendingResult()).current
→ markPendingResultPresented()
```

Det stabile snapshotet beholder resultatdataene på skjermen samtidig som Home ikke kan åpne det samme resultatet på nytt.

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

Sonar-småsignal med XP er ikke implementert. Hvis det kommer senere, skal det ikke være garantert og skal ikke kunne farmes.

## Resultatpresentasjon

- dedikert kisteillustrasjon
- dekorativt bånd
- rolig fade-in
- suksess-haptics på telefon
- haptics kjøres ikke på web

## Test

```bash
git switch design-sonar-ui
git pull origin design-sonar-ui
npx expo start --web -c
```

Test:

1. nedtelling og `START`
2. fade-in til spillskjerm
3. Sonar roterer mens skjermen er aktiv
4. Sonar går raskt til `STOPP! Nytt signal funnet`
5. `Åpne skatten` gir funnsekvens på samme skjerm
6. vanlige Sonar-funn åpner ikke ny skjerm
7. siste skatt går direkte til `TreasureResult`
8. Tåkekart viser ikke `Testmodus` eller gul `Åpne skatten`-knapp på web
9. korrekt funn, total, tid og XP
10. XP bare én gang
11. retur til Home uten resultat-loop
12. haptics i dev build på fysisk telefon

## Senere

- instruksjonsbilde/animasjon på nedtellingsskjermen
- GPS-lagjakt som avansert modus
- accelerometer/skritt/gyro som aktivitetssjekk eller mild bonus
- QR-deling av generert jakt
- Sonar-lyd/pip
- global `soundEnabled` og `hapticsEnabled`
- Sonar-småsignal med XP
- persistent lagring
- backend
- eksplisitt `mode` til Home-kortet

## Flyteierskap

Spillskjermene viser avslutningsdialogen. `AppNavigator.abandonTreasure` eier session-reset og retur til Home ved bekreftet avbrudd.

Sikkerhetsbekreftelse kreves på nytt for hver jakt. `TreasureReadyScreen` kan ikke åpnes uten fersk bekreftelse fra `SafetyScreen`.
