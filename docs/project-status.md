# Prosjektstatus: Sonar setup og Home-retning

Aktiv arbeidsbranch:

```text
design/sonar-setup-card-scale
```

Åpen PR:

```text
PR #2: Legg til Sonar-oppsett
base: treasure-setup-cleanup
head: design/sonar-setup-card-scale
```

PR-en skal ikke merges før brukeren eksplisitt ber om det.

## Nåstatus

Arbeidet handler nå om Sonar som egen kategori og visuell helhet fra Home til setup/sikkerhet/spill.

Home har tre kategorier:

```text
Rebusløp
Skattejakt
Sonar
```

Sonar setup fungerer teknisk, men brukeren mener den visuelle retningen føles feil fordi Home, setup, sikkerhet og spill-skjermen ikke oppleves som samme flyt.

## Gjort på aktiv branch

- Sonar lagt til som eget Home-kort
- Sonar routing lagt inn til TreasureSetup med Sonar-variant
- Sonar setup-bakgrunn lagt til
- transparente Sonar-knapper lagt til
- knappetekst satt til `Venn` og `Venner`
- `Velg spillmodus` satt som setup-copy
- uklar subtitle fjernet
- grått panel fjernet for Sonar setup
- ubrukte gamle `sonarPlayer...` styles fjernet
- PR #2 opprettet
- radar ble testet i setup-header, men fjernet igjen etter designavklaring

## Viktige filer

```text
src/screens/home/HomeScreen.js
src/screens/home/HomeScreen.styles.js
src/components/home/HomeChallengeCard.js
src/screens/treasure/TreasureSetupScreen.js
src/screens/treasure/TreasureSetupScreen.styles.js
src/components/treasure/TreasureSetupHeader.js
src/components/treasure/TreasureSetupOptions.js
src/components/treasure/SonarSetupRadar.js
src/navigation/AppNavigator.js
```

## Viktige assets

```text
assets/images/treasure/sonar-setup-background.webp
assets/images/treasure/sonar-player-solo.webp
assets/images/treasure/sonar-player-team.webp
```

## Nåværende designproblem

Brukeren har pekt på at helheten blir feil:

```text
Home screen
→ Sonar setup med blå sci-fi-bakgrunn og illustrasjonsknapper
→ sikkerhet
→ Sonar-spill med mørk radar-UI
```

Dette må løses som retning, ikke bare småjustering.

Anbefalt prinsipp:

```text
Home = teaser
Setup = valg
Sikkerhet = klargjøring
Spill = radar
```

Stor radar skal ikke ligge på setup-siden. Den hører hjemme på selve Sonar-spillskjermen.

## Uavklart før neste patch

Avklar med bruker før videre designendring:

```text
1. Skal Sonar setup være mørkere og mer lik SonarHuntScreen?
2. Skal Sonar Home-kortet bruke radar/signal-uttrykk i stedet for blå romskip-plakat?
3. Skal de store illustrerte Venn/Venner-bildene beholdes?
4. Skal Sonar setup-bakgrunnen byttes eller tones kraftig ned?
5. Skal SonarSetupRadar.js slettes eller beholdes for senere bruk?
```

## Brancher og filer som ikke skal røres uten avtale

Ikke endre eller merge:

```text
main
sonar
skattejakt-spillet
design-sonar-ui
treasure-setup-cleanup
```

Ikke endre pakker uten avtale:

```text
package.json
package-lock.json
```

## Låste spillregler

```text
Alle spill krever internett/mobildata.
Offline/P2P/Bluetooth er ikke kjerneflyt.
Skattene genereres først fra valgt område.
Spillet har bare én aktiv skatt eller ett aktivt signal om gangen.
Neste signal åpnes først når forrige funn er ferdig registrert.
```

## Områdeparameter

```text
Enkel:     4 skatter  · ca. 50 m diameter  · 2 m Sonar-synlighet
Medium:    8 skatter  · ca. 80 m diameter  · 2,5 m Sonar-synlighet
Vanskelig: 12 skatter · ca. 150 m diameter · 3 m Sonar-synlighet
```

Dette ligger i `src/utils/treasureRules.js`.

## Skattejakt/Sonar-status

Implementert grunnlag:

- riktig routing mellom Sonar og Tåkekart
- felles `treasureSessionStore`
- resultatdata i `pendingResultStore`
- beskyttelse mot dobbel XP
- siste skatt går direkte til resultat/XP
- Tåkekart sin gule web-testknapp er deaktivert
- Sonar bruker app-generert signalmotor i `src/utils/sonarSignalEngine.js`
- Sonar-spillskjermen har radar, signalstatus, haptics og funnsekvens på samme skjerm

Sonar skal som standard være app-generert signaljakt uten GPS, meter og kart.

## XP

| Nivå | Fullføring | Per skatt | Maks normal XP |
|---|---:|---:|---:|
| Enkel | 60 | 10 | 100 |
| Medium | 120 | 12 | 216 |
| Vanskelig | 220 | 15 | 400 |

Sonar-småsignal med XP er ikke implementert og skal ikke kunne farmes.

## Test nå

```bash
git fetch --all --prune
git switch design/sonar-setup-card-scale
git pull origin design/sonar-setup-card-scale
npx expo start --dev-client --clear
```

Kontroller:

- Home viser tre kategorier.
- Sonar åpner Sonar setup.
- Sonar setup viser `Venn` og `Venner`.
- Skattejakt fungerer fortsatt.
- PR #2 står åpen, ikke merget.

## Bevisst utsatt

- samlet visuell retning for Sonar Home/setup/sikkerhet/spill
- Skattejakt-bakgrunn/polish
- instruksjonsbilde/animasjon på nedtellingsskjermen
- ekte GPS og GPS-lagjakt
- accelerometer/skritt/gyro
- Sonar-lyd/pip
- global lyd-/haptikkinnstilling
- Sonar-småsignal med XP
- innlogging, venner, varsler og backend-synk

## Neste arbeidsområde

```text
Avklar ny visuell retning for Sonar Home og setup før flere designpatcher.
Ikke legg radaren tilbake på setup uten ny eksplisitt beskjed.
```
