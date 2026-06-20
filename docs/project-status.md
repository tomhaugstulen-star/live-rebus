# Prosjektstatus

## Aktiv arbeidsbranch

```text
home-reconstruction
```

`home-reconstruction` er fungerende branch per siste iPhone/dev-client-test. Bruk denne videre.

Ikke bruk nå:

```text
homescreen-clean
skattejakt-oppsett
```

`homescreen-clean` ble opprettet som ren HomeScreen-testbranch, men ga runtime-feil og mangler kontekst fra `home-reconstruction`. Den skal ignoreres inntil videre.

## Nåstatus

Siste bekreftede status:

- `home-reconstruction` fungerer på iPhone.
- HomeScreen-redesign ligger på `home-reconstruction` og skal beholdes.
- Dynamisk HomeScreen ved andre innlogging er vurdert, men utsatt.
- Neste arbeidsområde er Skattejakt oppsett.

## Neste arbeidsområde: Skattejakt oppsett

Første steg i neste chat:

```text
1. Kontroller at lokal branch er home-reconstruction.
2. Start dev-client rent.
3. Gå Home → Skattejakt.
4. Be bruker sende skjermbilde av første Skattejakt-oppsett-skjerm.
5. Ikke gjør repo-endringer før første konkrete justering er godkjent.
```

Kommando:

```bash
git fetch origin
git switch home-reconstruction
git reset --hard origin/home-reconstruction
npx expo start --dev-client --clear
```

## Ønsket retning for Skattejakt oppsett

Bruker ønsker at oppsettet skal bli mer dynamisk og få bedre plass:

- Først vises valg for Tåkejakt og Sonar.
- Når Sonar velges, skal Tåkejakt forsvinne.
- Sonar-kortet skal flyttes opp.
- Etter modusvalg vises `Hvem spiller du med?`.
- Første valg for spillere: `Alene` og `Med venner`.
- Venneflyt/telefonbok skal ikke bygges ferdig nå.
- Animasjon skal ikke være første steg.

Anbefalt implementeringsrekkefølge:

```text
1. Statisk/dynamisk visning uten animasjon.
2. Test på iPhone.
3. Deretter enkel animasjon hvis layouten fungerer.
4. Deretter venne-/telefonbokdel senere.
```

## HomeScreen-status

HomeScreen-redesignet skal beholdes på `home-reconstruction`.

Ikke start dynamisk HomeScreen nå.

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
```

## Låste spillregler

```text
Alle spill krever internett/mobildata.
Offline/P2P/Bluetooth er ikke kjerneflyt.
Skattene genereres først fra valgt område.
Spillet har bare én aktiv skatt eller ett aktivt signal om gangen.
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

Etter første Skattejakt-oppsett-endring:

- test på fysisk iPhone/dev-client
- bekreft at Home fortsatt fungerer
- bekreft at Home → Skattejakt åpner riktig skjerm
- send skjermbilde før neste endring

## Bevisst utsatt

- dynamisk HomeScreen ved andre innlogging
- ferdig Home-polish
- animasjon i Skattejakt-oppsett
- venne-/telefonbokflyt
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
Oppgave: Skattejakt oppsett
Før endring: be om skjermbilde av Home → Skattejakt
Ikke bruk homescreen-clean eller skattejakt-oppsett
```