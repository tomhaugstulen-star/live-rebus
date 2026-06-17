# Chat-handoff: Skattejakt ferdigstilt, neste er Live Rebus

Les dette først i neste chat.

## Repo og branch

```text
tomhaugstulen-star/live-rebus
sonar
```

Lokal kontroll:

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

Skattejakt med Sonar og Tåkekart er funksjonelt ferdigstilt, testet og ryddet. Oppryddingen stoppes her. Neste arbeidsområde er Live Rebus.

Aktiv flyt:

```text
Home
→ TreasureSetup
→ Safety
→ TreasureReady
→ TreasureHunt
→ SonarHuntScreen eller FogHuntScreen
→ TreasureFound
→ tilbake til jakt mens skatter gjenstår
→ TreasureResult etter siste skatt
```

`AreaCheck` er fjernet fra navigatoren og filen eksisterer ikke lenger. `TreasureHuntScreen.web.js` er også fjernet; web og native bruker samme `TreasureHuntScreen.js`.

## Viktig repo-struktur

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

src/utils/treasureSessionStore.js
src/utils/treasureSafetyStore.js
src/utils/treasureRules.js
src/utils/xpRules.js
src/utils/playerProgressStore.js
```

## Modusruting

```text
config.variant === "sonar" → SonarHuntScreen
config.variant === "fog"   → FogHuntScreen
```

`TreasureHuntScreen.js` er felles ruter for begge plattformer.

## Sikkerhetslås

- hver ny eller returnerende jakt krever fersk sikkerhetsbekreftelse
- `SafetyScreen` nullstiller gammel godkjenning ved fokus
- `TreasureReadyScreen` kan bare åpnes med fersk engangsbekreftelse
- manglende bekreftelse bygger stacken `Home → TreasureSetup → Safety`
- Sonar først og Tåkekart etterpå kan ikke gjenbruke gammel sikkerhetsstatus

## Session og manuell start

Sonar og Tåkekart bruker samme `treasureSessionStore`.

Nye sessions har:

```text
startedAt: null
gameStarted: false
```

Starttid settes først når brukeren trykker `Start spill`. Timer, signal, avstand og relevant animasjon står stille før start. En allerede startet jakt fortsetter når brukeren kommer tilbake.

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

## Avslutningsflyt

Spillskjermene viser bekreftelsesdialogen. `AppNavigator.abandonTreasure` eier selve avslutningen:

```text
SonarHuntScreen eller FogHuntScreen
→ TreasureHuntScreen.onBack
→ AppNavigator.abandonTreasure
```

Navigatoren nullstiller sessionen, fjerner `activeTreasure` og går til Home.

Verifisert:

- Avbryt lar jakten fortsette.
- Bekreft avslutning fjerner aktiv jakt og Home-kort.
- En ny jakt starter som ny session.

## Funn, resultat og XP

- flere funn går tilbake til samme jakt
- siste funn åpner resultat
- resultatet bruker faktisk modus, vanskelighet, funn og tid
- Sonar og Tåkekart bruker samme XP-regler
- `xpAwarded` hindrer dobbel utbetaling

| Nivå | Fullføring | Per skatt | Maks normal XP |
|---|---:|---:|---:|
| Enkel | 60 | 10 | 100 |
| Medium | 120 | 12 | 216 |
| Vanskelig | 220 | 15 | 400 |

## Avsluttet opprydding

Fullført:

- gammel `TreasureHuntScreen.web.js` fjernet
- gammel `HomeProgressCard.js` fjernet
- inaktiv hjelpeknapp fjernet fra TreasureSetup-headeren
- redundant Safety-cleanup fjernet
- duplisert session-reset fjernet fra Fog og Sonar
- `AreaCheck`-route, import og fil fjernet
- ubrukt catch-parameter fjernet fra `TreasureSetupScreen.js`
- aktive dokumenter oppdatert

Viktige commits:

```text
c976f7c  Remove obsolete area check route
193916d  Delete obsolete area check screen
a808b57  Remove unused catch parameter
ae9dcf9  Remove duplicate sonar session reset
6ad0059  Update active treasure hunt documentation
142c456  Protect local treasure assets in documentation
cc7ca96  Document current branch and working method
2814777  Record completed treasure hunt status
4e2c856  Clarify final treasure hunt session ownership
6fc0b6f  Add cleanup audit status note
```

Detaljer finnes i `docs/repo-cleanup-audit.md`.

## Arbeidsmåte

Arbeidsmåten er dokumentert i `docs/branch-structure.md`.

Kortversjon:

1. kontroller branch og arbeidskopi
2. én konkret oppgave om gangen
3. analyser imports, callbacks og referanser først
4. vis minimal diff før endring
5. test berørt flyt
6. stage bare godkjente filer
7. én tydelig commit per oppgave

Ved bruk av Codex gjennomgås analyse, foreslått diff, gjennomføring, validering og commit separat. Filfjerning krever full referansesjekk og egen bekreftelse.

## Bevisst utsatt

Dette blokkerer ikke Live Rebus:

- mulig opprydding av `level` og `xpToNextLevel` i Home-kallet
- eventuell oppdeling av `TreasureSetupScreen.js`
- eksplisitt `mode`-prop til Home i stedet for tittel-prefiks
- ekte GPS
- Sonar-lyd og haptikk
- persistent lagring
- backend og flerspillersynkronisering

Ikke start en ny bred skattejakt- eller Sonar-refaktorering uten en konkret feil.

## Neste arbeidsområde

```text
Live Rebus
```

Før ny funksjonsutvikling skal neste chat lese:

```text
docs/chat-handoff.md
docs/project-status.md
docs/treasure-hunt-flow.md
docs/branch-structure.md
docs/repo-cleanup-audit.md
```
