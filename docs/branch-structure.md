# Branch-struktur og arbeidsmåte

## Aktiv arbeidsbranch

```text
home-reconstruction
```

Denne branchen brukes nå til Home-rekonstruksjon. Den ble opprettet fra stabil `design-sonar-ui` for å isolere Home-arbeidet.

Ikke endre eller merge disse uten eksplisitt avtale:

```text
main
sonar
skattejakt-spillet
design-sonar-ui
```

## Branch-formål

### `main`

Stabil hovedbranch. Mottar kun ferdig og godkjent arbeid.

### `skattejakt-spillet`

Tidligere autoritativ branch for skattejaktgrunnlaget og Tåkekart. Skal ikke endres uten eksplisitt avtale.

### `sonar`

Tidligere arbeidsbranch for Sonar-/Tåkekart-stabilisering. Skal ikke endres videre uten eksplisitt avtale.

### `design-sonar-ui`

Stabil referansebranch for Sonar/TreasureSetup etter at iOS-build ble bekreftet OK. Ikke gjør videre Home-arbeid her nå.

Inneholder blant annet:

- komplett Sonar- og Tåkekart-flyt
- felles `treasureSessionStore`
- sikkerhetslås før `TreasureReady`
- nedtelling før spillstart
- direkte sluttflyt fra siste skatt til XP/resultat
- Sonar med app-generert signaljakt via `sonarSignalEngine.js`
- TreasureSetup uten navnefelt
- TreasureSetup med infokort for valgt vanskelighetsgrad
- område- og Sonar-parametere i `treasureRules.js`
- iOS-buildfix der `expo-av`-bruk ble fjernet fra `TreasureReadyScreen.js`

### `home-reconstruction`

Aktiv branch akkurat nå. Formål:

```text
Bygge ny førstegangs-Home med to liggende kort:
- Rebusløp
- Skattejakt
```

Gjort på branchen:

- fjernet `Velg eventyr` og `Alle utfordringer` fra førstegangs-Home
- fjernet nederste dupliserte førstegangsseksjon når `homeEvents` ikke finnes
- lagt inn nye kortbakgrunner
- lagt inn egne kortikoner
- byttet Home-kort til liggende format

Kjent gjenstående arbeid:

```text
src/components/home/HomeChallengeCard.js
```

Siste kjente visuelle feil:

- ikonene er byttet om
- `Skattejakt` trunkeres til `Skattej...`

Neste chat skal først verifisere/fikse dette før flere Home-designendringer.

## Lokal oppstart

```bash
git fetch origin
git switch home-reconstruction
git pull --rebase origin home-reconstruction
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

Filer skal ikke fjernes bare fordi navnet ser gammelt ut. Imports, exports, navigator, routes, platform-varianter, tester og dokumentasjon skal kontrolleres først.

Ved bruk av Codex deles arbeidet i analyse, foreslått diff, gjennomføring, validering og commit. Hver fase gjennomgås før neste fase.

## Testing

For Home-arbeid:

```bash
npx expo start --dev-client
```

Kontroller på telefon:

- riktig ikon på Rebusløp
- riktig ikon på Skattejakt
- `Skattejakt` vises fullt
- kortene har nok luft mellom seg
- bakgrunnsbildene er synlige, men teksten er lesbar
- hele kortet er trykkbart

For skattejakt senere:

- TreasureSetup uten navnefelt
- TreasureSetup-infokort for valgt vanskelighetsgrad
- trykkflater og fontstørrelser på 320–430 px bredde
- sikkerhet kan ikke hoppes over
- nedtelling ender i riktig spillskjerm
- Sonar roterer mens skjermen er aktiv
- Sonar-funn skjer på samme skjerm mens skatter gjenstår
- siste skatt går direkte til XP/resultat
- XP utbetales én gang
- resultat lukkes til Home uten loop

## Autoritative dokumenter

```text
README.md
docs/chat-handoff.md
docs/project-status.md
docs/branch-structure.md
docs/sonar-roadmap.md
docs/treasure-hunt-flow.md
docs/repo-cleanup-audit.md
```

`docs/V1_STATUS.md` og `_v1_reference/**` er historiske snapshots og beskriver ikke nødvendigvis dagens kode.
