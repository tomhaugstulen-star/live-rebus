# Chat-handoff: Skattejakt-spillet

Dette dokumentet skal leses før videre arbeid i en ny chat.

## Repo og branch

Repo:

```text
tomhaugstulen-star/live-rebus
```

Aktiv branch:

```text
skattejakt-spillet
```

Kontroller lokalt:

```bash
git switch skattejakt-spillet
git pull origin skattejakt-spillet
git branch --show-current
```

Ikke gjør direkte endringer på `main`.

## Nåværende status

Skattejaktflyten finnes fra Home til resultat:

```text
Home → TreasureSetup → Safety → TreasureReady → TreasureHunt → TreasureFound → TreasureResult
```

Implementert:

- oppsett for navn, modus, spillere og vanskelighetsgrad
- telefonkontakter med `expo-contacts`
- sikkerhetsbekreftelse
- vert og opptil fem venner
- nedtelling før start
- web- og native-spillskjerm
- pågående skattejakt på Home med `Fortsett`
- lokal fremdrift
- felles skatteregler
- tilfeldig koordinatgenerator med avstandsvalidering
- XP-regler for Enkel, Medium og Vanskelig
- level 1–30
- lokal XP-oppdatering på Home

## Viktige filer

```text
src/navigation/AppNavigator.js
src/screens/home/HomeScreen.js
src/screens/treasure/TreasureSetupScreen.js
src/screens/treasure/SafetyScreen.js
src/screens/treasure/TreasureReadyScreen.js
src/screens/treasure/TreasureHuntScreen.js
src/screens/treasure/TreasureHuntScreen.web.js
src/screens/treasure/TreasureHuntScreen.styles.js
src/screens/treasure/TreasureFoundScreen.js
src/screens/treasure/TreasureResultScreen.js
src/utils/treasureRules.js
src/utils/xpRules.js
src/utils/playerProgressStore.js
```

## Felles skatteregler

| Nivå | Skatter | Område | Tåkeradius | Minste skattavstand |
|---|---:|---:|---:|---:|
| Enkel | 4 | 50 m | 10 m | 15 m |
| Medium | 8 | 150 m | 6 m | 20 m |
| Vanskelig | 12 | 300 m | 4 m | 50 m |

Generatoren ligger i `src/utils/treasureRules.js`, men er ennå ikke koblet til ekte GPS/startposisjon.

## XP-regler

| Nivå | Fullføring | Per skatt | Maks normal XP |
|---|---:|---:|---:|
| Enkel | 60 | 10 | 100 |
| Medium | 120 | 12 | 216 |
| Vanskelig | 220 | 15 | 400 |

Vinnerbonus og delt førsteplass er definert, men flerspillerfordeling krever backend og tas senere.

Home starter på demoverdien 420 XP. Opptjent XP legges til lokalt etter resultat og oppdaterer Home med én gang. Full appomstart nullstiller denne lokale statusen.

## Sonar-beslutning

Sonar skal være en minimal variant av samme spillskjerm:

- rund radar i stedet for kart
- egne radar-, lyd- og kalibreringsikoner
- ingen presis skattmarkør
- bip går saktere langt unna og raskere nær skatten
- åpning omtrent 3–5 meter fra skatten
- samme statuskort, XP, funn og resultatflyt som Tåkekart

Ferdig lyd- og radarlogikk er ikke implementert.

## Kritiske hull før merge

1. `TreasureHuntScreen.web.js` bruker ikke ennå felles regler fra `treasureRules.js`.
2. `AppNavigator.js` sender fortsatt demo-XP til resultatet.
3. Faktisk vanskelighetsgrad og faktisk antall funn er ikke komplett koblet til resultatet.
4. `package-lock.json` inneholder ikke nødvendigvis den committed `expo-contacts`-endringen.
5. Branchen var ved siste kontroll 104 commits foran og 7 commits bak `main`.
6. Hele flyten er ikke ferdig testet etter synkronisering med `main`.

## Eksakt plan før merge

```text
Koble web-tåkekart til felles regler
→ koble faktisk XP og funn til resultat
→ få med package-lock
→ synkroniser main inn i branchen
→ test hele flyten
→ merge
```

Ikke hopp over rekkefølgen.

## Testkommando

```bash
npm install
npx expo start --web -c
```

Test:

- Home → oppsett → sikkerhet → klar → spill → funn → resultat → Home
- Home viser pågående jakt og riktig fremdrift
- `Fortsett` åpner jakten
- alle vanskelighetsgrader
- web og native bruker samme skatteregler
- XP beregnes riktig og legges til én gang
- telefonkontakter på fysisk enhet
- tilbakeknapper og avslutt-dialog
- 320–430 px bredde
- ingen horisontal scrolling

## V3 / senere

- backend
- pushvarsler når noen finner en skatt
- første spiller registrert per funn
- felles skattekoordinater og starttid for alle
- beskyttelse mot dobbeltfunn
- «Gratulerer, du fant flest skatter»
- detaljert flerspillerresultat

## Dokumenter som skal holdes oppdatert

- `README.md`
- `docs/project-status.md`
- `docs/branch-structure.md`
- `docs/treasure-hunt-flow.md`
- `docs/chat-handoff.md`
