# Skattejakt: oppsett og sikkerhet

Dette dokumentet beskriver den godkjente flyten og forventet oppførsel for `TreasureSetupScreen` og `SafetyScreen`.

## Navigasjon

Aktiv flyt:

```text
Home
  ↓
TreasureSetup
  ↓
Safety
  ↓
TreasureHunt
```

Tilbakeflyt:

```text
Safety → TreasureSetup → Home
```

Navigasjonen konfigureres i `src/navigation/AppNavigator.js`.

## TreasureSetupScreen

Fil: `src/screens/treasure/TreasureSetupScreen.js`

### Formål

Samle de grunnleggende innstillingene før skattejakten starter.

### Tilstand

Skjermen holder lokal state for:

- `name`
- `variant`
- `players`
- `difficulty`

Standardvalg:

- variant: `fog`
- spillere: `solo`
- vanskelighetsgrad: `medium`

### Handlinger

- Tilbakeknappen kaller `onBack` og går til `Home`.
- Spillemoduskortene velger mellom `fog` og `sonar`.
- Spillerkortene velger mellom `solo` og `friends`.
- Vanskelighetskortene velger mellom `easy`, `medium` og `hard`.
- «Gå videre» kaller `onContinue` med:

```js
{
  name,
  variant,
  players,
  difficulty
}
```

I gjeldende navigator går handlingen direkte til `Safety`.

### Responsiv oppførsel

- Maksimal innholdsbredde er begrenset for større skjermer.
- Hele kortet er trykkbart for alle valg.
- Ingen horisontal scrolling.
- Vertikal scrolling aktiveres bare ved faktisk overflow.
- Bounce og overscroll er deaktivert.

## SafetyScreen

Fil: `src/screens/treasure/SafetyScreen.js`

### Formål

Kreve en eksplisitt sikkerhetsbekreftelse før brukeren kan starte skattejakten.

### Innhold

Skjermen viser:

- tittelen «Sikkerhet først»
- skjold med utropstegn
- informasjon om at skattejakten foregår i virkelige omgivelser
- advarsel mot privat eiendom, farlige områder, vann, jernbane og trafikkert vei
- beskjed om at barn bør være sammen med en voksen
- ansvarsinformasjon om sikkerhet og tilgjengelighet

### Bekreftelse

`confirmed` starter som `false`.

Før bekreftelse:

- avkrysningsfeltet er tomt
- «Start skattejakt» er deaktivert
- knappen bruker deaktivert, mørk stil

Etter bekreftelse:

- avkrysningsfeltet blir oransje med hake
- «Start skattejakt» blir aktiv og oransje
- trykk på knappen kaller `onContinue`

### Navigasjon

- Tilbake går til `TreasureSetup`.
- «Start skattejakt» går til `TreasureHunt`.
- Det finnes ikke en separat «Velg nytt område»-handling på denne skjermen.

## Visuell standard

### Farger

- sidebakgrunn: mørk blå
- panel: litt lysere mørk blå
- aksent: oransje
- deaktivert handling: dempet blågrå
- brødtekst: hvit eller lys grå

### Sikkerhetspanel

- sentrert panel
- maksimal bredde for å unngå for bred layout på web
- svak oransje ramme
- skjoldet ligger høyt i panelet uten å presse teksten sammen

## Tilgjengelighet

- alle primære handlinger bruker `accessibilityRole`
- valgt tilstand eksponeres med `accessibilityState`
- sikkerhetsbekreftelsen bruker checkbox-semantikk
- deaktivert knapp eksponeres som deaktivert
- trykkflater skal være minst omtrent 44 × 44 punkter

## Manuell testliste

### TreasureSetup

- tilbake går til `Home`
- alle kort kan velges ved trykk på hele kortflaten
- bare ett valg er aktivt i hver gruppe
- feltet for navn kan redigeres
- «Gå videre» åpner `Safety`
- ingen horisontal scrolling ved 320–430 px bredde

### Safety

- avkrysningsfeltet starter tomt
- startknappen er deaktivert ved første visning
- trykk på bekreftelsesraden aktiverer knappen
- nytt trykk deaktiverer knappen igjen
- tilbake går til `TreasureSetup`
- aktiv startknapp går til `TreasureHunt`
- innholdet scroller på små skjermer, men ikke unødvendig på større skjermer
