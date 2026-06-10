# Live Rebus — V1 Complete

Samlet GitHub-struktur for V1.

Denne pakken inneholder de tre godkjente V1-delene i separate mapper slik at ingen filer overskrives:

```txt
home-screen-v1/
rebuslop-v1/
skattejakt-v1-radar/
```

## Innhold

### 1. Home Screen V1

Mappe:

```txt
home-screen-v1/
```

Inneholder:

- `HomeScreen.js`
- `HomeChallengeCard.js`
- `HomeProgressCard.js`
- `HomeUpcomingCard.js`
- `designTokens.js`
- design-dokumentasjon

Brukes som felles startskjerm for appen.

### 2. Rebusløp V1

Mappe:

```txt
rebuslop-v1/
```

Inneholder:

- ruteoppsett
- starttidspunkt
- invitasjon
- host vanlig vei
- venn motsatt vei
- Kartverket + Riksantikvaren
- GPS + svar-godkjenning
- XP-resultat

### 3. Skattejakt V1 + Radar

Mappe:

```txt
skattejakt-v1-radar/
```

Inneholder:

- områdevalg
- områdesjekk
- obligatorisk sikkerhetsbekreftelse
- Kartmodus med Fog of War
- Kompassmodus
- Radarmodus
- hint-knapp
- XP-resultat

## Hvorfor separat struktur?

Dette er tryggest for GitHub nå fordi alle tre delene har egne `App.js`, `package.json`, `theme.js` og skjermfiler.

Hvis de legges flatt i samme mappe nå, vil flere filer overskrive hverandre.

## Anbefalt repo-struktur for V1

```txt
live-rebus/
  README.md
  home-screen-v1/
  rebuslop-v1/
  skattejakt-v1-radar/
```

## Neste steg

Når du skal bygge alt inn i én Expo-app, bør vi lage en felles appstruktur:

```txt
src/
  screens/
    HomeScreen.js
    rebus/
    treasure/
  components/
  utils/
  services/
```

Da må vi slå sammen:

- `theme.js`
- `designTokens.js`
- `App.js`
- felles knapper/header
- felles navigasjon
- felles XP/profile state

Ikke gjør det manuelt ennå. Bruk denne pakken som trygg V1-kodebase.
