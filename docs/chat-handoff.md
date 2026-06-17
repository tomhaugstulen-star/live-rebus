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

## Nåstatus

Skattejakt med Sonar og Tåkekart er funksjonelt ferdigstilt og ryddet. Aktiv sluttflyt er:

```text
Home
→ TreasureSetup
→ Safety
→ TreasureReady
→ nedtelling
→ TreasureHunt
→ SonarHuntScreen eller FogHuntScreen
→ TreasureFound
→ tilbake til jakt mens skatter gjenstår
→ TreasureResult/XP direkte etter siste skatt
→ Home når resultatet lukkes
```

Det skal ikke være et synlig Home-mellomsteg før XP/resultatskjermen.

### Resultatruting

- `TreasureFoundScreen` navigerer direkte til `TreasureResult` etter siste skatt.
- `TreasureResultScreen` tar et stabilt snapshot av pending result og markerer resultatet som presentert ved mount.
- `HomeScreen` auto-navigerer ikke lenger til `TreasureResult`.
- Retur fra resultatskjermen skal bli stående på Home.

### Web-testkontroller

De midlertidige testkoblingene er deaktivert:

- ett web-funn fullfører ikke lenger hele jakten
- Tåkekart viser ikke lenger «Testmodus» eller gul «Åpne skatten»-knapp på web
- XP/resultatskjermen kan derfor ikke trigges fra denne testknappen
- testkontrollen skal ikke gjeninnføres før v3 og etter at skattejakt er merget

Nylige commits:

```text
c23780a  Remove web treasure auto-completion shortcut
5f4fb53  Hide fog treasure test control on web
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

Hvert registrerte funn øker nå `treasuresFound` med én både på web og mobil. Den gamle web-spesialregelen som satte funntallet direkte til totalen er fjernet.

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
3. Tåkekart viser ikke «Testmodus» eller gul «Åpne skatten»-knapp på web
4. web-funn registrerer bare én skatt
5. siste skatt går direkte til XP/resultat
6. resultat viser riktig funn, total og XP
7. resultatknapp går til Home uten å åpne resultatet på nytt
8. fysisk telefon gir haptics når resultatet åpnes

Haptics kan ikke verifiseres i nettleser og skal testes i dev build på fysisk telefon.

## Bevisst utsatt

- web-testknapp for direkte åpning av skatt; tidligst v3 etter merge
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
