# Branch-struktur og arbeidsmåte

Sist oppdatert: 2026-06-20.

## Aktiv arbeidsbranch

```text
home-reconstruction
```

`home-reconstruction` er nå fungerende branch for videre arbeid. Brukeren bekreftet at appen starter rent i dev-client etter siste stabilisering.

Neste arbeid skal fortsatt skje på `home-reconstruction`.

## Branch-status

### Aktiv

```text
home-reconstruction
```

Brukes videre nå.

### Stabil hovedbranch

```text
main
```

Mottar kun ferdig og godkjent arbeid.

### Arkiv / ikke aktiv

Disse skal ikke brukes i daglig arbeid:

```text
homescreen-clean
skattejakt-oppsett
design-sonar-ui
sonar
skattejakt-spillet
skattejakt-spill
neste-design
sikkerhet
```

Status per branch:

| Branch | Status | Handling nå |
|---|---|---|
| `homescreen-clean` | Feilet / ufullstendig | Ikke bruk. Kan slettes bare etter egen godkjenning. |
| `skattejakt-oppsett` | Tidligere oppsett-branch | Arkiver, ikke bruk nå. |
| `design-sonar-ui` | Stabil referanse | Behold som backup. |
| `sonar` | Tidligere Sonar-arbeid | Arkiver. |
| `skattejakt-spillet` | Tidligere skattejaktgrunnlag | Arkiver. |
| `skattejakt-spill` | Duplikat/navnevariant | Arkiver, vurder senere sletting etter kontroll. |
| `neste-design` | Tidligere designarbeid | Arkiver. |
| `sikkerhet` | Tidligere sikkerhetsarbeid | Arkiver. |

## Sletting

Ikke slett bredt.

Branch-sletting skal bare skje etter eksplisitt direkte beskjed fra bruker. Ikke slett brancher som del av rydding uten egen bekreftelse.

Eksempel hvis bruker eksplisitt godkjenner sletting av `homescreen-clean`:

```bash
git switch home-reconstruction
git branch -D homescreen-clean
git push origin --delete homescreen-clean
git fetch --prune
```

Ikke slett referansebrancher før de er kontrollert mot `home-reconstruction` og `main`.

## Brancher som ikke skal endres/merges uten eksplisitt avtale

```text
main
homescreen-clean
skattejakt-oppsett
design-sonar-ui
sonar
skattejakt-spillet
skattejakt-spill
neste-design
sikkerhet
```

## Branch-formål

### `main`

Stabil hovedbranch. Mottar kun ferdig og godkjent arbeid.

### `home-reconstruction`

Aktiv branch. Inneholder fungerende HomeScreen-redesign og nyere Skattejakt/Sonar-grunnlag. Brukes videre for HomeScreen/Sonar-oppsett i små steg.

Siste bekreftede status:

```text
App starter rent på dev-client.
HomeScreen baseline har 2 kort: Rebusløp og Skattejakt.
Home-kort ikon-mapping er fikset.
Aktiv skattejakt har trygg tittel.
expo-av er fjernet og skal ikke gjeninnføres.
```

Neste ønskede arbeid er ikke en ny branch. Det skal gjøres på `home-reconstruction`, ett steg om gangen.

### `homescreen-clean`

Eksperimentell oppryddingsbranch. Ikke bruk nå.

Status:

```text
Kan slettes etter eksplisitt bekreftelse.
Ga runtime-feil.
Mangler større kontekst fra home-reconstruction.
```

### `skattejakt-oppsett`

Tidligere arbeidsbranch for Skattejakt oppsett. Ikke bruk nå. Arkiver som referanse inntil videre.

### `design-sonar-ui`

Stabil referansebranch for Sonar/TreasureSetup fra tidligere arbeid. Ikke gjør videre Home- eller Skattejakt-oppsett-arbeid her nå. Behold som backup.

### `sonar`, `skattejakt-spillet`, `skattejakt-spill`, `neste-design`, `sikkerhet`

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
Stegvis HomeScreen/Sonar-flyt
```

Før kodeendring:

```text
1. Bekreft at appen fortsatt starter rent.
2. Bekreft at bruker vil starte med kun HomeScreen 3 kort.
3. Ikke bygg Sonar-oppsettside i samme endring.
4. Vent på eksplisitt godkjenning.
```

## Planlagt arbeid: ikke alt i én gang

### Steg 1

```text
HomeScreen får 3 kort:
- Rebusløp
- Tåkejakt
- Sonar
```

Dette skal være egen liten endring.

### Steg 2

Bare etter at steg 1 fungerer:

```text
Trykk Sonar → Sonar-oppsett
Valg:
- Spill alene
- Spill med venner
- Telefonbok når venner er valgt
- Gå videre
Deretter: Safety-skjermen
```

Dette skal være egen endring etter ny godkjenning.

## Testing

For videre arbeid:

```bash
npx expo start --dev-client --clear
```

Kontroller på telefon:

- appen starter rent
- Home vises som forventet på `home-reconstruction`
- ingen runtime-feil
- trykkflater fungerer
- skjermen passer iPhone-bredde

Etter HomeScreen 3-kort-endring skal skjermbilde sendes før neste endring.

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
