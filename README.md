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

## Skattejaktflyt

Den aktive inngangen fra hjemskjermen er:

```text
Home → TreasureSetup → Safety → TreasureHunt
```

### Skattejakt-oppsett

`src/screens/treasure/TreasureSetupScreen.js`

Brukeren velger:

- navn på skattejakten
- spillemodus: Tåkekart eller Sonar
- spillere: Alene eller Med venner
- vanskelighetsgrad: Enkel, Medium eller Vanskelig

Tilbakeknappen går til `Home`. Knappen «Gå videre» sender valgene via `onContinue` og navigerer til `Safety`.

Skjermen bruker `ScrollView`, men uten bounce eller overscroll. Den scroller bare når innholdet er høyere enn tilgjengelig skjermflate.

### Sikkerhet

`src/screens/treasure/SafetyScreen.js`

Sikkerhetsskjermen:

- viser et skjold med utropstegn
- informerer om privat eiendom, farlige områder, vann, jernbane og trafikkert vei
- informerer om at barn bør være sammen med en voksen
- tydeliggjør at brukeren selv må vurdere sikkerhet og tilgjengelighet
- krever aktiv bekreftelse på «Jeg har lest og forstått»
- holder «Start skattejakt» deaktivert frem til bekreftelsen er valgt

Tilbakeknappen går til `TreasureSetup`. «Start skattejakt» går til `TreasureHunt`.

Mer detaljert dokumentasjon finnes i [`docs/treasure-hunt-flow.md`](docs/treasure-hunt-flow.md).

## Designprinsipper

- Mørk blå bakgrunn og paneler.
- Oransje brukes for primær handling, valgt tilstand og viktige sikkerhetssignaler.
- Trykkflater skal være minst omtrent 44 × 44 punkter.
- Layouten skal fungere på mobilbredder fra omtrent 320 til 430 piksler.
- Horisontal scrolling skal ikke forekomme.
- Vertikal scrolling brukes bare når innholdet krever det.

## Kontroll før merge

Kjør minst:

```bash
npx expo start --web -c
```

Kontroller deretter:

- tilbake- og videreflyt
- avkrysning og deaktivert/aktiv knapp på sikkerhetssiden
- bredder på 320, 375, 390, 393 og 430 piksler
- tekstbryting og fravær av horisontal scrolling
- at `main` ikke er endret før branchen er godkjent og klar for merge
