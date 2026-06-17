# Branch-struktur og arbeidsmåte

## Aktiv branch

```text
sonar
```

Sonar- og Tåkekart-flyten er ferdigstilt, testet og ryddet på denne branchen. Neste arbeidsområde er Live Rebus.

## Branch-formål

### `main`

Stabil hovedbranch. Mottar kun ferdig og godkjent arbeid.

### `skattejakt-spillet`

Tidligere autoritativ branch for skattejaktgrunnlaget og Tåkekart. Skal ikke endres uten eksplisitt avtale.

### `sonar`

Aktiv arbeidsbranch. Inneholder:

- komplett Sonar- og Tåkekart-flyt
- riktig routing etter `config.variant`
- felles `treasureSessionStore`
- sikkerhetslås før `TreasureReady`
- manuell spillstart
- delt funn, total, tid, modus og XP-status
- flere skatter før resultat
- faktisk XP-beregning og beskyttelse mot dobbel utbetaling
- aktiv jakt på Home
- ferdigstilt opprydding av gamle routes, web-duplikater og session-reset
- oppdatert aktiv dokumentasjon

## Lokal oppstart

```bash
git fetch origin
git switch sonar
git pull origin sonar
git branch --show-current
git status --short
```

## Lokale brukerendringer

Disse filene kan ha lokale endringer og skal ikke overskrives eller tas med i andre commits uten eksplisitt beskjed:

```text
assets/images/treasure/treasure-chest.png
assets/images/treasure/treasure-setup-header.png
assets/images/treasure/treasure-setup-header.webp
package.json
package-lock.json
```

## Standard arbeidsmåte

1. Kontroller branch og arbeidskopi før endringer.
2. Avgrens oppgaven til én konkret funksjon, feil eller opprydding.
3. Les hele callback- og importkjeden før kode fjernes.
4. Vis en minimal diff før endringen gjennomføres.
5. Test berørt brukerflyt før commit.
6. Stage bare filene som hører til oppgaven.
7. Bruk én tydelig commit per oppgave.
8. Oppdater autoritative dokumenter når arkitektur eller flyt endres.

Filer skal ikke fjernes bare fordi navnet ser gammelt ut. Imports, exports, navigator, routes, platform-varianter, tester og dokumentasjon skal kontrolleres først. Route og import fjernes før selve skjermfilen.

Ved bruk av Codex deles arbeidet i analyse, foreslått diff, gjennomføring, validering og commit. Hver fase gjennomgås før neste fase.

## Testing

```bash
npx expo start --web -c
```

Endringer i skattejakt skal kontrollere:

- sikkerhet kan ikke hoppes over
- avbrutt avslutning fortsetter jakten
- bekreftet avslutning fjerner aktiv jakt fra Home
- ny jakt starter som ny session
- riktig modus åpnes
- XP utbetales én gang
- webbredder 320–430 px og fysisk enhet ved visuelle endringer

## Viktige avsluttende commits

```text
c976f7c  Remove obsolete area check route
193916d  Delete obsolete area check screen
a808b57  Remove unused catch parameter
ae9dcf9  Remove duplicate sonar session reset
6ad0059  Update active treasure hunt documentation
```

## Autoritative dokumenter

```text
README.md
docs/chat-handoff.md
docs/project-status.md
docs/treasure-hunt-flow.md
docs/repo-cleanup-audit.md
docs/branch-structure.md
```

`docs/V1_STATUS.md` og `_v1_reference/**` er historiske snapshots og beskriver ikke nødvendigvis dagens kode.
