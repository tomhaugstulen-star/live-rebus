# Chat-handoff: Skattejakt-spillet

Dette dokumentet er laget for å fortsette arbeidet i en ny chat uten å miste branch-, fil- eller designkontekst.

## Repo og aktiv branch

Repo:

```text
tomhaugstulen-star/live-rebus
```

Aktiv branch:

```text
skattejakt-spillet
```

Branchen ble opprettet fra siste godkjente commit på:

```text
skattejakt-spill
```

Kontroller lokalt:

```bash
git switch skattejakt-spillet
git pull origin skattejakt-spillet
git branch --show-current
```

Forventet resultat:

```text
skattejakt-spillet
```

## Viktig avgrensning

Arbeid kun på `skattejakt-spillet`.

Ikke endre:

- `main`
- `sikkerhet`
- `skattejakt-oppsett`
- `neste-design`
- `skattejakt-spill`
- rebusskjermene
- godkjent oppsett-, sikkerhets- eller klar-til-start-design

## Godkjent flyt før spillskjermen

```text
Home → TreasureSetup → Safety → TreasureReady
```

Disse skjermene er godkjent som nåværende grunnlag.

`TreasureReady` støtter:

- vert
- opptil fem venner
- kompakt deltakerliste ved tre eller flere venner
- scrolling ved behov
- nedtelling før `TreasureHunt`

## Arbeid gjort i siste chat

Ny spillskjerm er implementert i:

```text
src/screens/treasure/TreasureHuntScreen.js
src/screens/treasure/TreasureHuntScreen.styles.js
```

Ingen endring i `AppNavigator.js` var nødvendig for første prototype.

Skjermen inneholder:

- stilisert kartflate
- tåkekartmodus
- sonarmodus
- skatteantall
- tidsmåler
- område/radius
- spillerposisjon
- skattemarkør
- signaltekst
- simulert avstand
- modusbytte
- deaktivert/aktiv åpneknapp

## Nåværende prototypeoppførsel

- startavstand: 74 meter
- avstanden reduseres automatisk hvert sekund
- sentreringsknappen reduserer avstanden med 10 meter
- åpneknappen aktiveres ved 25 meter eller mindre
- `onFound` brukes når skatten åpnes
- dersom `onFound` mangler, brukes `onFinish`

Dette er demooppførsel og ikke ekte spillogikk.

## Neste anbefalte steg

1. Start appen på `skattejakt-spillet` med tømt cache.
2. Test hele flyten til spillskjermen på iPhone 12 Pro-størrelse.
3. Ta skjermbilde av `TreasureHunt` i både kart- og sonarmodus.
4. Juster kun `TreasureHuntScreen.js` og `TreasureHuntScreen.styles.js` basert på visuell kontroll.
5. Etter godkjent design: erstatt simulert avstand med faktisk spillstate/GPS i en egen, eksplisitt oppgave.

## Ikke implementert

- ekte GPS
- `react-native-maps` i den nye visningen
- faktisk skattegenerering
- lagret progresjon
- flere skatter i samme runde
- deltakerprogresjon
- hintsystem i ny visning
- produksjonsklar spillmotor

## Testkommando

```bash
npx expo start --web -c
```

Test spesielt:

- 320–430 px bredde
- kartmodus
- sonarmodus
- tilbakeknapp
- tidsmåler
- demoavstand
- åpneknapp
- navigasjon til `TreasureFound`
- ingen horisontal scrolling

## Siste dokumentasjonsstatus

Oppdatert på `skattejakt-spillet`:

- `README.md`
- `docs/branch-structure.md`
- `docs/treasure-hunt-flow.md`
- `docs/chat-handoff.md`

Les disse før videre arbeid.
