# Chat-handoff: Sonar setup og Home-retning

Les dette først i neste chat.

## Repo og branch

```text
tomhaugstulen-star/live-rebus
design/sonar-setup-card-scale
```

PR er opprettet, men skal ikke merges uten eksplisitt beskjed:

```text
PR #2: Legg til Sonar-oppsett
base: treasure-setup-cleanup
head: design/sonar-setup-card-scale
```

## Startkommandoer

```bash
git fetch --all --prune
git switch design/sonar-setup-card-scale
git pull origin design/sonar-setup-card-scale
git status --short
npx expo start --dev-client --clear
```

## Ikke endre eller merge uten eksplisitt avtale

```text
main
sonar
skattejakt-spillet
design-sonar-ui
treasure-setup-cleanup
package.json
package-lock.json
```

Pakker skal ikke endres uten avtale.

## Nåstatus

Arbeidet gjelder Sonar på Home og Sonar setup.

Home har nå tre kategorier:

```text
Rebusløp
Skattejakt
Sonar
```

Sonar-kortet går til Sonar setup. Brukeren har testet at Sonar setup fungerer, men mener den visuelle helheten fra Home til setup/sikkerhet/spill føles feil.

## Viktig produktbeslutning nå

Ikke fortsett med småjusteringer på feil retning. Brukeren reagerte på at uttrykket blir sprikende:

```text
Home-bakgrunn/kort
→ blå Sonar setup
→ sikkerhet
→ radarbasert spill-skjerm
```

Konklusjon:

```text
Home = teaser
Setup = valg
Sikkerhet = klargjøring
Spill = radar
```

Stor radar skal ikke ligge på setup-siden. Radar hører hjemme på selve Sonar-spillskjermen.

## Gjort på denne branchen

- lagt Sonar inn som egen Home-kategori
- koblet Sonar-kort til TreasureSetup med Sonar-variant
- lagt til Sonar setup-bakgrunn
- lagt til transparente Sonar-knapper for `Venn` og `Venner`
- fjernet grått panel på Sonar setup
- fjernet uklar subtitle fra Sonar setup
- oppdatert copy til `Velg spillmodus`
- fjernet ubrukte gamle `sonarPlayer...` styles
- opprettet PR #2
- forsøkt radar i setup, men fjernet den fra header igjen etter ny designavklaring

## Viktige filer

```text
src/screens/home/HomeScreen.js
src/screens/home/HomeScreen.styles.js
src/components/home/HomeChallengeCard.js
src/screens/treasure/TreasureSetupScreen.js
src/screens/treasure/TreasureSetupScreen.styles.js
src/components/treasure/TreasureSetupHeader.js
src/components/treasure/TreasureSetupOptions.js
src/components/treasure/SonarSetupRadar.js
src/navigation/AppNavigator.js
```

## SonarSetupRadar.js

`src/components/treasure/SonarSetupRadar.js` finnes på branchen, men brukes ikke lenger i setup-headeren.

Neste utvikler bør velge én av disse:

```text
1. behold komponenten hvis den skal brukes senere på riktig Sonar-skjerm
2. slett komponenten hvis den ikke skal brukes
```

Ikke legg den tilbake i setup uten ny eksplisitt beskjed.

## Sonar setup: nåværende skjerm

Nåværende setup er enkelt:

```text
Sonar
Velg spillmodus
[Venn] [Venner]
```

Brukeren mener fortsatt den større visuelle retningen er feil. Ikke anta at blå sci-fi-bakgrunn og illustrasjonsknapper er endelig godkjent som permanent retning.

## Anbefalt neste steg

Ta et designvalg før ny patch:

```text
1. Skal Sonar setup beholde egen blå sci-fi-bakgrunn?
2. Skal Home Sonar-kortet se mer ut som spill-skjermen?
3. Skal setup være mørk/cyan og enklere, nærmere SonarHuntScreen?
4. Skal de store illustrasjonsknappene beholdes, tones ned eller erstattes med enklere valgkort?
```

Foreslått teknisk rekkefølge:

```text
1. Avklar retning med bruker.
2. Hvis ønsket: fjern ubrukt SonarSetupRadar.js.
3. Juster Home Sonar-kort og Sonar setup i samme visuelle språk.
4. Test på telefon og be om skjermbilde.
```

## Låste spillregler

```text
Alle spill krever internett/mobildata.
Offline/P2P/Bluetooth er ikke kjerneflyt.
Skattene genereres først fra valgt område.
Spillet har bare én aktiv skatt eller ett aktivt signal om gangen.
Neste signal åpnes først når forrige funn er ferdig registrert.
```

## Sonar-produktbeslutning

Sonar er standard app-generert signaljakt, ikke GPS-/meter-/kartjakt.

Standard Sonar-opplevelse:

```text
Sonaren søker
→ signalet bygger seg opp
→ STOPP! Nytt signal funnet
→ spilleren snur seg rolig rundt og sjekker området
→ funnet åpnes på samme Sonar-skjerm
→ sonaren gjør klar neste signal
```

## Test

```bash
npx expo start --dev-client --clear
```

Kontroller spesielt:

- Home viser Rebusløp, Skattejakt og Sonar.
- Sonar-kortet åpner Sonar setup.
- Setup viser `Venn` og `Venner`.
- Skattejakt påvirkes ikke av Sonar-endringer.
- PR #2 står åpen og skal ikke merges uten eksplisitt beskjed.

## Start neste chat med

```text
Les README.md, docs/chat-handoff.md, docs/project-status.md og docs/branch-structure.md.
Fortsett på branch design/sonar-setup-card-scale.
Ikke merge PR #2. Første oppgave er å avklare ny visuell retning for Sonar Home/setup før flere designpatcher.
```
