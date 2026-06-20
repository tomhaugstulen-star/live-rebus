# Live Rebus – V2 status

## Appstruktur

- Appen er bygget med Expo / React Native.
- Navigasjonen er satt opp med `App.js` + React Navigation.
- Expo Router brukes ikke.
- `package.json` skal fortsatt ha:

```json
"main": "node_modules/expo/AppEntry.js"
```

## Aktiv branch og nåstatus

Aktiv branch:

```text
home-reconstruction
```

Denne branchen fungerer på iPhone/dev-client og skal brukes videre.

Ikke bruk nå:

```text
homescreen-clean
skattejakt-oppsett
```

Neste arbeidsområde:

```text
Skattejakt oppsett
```

Dynamisk HomeScreen ved andre innlogging er utsatt.

## Web-konfigurasjon

- `app.json` sin web-konfigurasjon skal fortsatt være:

```json
"web": {
  "output": "single",
  "favicon": "./assets/images/favicon.png"
}
```

## Konseptgrenser

Live Rebus har to hovedmoduser:

1. Rebusløp
2. Skattejakt

Rebusløp skal inneholde lag, poster, spørsmål, svar, GPS-godkjenning, progresjon, resultat og XP.

Rebusløp skal ikke ha:

- Sonar
- Fog of War
- skatt
- åpne skatt-knapp
- skattejakt-hint
- skjult skatt
- tåke over kart

Skattejakt skal inneholde område, sikkerhetsbekreftelse, Tåkejakt/Fog, Sonar, hint, funnsekvens, resultat og XP.

Skattejakt skal ikke ha:

- rebusspørsmål per post
- to lag med motsatt rute
- rebusventerom
- rebusposter
- krav om tekstsvar for å godkjenne post

## Gjeldende skattejaktflyt

```text
Home
→ TreasureSetup
→ Safety
→ TreasureReady
→ nedtelling
→ TreasureHunt
→ SonarHuntScreen eller FogHuntScreen
→ funnsekvens/jakt mens skatter gjenstår
→ TreasureResult/XP direkte etter siste skatt
→ Home når resultatet lukkes
```

Det skal ikke være synlig Home-mellomsteg før XP/resultatskjerm.

## Neste V2-arbeid: Skattejakt oppsett

Før kodeendring:

```text
1. Kontroller at branch er home-reconstruction.
2. Start dev-client på iPhone.
3. Gå Home → Skattejakt.
4. Be bruker sende skjermbilde.
5. Foreslå én konkret endring.
6. Vent på godkjenning før repo-endring.
```

Ønsket retning:

- Først vises Tåkejakt og Sonar.
- Når Sonar velges, forsvinner Tåkejakt.
- Sonar-kortet flyttes opp.
- Deretter vises `Hvem spiller du med?`.
- Første valg: `Alene` og `Med venner`.
- Venne-/telefonbokflyt kommer senere.
- Animasjon kommer først etter at layoutlogikken fungerer.

## Skattejaktmodusene

### Tåkejakt / Fog

Tåkejakt hører til kart-/Fog of War-opplevelse.

På mobil/native kan modusen bruke:

- kart eller kartlignende visning
- brukerposisjon
- mørk tåke over uutforsket område
- synlig radius rundt brukeren
- skatt/funn først når brukeren er nær nok eller signalet åpnes

### Sonar

Sonar er standard app-generert signaljakt, ikke GPS-jakt.

Sonar skal:

- gi følelse av søk
- bygge opp signal
- vise at et nytt signal er funnet
- åpne funn på samme Sonar-skjerm
- gjøre klar neste signal etter registrert funn
- ikke vise kart som hovedopplevelse
- ikke avsløre nøyaktig plassering
- ikke brukes i Rebusløp

GPS kan senere bli eget valg for store uteområder, men ikke hovedmodus.

## HomeScreen-status

HomeScreen-redesignet ligger på `home-reconstruction` og skal beholdes.

Dynamisk HomeScreen ved andre innlogging er utsatt. Det må senere avklares om “andre innlogging” betyr:

- andre app-åpning
- faktisk ny login
- etter første fullførte spill
- per brukerprofil

Ikke flytt HomeScreen til ny branch nå.

## Låste spillregler

```text
Alle spill krever internett/mobildata.
Offline/P2P/Bluetooth er ikke kjerneflyt.
Skattene genereres først fra valgt område.
Spillet har bare én aktiv skatt eller ett aktivt signal om gangen.
Neste signal åpnes først når forrige funn er ferdig registrert.
```

Dette gjelder også senere XP-bonusfunn.

## TreasureSetup og områdeparameter

TreasureSetup-status:

- navnefelt er fjernet
- appen skal ikke generere kunstige jaktnavn
- viser spillemodus, hvem spiller, vanskelighetsgrad, infokort og `Gå videre`

Område og Sonar-synlighet:

```text
Enkel:     4 skatter  · ca. 50 m diameter  · 2 m Sonar-synlighet
Medium:    8 skatter  · ca. 80 m diameter  · 2,5 m Sonar-synlighet
Vanskelig: 12 skatter · ca. 150 m diameter · 3 m Sonar-synlighet
```

## XP

| Nivå | Fullføring | Per skatt | Maks normal XP |
|---|---:|---:|---:|
| Enkel | 60 | 10 | 100 |
| Medium | 120 | 12 | 216 |
| Vanskelig | 220 | 15 | 400 |

Ordinær slutt-XP påvirkes ikke av modus. Sonar-småsignal med XP er ikke implementert og skal ikke kunne farmes.

## Viktige V2-avgrensninger

- No Expo Router.
- No `react-native-maps` i web-safe paths.
- No real GPS i web-test.
- Sonar hører til Skattejakt, ikke Rebusløp.
- Native Skattejakt skal vise Sonar, ikke Radar, i brukergrensesnittet.
- Kart, GPS og full mobil/native map-implementasjon er utsatt til senere.
- Ikke gjeninnfør `expo-av` uten eksplisitt avtale.

## Web-safe prinsipp

Unngå å lage gamle `.web.js`-filer som skygger normale skjermer, med mindre det er eksplisitt nødvendig.

Tidligere erfaring:

- `TreasureSetupScreen.web.js` skapte white screen og ble fjernet.
- `homescreen-clean` manglet kontekst og skal ignoreres nå.

## Bevisst utsatt

- dynamisk HomeScreen ved andre innlogging
- ferdig Home-polish
- animasjon i Skattejakt-oppsett
- venne-/telefonbokflyt
- instruksjonsbilde/animasjon på nedtellingsskjermen
- ekte GPS og GPS-lagjakt
- accelerometer/skritt/gyro
- Sonar-lyd/pip
- global lyd-/haptikkinnstilling
- Sonar-småsignal med XP
- innlogging, venner, varsler og backend-synk

## Neste anbefalte steg

```text
Fortsett på home-reconstruction.
Ikke bruk homescreen-clean eller skattejakt-oppsett.
Neste oppgave er Skattejakt oppsett.
Før endring: be om skjermbilde av Home → Skattejakt på iPhone.
```