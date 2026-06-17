# Chat-handoff: Sonar

Dette dokumentet skal leses først i neste chat. Det beskriver nøyaktig status, branch, filer, beslutninger og neste arbeidspunkt.

## Repo og aktiv branch

```text
tomhaugstulen-star/live-rebus
```

Aktiv arbeidsbranch:

```text
sonar
```

Kontroller lokalt:

```bash
git fetch origin
git switch sonar
git pull origin sonar
git branch --show-current
git status -sb
```

Forventet:

```text
sonar
## sonar...origin/sonar
```

Ikke gjør direkte endringer på `main` eller `skattejakt-spillet` uten eksplisitt beskjed. Sonar-arbeid gjøres kun på `sonar`.

## Lokale filer hos brukeren som ikke skal røres

Ved siste kontroll hadde brukeren lokale endringer i:

```text
assets/images/treasure/treasure-setup-header.png
assets/images/treasure/treasure-setup-header.webp
package.json
package-lock.json
```

Disse skal ikke overskrives eller nullstilles automatisk.

## Gjeldende navigasjonsflyt

```text
Home
→ TreasureSetup
→ Safety
→ TreasureReady
→ TreasureHunt
→ TreasureFound
→ TreasureResult
```

Sonar bruker samme navigasjonsflyt som vanlig skattejakt.

## Ferdig Sonar-arbeid i denne chatten

### 1. Egen Sonar-spillskjerm

Nye filer:

```text
src/screens/treasure/SonarHuntScreen.js
src/screens/treasure/SonarHuntScreen.styles.js
```

Inneholder:

- mørk, profesjonell Sonar-profil
- stor rund radar
- roterende sweep
- pulserende signalring
- spiller i sentrum
- diskrete signalpunkter uten presis skattmarkør
- skatter, tid og signalstyrke
- simulert avstand
- signaltekst som endres med avstand
- `Følg signalet` som blir `Åpne skatten` ved 5 meter
- avslutt-dialog
- kalibreringsikon som foreløpig er visuelt

Web og native peker nå direkte til Sonar-skjermen på denne branchen:

```text
src/screens/treasure/TreasureHuntScreen.js
src/screens/treasure/TreasureHuntScreen.web.js
```

Begge filene re-eksporterer `SonarHuntScreen`.

### 2. Profesjonelt modusvalg i oppsettet

Oppdatert fil:

```text
src/screens/treasure/TreasureSetupScreen.js
```

Når Sonar velges:

- rund radar-preview
- cyan kant og glød
- roterende sweep
- pulserende ring
- cyan valgt markering
- cyan tittel

Når Tåkekart velges:

- sølvgrå valgt kant
- svak grå glød
- langsom tåke-pust
- to diskrete tåkelag
- tydeligere aktiv tilstand

Kontaktvalg, spillere og vanskelighetsgrad er beholdt.

### 3. Aktiv Sonar-jakt på Home

Oppdatert fil:

```text
src/components/home/HomeUpcomingCard.js
```

Når en Sonar-jakt starter, vises aktiv jakt på Home med:

- cyan accent
- radar/Sonar-symbol
- cyan-glød i kortet
- status `Sonar · X av Y skatter funnet`
- cyan `Fortsett`-knapp

Teknisk brukes prefikset `Sonar · ` i jaktnavnet fra `TreasureSetupScreen`, og `HomeUpcomingCard` fjerner prefikset fra den synlige tittelen og bruker det til å aktivere Sonar-styling.

Dette er en midlertidig løsning. En senere refaktor bør sende `mode` eksplisitt til Home-kortet i stedet for å lese modus fra tittelen.

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

## XP-regler

Sonar skal ha nøyaktig samme XP som Tåkekart. Spillmodus inngår ikke i XP-beregningen.

| Nivå | Fullføring | Per skatt | Maks normal XP |
|---|---:|---:|---:|
| Enkel | 60 | 10 | 100 |
| Medium | 120 | 12 | 216 |
| Vanskelig | 220 | 15 | 400 |

