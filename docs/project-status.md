# Prosjektstatus

Sist oppdatert: 2026-06-20.

## Aktiv arbeidsbranch

```text
home-reconstruction
```

`home-reconstruction` er fungerende branch per siste iPhone/dev-client-test. Brukeren bekreftet at appen starter rent etter siste stabilisering.

Ikke bruk nå:

```text
homescreen-clean
skattejakt-oppsett
```

`homescreen-clean` ble opprettet som ren HomeScreen-testbranch, men ga runtime-feil og mangler kontekst fra `home-reconstruction`. Den skal ignoreres inntil videre.

## Nåstatus

Siste bekreftede status:

- `home-reconstruction` fungerer på iPhone/dev-client.
- Appen starter rent.
- HomeScreen-redesign ligger på `home-reconstruction` og skal beholdes som baseline.
- Nåværende HomeScreen har 2 kort: `Rebusløp` og `Skattejakt`.
- `expo-av` er fjernet og skal ikke gjeninnføres uten eksplisitt avtale.
- Home-kortene har riktig ikon etter siste fiks.
- Aktiv skattejakt har trygg Home-tittel: `Aktiv skattejakt`.

## Siste viktige commits

```text
c35e2944226a835b9d9729cbaf150c7ea8704e69  Rollback home treasure routing changes
22ae0bee3d0df66aed811ccb38dd2ac71678cb33  Fix home challenge card icon mapping
2cf52dd1f64f4666f2e0607da024feb94719d28c  Use safe active treasure home title
70d1926cc3488a83f420cd50e66291a6c5cbcb08  Update handoff documentation for next chat
65c83d009473da99ce5dfd41cd0d1dfff2c7b5e4  Update next chat handoff
```

## Viktig: stoppet arbeid

Det ble diskutert å implementere HomeScreen 3 kort og Sonar-oppsett, men brukeren stoppet dette før kodeendring med beskjed om at det ikke skal gjøres alt i én gang.

Status:

```text
HomeScreen 3 kort er IKKE implementert.
Sonar-oppsettside er IKKE implementert.
```

Ikke anta at dette finnes i kodebasen.

## Neste arbeidsområde: stegvis Home/Sonar-flyt

Neste arbeid skal deles i to separate steg.

### Steg 1: HomeScreen med 3 kort

Første kodeendring, hvis bruker bekrefter, skal være kun:

```text
HomeScreen får 3 kort:
- Rebusløp
- Tåkejakt
- Sonar
```

Avgrensning:

```text
- Ikke endre Sonar-oppsettside samtidig.
- Ikke endre TreasureSetup-layout samtidig.
- Ikke legg inn ny animasjon.
- Ikke gjør package-endringer.
- Hold endringen liten og testbar.
```

Test etter steg 1:

```text
1. App starter rent.
2. HomeScreen viser 3 kort.
3. Rebusløp åpner RebusSetup.
4. Tåkejakt og Sonar har foreløpig trygg routing uten ny oppsettside.
5. Ingen runtime-feil.
```

### Steg 2: Sonar-oppsett

Bare etter godkjent test av steg 1:

```text
Trykk Sonar → Sonar-oppsett
Valg:
- Spill alene
- Spill med venner
- Telefonbok når venner er valgt
- Gå videre
Deretter: Safety-skjermen
```

Dette er egen endring og skal ikke kombineres med HomeScreen 3-kort-endringen.

## Kommando for lokal oppstart

```bash
git fetch origin
git switch home-reconstruction
git reset --hard origin/home-reconstruction
npx expo start --dev-client --clear
```

## HomeScreen-status

HomeScreen-redesignet skal beholdes på `home-reconstruction`.

Nåværende HomeScreen er 2-kort baseline. Dynamisk HomeScreen ved andre innlogging er ikke neste steg.

Dynamisk HomeScreen ved andre innlogging krever senere avklaring:

- betyr det andre app-åpning, faktisk login, eller etter første spill?
- skal det lagres per brukerprofil?
- skal det resettes i dev?

HomeScreen-filer:

```text
src/screens/home/HomeScreen.js
src/screens/home/HomeScreen.styles.js
src/components/home/HomeChallengeCard.js
src/components/home/HomeUpcomingCard.js
assets/images/home/**
```

## Brancher

Aktiv:

```text
home-reconstruction
```

Ikke endre/merge uten eksplisitt avtale:

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

## Låste spillregler

```text
Alle spill krever internett/mobildata.
Offline/P2P/Bluetooth er ikke kjerneflyt.
Skattene genereres først fra valgt område.
Spillet har ett aktivt signal/skatt om gangen.
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

Overordnet produktbeslutning:

- Sonar er standard app-generert signaljakt.
- Sonar skal ikke bruke GPS som hovedmodus.
- GPS kan senere bli eget valg for store uteområder.
- Spillet har ett aktivt signal/skatt om gangen.
- Siste skatt skal gå direkte til resultat/XP.

## Testkrav for neste endring

Etter første HomeScreen 3-kort-endring:

- test på fysisk iPhone/dev-client
- bekreft at appen starter rent
- bekreft at Home fortsatt fungerer
- bekreft at Home viser 3 kort
- send skjermbilde før neste endring

## Bevisst utsatt

- dynamisk HomeScreen ved andre innlogging
- ferdig Home-polish
- Sonar-oppsettside med telefonbok, til HomeScreen 3-kort er godkjent
- animasjon i Skattejakt-oppsett
- instruksjonsbilde/animasjon på nedtellingsskjermen
- ekte GPS og GPS-lagjakt
- accelerometer/skritt/gyro
- Sonar-lyd/pip
- global lyd-/haptikkinnstilling
- Sonar-småsignal med XP
- innlogging, venner, varsler og backend-synk

## Neste chat

Start med:

```text
Branch: home-reconstruction
Status: app starter rent
Første mulige kodeendring: HomeScreen med 3 kort
Ikke bygg Sonar-oppsett samtidig
Ikke bruk homescreen-clean eller skattejakt-oppsett
```
