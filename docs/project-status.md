# Prosjektstatus: Live Rebus / Sonar

Sist oppdatert på branch:

```text
sonar
```

## Sammendrag

Sonar er nå implementert som en egen, profesjonell skattejaktvariant på web og native. Den har egen radarbasert spillskjerm, tydelig Sonar-design i oppsettet og egen cyan visning av aktiv jakt på Home. Navigasjon, XP-regler og vanskelighetsregler er fortsatt de samme som for vanlig skattejakt.

Dette er fortsatt en prototype. GPS, lyd, autoritativ progresjon og faktisk XP-utbetaling er ikke ferdig koblet.

## Aktiv branch og avgrensning

```text
sonar
```

Sonar-arbeid skal gjøres på denne branchen. Ikke skriv direkte til:

```text
main
skattejakt-spillet
```

Brukeren hadde ved siste kontroll lokale endringer i headerbilder, `package.json` og `package-lock.json`. Disse skal ikke overskrives automatisk.

## Gjeldende flyt

```text
Home
→ TreasureSetup
→ Safety
→ TreasureReady
→ TreasureHunt
→ TreasureFound
→ TreasureResult
```

## Implementert

### Oppsett

- navn på jakt
- Tåkekart eller Sonar
- alene eller med venner
- opptil fem telefonkontakter
- Enkel, Medium eller Vanskelig
- profesjonell valgt tilstand for begge moduser

### Sonar-preview i oppsettet

Når Sonar er valgt:

- rund radar
- cyan kant og glød
- roterende sweep
- pulserende radar-ring
- cyan valgt markering

Når Tåkekart er valgt:

- sølvgrå valgt kant
- svak glød
- langsom tåke-pust
- diskrete tåkelag

### Sonar-spillskjerm

Filer:

```text
src/screens/treasure/SonarHuntScreen.js
src/screens/treasure/SonarHuntScreen.styles.js
```

Inneholder:

- stor rund radar
- spiller i sentrum
- roterende sweep
- pulserende signalring
- signalpunkter uten presis skattmarkør
- skatter, tid og signalstyrke
- simulert avstand
- avstandsbasert signaltekst
- åpning ved 5 meter
- avslutt-dialog

### Web og native

På `sonar` re-eksporterer begge disse Sonar-skjermen:

```text
src/screens/treasure/TreasureHuntScreen.js
src/screens/treasure/TreasureHuntScreen.web.js
```

Dette betyr at Sonar-branchen er dedikert til Sonar-visningen. Tåkekartets egne spillfiler på `skattejakt-spillet` er ikke endret.

### Aktiv jakt på Home

Filer:

```text
src/navigation/AppNavigator.js
src/components/home/HomeUpcomingCard.js
```

Aktiv Sonar-jakt viser:

- cyan accent
- radar-symbol
- cyan glød
- `Sonar · X av Y skatter funnet`
- cyan `Fortsett`-knapp

Modusen gjenkjennes foreløpig via prefikset `Sonar · ` i jaktnavnet. Dette bør senere erstattes av eksplisitt `mode`-data.

## XP

Sonar og Tåkekart har identiske XP-regler. Modus påvirker ikke XP.

| Nivå | Fullføring | Per skatt | Maks normal XP |
|---|---:|---:|---:|
| Enkel | 60 | 10 | 100 |
| Medium | 120 | 12 | 216 |
| Vanskelig | 220 | 15 | 400 |

Kilde:

```text
src/utils/xpRules.js
```

Vinnerbonus: 25 XP. Delt førsteplass: 15 XP hver.

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

## Nye og endrede filer

```text
src/screens/treasure/SonarHuntScreen.js
src/screens/treasure/SonarHuntScreen.styles.js
src/screens/treasure/TreasureHuntScreen.js
src/screens/treasure/TreasureHuntScreen.web.js
src/screens/treasure/TreasureSetupScreen.js
src/components/home/HomeUpcomingCard.js
```

## Viktige commits

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

## Kritiske tekniske hull

- avstand er simulert
- ingen ekte GPS
- ingen lydmotor eller bip
- kalibrering er kun visuell
- lokal `foundCount` er ikke koblet til aktiv jakt
- `TreasureFound` går for tidlig til resultat
- navigatoren sender hardkodet `xp={120}`
- navigatoren sender hardkodet `elapsedSeconds={420}`
- faktisk vanskelighetsgrad og fullføringsstatus er ikke komplett koblet til resultatet
- XP-reglene er riktige, men faktisk utbetaling må kobles og sikres mot dobbel utbetaling
- aktiv jakt og XP er ikke persistent
- Home-modus bruker tittel-prefiks i stedet for eksplisitt `mode`
- fysisk enhet og redusert bevegelse må testes

## Prioritert videre arbeid

1. Gjør `activeTreasure` til autoritativ spillstate.
2. Koble faktisk funn og tid fra Sonar til navigatoren.
3. Returner fra `TreasureFound` til jakten frem til siste skatt.
4. Beregn resultat med `calculateTreasureXp`.
5. Utbetal XP nøyaktig én gang.
6. Send `mode` eksplisitt til Home-kortet.
7. Legg til GPS.
8. Legg til Sonar-lyd og reelle bip-intervaller.

## Testmatrise

### Web

```bash
git switch sonar
git pull origin sonar
npx expo start --web -c
```

Test:

- 320, 375, 390, 393 og 430 px
- Sonar- og Tåkekart-valg i oppsettet
- begge aktive tilstander
- Sonar-radar og animasjoner
- start Sonar-jakt
- aktiv Sonar-jakt på Home
- `Fortsett`
- alle vanskelighetsgrader
- ingen horisontal scrolling

### Fysisk enhet

- safe area
- animasjonsytelse
- redusert bevegelse
- kontaktrettigheter
- GPS når implementert
- lyd når implementert

## Dokumentasjonsansvar

Disse skal holdes synkronisert:

```text
README.md
docs/project-status.md
docs/branch-structure.md
docs/treasure-hunt-flow.md
docs/chat-handoff.md
```
