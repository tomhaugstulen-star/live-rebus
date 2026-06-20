# Branch-struktur og arbeidsmåte

## Aktiv arbeidsbranch

```text
home-reconstruction
```

`home-reconstruction` er nå fungerende branch for videre arbeid. Den er bekreftet fungerende på iPhone/dev-client etter branch-avklaringen.

Neste arbeidsområde er Skattejakt oppsett, men arbeidet skal fortsatt skje på `home-reconstruction`.

## Brancher som ikke skal brukes nå

```text
homescreen-clean
skattejakt-oppsett
```

Forklaring:

- `homescreen-clean` ble opprettet som forsøk på ren HomeScreen-branch. Den ga runtime-feil og mangler kontekst fra `home-reconstruction`. Den skal ignoreres inntil videre.
- `skattejakt-oppsett` var tidligere aktiv for TreasureSetup, men skal ikke brukes nå. Den skapte branch-forvirring.

## Brancher som ikke skal endres/merges uten eksplisitt avtale

```text
main
homescreen-clean
skattejakt-oppsett
design-sonar-ui
sonar
skattejakt-spillet
```

## Branch-formål

### `main`

Stabil hovedbranch. Mottar kun ferdig og godkjent arbeid.

### `home-reconstruction`

Aktiv branch. Inneholder fungerende HomeScreen-redesign og nyere Skattejakt/Sonar-grunnlag. Brukes videre for Skattejakt oppsett.

Siste bekreftede status:

```text
Fungerer på iPhone/dev-client.
HomeScreen-redesignet skal beholdes.
Dynamisk HomeScreen er utsatt.
Neste arbeid er Skattejakt oppsett.
```

### `homescreen-clean`

Eksperimentell oppryddingsbranch. Ikke bruk nå.

Status:

```text
Skal ignoreres inntil videre.
Ga runtime-feil.
Mangler større kontekst fra home-reconstruction.
```

### `skattejakt-oppsett`

Tidligere arbeidsbranch for Skattejakt oppsett. Ikke bruk nå.

### `design-sonar-ui`

Stabil referansebranch for Sonar/TreasureSetup fra tidligere arbeid. Ikke gjør videre Home- eller Skattejakt-oppsett-arbeid her nå.

### `sonar` og `skattejakt-spillet`

Tidligere arbeids-/referansebrancher. Ikke bruk nå uten eksplisitt avtale.

## Lokal oppstart

```bash
git fetch origin
git switch home-reconstruction
git reset --hard origin/home-reconstruction
git branch --show-current
git status --short
npx expo start --dev-client --clear
```

Forventet branch:

```text
home-reconstruction
```

## Standard arbeidsmåte

1. Kontroller branch og arbeidskopi før endringer.
2. Avgrens oppgaven til én konkret funksjon, feil eller opprydding.
3. Ikke gjør repo-endringer før brukeren har godkjent den konkrete endringen.
4. Les hele callback- og importkjeden før kode fjernes.
5. Hold kildefiler under 300 linjer der det er praktisk mulig.
6. Test berørt brukerflyt på iPhone/dev-client før neste endring.
7. Commit bare filer som hører til oppgaven.
8. Bruk én tydelig commit per oppgave.
9. Oppdater dokumenter når branch, flyt eller arkitektur endres.

Filer skal ikke fjernes bare fordi navnet ser gammelt ut. Imports, exports, navigator, routes, platform-varianter, tester og dokumentasjon skal kontrolleres først.

## Neste arbeidsområde

```text
Skattejakt oppsett
```

Før kodeendring:

```text
1. Gå Home → Skattejakt på iPhone.
2. Be bruker sende skjermbilde.
3. Foreslå første konkrete justering.
4. Vent på godkjenning.
```

## Skattejakt-oppsett: ønsket retning

- Først vises Tåkejakt og Sonar.
- Når Sonar velges, forsvinner Tåkejakt.
- Sonar flyttes opp.
- Deretter vises `Hvem spiller du med?`.
- Første valg: `Alene` og `Med venner`.
- Venne-/telefonbokflyt kommer senere.
- Ikke start med animasjon; implementer layoutlogikk først.

## Testing

For videre arbeid:

```bash
npx expo start --dev-client --clear
```

Kontroller på telefon:

- Home vises som på `home-reconstruction`
- Home → Skattejakt åpner oppsett
- ingen runtime-feil
- trykkflater fungerer
- skjermen passer iPhone-bredde

## Lokale brukerendringer / beskyttede filer

Ikke overskriv uten eksplisitt beskjed:

```text
assets/images/treasure/treasure-chest.png
assets/images/treasure/treasure-setup-header.png
assets/images/treasure/treasure-setup-header.webp
package.json
package-lock.json
```

Ikke gjeninnfør `expo-av` uten eksplisitt avtale.

## Autoritative dokumenter

```text
README.md
docs/chat-handoff.md
docs/project-status.md
docs/branch-structure.md
docs/V2_STATUS.md
docs/sonar-roadmap.md
docs/treasure-hunt-flow.md
docs/repo-cleanup-audit.md
```

`docs/V1_STATUS.md` og `_v1_reference/**` er historiske snapshots og beskriver ikke nødvendigvis dagens kode.