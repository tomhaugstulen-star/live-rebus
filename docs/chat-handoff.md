# Chat-handoff: aktiv branch `home-reconstruction`

Les dette først i neste chat.

Sist oppdatert: 2026-06-20.

## Repo og aktiv branch

```text
tomhaugstulen-star/live-rebus
home-reconstruction
```

`home-reconstruction` er den fungerende arbeidsbranchen. Brukeren bekreftet at appen starter rent i dev-client etter siste stabilisering.

Start alltid med:

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

## Nåværende stabile status

```text
Appen starter rent.
HomeScreen er stabil baseline med 2 kort:
- Rebusløp
- Skattejakt
```

Siste trygge reparasjoner som skal beholdes:

```text
- expo-av er fjernet fra RebusGameScreen.js.
- HomeChallengeCard viser riktig ikon for Rebusløp og Skattejakt.
- Aktiv skattejakt på Home bruker trygg tittel: "Aktiv skattejakt".
```

Sentrale commits fra siste runde:

```text
c35e2944226a835b9d9729cbaf150c7ea8704e69  Rollback home treasure routing changes
22ae0bee3d0df66aed811ccb38dd2ac71678cb33  Fix home challenge card icon mapping
2cf52dd1f64f4666f2e0607da024feb94719d28c  Use safe active treasure home title
70d1926cc3488a83f420cd50e66291a6c5cbcb08  Update handoff documentation for next chat
```

## Hva som skjedde rett før overtakelse

Det ble vurdert å implementere HomeScreen med 3 kort og Sonar-oppsett i samme økt. Brukeren stoppet dette med `ikke alt i en gang` og senere `nei`.

Viktig: Ingen HomeScreen 3-kort-kode ble ferdigstilt etter dette. Neste chat skal ikke anta at 3-kort-Home er implementert.

## Viktig branch-avklaring

Følgende er avklart:

- `home-reconstruction` er riktig branch for nåværende HomeScreen og Skattejakt/Sonar-arbeid.
- `home-reconstruction` fungerer på iPhone/dev-client.
- `homescreen-clean` ble opprettet som forsøk på ryddig HomeScreen-branch, men skal ignoreres. Den manglet kontekst fra større `home-reconstruction` og ga runtime-feil.
- `skattejakt-oppsett` skal ikke brukes nå. Den skapte branch-forvirring og er ikke aktiv kilde for videre arbeid.

Ikke endre eller merge disse branchene uten eksplisitt avtale:

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

## Nåværende beslutning

Dynamisk HomeScreen ved andre innlogging er utsatt.

Årsak:

- `home-reconstruction` må beholdes som fungerende baseline.
- Dynamisk HomeScreen krever persistent state og tydelig definisjon av hva “andre innlogging” betyr.
- Brukeren vil nå først gjøre en kontrollert HomeScreen/Sonar-flyt, men i små steg.

## Neste ønskede arbeid

Neste ønskede arbeid fra bruker er todelt. Ikke gjør begge i samme runde.

### Steg 1: HomeScreen med 3 kort

Hvis brukeren bekrefter, gjør kun dette først:

```text
HomeScreen får 3 kort:
- Rebusløp
- Tåkejakt
- Sonar
```

Avgrensning:

```text
- Endre bare HomeScreen-kort og nødvendig routing-param/handler.
- Ikke bygg Sonar-oppsettsiden samtidig.
- Ikke endre TreasureSetup-layout samtidig.
- Ikke legg inn animasjon.
- Ikke endre package.json.
```

Etter steg 1:

```text
1. Be bruker kjøre appen.
2. Verifiser at appen starter rent.
3. Verifiser at HomeScreen ser riktig ut med 3 kort.
4. Ikke gå videre før bruker sier at dette fungerer.
```

### Steg 2: Sonar-oppsett

Bare etter at steg 1 er testet og godkjent:

```text
Trykk Sonar → Sonar-oppsett
Valg:
- Spill alene
- Spill med venner
- Telefonbok når venner er valgt
- Gå videre
Deretter: Safety-skjermen
```

Dette skal gjøres som egen endring etter egen bekreftelse.

## HomeScreen-status

`home-reconstruction` inneholder fungerende HomeScreen-redesign med 2 kort.

HomeScreen-relaterte filer:

```text
src/screens/home/HomeScreen.js
src/screens/home/HomeScreen.styles.js
src/components/home/HomeChallengeCard.js
src/components/home/HomeUpcomingCard.js
assets/images/home/**
```

Nåværende status:

```text
HomeScreen.js: 2 kort, under 300 linjer.
HomeScreen.styles.js: under 300 linjer.
HomeChallengeCard.js: ikon-mapping fikset.
```

## Kjent tidligere feil og årsak

Tidligere runtime-feil:

```text
ReferenceError: Property 'StyleSheet' doesn't exist
```

Dette ble observert på feil/ufullstendig branch-kombinasjon. Når `home-reconstruction` kjøres direkte, fungerer appen.

Ikke feilsøk dette på `homescreen-clean` nå. Bruk `home-reconstruction`.

Tidligere feil:

```text
Unable to resolve module expo-av
```

Løsning som skal beholdes:

```text
expo-av-import og Audio.setAudioModeAsync ble fjernet fra RebusGameScreen.js.
Ikke gjeninnfør expo-av uten eksplisitt avtale.
```

## Regler for videre arbeid

- Svar og arbeid på norsk.
- Ikke gjør repo-endringer før brukeren har godkjent den konkrete endringen.
- Hold endringer små.
- Ikke gjør HomeScreen 3 kort og Sonar-oppsett i samme commit.
- Ikke endre branch-struktur uten eksplisitt avtale.
- Ikke gjør package-endringer uten eksplisitt avtale.
- Ikke gjeninnfør `expo-av` uten eksplisitt avtale.
- Test på fysisk iPhone/dev-client etter hver relevant UI-endring.
- Be om nytt skjermbilde før flere designendringer.

## Ikke overskriv uten eksplisitt beskjed

```text
assets/images/treasure/treasure-chest.png
assets/images/treasure/treasure-setup-header.png
assets/images/treasure/treasure-setup-header.webp
package.json
package-lock.json
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

Sonar skal som standard ikke bruke GPS.

Standard Sonar-opplevelse:

```text
Sonaren søker
→ signalet bygger seg opp
→ STOPP! Nytt signal funnet
→ spilleren snur seg rolig rundt og sjekker området
→ funnet åpnes på samme Sonar-skjerm
→ sonaren gjør klar neste signal
```

GPS kan senere bli eget valg for store uteområder, men ikke hovedmodus.

## Bevisst utsatt

- dynamisk HomeScreen ved andre innlogging
- ferdig Home-polish
- Sonar-oppsettside med telefonbok, til HomeScreen 3-kort er testet
- animasjon i Skattejakt-oppsett
- instruksjonsbilde/animasjon på nedtellingsskjermen
- ekte Sonar-lyder/pip
- global `soundEnabled`/`hapticsEnabled`
- XP-småsignal i Sonar
- accelerometer/skritt/gyro
- GPS-lagjakt
- innlogging, venner, varsler og backend-synk

## Start neste chat med

```text
Les README.md, docs/chat-handoff.md, docs/project-status.md og docs/branch-structure.md.
Fortsett på branch home-reconstruction.
Ikke bruk homescreen-clean eller skattejakt-oppsett.
Appen starter rent nå.
Neste kodeendring, hvis brukeren bekrefter, er kun HomeScreen med 3 kort.
Ikke bygg Sonar-oppsett samtidig.
```
