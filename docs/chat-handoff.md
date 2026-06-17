# Chat-handoff: Sonar ferdigstilt

Les dette først i neste chat.

## Repo og branch

```text
tomhaugstulen-star/live-rebus
sonar
```

Kontroller lokalt:

```bash
git fetch origin
git switch sonar
git pull origin sonar
git branch --show-current
git status -sb
```

Ikke endre `main` eller `skattejakt-spillet` uten eksplisitt beskjed.

## Lokale filer som ikke skal overskrives

```text
assets/images/treasure/treasure-setup-header.png
assets/images/treasure/treasure-setup-header.webp
package.json
package-lock.json
```

## Sonar-delen er nå funksjonelt samlet

Gjeldende flyt:

```text
Home
→ TreasureSetup
→ Safety
→ TreasureReady
→ TreasureHunt
→ TreasureFound
→ tilbake til TreasureHunt mens skatter gjenstår
→ TreasureResult etter siste skatt
```

## Sikkerhetslås

Ny fil:

```text
src/utils/treasureSafetyStore.js
```

`SafetyScreen` registrerer en fersk sikkerhetsbekreftelse først etter at brukeren har krysset av og trykket videre.

`TreasureReadyScreen` bruker bekreftelsen som adgangskontroll:

- mangler fersk bekreftelse → `navigation.replace("Safety")`
- fersk bekreftelse → `TreasureReady` vises
- bekreftelsen forbrukes én gang
- sikkerhetstilstanden nullstilles hver gang `SafetyScreen` får fokus

Dette hindrer Tåkekart i å hoppe over sikkerhetsskjermen etter at Sonar har vært kjørt, selv om navigatorstacken gjenbruker en eldre `TreasureReady`-rute.

Viktige commits:

```text
bd6ce71  Add treasure safety confirmation guard
f53d217  Require fresh safety confirmation before treasure ready
4564980  Block treasure ready without fresh safety confirmation
```

## Riktig modusruting

Disse velger skjerm fra `config.variant`:

```text
src/screens/treasure/TreasureHuntScreen.js
src/screens/treasure/TreasureHuntScreen.web.js
```

Resultat:

```text
variant === "sonar" → SonarHuntScreen
variant === "fog"   → FogHuntScreen
```

Viktige filer:

```text
src/screens/treasure/SonarHuntScreen.js
src/screens/treasure/SonarHuntScreen.styles.js
src/screens/treasure/FogHuntScreen.js
```

## Delt jaktstate

Fil:

```text
src/utils/treasureSessionStore.js
```

Holder:

```text
name
mode
difficulty
treasuresFound
treasuresTotal
startedAt
elapsedSeconds
completed
xpAwarded
```

Sonar, Tåkekart, funnskjermen og resultatet bruker samme session-data.

## Sonar-spillskjerm

Implementert:

- rund radar
- roterende sweep
- pulserende signalring
- spiller i sentrum
- signalpunkter uten presis skattmarkør
- skatteteller fra delt state
- tid fra delt starttid
- timer kjører bare når skjermen er fokusert
- Reduce Motion stopper sweep og puls
- fungerende kalibrering nullstiller demosignal
- åpning ved 5 meter
- avslutt-dialog nullstiller delt session

Avstand og signal er fortsatt simulert. Ekte GPS og lyd kommer senere.

## Tåkekart

Tåkekart har egen spillvisning og åpnes korrekt når `fog` er valgt.

Implementert:

- egen `FogHuntScreen`
- skatteteller og tid fra samme session som Sonar
- riktig antall skatter fra `treasureRules.js`
- funn registreres i samme session
- fokusstyrt timer

## TreasureFound

- viser faktisk funnet/total
- viser XP per skatt
- `Fortsett jakten` går tilbake til spill mens skatter gjenstår
- `Se resultat` vises først etter siste skatt
- menyvalg nullstiller session

## Resultat og XP

`TreasureResultScreen` bruker session-data som autoritativ kilde:

- faktisk modus
- faktisk vanskelighetsgrad
- faktisk antall funn
- faktisk tid
- fullføringsstatus

XP beregnes med:

```text
src/utils/xpRules.js
calculateTreasureXp(...)
```

Sonar og Tåkekart bruker identiske XP-regler:

| Nivå | Fullføring | Per skatt | Maks normal XP |
|---|---:|---:|---:|
| Enkel | 60 | 10 | 100 |
| Medium | 120 | 12 | 216 |
| Vanskelig | 220 | 15 | 400 |

XP legges til via `playerProgressStore` og beskyttes mot dobbel utbetaling med `xpAwarded` i sessionen.

## Oppsett og Home

`TreasureSetupScreen` har:

- animert cyan Sonar-preview
- profesjonell Sonar-glød
- aktiv Tåkekart-preview med sølvglød og tåke-pust

Aktiv Sonar-jakt på Home har:

- cyan accent
- radar-symbol
- Sonar-status
- cyan `Fortsett`-knapp

Home-identifikasjon bruker foreløpig `Sonar · `-prefiks i navnet. Dette fungerer, men en senere opprydding kan sende `mode` eksplisitt som prop.

## Test før bytte til Live Rebus

```bash
git pull origin sonar
npx expo start --web -c
```

Test rekkefølgen nøye:

1. Start Sonar og gå tilbake til Home.
2. Start en ny Tåkekart-jakt.
3. Bekreft at `SafetyScreen` alltid vises.
4. Bekreft at avkryssingen er tom.
5. Bekreft at `TreasureReady` ikke kan vises uten ny avkryssing.
6. Test begge moduser og alle vanskelighetsgrader.
7. Test flere funn og sluttresultat.
8. Bekreft riktig XP og én utbetaling.
9. Test 320–430 px og fysisk enhet.

## Neste arbeidsområde

Når testen over er godkjent:

```text
Live Rebus
```

Ikke start ny Sonar-refaktorering med mindre testen finner en konkret feil.

## Senere, ikke blokkerende for Live Rebus

- ekte GPS
- faktisk Sonar-lyd og bip
- haptikk
- persistent lagring etter appomstart
- backend og flerspillersynkronisering
- eksplisitt `mode`-prop til Home i stedet for tittel-prefiks
