# Live Rebus

Live Rebus er en Expo/React Native-app for rebusløp og skattejakt. Appen bruker React Navigation med en sentral stack i `src/navigation/AppNavigator.js` og støtter iOS, Android og web.

## Kom i gang

Installer avhengigheter:

```bash
npm install
```

Start webutgaven:

```bash
npx expo start --web
```

Start med tømt cache ved behov:

```bash
npx expo start --web -c
```

## Prosjektstruktur

- `App.js` starter `AppNavigator`.
- `src/navigation/AppNavigator.js` definerer skjermflyt og navigasjon.
- `src/screens/home/` inneholder hjemskjermen.
- `src/screens/rebus/` inneholder rebusflyten.
- `src/screens/treasure/` inneholder skattejaktflyten.
- `src/components/` inneholder gjenbrukbare komponenter.
- `assets/` inneholder bilder og andre visuelle ressurser.

## Aktiv branch

Aktiv arbeidsbranch for den nye spillskjermen er:

```text
skattejakt-spillet
```

Denne branchen ble opprettet fra siste godkjente commit på `skattejakt-spill`.

- `skattejakt-spill` inneholder godkjent oppsett, sikkerhet og klar-til-start-skjerm.
- `skattejakt-spillet` inneholder i tillegg første versjon av selve spillskjermen.
- `main` skal fortsatt stå urørt til arbeidet er testet og godkjent.

Detaljert branch-status finnes i [`docs/branch-structure.md`](docs/branch-structure.md).

## Skattejaktflyt

Gjeldende flyt er:

```text
Home → TreasureSetup → Safety → TreasureReady → TreasureHunt → TreasureFound → TreasureResult
```

### Skattejakt-oppsett

`src/screens/treasure/TreasureSetupScreen.js`

Brukeren velger:

- navn på skattejakten
- spillemodus: Tåkekart eller Sonar
- spillere: Alene eller Med venner
- vanskelighetsgrad: Enkel, Medium eller Vanskelig

«Gå videre» sender valgene til navigatoren og åpner `Safety`.

### Sikkerhet

`src/screens/treasure/SafetyScreen.js`

Sikkerhetsskjermen krever aktiv bekreftelse før brukeren kan fortsette til `TreasureReady`.

### Klar til start

`src/screens/treasure/TreasureReadyScreen.js`

Skjermen viser:

- kartforhåndsvisning
- valgte spillinnstillinger
- vert og opptil fem venner
- kompakt deltakerliste ved tre eller flere venner
- nedtelling før spillskjermen åpnes

### Spillskjerm

`src/screens/treasure/TreasureHuntScreen.js`

`src/screens/treasure/TreasureHuntScreen.styles.js`

Første versjon inneholder:

- kart-/tåkekartvisning
- sonarvisning
- tid, skatteantall og område
- simulert avstand og signalstyrke
- bytte mellom kart og sonar
- «Åpne skatten» når simulert avstand er lav nok

Viktig: GPS, ekte kartdata, faktisk skatteposisjon og vedvarende spillstatus er ikke koblet inn ennå. Skjermen bruker foreløpig trygge standardverdier slik at den fungerer med dagens navigator.

Mer detaljert dokumentasjon finnes i [`docs/treasure-hunt-flow.md`](docs/treasure-hunt-flow.md).

## Designprinsipper

- Mørk blå bakgrunn og paneler.
- Oransje brukes for primær handling, valgt tilstand og viktige signaler.
- Trykkflater skal være minst omtrent 44 × 44 punkter der det er praktisk mulig.
- Layouten skal fungere på mobilbredder fra omtrent 320 til 430 piksler.
- Horisontal scrolling skal ikke forekomme.
- Vertikal scrolling brukes bare når innholdet krever det.

## Kontroll før videre arbeid eller merge

Bytt til riktig branch:

```bash
git switch skattejakt-spillet
git pull origin skattejakt-spillet
```

Start med tømt cache:

```bash
npx expo start --web -c
```

Kontroller:

- hele flyten fra `Home` til `TreasureHunt`
- nedtelling fra `TreasureReady`
- kart- og sonarvisning
- tilbakeknapp
- at «Åpne skatten» først aktiveres ved lav nok avstand
- mobilbredder på 320, 375, 390, 393 og 430 piksler
- fravær av horisontal scrolling
- at ingen andre brancher eller `main` er endret

Se [`docs/chat-handoff.md`](docs/chat-handoff.md) før ny chat eller videre arbeid.
