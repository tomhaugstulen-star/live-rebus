# Live Rebus – V2 status

## Appstruktur

- Appen er bygget med Expo / React Native.
- Navigasjonen er satt opp med `App.js` + React Navigation.
- Expo Router brukes ikke.
- `package.json` skal fortsatt ha:

```json
"main": "node_modules/expo/AppEntry.js"
```

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

Skattejakt skal inneholde område, sikkerhetsbekreftelse, Kart, Kompass, Sonar, hint, funnet-skjerm, resultat og XP.

Skattejakt skal ikke ha:

- rebusspørsmål per post
- to lag med motsatt rute
- rebusventerom
- rebusposter
- krav om tekstsvar for å godkjenne post

## Milepæler

- V1: stabile grunnflyter og teknisk sammenheng uten crash.
- V1 web/demo er ferdig og bekreftet fungerende med `npx expo start --web -c`.
- V2: designrunde og visuell polering.
- V3: kart, GPS, native Fog of War og tyngre teknisk videreutvikling.

## Ferdig web-testet flyt: Rebusløp

Flyt:

`Home → Rebusløp → RebusSetup → RouteReady → WaitingRoom → RebusGame → RebusResult`

Demo shortcut:

`RouteReady → Demo: start nå → RebusGame → RebusResult`

- `RebusGame` bruker web-safe fil:

```text
src/screens/rebus/RebusGameScreen.web.js
```

- Web-test bruker demo-posisjon, ikke ekte GPS.
- `Fullfør rebus` vises først etter at alle poster er godkjent.
- Siste post må besvares og godkjennes før resultatknappen vises.
- `RebusResult` er visuelt oppgradert med oppsummering, status, XP, tid og navigasjon tilbake til meny / ny rute.
- Demo-svar:
  1. ås
  2. kulturminne
  3. vann
  4. gravminne
  5. vik
  6. haug
  7. bosetning

## Ferdig web-testet flyt: Skattejakt

Flyt:

`Home → Skattejakt → TreasureSetup → Safety → TreasureReady → TreasureHunt → TreasureFound → TreasureResult`

- `TreasureHunt` bruker felles fil:

```text
src/screens/treasure/TreasureHuntScreen.js
```

- Safety-bekreftelse kreves før start.
- Skattejakt web har tre faner:
  - Kart
  - Kompass
  - Sonar
- TreasureSetup viser `Modus: Sonar`.
- Kart viser web-safe Fog of War-demo uten `react-native-maps`.
- Kompass viser grov veiledning uten tåke, sonar, eksakte koordinater eller nøyaktig retning.
- Sonar viser lyd-/signal-/pulsfølelse uten kart og uten eksakt retning.
- `Demo: gå nærmere` og `Demo: gå lenger unna` påvirker skattejaktstatus i alle tre faner.
- `Åpne skatt` aktiveres først når brukeren er svært nær.
- Ingen ekte map eller GPS brukes i v2 web-test.

## Skattejaktmodusene

### Kart

Kartmodus hører til Fog of War.

På mobil/native skal Kartmodus etter hvert bruke:

- kart
- brukerposisjon
- mørk tåke over uutforsket område
- synlig radius rundt brukeren
- skatt-markør først når brukeren er nær nok

På web skal Kartmodus være web-safe:

- ikke importere `react-native-maps`
- ikke importere mobil FogOfWarMap hvis den bruker `react-native-maps`
- vise en trygg Fog of War-demo/forklaring

### Kompass

Kompassmodus skal gi grov veiledning.

Kompassmodus skal ikke vise:

- Fog of War
- Sonar
- eksakte koordinater
- nøyaktig retning

### Sonar

Sonar er en skattejaktvisning for lyd, signal og puls.

Sonar skal:

- gi følelse av søk
- vise signalnivå
- vise pulser/ringer
- bli sterkere når brukeren nærmer seg
- ikke avsløre nøyaktig plassering
- ikke vise kart
- ikke vise Fog of War
- ikke brukes i Rebusløp

Sonar-visningen er trukket ut i en egen web-safe komponent:

```text
src/components/treasure/SonarPulse.js
```

Status:

