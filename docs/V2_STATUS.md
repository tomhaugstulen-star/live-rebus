# Live Rebus – V2 status

## Nåværende status

- Korrekt V2 HomeScreen er verifisert og merget til `main` via pull request #1.
- HomeScreen ble gjenopprettet fra commit `3f51b1c` gjennom en ren branch som kun inneholdt relevante Home-filer og assets.
- Midlertidige recovery-brancher og gamle HomeScreen-brancher er slettet.
- Aktiv arbeidsbranch for neste skjerm er `skattejakt-oppsett`.

## Kilde til sannhet

`main` er kilde til sannhet for ferdig og godkjent kode.

Ferdig HomeScreen består av:

```text
src/screens/home/HomeScreen.js
src/components/home/HomeChallengeCard.js
src/components/home/HomeUpcomingCard.js
assets/images/home/
docs/references/home-screen-reference.png
```

## Appstruktur

- Appen er bygget med Expo og React Native.
- Navigasjon håndteres med `App.js` og React Navigation.
- Expo Router brukes ikke.
- Web kjøres med Expo.

## Hovedmoduser

Live Rebus har to hovedmoduser:

1. Rebusløp
2. Skattejakt

### Rebusløp

Skal inneholde lag, poster, spørsmål, svar, GPS-godkjenning, progresjon, resultat og XP.

Skal ikke bruke Sonar, Fog of War eller skattejaktlogikk.

### Skattejakt

Skal inneholde områdevalg, sikkerhetsbekreftelse, Kart, Kompass, Sonar, hint, funnet-skjerm, resultat og XP.

Skal ikke bruke rebusspørsmål, motsatte lagruter eller rebusventerom.

## Gjeldende flyter

### Rebusløp

```text
Home → RebusSetup → RouteReady → WaitingRoom → RebusGame → RebusResult
```

### Skattejakt

```text
Home → TreasureSetup → AreaCheck → Safety → TreasureHunt → TreasureFound → TreasureResult
```

## Web-safe implementasjon

Følgende filer brukes for web-spesifikke flyter:

```text
src/screens/rebus/RebusGameScreen.web.js
src/screens/treasure/TreasureHuntScreen.web.js
src/components/treasure/SonarPulse.js
```

Web skal ikke importere `react-native-maps` i web-safe paths.

## Designstatus

### Ferdig

- V2 HomeScreen
- Home challenge cards
- Home upcoming cards
- Home assets og referansebilde

### Aktivt arbeid

- Skattejakt-oppsett i branch `skattejakt-oppsett`

### Senere

- full native kartimplementasjon
- ekte GPS
- native Fog of War
- tyngre V3-funksjonalitet

## Designregler

Palett:

```text
background:      #0F172A
surface/card:    #1E293B
surfaceAlt:      #334155
text:            #E2E8F0
muted:           #94A3B8
primary/orange:  #FF6B35
treasure/gold:   #F59E0B
success/green:   #22C55E
rebus/purple:    #8B5CF6
danger/red:      #EF4444
```

Se `docs/DESIGN_SYSTEM.md` for fullstendige regler.

## Branch-strategi

- `main`: ferdig og verifisert kode
- `skattejakt-oppsett`: aktiv utvikling
- Nye skjermer utvikles i egne brancher.
- Merge til `main` skal skje via pull request.
- Gamle designbrancher skal ikke merges direkte.
- Diff skal kontrolleres før merge.

## Test før merge

Kjør:

```bash
npx expo start --web --clear
```

Kontroller:

- ingen bundling-feil
- ingen merge-markører
- riktig branch og commit
- fungerende navigasjon
- tilgjengelige trykkflater og labels
- kun forventede filer i diffen

## Neste steg

1. Fortsett Skattejakt-oppsett i `skattejakt-oppsett`.
2. Hold HomeScreen uendret med mindre en eksplisitt designendring er godkjent.
3. Test web og mobilvisning før pull request.
4. Oppdater dette dokumentet når Skattejakt-oppsett merges til `main`.
