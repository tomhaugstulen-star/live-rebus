# Live Rebus

Expo/React Native-app for rebusløp og skattejakt på iOS, Android og web.

Sist oppdatert for overtakelse: 2026-06-20.

## Aktiv arbeidsbranch nå

```text
home-reconstruction
```

`home-reconstruction` er fungerende branch og skal brukes videre. Brukeren bekreftet at appen starter rent i dev-client etter siste stabilisering.

Start neste chat med:

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

## Nåværende stabile appstatus

```text
Appen starter rent.
HomeScreen er stabil baseline med 2 kort:
- Rebusløp
- Skattejakt
```

Siste trygge reparasjoner som skal beholdes:

```text
- expo-av er fjernet fra RebusGameScreen.js og skal ikke gjeninnføres.
- HomeChallengeCard viser nå riktig ikon for Rebusløp og Skattejakt.
- Aktiv skattejakt på Home bruker trygg tittel: "Aktiv skattejakt".
```

Viktige commits i siste stabiliseringsrunde:

```text
c35e2944226a835b9d9729cbaf150c7ea8704e69  Rollback home treasure routing changes
22ae0bee3d0df66aed811ccb38dd2ac71678cb33  Fix home challenge card icon mapping
2cf52dd1f64f4666f2e0607da024feb94719d28c  Use safe active treasure home title
```

## Viktig: hva som IKKE er implementert

Det ble diskutert å gjøre HomeScreen om til 3 kort, men dette ble stoppet før kodeendring etter brukerens `nei`.

Ikke anta at dette er gjort. Nåværende HomeScreen har fortsatt 2 kort.

```text
Ikke implementert ennå:
- HomeScreen med 3 kort: Rebusløp / Tåkejakt / Sonar
- Sonar-oppsettside med Spill alene / Spill med venner / Telefonbok
```

## Neste ønskede retning fra bruker

Brukeren ønsker nå en kontrollert todelt endring. Ikke gjør alt i én commit.

### Steg 1: HomeScreen alene

Første neste kodeendring, hvis brukeren bekrefter, skal være kun:

```text
HomeScreen får 3 kort:
- Rebusløp
- Tåkejakt
- Sonar
```

Avgrensning for steg 1:

```text
- Endre HomeScreen/UI-routing kun så kortene finnes.
- Ikke bygg ny Sonar-oppsettside samtidig.
- Ikke endre TreasureSetup-layout samtidig.
- Ikke legg inn ny animasjon.
- Test at appen starter rent etterpå.
```

### Steg 2: Sonar-oppsett etter vellykket test

Når steg 1 er testet og godkjent, kan neste separate steg være:

```text
Trykk på Sonar → Sonar-oppsett
Valg:
- Spill alene
- Spill med venner
- Telefonbok når venner er valgt
- Gå videre
Deretter: Safety-skjermen
```

Dette skal ikke bygges samtidig med HomeScreen 3-kort-endringen.

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
skattejakt-spill
neste-design
sikkerhet
```

## Kritiske arbeidsregler for neste chat

```text
1. Svar på norsk.
2. Bruk kun home-reconstruction.
3. Gjør én liten endring om gangen.
4. Ikke gjør HomeScreen 3 kort og Sonar-oppsett i samme runde.
5. Ikke gjør package-endringer uten eksplisitt avtale.
6. Ikke slett filer eller brancher uten eksplisitt avtale.
7. Ikke gjeninnfør expo-av.
8. Etter kodeendring: oppgi commit SHA og testkommando.
```

## HomeScreen-status

Gjeldende filer:

```text
src/screens/home/HomeScreen.js
src/screens/home/HomeScreen.styles.js
src/components/home/HomeChallengeCard.js
src/components/home/HomeUpcomingCard.js
assets/images/home/**
```

Nåværende HomeScreen er stabil baseline og har 2 kort. Dette skal ikke blandes med dynamisk HomeScreen ved andre innlogging.

Dynamisk HomeScreen ved andre innlogging er fortsatt utsatt.

## Skattejakt-oppsett: nåværende status

Gjeldende flyt:

```text
Home
→ TreasureSetup
→ Safety
→ TreasureReady
→ TreasureHunt
→ TreasureFound
→ TreasureResult
```

`TreasureSetupScreen.js` er tilbake til tidligere stabil variant etter rollback. Skjermen bruker fortsatt eksisterende Tåkejakt/Sonar-oppsettlogikk. Ikke gjør stor refaktor her før HomeScreen 3-kort-steg er testet.

## Ikke overskriv uten eksplisitt beskjed

```text
assets/images/treasure/treasure-chest.png
assets/images/treasure/treasure-setup-header.png
assets/images/treasure/treasure-setup-header.webp
package.json
package-lock.json
```

Pakker skal ikke endres uten eksplisitt avtale.

## Låste spillregler

```text
Alle spill krever internett/mobildata.
Offline/P2P/Bluetooth er ikke kjerneflyt.
Skattene genereres først fra valgt område.
Bare én aktiv skatt / ett aktivt signal om gangen.
Neste signal åpnes først når forrige funn er ferdig registrert.
```

Dette gjelder også senere XP-bonusfunn: ett aktivt bonusfunn, én registrering, én utbetaling.

## TreasureSetup og Sonar-produktretning

Sonar er standard app-generert signaljakt, ikke GPS-jakt. GPS kan senere bli avansert modus for store uteområder.

Område og Sonar-synlighet:

```text
Enkel:     4 skatter  · ca. 50 m diameter  · 2 m Sonar-synlighet
Medium:    8 skatter  · ca. 80 m diameter  · 2,5 m Sonar-synlighet
Vanskelig: 12 skatter · ca. 150 m diameter · 3 m Sonar-synlighet
```

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
- Sonar-oppsettside med telefonbok, inntil HomeScreen 3-kort er testet
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
