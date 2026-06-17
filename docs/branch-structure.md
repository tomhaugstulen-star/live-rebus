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

### `sikkerhet`

Formål:

- aktiv arbeidsbranch for godkjent Skattejakt-oppsett og Sikkerhet
- inneholder også oppdatert navigasjon og dokumentasjon for denne flyten

Gjeldende flyt:

```text
Home → TreasureSetup → Safety → TreasureHunt
```

Denne branchen skal brukes videre til arbeidet er testet og klart for merge.

## Foreldede brancher

### `skattejakt-oppsett`

Status:

- peker på commit `3259b49`
- inneholder godkjent Skattejakt-oppsett
- alle commits og endringer derfra finnes allerede i `sikkerhet`
- `sikkerhet` ligger foran og er den autoritative arbeidsbranchen

Konklusjon:

- ikke bruk denne branchen til nytt arbeid
- kan slettes etter at `sikkerhet` er merget eller eksplisitt sikkerhetskopiert

### `neste-design`

Status:

- peker på samme gamle commit som `skattejakt-oppsett`
- har ingen egne commits som mangler i `sikkerhet`
- ble opprettet som en midlertidig videreføringsbranch, men er ikke lenger i bruk

Konklusjon:

- ikke bruk denne branchen til nytt arbeid
- kan slettes etter at `sikkerhet` er merget eller eksplisitt sikkerhetskopiert

## Autoritativ branch

For Skattejakt-oppsett og Sikkerhet er `sikkerhet` den eneste autoritative arbeidsbranchen.

Ikke gjør nye endringer i:

- `skattejakt-oppsett`
- `neste-design`

## Regler for videre arbeid

1. Opprett ny branch fra oppdatert `main`, eller fra eksplisitt avtalt arbeidsbranch.
2. Bruk én branch per tydelig oppgave eller skjermgruppe.
3. Ikke legg funksjonelle endringer og stor strukturell refaktorering i samme commit.
4. Commit alle endringer før branchbytte.
5. Dokumenter navigasjonsendringer og nye flyter i `README.md` eller relevant fil under `docs/`.
6. Verifiser at en gammel branch ikke har unike commits før sletting.
7. Slett foreldede brancher først etter merge eller eksplisitt godkjenning.

## Sjekk før sletting av branch

Sammenlign branchene og bekreft:

- gammel branch har ingen commits som mangler i aktiv branch
- aktiv branch inneholder alle nødvendige filer
- siste arbeid er committed
- eventuell pull request er merget eller avsluttet
- `main` er fortsatt urørt dersom merge ikke er godkjent

## Nåværende anbefaling

Behold:

- `main`
- `sikkerhet`

Planlegg sletting senere:

- `skattejakt-oppsett`
- `neste-design`
