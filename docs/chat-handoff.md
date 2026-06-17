# Chat-handoff: Sonar ferdigstilt

Les dette først i neste chat.

## Repo og branch

```text
tomhaugstulen-star/live-rebus
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

Ikke endre `main` eller `skattejakt-spillet` uten eksplisitt beskjed.

## Lokale filer som ikke skal overskrives

```text
assets/images/treasure/treasure-setup-header.png
assets/images/treasure/treasure-setup-header.webp
package.json
package-lock.json
```

## Sonar-delen er nå funksjonelt samlet

Gjeldende flyt:

```text
Home
→ TreasureSetup
→ Safety
→ TreasureReady
→ TreasureHunt
→ TreasureFound
→ tilbake til TreasureHunt mens skatter gjenstår
→ TreasureResult etter siste skatt
```

## Riktig modusruting

Disse velger skjerm fra `config.variant`:

```text
src/screens/treasure/TreasureHuntScreen.js
src/screens/treasure/TreasureHuntScreen.web.js
```

Resultat:

```text
variant === "sonar" → SonarHuntScreen
variant === "fog"   → FogHuntScreen
```

Viktige filer:

```text
src/screens/treasure/SonarHuntScreen.js
src/screens/treasure/SonarHuntScreen.styles.js
src/screens/treasure/FogHuntScreen.js
```

## Delt jaktstate

Ny fil:

```text
src/utils/treasureSessionStore.js
```

Holder:

```text
name
mode
difficulty
treasuresFound
treasuresTotal
startedAt
elapsedSeconds
completed
xpAwarded
```

Sonar, Tåkekart, funnskjermen og resultatet bruker samme session-data.

## Sonar-spillskjerm

Implementert:

- rund radar
- roterende sweep
- pulserende signalring
- spiller i sentrum
- signalpunkter uten presis skattmarkør
- skatteteller fra delt state
- tid fra delt starttid
- timer kjører bare når skjermen er fokusert
- Reduce Motion stopper sweep og puls
- fungerende kalibrering nullstiller demosignal
- åpning ved 5 meter
- avslutt-dialog nullstiller delt session

Avstand og signal er fortsatt simulert. Ekte GPS og lyd kommer senere.

## Tåkekart

Tåkekart har igjen egen spillvisning og åpnes korrekt når `fog` er valgt.

Implementert i denne avslutningen:

- egen `FogHuntScreen`
- skatteteller og tid fra samme session som Sonar
- riktig antall skatter fra `treasureRules.js`
- funn registreres i samme session
- fokusstyrt timer

## TreasureFound

Oppdatert:

- viser faktisk `funnet/total`
- viser XP per funn fra valgt vanskelighetsgrad
- `Fortsett jakten` går tilbake til spill mens skatter gjenstår
- `Se resultat` vises først etter siste skatt
- menyvalg nullstiller session

## Resultat og XP

`TreasureResultScreen` bruker nå session-data som autoritativ kilde:

- faktisk modus
- faktisk vanskelighetsgrad
- faktisk antall funn
- faktisk tid
- fullføringsstatus

XP beregnes med:

```text
src/utils/xpRules.js
calculateTreasureXp(...)
```

Sonar og Tåkekart bruker identiske XP-regler:

| Nivå | Fullføring | Per skatt | Maks normal XP |
|---|---:|---:|---:|
| Enkel | 60 | 10 | 100 |
| Medium | 120 | 12 | 216 |
| Vanskelig | 220 | 15 | 400 |

XP legges til via `playerProgressStore` og beskyttes mot dobbel utbetaling med `xpAwarded` i sessionen.

## Oppsett og Home

`TreasureSetupScreen` har:

- animert cyan Sonar-preview
- profesjonell Sonar-glød
- aktiv Tåkekart-preview med sølvglød og tåke-pust

Aktiv Sonar-jakt på Home har:

- cyan accent
- radar-symbol
- Sonar-status
- cyan `Fortsett`-knapp

Home-identifikasjon bruker foreløpig `Sonar · `-prefiks i navnet. Dette fungerer, men en senere opprydding kan sende `mode` eksplisitt som prop.

## Nye commits etter siste dokumentasjonsrunde

```text
d3d90f1  Add shared treasure session state
0411aa7  Connect sonar screen to shared hunt state
1598739  Add dedicated fog hunt screen
d23320a  Route treasure hunt by selected mode
098c031  Route web treasure hunt by selected mode
c9dd81b  Continue hunt until final treasure
38670af  Use shared hunt data for treasure result XP
cca80f2  Avoid recursive web treasure screen export
```

## Test før bytte til Live Rebus

```bash
git pull origin sonar
npx expo start --web -c
```

Test begge moduser:

1. Velg Tåkekart og start.
2. Bekreft at Tåkekart åpnes.
3. Finn flere skatter og bekreft retur til jakten.
4. Bekreft resultat først etter siste skatt.
5. Bekreft riktig XP.
6. Start Sonar.
7. Bekreft radar, timer, teller og kalibrering.
8. Gå til Home og bruk `Fortsett`.
9. Test Enkel, Medium og Vanskelig.
10. Test 320–430 px og fysisk enhet.

## Neste arbeidsområde

Når testen over er godkjent, er neste chat for:

```text
Live Rebus
```

Ikke start ny Sonar-refaktorering med mindre testen finner en konkret feil.

## Senere, ikke blokkerende for Live Rebus

- ekte GPS
- faktisk Sonar-lyd og bip
- haptikk
- persistent lagring etter appomstart
- backend og flerspillersynkronisering
- eksplisitt `mode`-prop til Home i stedet for tittel-prefiks
