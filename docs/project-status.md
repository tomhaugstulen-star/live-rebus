# Prosjektstatus: Skattejakt ferdigstilt

Aktiv branch:

```text
sonar
```

## Nåstatus

Sonar- og Tåkekart-flyten er funksjonelt ferdigstilt, testet og ryddet. Oppryddingen stoppes her. Neste arbeidsområde er Live Rebus.

Aktiv flyt:

```text
Home
→ TreasureSetup
→ Safety
→ TreasureReady
→ TreasureHunt
→ SonarHuntScreen eller FogHuntScreen
→ TreasureFound
→ tilbake til jakt mens skatter gjenstår
→ TreasureResult etter siste skatt
```

`AreaCheck` er ikke lenger en route eller fil. `TreasureHuntScreen.web.js` er fjernet; web og native bruker samme `TreasureHuntScreen.js`.

## Sikkerhet og session

- hver ny eller returnerende jakt krever en fersk sikkerhetsbekreftelse
- `SafetyScreen` nullstiller tidligere godkjenning ved fokus
- `TreasureReadyScreen` avviser inngang uten fersk bekreftelse
- manglende bekreftelse bygger stacken `Home → TreasureSetup → Safety`
- Sonar og Tåkekart bruker samme `treasureSessionStore`
- spill starter manuelt; timer og signal står stille før start
- navigatoren eier avslutning og session-reset
- avbrutt avslutningsdialog lar jakten fortsette
- bekreftet avslutning fjerner aktiv jakt fra Home
- XP utbetales én gang

## Implementert og verifisert

- riktig routing mellom Sonar og Tåkekart
- egne spillskjermer for begge moduser
- delt modus, vanskelighet, funn, total, starttid og XP-status
- fokusstyrt timer
- Sonar Reduce Motion og kalibrering
- flere skatter før resultat
- faktisk resultatdata
- samme XP-regler for begge moduser
- aktiv Sonar-jakt på Home
- obligatorisk sikkerhetsbekreftelse
- avslutningsflyt testet for både avbryt og bekreft
- ny jakt starter som ny session

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
src/screens/treasure/SonarHuntScreen.styles.js
src/screens/treasure/FogHuntScreen.js
src/screens/treasure/TreasureFoundScreen.js
src/screens/treasure/TreasureResultScreen.js
src/utils/treasureSessionStore.js
src/utils/treasureSafetyStore.js
src/utils/treasureRules.js
src/utils/xpRules.js
src/utils/playerProgressStore.js
```

## XP

| Nivå | Fullføring | Per skatt | Maks normal XP |
|---|---:|---:|---:|
| Enkel | 60 | 10 | 100 |
| Medium | 120 | 12 | 216 |
| Vanskelig | 220 | 15 | 400 |

Modus påvirker ikke XP.

## Avsluttende opprydding

```text
c976f7c  Remove obsolete area check route
193916d  Delete obsolete area check screen
a808b57  Remove unused catch parameter
ae9dcf9  Remove duplicate sonar session reset
6ad0059  Update active treasure hunt documentation
```

Tidligere opprydding omfatter også `TreasureHuntScreen.web.js`, `HomeProgressCard.js`, TreasureSetup-headeren, Safety og Fog-avslutningen. Se `docs/repo-cleanup-audit.md`.

## Lokale brukerendringer

Disse filene kan ha lokale endringer og skal ikke overskrives uten eksplisitt beskjed:

```text
assets/images/treasure/treasure-chest.png
assets/images/treasure/treasure-setup-header.png
assets/images/treasure/treasure-setup-header.webp
package.json
package-lock.json
```

## Bevisst utsatt

- mulig opprydding av ubrukte Home-props
- eventuell oppdeling av `TreasureSetupScreen.js`
- eksplisitt `mode`-prop til Home
- ekte GPS, Sonar-lyd, haptikk, persistent lagring og backend

Dette er ikke blokkerende for Live Rebus.

## Neste arbeidsområde

```text
Live Rebus
```

Start neste chat med `docs/chat-handoff.md`. Arbeidsmåten er dokumentert i `docs/branch-structure.md`.
