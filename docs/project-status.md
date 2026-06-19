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

Begrunnelse:

- appen skal uansett ha innlogging
- venner, invitasjoner og varsler krever nett
- funn, lagstatus, progresjon, XP og resultat bør bruke én stabil online-modell
- P2P/Bluetooth gir mer kode, mer testing og større risiko for ustabile meldinger
- det er bedre å kreve nett enn å gi en halvveis spillopplevelse

Alenespill og vennespill skal derfor bruke samme grunnmodell. Vennespill legger bare på venner, varsler og felles status.

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
6209147  Update sonar signal language
9c7b16a  Move sonar signal alert into main view
fbc901d  Update sonar active hunt layout
39cdad0  Lock online requirement for gameplay
```

Tidligere Sonar-commits:

```text
179d62e  Add lightweight animated sonar display
c800b04  Refine sonar screen around signal levels
e7dd1e1  Polish lightweight sonar visuals
3553b54  Keep sonar sweep constant and show nearby target
ef4db15  Style nearby sonar target
3785dfe  Add escalating sonar vibration feedback
a8a3f85  Add sonar found burst animation
7e06c73  Style sonar found burst
1947771  Play found sequence before next sonar target
821ab4b  Keep sonar on screen after treasure found
4011465  Speed up sonar test progression
4821bf5  Add generated sonar signal engine
170d678  Use generated sonar signal engine
28a7fb3  Document sonar product direction
e550032  Refresh README for generated sonar direction
031cc30  Update chat handoff for generated sonar
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
