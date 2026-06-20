# Branch-struktur og arbeidsmåte

## Aktiv arbeidsbranch

```text
design/sonar-setup-card-scale
```

Denne branchen brukes nå til Sonar på Home og Sonar setup. Den har åpen PR mot `treasure-setup-cleanup`.

```text
PR #2: Legg til Sonar-oppsett
base: treasure-setup-cleanup
head: design/sonar-setup-card-scale
```

Ikke merge PR #2 uten eksplisitt avtale.

## Brancher som ikke skal endres eller merges uten avtale

```text
main
sonar
skattejakt-spillet
design-sonar-ui
treasure-setup-cleanup
```

## Branch-formål

### `main`

Stabil hovedbranch. Mottar kun ferdig og godkjent arbeid.

### `treasure-setup-cleanup`

Base for PR #2. Skal ikke endres direkte mens PR-arbeidet pågår.

### `design/sonar-setup-card-scale`

Aktiv branch akkurat nå. Formål:

```text
Legge til og justere Sonar som egen kategori på Home og i setup-flyten.
```

Gjort på branchen:

- lagt til Sonar som eget Home-kort
- koblet Sonar-kort til TreasureSetup
- lagt til Sonar-bakgrunn og Sonar-knapp-assets
- gjort Venn/Venner-knapper transparente
- fjernet grått setup-panel for Sonar
- ryddet Sonar-copy
- opprettet PR #2
- testet radar i setup og fjernet den fra header igjen etter designavklaring

Nåværende uavklarte arbeid:

```text
Samlet visuell retning for Sonar fra Home til setup/sikkerhet/spill.
```

### `design-sonar-ui`

Tidligere stabil referansebranch for Sonar/TreasureSetup etter iOS-buildfix. Skal ikke være aktiv arbeidsbranch nå.

### `home-reconstruction`

Tidligere branch for Home-rekonstruksjon. Ikke lenger aktiv branch i denne økten.

### `sonar`

Tidligere arbeidsbranch for Sonar-/Tåkekart-stabilisering. Skal ikke endres videre uten eksplisitt avtale.

### `skattejakt-spillet`

Tidligere autoritativ branch for skattejaktgrunnlaget og Tåkekart. Skal ikke endres uten eksplisitt avtale.

## Lokal oppstart

```bash
git fetch --all --prune
git switch design/sonar-setup-card-scale
git pull origin design/sonar-setup-card-scale
git branch --show-current
git status --short
npx expo start --dev-client --clear
```

## Filer som ikke skal endres uten eksplisitt avtale

```text
package.json
package-lock.json
```

Pakker skal ikke endres uten avtale.

## Standard arbeidsmåte

1. Kontroller branch og arbeidskopi før endringer.
2. Avgrens oppgaven til én konkret funksjon, feil eller opprydding.
3. Les hele import-/navigator-kjeden før kode fjernes.
4. Hold kildefiler under 300 linjer der det er praktisk mulig.
5. Test berørt brukerflyt før commit.
6. Stage bare filene som hører til oppgaven.
7. Bruk én tydelig commit per oppgave.
8. Oppdater autoritative dokumenter når arkitektur, flyt eller retning endres.

Filer skal ikke fjernes bare fordi navnet ser gammelt ut. Imports, exports, navigator, routes, platform-varianter og dokumentasjon skal kontrolleres først.

## Nåværende designavklaring

Brukeren mener helheten er feil hvis Home, Sonar setup, sikkerhet og Sonar-spill har for sprikende visuelt uttrykk.

Viktig prinsipp:

```text
Home = teaser
Setup = valg
Sikkerhet = klargjøring
Spill = radar
```

Stor radar skal ikke tilbake på setup-siden uten ny eksplisitt beskjed.

## Testing

For denne branchen:

```bash
npx expo start --dev-client --clear
```

Kontroller på telefon:

- Home viser Rebusløp, Skattejakt og Sonar.
- Sonar-kortet åpner Sonar setup.
- Sonar setup viser `Venn` og `Venner`.
- Skattejakt er ikke visuelt eller funksjonelt ødelagt.
- PR #2 står åpen og ikke merget.

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
