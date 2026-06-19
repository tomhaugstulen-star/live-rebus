# Prosjektstatus: Sonar signaljakt og skattejaktflyt

Aktiv branch:

```text
design-sonar-ui
```

## Nåstatus

Skattejaktgrunnlaget med Sonar og Tåkekart er stabilisert. Aktivt arbeid på denne branchen er Sonar som app-generert signaljakt uten GPS som standard.

Live Rebus har nå en låst produktregel: spill krever internett/mobildata. Dette gjelder både alenespill og spill med venner.

Aktiv flyt:

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

Det skal ikke være et synlig Home-mellomsteg før XP/resultatskjermen.

## Låst nettregel

```text
Alle spill krever internett/mobildata.
Offline/P2P/Bluetooth er ikke kjerneflyt.
```

Alenespill og vennespill skal bruke samme online grunnmodell. Vennespill legger bare på venner, varsler og felles status.

## Låst funnregel

```text
Skattene genereres først fra valgt område.
Spillet har bare én aktiv skatt eller ett aktivt signal om gangen.
Neste signal åpnes først når forrige funn er ferdig registrert.
```

Dette gjelder også senere XP-bonusfunn. Bonus kan bare være aktivt og utbetales én gang per signal.

## Områdeparameter

Vanskelighetsgrad styrer nå både antall skatter og anbefalt spilleområde:

```text
Enkel:     4 skatter  · lite område    · ca. 40 m diameter
Medium:    8 skatter  · middels område · ca. 80 m diameter
Vanskelig: 12 skatter · stort område   · ca. 140 m diameter
```

Dette ligger i `src/utils/treasureRules.js` som `areaLabel` og `recommendedAreaDiameterMeters`. TreasureSetup viser område-label i vanskelighetskortene. Sonar-skjermen skal fortsatt ikke vise meter, kart eller GPS-avstand.

## Implementert

- riktig routing mellom Sonar og Tåkekart
- felles `treasureSessionStore`
- faktisk vanskelighet, funn, total, tid og XP
- beskyttelse mot dobbel XP
- resultatdata lagres i `pendingResultStore`
- dedikert resultatskjerm med kiste- og bånd-assets
- rolig fade-in på resultatskjermen
- suksess-haptics på fysisk telefon
- fade-in fra nedtelling til selve spillskjermen
- siste skatt går direkte til resultat/XP
- resultatskjermen markeres som presentert ved mount
- Home auto-navigerer ikke lenger til resultatskjermen
- web og mobil registrerer én skatt per ordinært funn
- Tåkekart sin gule web-testknapp er deaktivert
- Sonar er delt ut i `SonarDisplay.js`
- Sonar har konstant roterende radar/sweep mens skjermen er aktiv
- Sonar har rød målprikk ved låst signal/testskatt
- Sonar har haptics for signalopptrapping og funn
- Sonar har kort funnsekvens på samme skjerm
- Sonar bruker app-generert signalmotor i `src/utils/sonarSignalEngine.js`
- Sonar viser grønn `Sonar aktiv`-chip etter start
- `STOPP!`-meldingen vises i hovedområdet under radaren
- startpanelet forsvinner når spillet er startet
- nederste område viser bare handling når skatten kan åpnes
- TreasureSetup viser område-label per vanskelighetsgrad

## Sonar-retning

Sonar skal som standard være:

```text
app-generert signaljakt
uten GPS
uten meter
uten kart
med internett/mobildata som felles spillkrav
uten garantert XP-farming
```

Kjerneflyt:

```text
Sonaren søker
→ signalet bygger seg opp
→ STOPP! Nytt signal funnet
→ snu deg rolig rundt og sjekk området
→ åpne funnet
→ neste signal
```

GPS-lagjakt kan senere bli et avansert valg for store uteområder, men er ikke standard.

Se `docs/sonar-roadmap.md` for full retning.

## Viktige nyere commits

