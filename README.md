# Live Rebus

Live Rebus er en Expo- og React Native-applikasjon for utendørs rebusløp og skattejakt. Prosjektet støtter web, Android og iOS, og bruker React Navigation med en sentral stack-navigator.

Denne README-en er prosjektets operative arbeidsdokument. Den beskriver struktur, skjermflyter, utviklingsregler, testing og nåværende status.

## Innhold

- [Teknologi](#teknologi)
- [Komme i gang](#komme-i-gang)
- [Kjøre appen](#kjøre-appen)
- [Prosjektstruktur](#prosjektstruktur)
- [Navigasjon](#navigasjon)
- [Rebusflyt](#rebusflyt)
- [Skattejaktflyt](#skattejaktflyt)
- [Web og native](#web-og-native)
- [Arbeidsflyt med Git](#arbeidsflyt-med-git)
- [Regler for endringer](#regler-for-endringer)
- [Testing](#testing)
- [Designarbeid](#designarbeid)
- [Nåværende status](#nåværende-status)
- [Kjente tekniske hensyn](#kjente-tekniske-hensyn)
- [Commit-konvensjon](#commit-konvensjon)
- [Feilsøking](#feilsøking)

## Teknologi

Prosjektet bruker blant annet:

- Expo SDK 56
- React 19
- React Native 0.85
- React Navigation 7
- React Native Maps
- Expo Location
- Expo Haptics
- Expo AV
- React Native Web

Prosjektet bruker ikke Expo Router. Appen starter i `App.js`, som renderer `AppNavigator`.

## Komme i gang

Krav:

- Node.js
- npm
- Git
- Expo Go, Android-emulator eller iOS-simulator for native testing

Installer avhengigheter:

```bash
npm install
```

Kontroller at installasjonen er konsistent:

```bash
npx expo doctor
```

## Kjøre appen

Start Expo:

```bash
npm start
```

Eller:

```bash
npx expo start
```

Start med tømt cache:

```bash
npx expo start -c
```

Web:

```bash
npm run web
```

Android:

```bash
npm run android
```

iOS:

```bash
npm run ios
```

Lint:

```bash
npm run lint
```

## Prosjektstruktur

```text
live-rebus/
├── App.js
├── assets/
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── home/
│   │   └── treasure/
│   ├── navigation/
│   │   └── AppNavigator.js
│   ├── screens/
│   │   ├── home/
│   │   ├── rebus/
│   │   └── treasure/
│   └── utils/
├── package.json
└── README.md
```

### Viktige filer

| Fil | Ansvar |
|---|---|
| `App.js` | Starter applikasjonen og renderer navigatoren |
| `src/navigation/AppNavigator.js` | Registrerer skjermer, skjermflyter og midlertidig apptilstand |
| `src/screens/home/HomeScreen.js` | Hovedskjerm |
| `src/screens/rebus/` | Rebusoppsett, venting, spill og resultat |
| `src/screens/treasure/` | Hele Skattejakt-flyten |
| `src/components/treasure/` | Kart-, radar- og sonar-komponenter |
| `src/utils/theme.js` | Farger, radius og felles designverdier |
| `src/utils/geo.js` | Avstand, retning og signalberegning |

## Navigasjon

Navigasjonen er definert i:

```text
src/navigation/AppNavigator.js
```

Navigatoren bruker:

```js
NavigationContainer
createNativeStackNavigator
```

Alle skjermer har egne navn i stacken. Navigasjonsnavn må ikke endres uten at alle kall til `navigation.navigate(...)` oppdateres samtidig.

## Rebusflyt

```text
Home
→ RebusSetup
→ RouteReady
→ WaitingRoom
→ RebusGame
→ RebusResult
```

Rebus-flyten bruker foreløpig demo-rute og lokal state i `AppNavigator.js`.

Viktige områder:

- valgt rute
- aktiv post
- fremdrift
- start- og sluttid
- beregning av XP
- vert/gjest-status

## Skattejaktflyt

```text
Home
→ TreasureSetup
→ AreaCheck
→ Safety
→ TreasureHunt
→ TreasureFound
→ TreasureResult
```

### Skattejakt-skjermer

```text
src/screens/treasure/AreaCheckScreen.js
src/screens/treasure/SafetyScreen.js
src/screens/treasure/TreasureFoundScreen.js
src/screens/treasure/TreasureHuntScreen.js
src/screens/treasure/TreasureHuntScreen.web.js
src/screens/treasure/TreasureResultScreen.js
src/screens/treasure/TreasureSetupScreen.js
```

### Skattejakt-komponenter

```text
src/components/treasure/FogOfWarMap.js
src/components/treasure/RadarMode.js
src/components/treasure/SonarPulse.js
```

Alle tre komponentene er i bruk:

- `FogOfWarMap` brukes i native jaktmodus
- `RadarMode` brukes i native sonarmodus
- `SonarPulse` brukes i web-versjonen

## Web og native

Skattejakt har separate jaktfiler:

```text
TreasureHuntScreen.js
TreasureHuntScreen.web.js
```

Expo velger automatisk `.web.js` på web. Det betyr at web kan fungere selv om native-filen har feil. Derfor skal Skattejakt alltid testes både på web og på mobil eller emulator.

### Native

Native-versjonen bruker blant annet:

- `react-native-maps`
- `expo-haptics`
- `expo-av`
- faktisk posisjon
- Fog of War-kart
- radar og signalnivå

### Web

Web-versjonen bruker en kontrollert simulering uten `react-native-maps`. Den er laget for trygg utvikling og visuell testing i nettleseren.

## Arbeidsflyt med Git

### Før arbeid

Kjør alltid:

```bash
git status
git branch --show-current
```

Arbeidsområdet skal normalt være rent før en ny oppgave starter.

### Brancher

Aktuelle arbeidsbrancher:

```text
home-reference-rebuild
Treasure cleanup/design: treasure-cleanup
```

Nytt arbeid skal gjøres på en tydelig branch. Ikke bland Home-, Rebus- og Skattejakt-arbeid i samme branch hvis endringene er store.

### Hente endringer

```bash
git pull
```

Hvis Git åpner Vim for en merge-melding:

```text
Esc
:wq
Enter
```

### Etter arbeid

```bash
git status
git diff
```

Stage kun relevante filer:

```bash
git add <fil1> <fil2>
```

Commit:

```bash
git commit -m "Beskriv endringen presist"
```

Push:

```bash
git push
```

## Regler for endringer

Disse reglene gjelder for hele prosjektet:

1. Én skjerm eller én teknisk kategori om gangen.
2. Én type endring per commit.
3. Ikke bland cleanup og redesign.
4. Ikke bland navigasjonsendringer og visuelle endringer.
5. Ikke slett filer før bruk er dokumentert.
6. Ikke endre web og native samtidig uten eksplisitt grunn.
7. Test før commit.
8. Kontroller `git status` før og etter hver oppgave.
9. Unngå store, uoversiktlige commits.
10. Ikke omskriv Git-historikk på delte brancher uten en konkret plan.

### God avgrensning

```text
Fix missing native treasure imports
```

### Dårlig avgrensning

```text
Redesign treasure screens, fix navigation, clean imports and change logic
```

## Testing

### Minimum før commit

- Appen starter uten rød feil
- Endret skjerm kan åpnes
- Tilbakeknapp fungerer
- Fortsett-knapp fungerer
- Ingen nye Console-feil
- Ingen utilsiktede endringer på andre skjermer

### Home

Kontroller:

- toppseksjon
- utfordringskort
- kommende aktivitet
- navigasjon til Rebus og Skattejakt

### Rebus

Test hele flyten:

```text
RebusSetup
→ RouteReady
→ WaitingRoom
→ RebusGame
→ RebusResult
```

### Skattejakt

Test hele flyten:

```text
TreasureSetup
→ AreaCheck
→ Safety
→ TreasureHunt
→ TreasureFound
→ TreasureResult
```

Skattejakt skal testes på:

- web
- Expo Go eller emulator

### Cache-problemer

Ved gamle bundles eller merkelig rendering:

```bash
npx expo start -c
```

## Designarbeid

Design skal gjennomføres skjerm for skjerm.

Anbefalt rekkefølge for Skattejakt:

```text
1. TreasureSetupScreen
2. AreaCheckScreen
3. SafetyScreen
4. TreasureHuntScreen
5. TreasureFoundScreen
6. TreasureResultScreen
```

For hver skjerm:

1. Bekreft referansebildet.
2. Endre kun den aktuelle skjermen.
3. Ikke endre navigasjon eller forretningslogikk.
4. Test på riktig plattform.
5. Commit med presis melding.
6. Gå videre først når skjermen er stabil.

## Nåværende status

### Home

- Home-layout er oppdatert mot referansedesign.
- Challenge-seksjonen er justert.
- Upcoming-kortet er justert.
- XP-kortet vises ikke på Home nå.

### Rebus

- Skjermflyten er registrert i navigatoren.
- Demo-rute og lokal state brukes foreløpig.
- Rebus-spillet har egen web-skjerm.

### Skattejakt

- Alle seks hovedsteg er registrert i navigatoren.
- Web- og native-jakt er separert.
- Manglende native imports i jakt/radar er rettet.
- Demo-copy i oppsett, områdesjekk og resultat er ryddet.
- Hele native Skattejakt-flyten er testet uten feil.
- Visuell redesign gjenstår og skal gjøres én skjerm om gangen.

### Aktiv arbeidsretning

```text
treasure-cleanup
```

Neste planlagte designfil:

```text
src/screens/treasure/TreasureSetupScreen.js
```

## Kjente tekniske hensyn

### Plattformfiler

En feil i `TreasureHuntScreen.js` blir ikke nødvendigvis synlig på web fordi Expo bruker `TreasureHuntScreen.web.js`.

### Kart

`react-native-maps` skal ikke importeres direkte i web-skjermen. Kartlogikk skal være isolert i native-filer og komponenter.

### Tegnkoding

Alle filer skal lagres som UTF-8. Kontroller ødelagte norske tegn som:

```text
Ã¥
Ã¸
Ã¦
```

PowerShell-søk:

```powershell
Select-String -Path src\**\*.js -Pattern "Ã","ðŸ"
```

### Demo-data

`AppNavigator.js` inneholder fortsatt demo-data for Rebus. Dette skal ikke fjernes som del av en designcommit.

### Lokal state

Mye av spilltilstanden ligger foreløpig i `AppNavigator.js`. En eventuell senere refaktorering til context, reducer eller state management skal gjøres som en separat arkitekturoppgave.

## Commit-konvensjon

Bruk korte imperative commitmeldinger på engelsk.

Eksempler:

```text
Refine home challenge section spacing
Fix missing native treasure imports
Clean up treasure hunt demo copy
Redesign treasure setup screen
Add treasure area validation
```

Unngå:

```text
updates
fix stuff
changes
new version
```

## Feilsøking

### Working tree er ikke clean

```bash
git status
git diff
```

Commit, stash eller forkast endringene før nytt arbeid.

### Merge pågår

```bash
git status
```

Hvis filer er staged og merge må fullføres:

```bash
git commit -m "Merge remote changes"
```

### Vim åpnes

Lagre og avslutt:

```text
Esc
:wq
Enter
```

Avslutt uten å lagre:

```text
Esc
:q!
Enter
```

### Web fungerer, native feiler

Kontroller:

- imports i `.js`-filen
- `react-native-maps`
- Expo-moduler
- plattformspesifikke filer
- testing i Expo Go eller emulator

### Native fungerer, web feiler

Kontroller:

- `.web.js`-filen
- at native-only biblioteker ikke importeres på web
- Browser Console
- Metro-terminalen

## Arbeidskontroll

Før hver oppgave:

```bash
git status
git branch --show-current
```

Etter hver oppgave:

```bash
git diff
npm run lint
npx expo start -c
```

Når testen er godkjent:

```bash
git add <relevante filer>
git commit -m "Presis commitmelding"
git push
```

---

Live Rebus utvikles kontrollert, med små commits, eksplisitt plattformtesting og én skjerm om gangen.