# Skattejaktflyt: Sonar og Tåkekart

Aktiv branch:

```text
design/sonar-setup-card-scale
```

Åpen PR:

```text
PR #2: Legg til Sonar-oppsett
base: treasure-setup-cleanup
head: design/sonar-setup-card-scale
```

PR-en skal ikke merges uten eksplisitt beskjed.

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

## Home til setup

Home har nå tre innganger:

```text
Rebusløp
Skattejakt
Sonar
```

Sonar-kortet åpner TreasureSetup i Sonar-variant. Skattejakt/Fog bruker fortsatt egen variant.

## TreasureSetup

TreasureSetup er en rask oppsettsside uten navnefelt. Appen skal ikke generere kunstige jaktnavn.

For Sonar er nåværende setup:

```text
Sonar
Velg spillmodus
[Venn] [Venner]
```

Viktig designavklaring:

```text
Stor radar hører ikke hjemme på setup-siden.
Setup = valg.
Spill = radar.
```

Brukeren mener den større visuelle reisen fra Home til setup/sikkerhet/spill ikke er god nok ennå. Videre designarbeid bør derfor avklare helheten før flere småjusteringer.

## Område og Sonar-parametere

Kilde: `src/utils/treasureRules.js`.

```text
Enkel:     4 skatter  · ca. 50 m diameter  · 2 m Sonar-synlighet
Medium:    8 skatter  · ca. 80 m diameter  · 2,5 m Sonar-synlighet
Vanskelig: 12 skatter · ca. 150 m diameter · 3 m Sonar-synlighet
```

`sonarForwardVisibilityMeters` er Sonar-synlighet foran spilleren, ikke GPS-avstand som skal vises under jakt.

## Modusruting

```text
config.variant === "sonar" → SonarHuntScreen
config.variant === "fog"   → FogHuntScreen
```

`TreasureHuntScreen.js` er felles wrapper for begge moduser og eier fade-in etter nedtellingen.

## Sonar-flyt

Sonar er en app-generert signaljakt som standard. Den bruker `src/utils/sonarSignalEngine.js` for å styre signalprogresjon.

```text
Klar
→ Søker
→ Øker
→ Sterkt
→ Låst / STOPP! Nytt signal funnet
→ Åpne skatten
→ Skatt funnet!
→ neste signal hvis skatter gjenstår
→ resultat etter siste skatt
```

Sonar viser ikke meter eller GPS-retning som hovedspråk. Den skal føles som en signaljakt:

```text
Gå rolig rundt. Ikke spring.
STOPP! Nytt signal funnet.
Snu deg rundt og sjekk området før du åpner funnet.
```

Vanlige Sonar-funn skjer på samme skjerm. Bare siste skatt går videre til slutt/resultatflyt.

## Låst funnregel

```text
Skattene genereres først fra valgt område.
Spillet har bare én aktiv skatt eller ett aktivt signal om gangen.
Neste signal åpnes først når forrige funn er ferdig registrert.
```

Regelen gjelder også senere XP-bonusfunn.

## Tåkekart/Fog-flyt

Tåkekart bruker fortsatt den eksisterende skattejaktflyten og skal ikke refaktoreres bredt uten konkret feil.

Den tidligere gule web-testknappen er deaktivert og skal ikke gjeninnføres før v3 og etter at skattejakt er merget.

## Nedtelling og overgang

`TreasureReadyScreen` viser:

```text
10 → 9 → ... → 1 → START
```

Etter `START` navigerer `onStart` til `TreasureHunt`. Spillskjermen fader inn over omtrent 900 ms med svak skalering.

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

Sessionen har ikke lenger meningsfullt jaktnavn. Hvis `name` finnes internt, er det tom streng når bruker ikke har gitt navn.

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

`TreasureFoundScreen` brukes fortsatt i den ordinære skattejakt-/sluttflyten, spesielt for siste funn/resultatflyt. Sonar bruker egen kort funnsekvens på `SonarHuntScreen` for vanlige funn.

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

## Test

```bash
git fetch --all --prune
git switch design/sonar-setup-card-scale
git pull origin design/sonar-setup-card-scale
npx expo start --dev-client --clear
```

Test:

1. Home viser tre kategorier.
2. Sonar-kort åpner Sonar setup.
3. Sonar setup viser `Venn` og `Venner`.
4. Safety kan ikke hoppes over.
5. Nedtelling og `START` går til riktig spillskjerm.
6. Sonar roterer mens skjermen er aktiv.
7. Vanlige Sonar-funn åpner ikke ny skjerm.
8. Siste skatt går direkte til `TreasureResult`.
9. XP utbetales bare én gang.
10. Skattejakt/Fog fungerer fortsatt.