```text
2ab005b  Add play area size per difficulty
5625874  Show area size in treasure difficulty
82c2c3a  Document treasure area sizes by difficulty
6209147  Update sonar signal language
9c7b16a  Move sonar signal alert into main view
fbc901d  Update sonar active hunt layout
39cdad0  Lock online requirement for gameplay
```

## Viktige filer

```text
src/navigation/AppNavigator.js
src/navigation/useAppNavigatorState.js
src/screens/home/HomeScreen.js
src/components/home/HomeUpcomingCard.js
src/screens/treasure/TreasureSetupScreen.js
src/screens/treasure/TreasureSetupScreen.styles.js
src/components/treasure/TreasureSetupOptions.js
src/screens/treasure/SafetyScreen.js
src/screens/treasure/SafetyScreen.styles.js
src/screens/treasure/TreasureReadyScreen.js
src/screens/treasure/TreasureHuntScreen.js
src/screens/treasure/SonarHuntScreen.js
src/screens/treasure/SonarDisplay.js
src/screens/treasure/SonarHuntScreen.styles.js
src/screens/treasure/FogHuntScreen.js
src/screens/treasure/TreasureFoundScreen.js
src/screens/treasure/TreasureResultScreen.js
src/utils/sonarSignalEngine.js
src/utils/treasureSessionStore.js
src/utils/treasureSafetyStore.js
src/utils/treasureRules.js
src/utils/xpRules.js
src/utils/playerProgressStore.js
src/utils/pendingResultStore.js
```

## XP

| Nivå | Fullføring | Per skatt | Maks normal XP |
|---|---:|---:|---:|
| Enkel | 60 | 10 | 100 |
| Medium | 120 | 12 | 216 |
| Vanskelig | 220 | 15 | 400 |

Ordinær slutt-XP påvirkes ikke av modus.

Sonar-småsignal med XP er ikke implementert. Senere XP-småsignal skal ikke være garantert i hvert spill, og skal ikke kunne trigges av løping, meter eller risting.

## Web-status

De midlertidige web-testkoblingene er fjernet fra Tåkekart/Fog:

- ett web-funn fullfører ikke lenger hele jakten
- Tåkekart viser ikke `Testmodus` eller gul `Åpne skatten`-knapp på web
- testkontrollen skal ikke gjeninnføres før v3 og etter at skattejakt er merget

Sonar har fortsatt raskt testtempo via `sonarSignalEngine.js` for designarbeid.

## Teststatus

Web-flyten er brukt til visuell testing. Haptics må testes i dev build på fysisk telefon.

Test spesielt:

- TreasureSetup viser `lite/middels/stort område` på vanskelighetsgrad
- fade etter nedtelling
- grønn `Sonar aktiv`-chip etter start
- Sonar roterer mens skjermen er aktiv
- Sonar bygger raskt til `STOPP!`
- `STOPP!` vises i hovedområdet, ikke nederst
- startpanelet er borte etter start
- `Åpne skatten` vises først når signalet er låst
- vanlig Sonar-funn åpner ikke ny skjerm
- siste skatt går direkte til XP/resultat
- Tåkekart ikke viser web-testknapp
- korrekt XP én gang
- retur til Home uten resultat-loop
- haptics på telefon

## Lokale brukerendringer

Disse filene skal ikke overskrives uten eksplisitt beskjed:

```text
assets/images/treasure/treasure-chest.png
assets/images/treasure/treasure-setup-header.png
assets/images/treasure/treasure-setup-header.webp
package.json
package-lock.json
```

## Bevisst utsatt

- instruksjonsbilde/animasjon på nedtellingsskjermen
- ekte GPS og GPS-lagjakt
- accelerometer/skritt/gyro
- Sonar-lyd/pip
- global lyd-/haptikkinnstilling
- Sonar-småsignal med XP
- innlogging, venner, varsler og backend-synk
- eksplisitt `mode`-prop til Home

## Neste arbeidsområde

```text
Sonar: test signalmotor, haptics og timing.
```

Start neste chat med `docs/chat-handoff.md` og `docs/sonar-roadmap.md`.
