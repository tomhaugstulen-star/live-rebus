# Skattejaktflyt: Sonar

Dette dokumentet beskriver gjeldende flyt på branch `sonar`.

## Navigasjon

```text
Home
→ TreasureSetup
→ Safety
→ TreasureReady
→ TreasureHunt
→ TreasureFound
→ TreasureResult
→ Home eller ny jakt
```

Navigasjonen styres i:

```text
src/navigation/AppNavigator.js
```

## Home

Filer:

```text
src/screens/home/HomeScreen.js
src/components/home/HomeUpcomingCard.js
src/navigation/AppNavigator.js
```

Når en Sonar-jakt starter:

- lokal aktiv jakt opprettes
- Home viser jaktnavnet
- status viser `Sonar · X av Y skatter funnet`
- kortet får cyan accent og radar-symbol
- `Fortsett` åpner `TreasureHunt`

Begrensning:

- statusen er minnebasert
- full appomstart nullstiller aktiv jakt
- Sonar identifiseres foreløpig via `Sonar · `-prefiks i tittelen

## TreasureSetup

Fil:

```text
src/screens/treasure/TreasureSetupScreen.js
```

Brukeren velger:

- navn
- Tåkekart eller Sonar
- alene eller venner
- Enkel, Medium eller Vanskelig
- opptil fem telefonkontakter

### Sonar valgt

- rund radar-preview
- cyan kant og glød
- roterende sweep
- pulserende ring
- cyan valgt markering

### Tåkekart valgt

- sølvgrå kant
- diskret glød
- pustende tåkehalo
- tåkelag i preview

## Safety

Fil:

```text
src/screens/treasure/SafetyScreen.js
```

Brukeren bekrefter sikkerhetsinformasjon før videre navigasjon.

## TreasureReady

Filer:

```text
src/screens/treasure/TreasureReadyScreen.js
src/screens/treasure/TreasureReadyScreen.styles.js
```

Inneholder:

- vert
- opptil fem venner
- valgt modus
- vanskelighetsgrad
- teksten `Gjør dere klare`
- nedtelling fra 10
- overgang til jakt

Ved start opprettes `activeTreasure` i navigatoren med blant annet:

```text
id
name
mode
treasuresFound
treasuresTotal
startedAt
```

## TreasureHunt på Sonar-branchen

Disse filene peker begge til Sonar-skjermen:

```text
src/screens/treasure/TreasureHuntScreen.js
src/screens/treasure/TreasureHuntScreen.web.js
```

Implementasjonen ligger i:

```text
src/screens/treasure/SonarHuntScreen.js
src/screens/treasure/SonarHuntScreen.styles.js
```

### Visuell struktur

- mørk bakgrunn
- toppfelt med tilbake, Sonar og kalibrering
- tre statuskort
- stor rund radar
- spiller i sentrum
- roterende sweep
- pulserende radar-ring
- diskrete blips
- avstand til signal
- signalpanel nederst
- primærknapp

### Nåværende demooppførsel

- avstand starter på 74 meter
- avstand reduseres automatisk hvert sekund
- signaltekst endres etter avstand
- knapp er deaktivert frem til 5 meter
- ved 5 meter vises `Åpne skatten`
- `onFound` åpner `TreasureFound`

Dette er ikke ekte GPS- eller Sonar-logikk.

### Ikke implementert

- ekte posisjon
- reell retning til skatt
- lydmotor
- bip-intervaller
- haptikk
- fungerende kalibrering
- serverlagret funn

## TreasureFound

Fil:

```text
src/screens/treasure/TreasureFoundScreen.js
```

Nåværende begrensning:

- navigatoren går videre til resultat etter funnskjermen
- ønsket endelig flyt er å returnere til Sonar frem til siste skatt

Planlagt riktig flyt:

```text
funn registreres
→ TreasureFound
→ flere skatter igjen: TreasureHunt
→ siste skatt: TreasureResult
```

## TreasureResult og XP

Filer:

```text
src/screens/treasure/TreasureResultScreen.js
src/utils/xpRules.js
src/utils/playerProgressStore.js
```

Sonar og Tåkekart bruker samme XP:

| Nivå | Fullføring | Per skatt | Maks normal XP |
|---|---:|---:|---:|
| Enkel | 60 XP | 10 XP | 100 XP |
| Medium | 120 XP | 12 XP | 216 XP |
| Vanskelig | 220 XP | 15 XP | 400 XP |

Modus påvirker ikke XP.

Kritisk begrensning:

```text
AppNavigator sender fortsatt xp={120}
AppNavigator sender fortsatt elapsedSeconds={420}
```

Dermed er XP-reglene korrekte, men faktisk resultatflyt er ikke ferdig koblet.

## Felles skatteregler

Fil:

```text
src/utils/treasureRules.js
```

| Nivå | Antall | Område | Tåkeradius | Minste avstand |
|---|---:|---:|---:|---:|
| Enkel | 4 | 50 m | 10 m | 15 m |
| Medium | 8 | 150 m | 6 m | 20 m |
| Vanskelig | 12 | 300 m | 4 m | 50 m |

Sonar bruker antall skatter fra samme regelsett. Område- og koordinatreglene er ikke koblet til ekte GPS ennå.

## Autoritativ state som bør bygges videre

`activeTreasure` bør senere inneholde:

```text
id
name
mode
difficulty
players
participants
treasuresFound
treasuresTotal
startedAt
elapsedSeconds
completed
xpAwarded
```

## Prioritert neste flytendring

```text
Sonar onFound
→ navigator øker treasuresFound
→ TreasureFound
→ flere skatter: tilbake til Sonar
→ siste skatt: calculateTreasureXp
→ TreasureResult
→ legg XP til én gang
→ Home oppdateres
```

## Manuell test

```bash
git switch sonar
git pull origin sonar
npx expo start --web -c
```

Kontroller:

- bytte mellom Tåkekart og Sonar
- begge valgene ser aktive ut
- Sonar-preview animerer
- nedtelling starter Sonar
- radar-skjermen åpnes
- tilbake til Home viser cyan aktiv jakt
- `Fortsett` åpner Sonar
- riktig antall skatter for alle vanskelighetsgrader
- 320–430 px bredde
- ingen horisontal scrolling
- fysisk enhet for safe area og ytelse
