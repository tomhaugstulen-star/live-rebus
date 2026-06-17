# Prosjektstatus: Skattejakt stabilisert

Aktiv branch:

```text
sonar
```

## Nåstatus

Sonar- og Tåkekart-flyten er funksjonelt ferdigstilt. Aktiv sluttflyt er:

```text
Home
→ TreasureSetup
→ Safety
→ TreasureReady
→ nedtelling
→ TreasureHunt
→ SonarHuntScreen eller FogHuntScreen
→ TreasureFound
→ tilbake til jakt mens skatter gjenstår
→ TreasureResult/XP direkte etter siste skatt
→ Home når resultatet lukkes
```

Det skal ikke være et synlig Home-mellomsteg før XP/resultatskjermen.

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
- web og mobil registrerer nå én skatt per funn
- Tåkekart sin gule web-testknapp er deaktivert

## Viktige nylige commits

```text
c23780a  Remove web treasure auto-completion shortcut
5f4fb53  Hide fog treasure test control on web
b3f8e3c  Prevent presented treasure result from reopening
8fbf94d  Mark treasure result as presented on open
f68a120  Remove obsolete treasure result routing from Home
fd2ba8b  Add victory haptics to treasure result
e8939c1  Add fade-in transition to treasure result
bd9bf27  Slow down treasure result fade-in
ebf3e73  Fade in treasure game after countdown
a514543  Restore direct treasure result flow
24f8816  Update handoff after treasure result flow changes
```

## Viktige filer

```text
src/navigation/AppNavigator.js
src/screens/home/HomeScreen.js
src/components/home/HomeUpcomingCard.js
src/screens/treasure/TreasureSetupScreen.js
src/screens/treasure/SafetyScreen.js
src/screens/treasure/TreasureReadyScreen.js
src/screens/treasure/TreasureHuntScreen.js
src/screens/treasure/SonarHuntScreen.js
src/screens/treasure/FogHuntScreen.js
src/screens/treasure/TreasureFoundScreen.js
src/screens/treasure/TreasureResultScreen.js
src/screens/treasure/TreasureResultScreen.styles.js
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

Modus påvirker ikke XP.

## Web-status

De midlertidige web-testkoblingene er fjernet fra aktiv bruk:

- ett web-funn fullfører ikke lenger hele jakten
- Tåkekart viser ikke «Testmodus» eller gul «Åpne skatten»-knapp på web
- testkontrollen skal ikke gjeninnføres før v3 og etter at skattejakt er merget

## Teststatus

Web-flyten er brukt til visuell testing. Haptics må testes i dev build på fysisk telefon.

Test spesielt:

- fade etter nedtelling
- at web-funn øker telleren med én
- at Tåkekart ikke viser testknappen på web
- direkte overgang fra siste skatt til XP/resultat
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

- web-testknapp for direkte åpning av skatt; tidligst v3 etter merge
- ekte GPS og faktisk distanse
- pipelyd i nedtelling
- global lyd-/haptikkinnstilling
- persistent lagring
- backend
- eksplisitt `mode`-prop til Home

## Neste arbeidsområde

```text
Live Rebus
```

Start neste chat med `docs/chat-handoff.md`.
