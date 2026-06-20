# Live Rebus

Expo/React Native-app for rebusløp og skattejakt på iOS, Android og web.

## Aktiv arbeidsbranch nå

```text
home-reconstruction
```

`home-reconstruction` er fungerende branch og skal brukes videre. Den er bekreftet fungerende på iPhone/dev-client.

Neste arbeidsområde:

```text
Skattejakt oppsett
```

Dynamisk HomeScreen ved andre innlogging er utsatt.

## Ikke bruk nå

```text
homescreen-clean
skattejakt-oppsett
```

Forklaring:

- `homescreen-clean` ble laget som ren HomeScreen-testbranch, men ga runtime-feil og mangler kontekst fra `home-reconstruction`.
- `skattejakt-oppsett` var tidligere arbeidsbranch, men skal ikke brukes nå.

## Brancher som ikke skal endres/merges uten eksplisitt avtale

```text
main
homescreen-clean
skattejakt-oppsett
design-sonar-ui
sonar
skattejakt-spillet
```

## Start for neste chat

```bash
git fetch origin
git switch home-reconstruction
git reset --hard origin/home-reconstruction
git branch --show-current
git status --short
npx expo start --dev-client --clear
```

Forventet branch:

```text
home-reconstruction
```

Les først:

```text
docs/chat-handoff.md
docs/project-status.md
docs/branch-structure.md
docs/V2_STATUS.md
```

## Neste konkrete steg

Før repo-endringer:

```text
1. Gå Home → Skattejakt i appen på iPhone.
2. Be bruker sende skjermbilde av første Skattejakt-oppsett-skjerm.
3. Foreslå én konkret justering.
4. Vent på godkjenning før kodeendring.
```

## Skattejakt-oppsett: ønsket retning

Bruker ønsker mer dynamisk og plassbesparende oppsett:

```text
Start: Tåkejakt + Sonar vises.
Når Sonar velges: Tåkejakt forsvinner og Sonar flyttes opp.
Deretter vises: Hvem spiller du med?
Valg: Alene / Med venner.
```

Venne-/telefonbokflyt kommer senere. Ikke start med animasjon. Første steg skal være layoutlogikk uten ekstra risiko.

## HomeScreen-status

HomeScreen-redesignet på `home-reconstruction` skal beholdes.

Ikke start dynamisk HomeScreen nå. Det krever senere avklaring av hva “andre innlogging” betyr.

Viktige Home-filer:

```text
src/screens/home/HomeScreen.js
src/screens/home/HomeScreen.styles.js
src/components/home/HomeChallengeCard.js
src/components/home/HomeUpcomingCard.js
assets/images/home/**
```

## Ikke overskriv uten eksplisitt beskjed

```text
assets/images/treasure/treasure-chest.png
assets/images/treasure/treasure-setup-header.png
assets/images/treasure/treasure-setup-header.webp
package.json
package-lock.json
```

Pakker skal ikke endres uten eksplisitt avtale. Ikke gjeninnfør `expo-av` uten eksplisitt avtale.

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

## TreasureSetup og Sonar

TreasureSetup-status fra tidligere arbeid:

- navnefeltet er fjernet
- appen skal ikke generere kunstige jaktnavn
- viser spillemodus, hvem spiller, vanskelighetsgrad, infokort og `Gå videre`

Område og Sonar-synlighet:

```text
Enkel:     4 skatter  · ca. 50 m diameter  · 2 m Sonar-synlighet
Medium:    8 skatter  · ca. 80 m diameter  · 2,5 m Sonar-synlighet
Vanskelig: 12 skatter · ca. 150 m diameter · 3 m Sonar-synlighet
```

Sonar er standard app-generert signaljakt, ikke GPS-jakt. GPS kan senere bli avansert modus for store uteområder.

## XP

| Nivå | Fullføring | Per skatt | Maks normal XP |
|---|---:|---:|---:|
| Enkel | 60 | 10 | 100 |
| Medium | 120 | 12 | 216 |
| Vanskelig | 220 | 15 | 400 |

Ordinær slutt-XP påvirkes ikke av modus. Sonar-småsignal med XP er ikke implementert og skal ikke kunne farmes.

## Bevisst utsatt

- dynamisk HomeScreen ved andre innlogging
- ferdig Home-polish
- venne-/telefonbokflyt
- animasjon i Skattejakt-oppsett
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
- [`docs/V2_STATUS.md`](docs/V2_STATUS.md) – V2-status og avgrensninger
- [`docs/sonar-roadmap.md`](docs/sonar-roadmap.md) – Sonar-retning og videre plan
- [`docs/treasure-hunt-flow.md`](docs/treasure-hunt-flow.md) – navigasjon, session, web-test og XP
- [`docs/repo-cleanup-audit.md`](docs/repo-cleanup-audit.md) – historikk for gjennomført opprydding
