# Branch-struktur

Dette dokumentet beskriver branchene som brukes i repoet og reglene for å unngå parallelle eller uklare arbeidsløp.

## Autoritativ arbeidsbranch

```text
skattejakt-spillet
```

Alt videre arbeid med nåværende skattejaktflyt skal gjøres på denne branchen til den er synkronisert, testet og merget.

## `main`

Formål:

- stabil hovedbranch
- ingen direkte design- eller prototypeendringer
- mottar kun ferdig, testet og godkjent arbeid

Regler:

- ikke push direkte til `main`
- ikke flytt `main` manuelt for å omgå en pull request
- merge først etter at arbeidsbranchen er oppdatert mot siste `main`

## `skattejakt-spillet`

Inneholder nå:

- full navigasjonsflyt fra Home til resultat
- oppsett for Tåkekart og Sonar
- telefonkontaktvalg via `expo-contacts`
- sikkerhetsskjerm
- klar-til-start-skjerm med deltakere og nedtelling
- spillskjerm for web og native
- lokal aktiv jakt på Home
- felles skatteregler og koordinatgenerator
- XP- og levelregler
- lokal XP-oppdatering på Home
- dokumentasjon for status, struktur, testing og merge

Gjeldende flyt:

```text
Home
  → TreasureSetup
  → Safety
  → TreasureReady
  → TreasureHunt
  → TreasureFound
  → TreasureResult
  → Home eller ny jakt
```

Ved siste GitHub-sammenligning var branchen:

```text
104 commits foran main
7 commits bak main
status: diverged
```

Dette betyr at branchen ikke skal merges før `main` er hentet inn og konflikter er løst på `skattejakt-spillet`.

## Eldre brancher

### `skattejakt-spill`

Tidligere godkjent grunnlag for oppsett, sikkerhet og klar-til-start. Skal ikke brukes til nytt arbeid så lenge `skattejakt-spillet` er autoritativ.

### `sikkerhet`

Tidligere arbeidsbranch. Funksjonaliteten er videreført.

### `skattejakt-oppsett`

Eldre oppsettsbranch. Ikke autoritativ.

### `neste-design`

Midlertidig eldre branch. Ikke i bruk.

Ingen eldre branch skal slettes før det er kontrollert at den ikke har unike commits og brukeren eksplisitt har godkjent sletting.

## Regler for videre arbeid

1. Bekreft branch med:

   ```bash
   git branch --show-current
   ```

2. Forventet branch er `skattejakt-spillet`.
3. Commit én tydelig oppgave om gangen.
4. Ikke bland stor refaktorering med funksjonelle feilrettinger.
5. Oppdater `README.md` og relevante dokumenter ved navigasjons- eller arkitekturendringer.
6. Ikke endre `main` før merge er eksplisitt godkjent.
7. Ikke anta at web og native bruker samme skjermfil; kontroller begge.
8. Avhengighetsendringer skal inkludere både `package.json` og `package-lock.json`.

## Obligatorisk rekkefølge før merge

```text
Koble web-tåkekart til felles regler
→ koble faktisk XP og funn til resultat
→ få med package-lock
→ synkroniser main inn i branchen
→ test hele flyten
→ merge
```

### 1. Web-tåkekart

`src/screens/treasure/TreasureHuntScreen.web.js` må bruke de samme reglene som native:

```text
src/utils/treasureRules.js
```

### 2. Faktisk resultat og XP

Navigatoren må sende:

- valgt vanskelighetsgrad
- faktisk antall funn
- fullført/avbrutt status
- eventuell vinnerstatus senere

Hardkodet demo-XP skal fjernes.

### 3. Lockfil

Kjør:

```bash
npm install
```

Kontroller og commit `package-lock.json` sammen med `package.json`-endringen for `expo-contacts`.

### 4. Synkronisering

På arbeidsbranchen:

```bash
git switch skattejakt-spillet
git fetch origin
git merge origin/main
```

Løs konflikter på `skattejakt-spillet`, aldri ved å skrive direkte til `main`.

### 5. Test

Kjør minst:

```bash
npx expo start --web -c
```

Test også fysisk enhet før merge fordi kontakter, GPS, lyd og tillatelser ikke kan verifiseres fullt ut på web.

### 6. Merge

Merge først når:

- arbeidsbranchen ikke lenger er bak `main`
- installasjon fra lockfil fungerer
- hele flyten er manuelt testet
- web og native bruker samsvarende regler
- XP og funn er riktig koblet
- pull request er kontrollert

## Dokumentasjon

Autoritative statusdokumenter:

- `README.md`
- `docs/project-status.md`
- `docs/treasure-hunt-flow.md`
- `docs/chat-handoff.md`
- `docs/branch-structure.md`
