# Skattejaktflyt

Dette dokumentet beskriver gjeldende skattejaktflyt på `skattejakt-spillet`.

## Navigasjon

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
  ↓
Home eller ny jakt
```

Tilbakeflyt før start:

```text
TreasureReady → Safety → TreasureSetup → Home
```

Navigasjonen styres i `src/navigation/AppNavigator.js`.

## Home

Filer:

- `src/screens/home/HomeScreen.js`
- `src/components/home/HomeUpcomingCard.js`
- `src/navigation/AppNavigator.js`

Når en skattejakt starter:

- aktiv jakt lagres lokalt
- Home viser jakten som pågående
- navn og fremdrift vises
- `Fortsett` åpner `TreasureHunt`

Begrensning:

- aktiv jakt overlever ikke full appomstart
- det finnes ingen persistent lagring eller backend ennå

## TreasureSetup

Fil:

```text
src/screens/treasure/TreasureSetupScreen.js
```

Brukeren velger:

- navn
- `fog` eller `sonar`
- `solo` eller `friends`
- `easy`, `medium` eller `hard`
- telefonkontakter ved vennemodus

`expo-contacts` er lagt til, men må testes på fysisk enhet. Web er ikke en fullverdig test av kontaktflyten.

## Safety

Fil:

```text
src/screens/treasure/SafetyScreen.js
```

Brukeren må bekrefte sikkerhetsinformasjonen før videre navigasjon.

## TreasureReady

Filer:

```text
src/screens/treasure/TreasureReadyScreen.js
src/screens/treasure/TreasureReadyScreen.styles.js
```

Inneholder:

- vert
- opptil fem venner
- valgt modus og vanskelighetsgrad
- nedtelling fra 10
- teksten `Gjør dere klare`
- overgang til spillskjermen

Ved ferdig nedtelling opprettes lokal aktiv jakt og `TreasureHunt` åpnes.

## Felles skatteregler

Fil:

```text
src/utils/treasureRules.js
```

| Vanskelighet | Antall | Områderadius | Synlig tåkeradius | Minste avstand |
|---|---:|---:|---:|---:|
| Enkel | 4 | 50 m | 10 m | 15 m |
| Medium | 8 | 150 m | 6 m | 20 m |
| Vanskelig | 12 | 300 m | 4 m | 50 m |

Koordinatgeneratoren:

- tar inn startkoordinat
- fordeler skatter tilfeldig innenfor en sirkel
- validerer minsteavstand
- stopper etter maksimalt antall forsøk
- returnerer feilmelding hvis plasseringen mislykkes

Ikke ferdig:

- ekte GPS-posisjon sendes ikke inn i generatoren
- genererte koordinater brukes ikke i spillskjermen ennå
- alle spillere får ikke en felles serverlagret koordinatliste ennå

## TreasureHunt native

Filer:

```text
src/screens/treasure/TreasureHuntScreen.js
src/screens/treasure/TreasureHuntScreen.styles.js
```

Native-skjermen bruker `getTreasureRules` fra felles regelmodul.

Nåværende demooppførsel:

- avstand starter på 74 meter
- avstand reduseres automatisk
- `Åpne skatten` aktiveres ved 25 meter
- kartflaten er stilisert og bruker ikke ekte kartdata
- funn sendes videre til `TreasureFound`

Dette er ikke produksjonsklar avstandslogikk.

## TreasureHunt web

Fil:

```text
src/screens/treasure/TreasureHuntScreen.web.js
```

Web har en separat implementasjon. Den må kobles til `src/utils/treasureRules.js` før merge. Web og native skal vise samme:

- antall skatter
- områderadius
- tåkeradius
- vanskelighetsregler

## Tåkekart

Avtalt modell:

- mørk tåke over uutforsket område
- avsløring følger fysisk bevegelse, ikke bare zoom
- zoom skal ikke avsløre mer tåke
- Enkel: 10 m synlig radius
- Medium: 6 m
- Vanskelig: 4 m

Ikke ferdig:

- ekte kart
- GPS-sporing
- lagrede utforskede områder
- dynamisk tåkemaske
- avklaring og testing av faktisk kartzoom på fysisk enhet

## Sonar

Sonar skal gjenbruke samme spillskjerm og logikk med minimale forskjeller.

Skal ha:

- rund radar i stedet for kart
- egne radar- og lydikoner
- spiller fast i sentrum
- ingen presis skattmarkør
- bip som øker i frekvens nær skatten
- rask puls når spilleren er svært nær
- `Åpne skatten` omtrent 3–5 meter fra skatten

Skal gjenbruke:

- statuskort
- tid
- funnlogikk
- XP
- resultatside
- navigasjon

Ikke ferdig:

- lydmotor
- bip-intervaller
- radar-animasjon
- kalibreringshandling
- fysisk enhetstest

## TreasureFound

Fil:

```text
src/screens/treasure/TreasureFoundScreen.js
```

Nåværende flyt bruker en egen bekreftelsesskjerm. Senere kan flere funn bruke en kompakt melding eller overlay.

V3-plan:

- pushvarsel til andre spillere
- første registrerte spiller får funnet
- ingen dobbeltregistrering
- felles oppdatering av gjenværende skatter

## TreasureResult og XP

Filer:

```text
src/screens/treasure/TreasureResultScreen.js
src/utils/xpRules.js
src/utils/playerProgressStore.js
```

XP-regler:

| Vanskelighet | Fullføring | Per skatt | Maks normal XP |
|---|---:|---:|---:|
| Enkel | 60 XP | 10 XP | 100 XP |
| Medium | 120 XP | 12 XP | 216 XP |
| Vanskelig | 220 XP | 15 XP | 400 XP |

Resultatsiden kan vise:

- fullførings-XP
- skatt-XP
- eventuell vinnerbonus

Home kan oppdatere lokal total-XP.

Kritisk før merge:

- navigatoren sender fortsatt hardkodet demo-XP
- valgt vanskelighetsgrad må sendes til resultatet
- faktisk antall funn må brukes
- XP må bekreftes lagt til nøyaktig én gang

## Levelsystem

- level 1–30
- stigende XP-krav
- etter level 10 brukes `100 × level + 500`
- belønninger ved level 5, 10, 15, 20, 25 og 30
- ingen spillmodus eller vanskelighetsgrad låses bak level

## Merge-plan

Obligatorisk rekkefølge:

```text
Koble web-tåkekart til felles regler
→ koble faktisk XP og funn til resultat
→ få med package-lock
→ synkroniser main inn i branchen
→ test hele flyten
→ merge
```

## Manuell testliste

```bash
git switch skattejakt-spillet
git pull origin skattejakt-spillet
npm install
npx expo start --web -c
```

Kontroller:

- komplett navigasjonsflyt
- pågående jakt på Home
- `Fortsett`
- alle vanskelighetsgrader
- samme regler på web og native
- resultat med faktisk antall funn
- riktig XP og ingen dobbeltutbetaling
- tilbakeknapper
- 320–430 px bredde
- ingen horisontal scrolling
- telefonkontakter, GPS og lyd på fysisk enhet
- ren installasjon med oppdatert `package-lock.json`

## Ikke med i denne merge-runden

- «Gratulerer, du fant flest skatter»
- full flerspillerresultatliste
- backend og pushvarsler
- serverbeskyttelse mot dobbeltfunn
- persistent spillstatus
- produksjonsklar GPS-, kart-, tåke- og sonarimplementasjon
