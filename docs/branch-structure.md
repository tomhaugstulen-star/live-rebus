# Branch-struktur

Dette dokumentet beskriver branchene som brukes i repoet og reglene for å unngå parallelle eller uklare arbeidsløp.

## Aktive brancher

### `main`

Formål:

- stabil hovedbranch
- skal ikke brukes til direkte designarbeid eller eksperimentering
- endres først når en arbeidsbranch er ferdig kontrollert og klar for merge

Regel:

- ikke push direkte til `main`
- merge kun ferdig og godkjent arbeid

### `skattejakt-spill`

Formål:

- godkjent grunnlag for Skattejakt-oppsett, Sikkerhet og Klar til start
- inneholder støtte for vert + opptil fem venner
- brukes som foreldrebranch for spillskjermen

Gjeldende flyt på denne branchen:

```text
Home → TreasureSetup → Safety → TreasureReady → TreasureHunt
```

Regel:

- ikke legg nytt arbeid på denne branchen mens `skattejakt-spillet` er aktiv
- bruk den kun som referanse eller godkjent utgangspunkt

### `skattejakt-spillet`

Formål:

- aktiv arbeidsbranch for selve spillskjermen etter nedtellingen
- opprettet fra siste godkjente commit på `skattejakt-spill`
- inneholder første versjon av `TreasureHuntScreen`

Endringer på denne branchen:

- ny `src/screens/treasure/TreasureHuntScreen.js`
- ny `src/screens/treasure/TreasureHuntScreen.styles.js`
- ingen nødvendig endring i `AppNavigator.js` for første prototype
- dokumentasjon oppdatert for håndover til ny chat

Gjeldende komplette flyt:

```text
Home
  → TreasureSetup
  → Safety
  → TreasureReady
  → TreasureHunt
  → TreasureFound
  → TreasureResult
```

Autoritativ branch for videre arbeid med spillskjermen er nå `skattejakt-spillet`.

## Tidligere arbeidsbrancher

### `sikkerhet`

Status:

- tidligere aktiv branch for Skattejakt-oppsett og Sikkerhet
- funksjonaliteten er videreført i nyere skattejakt-brancher
- skal ikke brukes til nytt spillskjermarbeid

### `skattejakt-oppsett`

Status:

- inneholder eldre godkjent Skattejakt-oppsett
- er ikke autoritativ for videre arbeid

### `neste-design`

Status:

- midlertidig eldre videreføringsbranch
- er ikke i bruk

## Autoritativ branch

For neste arbeidsøkt og ny chat:

```text
skattejakt-spillet
```

Ikke gjør nye endringer i:

- `main`
- `sikkerhet`
- `skattejakt-oppsett`
- `neste-design`
- `skattejakt-spill`

med mindre det blir eksplisitt avtalt.

## Regler for videre arbeid

1. Bekreft aktiv branch med `git branch --show-current`.
2. Aktiv branch skal være `skattejakt-spillet`.
3. Bruk én branch per tydelig oppgave eller skjermgruppe.
4. Ikke legg funksjonelle endringer og stor strukturell refaktorering i samme commit.
5. Commit alle endringer før branchbytte.
6. Dokumenter navigasjonsendringer og nye flyter i `README.md` og relevant fil under `docs/`.
7. Ikke endre godkjente oppsett-, sikkerhets- eller klar-til-start-skjermer fra spillskjermbranchen uten eksplisitt godkjenning.
8. Verifiser at en gammel branch ikke har unike commits før sletting.
9. Slett foreldede brancher først etter merge eller eksplisitt godkjenning.

## Sjekk før sletting eller merge

Bekreft:

- aktiv branch inneholder alle nødvendige filer
- siste arbeid er committed
- hele skattejaktflyten fungerer manuelt
- ingen utilsiktede filer er endret
- eventuell pull request er kontrollert
- `main` er fortsatt urørt dersom merge ikke er godkjent

## Nåværende anbefaling

Behold:

- `main`
- `skattejakt-spill`
- `skattejakt-spillet`

Ikke slett eldre brancher før det er kontrollert at de ikke har unike commits og bruker har godkjent sletting.
