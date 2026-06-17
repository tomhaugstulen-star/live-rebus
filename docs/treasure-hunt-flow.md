# Skattejaktflyt

Dette dokumentet beskriver gjeldende skattejaktflyt på `skattejakt-spillet`.

## Navigasjon

Aktiv flyt:

```text
Home
  ↓
TreasureSetup
  ↓
Safety
  ↓
TreasureReady
  ↓
TreasureHunt
  ↓
TreasureFound
  ↓
TreasureResult
```

Tilbakeflyt før spillet starter:

```text
TreasureReady → Safety → TreasureSetup → Home
```

Navigasjonen konfigureres i `src/navigation/AppNavigator.js`.

## TreasureSetupScreen

Fil: `src/screens/treasure/TreasureSetupScreen.js`

Formål:

- samle navn, spillemodus, spillere og vanskelighetsgrad
- sende konfigurasjonen videre til navigatoren

State:

- `name`
- `variant`: `fog` eller `sonar`
- `players`: `solo` eller `friends`
- `difficulty`: `easy`, `medium` eller `hard`

«Gå videre» åpner `Safety`.

## SafetyScreen

Fil: `src/screens/treasure/SafetyScreen.js`

Formål:

- vise sikkerhetsinformasjon
- kreve eksplisitt bekreftelse før videre navigasjon

Etter bekreftelse går brukeren til `TreasureReady`.

## TreasureReadyScreen

Filer:

- `src/screens/treasure/TreasureReadyScreen.js`
- `src/screens/treasure/TreasureReadyScreen.styles.js`

Formål:

- vise valgte spillinnstillinger
- vise kartforhåndsvisning
- vise vert og deltakere
- starte nedtelling før spillskjermen

Deltakere:

- verten vises alltid
- maksimalt fem venner tas inn fra `participants`
- listen blir kompakt ved tre eller flere venner
- venner kan fjernes lokalt før start
- hele siden kan scrolles ved behov

Nedtelling:

- går fra 10 til 1 og deretter «START»
- etter nedtellingen kalles `onStart`
- navigatoren åpner `TreasureHunt`

## TreasureHuntScreen

Filer:

- `src/screens/treasure/TreasureHuntScreen.js`
- `src/screens/treasure/TreasureHuntScreen.styles.js`

Status:

- første visuelle og interaktive prototype er implementert
- skjermen fungerer med dagens navigator uten ekstra props
- ingen andre skjermfiler er endret på denne branchen

Innhold:

- full spillflate
- Tåkekart som standard ved `variant: fog`
- Sonar som standard ved `variant: sonar`
- bytte mellom kart og sonar
- skatteantall basert på vanskelighetsgrad
- tidsmåler
- område/radius basert på vanskelighetsgrad
- spillerposisjon og skattemarkør
- signalstatus og avstand
- «Åpne skatten» når avstanden er lav nok

Foreløpig simulering:

- avstanden starter på 74 meter
- avstanden reduseres automatisk i prototypen
- sentreringsknappen reduserer avstanden med 10 meter for test
- åpneknappen aktiveres ved 25 meter eller mindre
- skatteantall starter på 0

Dette er bevisst demooppførsel for å teste design og flyt.

Ikke implementert ennå:

- ekte GPS-posisjon
- ekte kartdata
- faktisk beregning av avstand og retning
- genererte skattepunkter
- lagring av funn og progresjon
- forskjellig progresjon for flere deltakere
- hintsystem i den nye spillskjermen
- ferdig spillmotor for flere skatter

## TreasureFound og TreasureResult

Disse skjermene finnes fra før og brukes videre i navigatoren. De er ikke endret som del av første spillskjermprototype.

## Designstandard

- mørk blå bakgrunn
- oransje primærhandling og signalaksent
- tydelig kontrast mellom kart, paneler og tekst
- mobilbredder fra omtrent 320 til 430 piksler
- ingen horisontal scrolling
- tydelige trykkflater og tilgjengelighetsroller

## Manuell testliste

### Branch og oppstart

```bash
git switch skattejakt-spillet
git pull origin skattejakt-spillet
npx expo start --web -c
```

### Hele flyten

- `Home` åpner `TreasureSetup`
- `TreasureSetup` åpner `Safety`
- sikkerhetsbekreftelse åpner `TreasureReady`
- nedtelling åpner `TreasureHunt`
- tilbakeknappen på spillskjermen går til `TreasureReady`
- aktiv åpneknapp går til `TreasureFound`

### TreasureReady

- alene viser bare vert
- med venner viser vert og venner
- tre til fem venner bruker kompakt layout
- listen kan scrolles uten horisontal overflow

### TreasureHunt

- Tåkekart vises ved valgt tåkekartmodus
- Sonar vises ved valgt sonarmodus
- modus kan byttes fra toppknapp og bunnknapp
- tidsmåleren øker
- avstanden reduseres i demoen
- «Gå nærmere» er deaktivert før 25 meter
- «Åpne skatten» aktiveres ved 25 meter eller mindre
- skjermen fungerer ved 320, 375, 390, 393 og 430 piksler

## Avgrensning for videre arbeid

Neste chat skal arbeide på `skattejakt-spillet` og primært videreutvikle `TreasureHuntScreen`.

Ikke endre følgende uten eksplisitt avtale:

- `TreasureSetupScreen`
- `SafetyScreen`
- `TreasureReadyScreen`
- rebusflyten
- `main`
- andre brancher