Kilde:

```text
src/utils/xpRules.js
```

Vinnerbonus:

```text
25 XP
```

Delt førsteplass:

```text
15 XP per spiller
```

## Felles skatteregler

| Nivå | Skatter | Område | Tåkeradius | Minste skattavstand |
|---|---:|---:|---:|---:|
| Enkel | 4 | 50 m | 10 m | 15 m |
| Medium | 8 | 150 m | 6 m | 20 m |
| Vanskelig | 12 | 300 m | 4 m | 50 m |

Kilde:

```text
src/utils/treasureRules.js
```

## Viktige filer

```text
src/navigation/AppNavigator.js
src/components/home/HomeUpcomingCard.js
src/screens/treasure/TreasureSetupScreen.js
src/screens/treasure/TreasureReadyScreen.js
src/screens/treasure/SonarHuntScreen.js
src/screens/treasure/SonarHuntScreen.styles.js
src/screens/treasure/TreasureHuntScreen.js
src/screens/treasure/TreasureHuntScreen.web.js
src/screens/treasure/TreasureFoundScreen.js
src/screens/treasure/TreasureResultScreen.js
src/utils/treasureRules.js
src/utils/xpRules.js
src/utils/playerProgressStore.js
```

## Kjente tekniske begrensninger

1. Sonar-avstanden er simulert og reduseres automatisk hvert sekund.
2. Sonar har ingen ekte GPS-integrasjon ennå.
3. Ingen faktisk lydmotor eller bip-intervaller er implementert.
4. Kalibreringsknappen er kun visuell.
5. `foundCount` i Sonar-skjermen er lokal og starter på 0.
6. `TreasureFound` går fortsatt til resultat etter hvert funn i dagens navigatorflyt; den bør senere returnere til jakten til siste skatt.
7. `AppNavigator.js` sender fortsatt hardkodet `xp={120}` og `elapsedSeconds={420}` til resultatet.
8. XP-reglene er riktige, men faktisk resultatdata er ikke komplett koblet til navigatoren.
9. Aktiv jakt og XP er minnebasert og overlever ikke full appomstart.
10. Home-gjenkjenning av Sonar bruker foreløpig tittel-prefiks i stedet for eksplisitt `mode`-prop.
11. `TreasureReadyScreen` har historisk hatt lokale radiusverdier som bør kontrolleres mot `treasureRules.js`.
12. Sonar-animasjonene må testes på fysisk iPhone/Android og med redusert bevegelse.

## Anbefalt neste oppgave

Første tekniske forbedring bør være å gjøre aktiv jakt autoritativ i `AppNavigator.js`:

```text
mode
+ difficulty
+ treasuresFound
+ treasuresTotal
+ startedAt
+ elapsedSeconds
+ completed
+ calculated XP
```

Deretter:

```text
TreasureFound returnerer til TreasureHunt til siste skatt
→ faktisk XP til TreasureResult
→ XP utbetales én gang
→ Home bruker eksplisitt activeTreasure.mode
→ ekte GPS og lyd senere
```

## Testkommando

```bash
git pull origin sonar
npx expo start --web -c
```

Test spesielt:

- velg Tåkekart og Sonar flere ganger i oppsettet
- begge kort har tydelig aktiv tilstand
- Sonar-radar i oppsettet roterer og pulserer
- start Sonar-jakt
- Sonar-spillskjermen åpnes
- gå tilbake til Home
- aktiv jakt vises med cyan Sonar-styling
- `Fortsett` åpner Sonar igjen
- Enkel, Medium og Vanskelig viser riktig antall skatter
- ingen horisontal scrolling ved 320–430 px
- web og fysisk enhet

## Dokumenter som er oppdatert

```text
README.md
docs/project-status.md
docs/branch-structure.md
docs/treasure-hunt-flow.md
docs/chat-handoff.md
```
