# Live Rebus

Live Rebus er en Expo/React Native-app for rebusløp og skattejakt. Appen bruker React Navigation med en sentral stack i `src/navigation/AppNavigator.js` og støtter iOS, Android og web.

## Kom i gang

```bash
npm install
npx expo start --web -c
```

## Aktiv arbeidsbranch

```text
sonar
```

Denne branchen er autoritativ for pågående Sonar-arbeid. Ikke gjør direkte endringer på `main` eller `skattejakt-spillet` før videre arbeid er testet og eksplisitt godkjent.

Kontroller branch:

```bash
git fetch origin
git switch sonar
git pull origin sonar
git branch --show-current
git status -sb
```

Brukeren hadde ved siste kontroll lokale endringer i:

```text
assets/images/treasure/treasure-setup-header.png
assets/images/treasure/treasure-setup-header.webp
package.json
package-lock.json
```

Disse skal ikke overskrives automatisk.

## Dokumentasjon

- [`docs/project-status.md`](docs/project-status.md)
- [`docs/branch-structure.md`](docs/branch-structure.md)
- [`docs/treasure-hunt-flow.md`](docs/treasure-hunt-flow.md)
- [`docs/chat-handoff.md`](docs/chat-handoff.md)

Neste chat skal lese `docs/chat-handoff.md` først.

## Prosjektstruktur

```text
App.js
src/
  components/
    home/
    treasure/
  navigation/
    AppNavigator.js
  screens/
    home/
    rebus/
    treasure/
      SonarHuntScreen.js
      SonarHuntScreen.styles.js
  utils/
    designTokens.js
    playerProgressStore.js
    treasureRules.js
    xpRules.js
assets/
  images/
    home/
    treasure/
docs/
  branch-structure.md
  chat-handoff.md
  project-status.md
  treasure-hunt-flow.md
```

## Gjeldende skattejaktflyt

```text
Home
→ TreasureSetup
→ Safety
→ TreasureReady
→ TreasureHunt
→ TreasureFound
→ TreasureResult
```

## Sonar-status

Sonar er nå implementert som egen spillvisning på `sonar`-branchen.

Viktige filer:

```text
src/screens/treasure/SonarHuntScreen.js
src/screens/treasure/SonarHuntScreen.styles.js
src/screens/treasure/TreasureSetupScreen.js
src/components/home/HomeUpcomingCard.js
src/screens/treasure/TreasureHuntScreen.js
src/screens/treasure/TreasureHuntScreen.web.js
```

### Sonar-spillskjermen

- stor rund radar
- roterende sweep
- pulserende signalring
- spiller i sentrum
- diskrete signalpunkter
- signalstyrke, tid og skatteantall
- simulert avstand
- `Åpne skatten` ved 5 meter
- egen cyan visuell profil

På denne branchen re-eksporterer web og native `SonarHuntScreen` fra de vanlige `TreasureHuntScreen`-filene.

### Modusvalg i oppsettet

Sonar valgt:

- rund cyan radar-preview
- sweep og puls
- cyan valgt kant og glød

Tåkekart valgt:

- sølvgrå valgt kant
- svak glød
- pustende tåkehalo
- diskrete tåkelag

### Aktiv Sonar-jakt på Home

Når en Sonar-jakt starter, viser Home:

- radar-symbol
- cyan accent og glød
- `Sonar · X av Y skatter funnet`
- cyan `Fortsett`-knapp

Foreløpig identifiseres Sonar via prefikset `Sonar · ` i jaktnavnet. Dette bør senere erstattes av eksplisitt `mode`-data.

## Felles skatteregler

| Vanskelighet | Skatter | Områderadius | Synlig tåkeradius | Minste avstand |
|---|---:|---:|---:|---:|
| Enkel | 4 | 50 m | 10 m | 15 m |
| Medium | 8 | 150 m | 6 m | 20 m |
| Vanskelig | 12 | 300 m | 4 m | 50 m |

Kilde:

```text
src/utils/treasureRules.js
```

Koordinatgeneratoren finnes, men er ikke koblet til ekte GPS/startposisjon.

## XP-regler

Sonar og Tåkekart bruker identiske regler. Spillmodus påvirker ikke XP.

| Vanskelighet | Fullføring | XP per skatt | Maks normal XP |
|---|---:|---:|---:|
| Enkel | 60 XP | 10 XP | 100 XP |
| Medium | 120 XP | 12 XP | 216 XP |
| Vanskelig | 220 XP | 15 XP | 400 XP |

Kilde:

```text
src/utils/xpRules.js
```

Vinnerbonus er 25 XP. Delt førsteplass gir 15 XP hver.

## Viktige Sonar-commits

```text
4858033  Add first sonar hunt screen
b172837  Style first sonar hunt screen
e1a62aa  Route web treasure hunt to sonar screen
92b42db  Route native treasure hunt to sonar screen
3278728  Polish sonar mode selection in treasure setup
4c8adac  Add subtle life to selected fog mode
fb5fea1  Mark sonar hunts for home screen styling
5c4c0cd  Style active sonar hunt on home screen
```

## Kjente begrensninger

- Sonar-avstand er simulert
- ingen ekte GPS
- ingen Sonar-lyd eller bip
- kalibrering er kun visuell
- lokal `foundCount` er ikke koblet til autoritativ state
- `TreasureFound` går for tidlig til resultat
- navigatoren sender fortsatt hardkodet resultat-XP og tid
- XP-status og aktiv jakt er ikke persistent
- Home bruker tittel-prefiks i stedet for eksplisitt `mode`
- fysisk enhetstest gjenstår

## Prioritert videre arbeid

```text
autoritativ activeTreasure-state
→ flere funn før resultat
→ faktisk funn og tid til resultat
→ calculateTreasureXp
→ XP utbetales én gang
→ eksplisitt mode til Home
→ ekte GPS
→ Sonar-lyd
```

## Test

```bash
git switch sonar
git pull origin sonar
npx expo start --web -c
```

Kontroller minst:

- Tåkekart og Sonar i oppsettet
- begge aktive tilstander
- Sonar-previewens animasjon
- nedtelling og start
- Sonar-spillskjerm
- aktiv Sonar-jakt på Home
- `Fortsett`
- alle vanskelighetsgrader
- 320–430 px bredde
- ingen horisontal scrolling
- fysisk enhet for safe area og ytelse
