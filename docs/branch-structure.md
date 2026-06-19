# Branch-struktur og arbeidsmåte

## Aktiv branch

```text
design-sonar-ui
```

Denne branchen inneholder pågående Sonar-design, TreasureSetup-redesign og app-generert signaljakt. `sonar`, `skattejakt-spillet` og `main` skal ikke endres eller merges uten eksplisitt avtale.

## Branch-formål

### `main`

Stabil hovedbranch. Mottar kun ferdig og godkjent arbeid.

### `skattejakt-spillet`

Tidligere autoritativ branch for skattejaktgrunnlaget og Tåkekart. Skal ikke endres uten eksplisitt avtale.

### `sonar`

Tidligere arbeidsbranch for Sonar-/Tåkekart-stabilisering. Skal ikke endres videre uten eksplisitt avtale. Brukes som stabil referanse for skattejaktgrunnlaget.

### `refactor-split-large-files`

Teknisk refaktorbranch som ble brukt til å splitte store filer og stabilisere skattejakt før `design-sonar-ui`.

### `design-sonar-ui`

Aktiv arbeidsbranch. Inneholder:

- komplett Sonar- og Tåkekart-flyt
- riktig routing etter `config.variant`
- felles `treasureSessionStore`
- sikkerhetslås før `TreasureReady`
- nedtelling før spillstart
- fade-in fra nedtelling til spillskjerm
- delt funn, total, tid, modus og XP-status
- faktisk XP-beregning og beskyttelse mot dobbel utbetaling
- resultatdata via `pendingResultStore`
- resultatfade og telefon-haptics
- direkte sluttflyt fra siste skatt til XP/resultat
- Tåkekart uten gammel web-testknapp
- aktiv jakt på Home
- app-generert Sonar-signaljakt via `sonarSignalEngine.js`
- Sonar med roterende radar, rød målprikk, haptics og funnsekvens på samme skjerm
- TreasureSetup uten navnefelt
- TreasureSetup med infokort for valgt vanskelighetsgrad
- område- og Sonar-parametere i `treasureRules.js`
- oppdatert aktiv dokumentasjon

## Lokal oppstart

```bash
git fetch origin
git switch design-sonar-ui
git pull origin design-sonar-ui
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
4. Hold kildefiler under 300 linjer der det er praktisk mulig.
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

- TreasureSetup uten navnefelt
- TreasureSetup-infokort for valgt vanskelighetsgrad
- trykkflater og fontstørrelser på 320–430 px bredde
- sikkerhet kan ikke hoppes over
- nedtelling ender i riktig spillskjerm
- spillskjermen fader inn etter `START`
- avbrutt avslutning fortsetter jakten
- bekreftet avslutning fjerner aktiv jakt fra Home
- ny jakt starter som ny session
- riktig modus åpnes
- Sonar roterer mens skjermen er aktiv
- Sonar-funn skjer på samme skjerm mens skatter gjenstår
- siste skatt går direkte til XP/resultat
- XP utbetales én gang
- resultat lukkes til Home uten loop
- fysisk enhet ved visuelle endringer og haptics

## Viktige nyere commits

```text
63067b1  Remove treasure name field and add difficulty info
f2fb5f7  Redesign treasure setup spacing
0bb44bb  Remove default treasure name config
d3dbab5  Stop generating treasure names
d840e8d  Stop defaulting treasure session name
a2166aa  Add sonar visibility distance per difficulty
f589bf0  Adjust treasure area diameters
8a4ebd1  Document single active treasure rule
```

## Autoritative dokumenter

```text
README.md
docs/chat-handoff.md
docs/project-status.md
docs/sonar-roadmap.md
docs/treasure-hunt-flow.md
docs/repo-cleanup-audit.md
docs/branch-structure.md
```

`docs/V1_STATUS.md` og `_v1_reference/**` er historiske snapshots og beskriver ikke nødvendigvis dagens kode.
