# Live Rebus

Expo/React Native-app for rebusløp, skattejakt og Sonar på iOS, Android og web.

## Aktiv arbeidsbranch nå

```text
design/sonar-setup-card-scale
```

Denne branchen er aktiv arbeidsbranch for Sonar på Home og Sonar setup. Den går mot åpen PR #2:

```text
base: treasure-setup-cleanup
head: design/sonar-setup-card-scale
PR: https://github.com/tomhaugstulen-star/live-rebus/pull/2
```

Ikke merge PR #2 før brukeren eksplisitt ber om det.

## Ikke endre uten eksplisitt avtale

```text
main
sonar
skattejakt-spillet
design-sonar-ui
treasure-setup-cleanup
package.json
package-lock.json
```

Pakker skal ikke endres uten eksplisitt avtale.

## Start for neste økt

```bash
git fetch --all --prune
git switch design/sonar-setup-card-scale
git pull origin design/sonar-setup-card-scale
git status --short
npx expo start --dev-client --clear
```

Les først:

```text
docs/chat-handoff.md
docs/project-status.md
docs/branch-structure.md
```

## Nåstatus

Home har nå tre valg:

```text
Rebusløp
Skattejakt
Sonar
```

Sonar-kortet leder til Sonar setup. Skattejakt og Rebusløp skal ikke påvirkes av videre Sonar-polish uten eksplisitt avtale.

## Sonar setup: gjeldende retning

Nåværende setup har:

```text
Sonar
Velg spillmodus
[Venn] [Venner]
```

Brukeren har avklart at den store radaren ikke hører hjemme på setup-skjermen. Setup skal være valg/klargjøring. Selve spill-skjermen skal eie radaropplevelsen.

Nåværende problemområde:

```text
Home → Sonar setup → Sikkerhet → Sonar-spill
```

Denne visuelle kjeden føles ikke helhetlig nok. Videre arbeid bør derfor handle om samlet Sonar-retning fra Home til setup og videre til sikkerhet/spill, ikke bare små stylingjusteringer.

## Viktige Sonar-filer

```text
src/screens/home/HomeScreen.js
src/components/home/HomeChallengeCard.js
src/screens/treasure/TreasureSetupScreen.js
src/components/treasure/TreasureSetupHeader.js
src/components/treasure/TreasureSetupOptions.js
src/components/treasure/SonarSetupRadar.js
src/navigation/AppNavigator.js
```

Sonar assets:

```text
assets/images/treasure/sonar-setup-background.webp
assets/images/treasure/sonar-player-solo.webp
assets/images/treasure/sonar-player-team.webp
```

`SonarSetupRadar.js` finnes på branchen, men brukes ikke i Sonar setup etter siste designavklaring. Den kan enten brukes senere på en riktig skjerm eller fjernes hvis den ikke skal brukes.

## Låste spillregler

```text
Alle spill krever internett/mobildata.
Offline/P2P/Bluetooth er ikke kjerneflyt.
Skattene genereres først fra valgt område.
Bare én aktiv skatt / ett aktivt signal om gangen.
Neste signal åpnes først når forrige funn er ferdig registrert.
```

Dette gjelder også senere XP-bonusfunn: ett aktivt bonusfunn, én registrering, én utbetaling.

## Gjeldende skattejaktflyt

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

## XP

| Nivå | Fullføring | Per skatt | Maks normal XP |
|---|---:|---:|---:|
| Enkel | 60 | 10 | 100 |
| Medium | 120 | 12 | 216 |
| Vanskelig | 220 | 15 | 400 |

Ordinær slutt-XP påvirkes ikke av modus. Sonar-småsignal med XP er ikke implementert og skal ikke kunne farmes.

## Bevisst utsatt

- samlet visuell retning for Sonar fra Home til setup/sikkerhet/spill
- egen Skattejakt-bakgrunn på Home/setup
- instruksjonsbilde/animasjon på nedtellingsskjermen
- ekte GPS og GPS-lagjakt
- accelerometer/skritt/gyro
- Sonar-lyd/pip
- global lyd-/haptikkinnstilling
- Sonar-småsignal med XP
- innlogging, venner, varsler og backend-synk

## Dokumentasjon

- [`docs/chat-handoff.md`](docs/chat-handoff.md) – start her i neste chat
- [`docs/project-status.md`](docs/project-status.md) – nåstatus og testpunkter
- [`docs/branch-structure.md`](docs/branch-structure.md) – brancher og arbeidsmåte
- [`docs/sonar-roadmap.md`](docs/sonar-roadmap.md) – Sonar-retning og videre plan
- [`docs/treasure-hunt-flow.md`](docs/treasure-hunt-flow.md) – navigasjon, session, web-test og XP
- [`docs/repo-cleanup-audit.md`](docs/repo-cleanup-audit.md) – historikk for gjennomført opprydding
