# Prosjektstatus: Sonar signaljakt og skattejaktflyt

Aktiv branch:

```text
design-sonar-ui
```

## Nåstatus

Skattejaktgrunnlaget med Sonar og Tåkekart er stabilisert. Aktivt arbeid på denne branchen er nå videre visuell justering av TreasureSetup, etter at navnefeltet ble fjernet og infokortet for vanskelighetsgrad ble lagt inn.

Live Rebus har en låst produktregel: spill krever internett/mobildata. Dette gjelder både alenespill og spill med venner.

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

Vanskelighetsgrad styrer antall skatter, anbefalt spilleområde og Sonar-synlighet foran spilleren:

```text
Enkel:     4 skatter  · ca. 50 m diameter  · 2 m Sonar-synlighet
Medium:    8 skatter  · ca. 80 m diameter  · 2,5 m Sonar-synlighet
Vanskelig: 12 skatter · ca. 150 m diameter · 3 m Sonar-synlighet
```

Dette ligger i `src/utils/treasureRules.js` som `areaLabel`, `recommendedAreaDiameterMeters` og `sonarForwardVisibilityMeters`. Sonar-skjermen skal fortsatt ikke vise meter, kart eller GPS-avstand som hovedspråk.

## TreasureSetup nå

- navnefeltet er fjernet
- appen skal ikke generere kunstige jaktnavn
- setup sender bare `variant`, `players`, `difficulty` og eventuelle inviterte kontakter videre
- eget infokort viser valgt vanskelighetsgrad
- kortene for vanskelighetsgrad holdes enkle: nivå + antall skatter
- trykkflater skal holdes over 44 px
- fontstørrelser og linjeavstand skal ikke presses ned for å få plass

Nåværende relevante filer:

```text
src/screens/treasure/TreasureSetupScreen.js
src/screens/treasure/TreasureSetupScreen.styles.js
src/components/treasure/TreasureSetupOptions.js
src/navigation/navigationConfig.js
src/navigation/useAppNavigatorState.js
src/utils/treasureSessionStore.js
src/utils/treasureRules.js
```

Neste chat skal fortsette visuell justering av denne siden. Det er greit at den trenger flere endringer.

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
- TreasureSetup har ikke lenger navnefelt
- TreasureSetup viser eget infokort for valgt vanskelighetsgrad

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
63067b1  Remove treasure name field and add difficulty info
f2fb5f7  Redesign treasure setup spacing
0bb44bb  Remove default treasure name config
d3dbab5  Stop generating treasure names
d840e8d  Stop defaulting treasure session name
a2166aa  Add sonar visibility distance per difficulty
f589bf0  Adjust treasure area diameters
8a4ebd1  Document single active treasure rule
```

## XP

| Nivå | Fullføring | Per skatt | Maks normal XP |
|---|---:|---:|---:|
| Enkel | 60 | 10 | 100 |
| Medium | 120 | 12 | 216 |
| Vanskelig | 220 | 15 | 400 |

Ordinær slutt-XP påvirkes ikke av modus.

Sonar-småsignal med XP er ikke implementert. Senere XP-småsignal skal ikke være garantert i hvert spill, og skal ikke kunne trigges av løping, meter eller risting.

## Teststatus

Web-flyten er brukt til visuell testing. Haptics må testes i dev build på fysisk telefon.

Test spesielt:

- TreasureSetup har ikke navnefelt
- TreasureSetup viser område- og Sonar-info for valgt vanskelighetsgrad
- TreasureSetup har trykkflater på minst 44 px
- fontstørrelser og linjeavstand er lesbare på mobilbredder
- fade etter nedtelling
- grønn `Sonar aktiv`-chip etter start
- Sonar roterer mens skjermen er aktiv
- Sonar bygger raskt til `STOPP!`
- `STOPP!` vises i hovedområdet, ikke nederst
- startpanelet er borte etter start
- `Åpne skatten` vises først når signalet er låst
- vanlig Sonar-funn åpner ikke ny skjerm
- siste skatt går direkte til XP/resultat
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

- ferdig visuell justering av TreasureSetup
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
Fortsett visuell justering av TreasureSetup.
```

Start neste chat med:

```text
docs/chat-handoff.md
docs/project-status.md
docs/sonar-roadmap.md
docs/treasure-hunt-flow.md
docs/branch-structure.md
```
