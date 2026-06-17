# Chat-handoff: Skattejakt stabilisert, neste chat kan fortsette ryddig

Les dette først i neste chat.

## Repo og branch

```text
tomhaugstulen-star/live-rebus
sonar
```

Bruk alltid gjeldende `origin/sonar` etter pull som autoritativ head.

```bash
git fetch origin
git switch sonar
git pull origin sonar
git branch --show-current
git status --short
```

`main` og `skattejakt-spillet` skal ikke endres uten eksplisitt avtale.

## Lokale brukerendringer

Disse filene kan ha lokale endringer og skal ikke overskrives eller tas med i andre commits:

```text
assets/images/treasure/treasure-chest.png
assets/images/treasure/treasure-setup-header.png
assets/images/treasure/treasure-setup-header.webp
package.json
package-lock.json
```

## Status

The duplicate result-screen routing fix is implemented.

- `TreasureFoundScreen` navigates directly to `TreasureResult`
- `TreasureResultScreen` marks the pending result as presented on mount
- `HomeScreen` no longer auto-opens `TreasureResult`
- returning from the result screen should leave Home visible
- manual web and physical-device verification remains

Nylige commits:

```text
b3f8e3c  Prevent presented treasure result from reopening
8fbf94d  Mark treasure result as presented on open
f68a120  Remove obsolete treasure result routing from Home
98cb03b  Complete treasure hunt with one find on web
fd2ba8b  Add victory haptics to treasure result
e8939c1  Add fade-in transition to treasure result
bd9bf27  Slow down treasure result fade-in
ebf3e73  Fade in treasure game after countdown
a514543  Restore direct treasure result flow
```

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
src/screens/treasure/SonarHuntScreen.styles.js
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

## Modusruting

```text
config.variant === "sonar" → SonarHuntScreen
config.variant === "fog"   → FogHuntScreen
```

`TreasureHuntScreen.js` er felles wrapper og eier fade-in etter nedtellingen.

## Nedtelling og overgang

`TreasureReadyScreen` eier nedtellingen:

```text
10 → 9 → ... → 1 → START
```

Når `onStart` navigerer til `TreasureHunt`, fader spillskjermen inn over omtrent 900 ms med svak skalering. Resultatet har også egen rolig fade-in, og denne skal foreløpig beholdes.

Pipelyd er ikke implementert fordi selve lydfilen mangler. `expo-av` finnes i prosjektet. Senere bør lyd styres av en global innstilling som `soundEnabled`.

## Session og funn

Sonar og Tåkekart bruker samme `treasureSessionStore`.

Sessionen holder blant annet:

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

På mobil registrerer hvert funn én skatt. På web setter `registerTreasureSessionFound` funntallet direkte til totalen for rask sluttflyt-testing.

## Resultat og XP

Siste funn:

```text
TreasureFoundScreen.saveCompletedResult()
→ pendingResultStore.setPendingResult(...)
→ onContinue()
→ TreasureResult
```

Resultatskjermen prioriterer data fra `pendingResultStore`, med session/props som fallback. Når brukeren går til Home eller starter ny jakt:

```text
markTreasureXpAwarded()
clearPendingResult()
resetTreasureSession()
```

XP-regler:

| Nivå | Fullføring | Per skatt | Maks normal XP |
|---|---:|---:|---:|
| Enkel | 60 | 10 | 100 |
| Medium | 120 | 12 | 216 |
| Vanskelig | 220 | 15 | 400 |

## Sikkerhetslås

- hver ny eller returnerende jakt krever fersk sikkerhetsbekreftelse
- `SafetyScreen` nullstiller gammel godkjenning ved fokus
- `TreasureReadyScreen` kan bare åpnes med fersk engangsbekreftelse
- manglende bekreftelse bygger stacken `Home → TreasureSetup → Safety`

## Avslutningsflyt

Spillskjermene viser bekreftelsesdialog. `AppNavigator.abandonTreasure` nullstiller session, fjerner `activeTreasure` og går til Home ved bekreftet avslutning.

## Test

```bash
git switch sonar
git pull origin sonar
npx expo start --web -c
```

Verifiser:

1. nedtelling avsluttes med `START`
2. spillskjermen fader inn tydelig
3. web kan åpne skatten direkte
4. ett web-funn gir fullført jakt
5. siste skatt går direkte til XP/resultat
6. resultat viser riktig funn, total og XP
7. resultatknapp går til Home uten å åpne resultatet på nytt
8. fysisk telefon gir haptics når resultatet åpnes

Haptics kan ikke verifiseres i nettleser og skal testes i dev build på fysisk telefon.

## Bevisst utsatt

- ekte GPS og faktisk distanse
- pipelyd i nedtelling
- global `soundEnabled`/`hapticsEnabled`
- persistent lagring
- backend og flerspillersynkronisering
- eksplisitt `mode`-prop til Home i stedet for tittel-prefiks

## Neste arbeidsområde

```text
Live Rebus
```

Ikke start en bred skattejakt-refaktorering uten en konkret feil. Start neste chat med:

```text
docs/chat-handoff.md
docs/project-status.md
docs/treasure-hunt-flow.md
docs/branch-structure.md
```
