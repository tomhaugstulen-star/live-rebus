# Branch-struktur

## Aktiv branch

```text
sonar
```

Sonar- og Tåkekart-flyten ferdigstilles og slutt-testes her før arbeidet går videre til Live Rebus.

## Regler

- ikke push direkte til `main`
- ikke endre `skattejakt-spillet` uten eksplisitt beskjed
- ikke overskriv brukerens lokale endringer i headerbilder, `package.json` eller `package-lock.json`
- test web og fysisk enhet før merge
- oppdater dokumentasjon ved arkitekturendringer

## Branch-formål

### `main`

Stabil hovedbranch. Mottar kun ferdig og godkjent arbeid.

### `skattejakt-spillet`

Tidligere autoritativ branch for skattejaktgrunnlaget og Tåkekart.

### `sonar`

Inneholder nå:

- egen Sonar-spillskjerm
- egen Tåkekart-spillskjerm
- riktig routing etter `config.variant`
- felles `treasureSessionStore`
- delt funn, total, tid, modus og XP-status
- flere skatter før resultat
- faktisk XP-beregning
- beskyttelse mot dobbel XP
- Sonar-styling på Home
- oppdatert dokumentasjon

Viktige sluttcommits:

```text
d3d90f1  Add shared treasure session state
0411aa7  Connect sonar screen to shared hunt state
1598739  Add dedicated fog hunt screen
d23320a  Route treasure hunt by selected mode
098c031  Route web treasure hunt by selected mode
c9dd81b  Continue hunt until final treasure
38670af  Use shared hunt data for treasure result XP
cca80f2  Avoid recursive web treasure screen export
```

## Slutt-test

```bash
git fetch origin
git switch sonar
git pull origin sonar
npx expo start --web -c
```

Etter godkjent test er neste arbeidsområde:

```text
Live Rebus
```

## Autoritative dokumenter

```text
README.md
docs/chat-handoff.md
docs/project-status.md
docs/treasure-hunt-flow.md
docs/branch-structure.md
```