- Komponenten bruker `Animated` fra React Native.
- Komponenten importerer ikke `react-native-maps`.
- Komponenten krever ikke GPS direkte.
- Komponenten får `distance`, `signalLevel` og `isClose` som props fra parent.
- Komponenten bruker `signalLevel` og `isClose` i `accessibilityLabel`.
- Komponenten er koblet inn i `src/screens/treasure/TreasureHuntScreen.js`.
- Web-flyten er testet etter innkobling og tilgjengelighetslabel-endring og fungerer.
- Native Skattejakt bruker nå Sonar-begrep i UI.
- TreasureSetup bruker nå Sonar-begrep i oppsummeringen.
- Native pulse-modus ligger fortsatt teknisk i `src/components/treasure/RadarMode.js`, men synlig copy er endret til Sonar for å unngå rename/refaktor i samme steg.
- Siste Sonar-rydd er testet med `npx expo start --web -c` og fungerer.

## Home-handlinger på web

- Profil/avatar på Home åpner `Profil`-alert på web.
- Settings/tannhjul på Home åpner `Innstillinger`-alert på web.
- `AppNavigator` bruker en web-safe alert-helper for disse handlingene.

## Designstatus

Designrunde er V2 og skal ikke startes før V1-grunnflytene er stabile.

Følgende skjermer er allerede refined i eksisterende v2-status:

- Home screen
- RebusSetup
- RouteReady
- WaitingRoom
- RebusGame web
- RebusResult
- TreasureSetup
- Safety
- TreasureReady
- TreasureHunt
- TreasureFound
- TreasureResult

Palett:

- background: `#0F172A`
- surface/card: `#1E293B`
- surfaceAlt: `#334155`
- text: `#E2E8F0`
- muted: `#94A3B8`
- primary/orange: `#FF6B35`
- treasure/gold: `#F59E0B`
- success/green: `#22C55E`
- rebus/purple: `#8B5CF6`

## Viktige v2-avgrensninger

- No Expo Router.
- No `react-native-maps` i web-safe paths.
- No real GPS i web-test.
- Fog of War på mobil/native hører til Kartmodus.
- Web har kun web-safe Fog of War-demo uten `react-native-maps`.
- Sonar hører til Skattejakt, ikke Rebusløp.
- Native Skattejakt skal vise Sonar, ikke Radar, i brukergrensesnittet.
- Kart, GPS og full mobil/native map-implementasjon er utsatt til v3.

## Web-safe filer

- `src/screens/rebus/RebusGameScreen.web.js`
- `src/screens/treasure/TreasureHuntScreen.js`
- `src/components/treasure/SonarPulse.js`

Noter:

- Unngå å lage gamle `.web.js`-filer som skygger normale skjermer, med mindre det er eksplisitt nødvendig.
- Tidligere lagde `TreasureSetupScreen.web.js` en white screen og ble fjernet.

## V2-regresjon

Full v2 web-regresjon er passert:

- Rebus-flyt fra Home til RebusResult.
- `Fullfør rebus` vises først etter at alle rebusposter er godkjent.
- RebusResult viser oppsummering og går korrekt til Home eller ny rute.
- WaitingRoom dukker ikke opp etter fullført rebus.
- Skattejakt-flyt fra Home til TreasureResult.
- Skattejakt web har Kart / Kompass / Sonar-faner.
- TreasureSetup viser `Modus: Sonar`.
- SonarPulse er koblet inn i Sonar-fanen.
- SonarPulse bruker tilgjengelighetslabel uten visuell endring.
- Native Skattejakt bruker nå Sonar-begrep i UI.
- Siste Sonar-rydd er testet med `npx expo start --web -c` og fungerer.
- V1 web/demo er bekreftet ferdig med `npx expo start --web -c`.
- Home profile/settings-handlinger på web.

## Manuell regresjonstest

Kjør:

```bash
npx expo start --web -c
```

Rebus:

`Home → Rebusløp → Generer rute → Demo: start nå → RebusGame → godkjenn alle poster → Fullfør rebus → RebusResult → Til meny`

Skattejakt:

`Home → Skattejakt → Fortsett → Safety → huk av → TreasureReady → Start skattejakt → Kart / Kompass / Sonar → Demo: gå nærmere → Åpne skatt → TreasureFound → Fortsett → TreasureResult → Til meny`

## Neste anbefalte steg

1. Dra ned siste GitHub-endringer lokalt med `git pull`.
2. Kjør kort web-sjekk med `npx expo start --web -c` ved behov.
3. Start V2 som egen designrunde når V1-lukkingen er godkjent.
4. Kart, GPS og native Fog of War holdes til V3.
