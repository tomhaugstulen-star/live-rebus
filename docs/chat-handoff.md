# Chat-handoff: aktiv branch `home-reconstruction`

Les dette først i neste chat.

## Repo og aktiv branch

```text
tomhaugstulen-star/live-rebus
home-reconstruction
```

`home-reconstruction` er den fungerende arbeidsbranchen. Den er testet i dev-client på iPhone og skal brukes videre.

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

## Viktig branch-avklaring

Følgende ble avklart i forrige chat:

- `home-reconstruction` er riktig branch for nåværende HomeScreen og Skattejakt-oppsett-arbeid.
- `home-reconstruction` fungerer på iPhone.
- `homescreen-clean` ble opprettet som forsøk på ryddig HomeScreen-branch, men skal ignoreres inntil videre. Den manglet kontekst fra større `home-reconstruction` og ga runtime-feil.
- `skattejakt-oppsett` skal ikke brukes nå. Den skapte branch-forvirring og er ikke aktiv kilde for videre arbeid.

Ikke endre eller merge disse branchene uten eksplisitt avtale:

```text
main
homescreen-clean
skattejakt-oppsett
design-sonar-ui
sonar
skattejakt-spillet
```

## Nåværende beslutning

Dynamisk HomeScreen ved andre innlogging er utsatt.

Årsak:

- `home-reconstruction` må beholdes som fungerende baseline.
- Dynamisk HomeScreen krever persistent state og tydelig definisjon av hva “andre innlogging” betyr.
- Brukeren valgte å vente og fortsette med Skattejakt oppsett i stedet.

## Neste arbeidsområde

Neste arbeidsområde er:

```text
Skattejakt oppsett
```

Fortsett på `home-reconstruction`.

Før kodeendring:

1. Start appen på iPhone med dev-client.
2. Gå `Home → Skattejakt`.
3. Be brukeren sende skjermbilde av første Skattejakt-oppsett-skjerm slik den ser ut nå.
4. Gjør ingen repo-endringer før skjermbildet er vurdert og første konkrete justering er godkjent.

## Forventet Skattejakt-oppsett-retning

Bruker har tidligere beskrevet ønsket retning:

- Skjermen skal få bedre plass ved at valg blir dynamiske.
- Først vises valg for Tåkejakt og Sonar.
- Når Sonar velges, skal Tåkejakt forsvinne og Sonar-kortet flyttes opp.
- Deretter vises `Hvem spiller du med?` med valg som `Alene` og `Med venner`.
- Vennevalg/telefonbok kan komme senere.
- Ikke implementer animasjon først. Første steg bør være statisk/dynamisk layout uten ekstra risiko.

Arbeidsrekkefølge for Skattejakt oppsett:

```text
1. Verifiser nåværende skjerm på iPhone.
2. Foreslå én liten konkret layoutendring.
3. Implementer uten animasjon.
4. Test på iPhone.
5. Først etter godkjenning: vurder enkel animasjon.
```

## HomeScreen-status

`home-reconstruction` inneholder fungerende HomeScreen-redesign.

Ikke start dynamisk HomeScreen nå. Ikke flytt HomeScreen til ny branch nå.

HomeScreen-relaterte filer:

```text
src/screens/home/HomeScreen.js
src/screens/home/HomeScreen.styles.js
src/components/home/HomeChallengeCard.js
src/components/home/HomeUpcomingCard.js
assets/images/home/**
```

## Kjent tidligere feil og årsak

Tidligere runtime-feil:

```text
ReferenceError: Property 'StyleSheet' doesn't exist
```

Dette ble observert på feil/ufullstendig branch-kombinasjon. Når `home-reconstruction` kjøres direkte, fungerer appen.

Ikke feilsøk dette på `homescreen-clean` nå. Bruk `home-reconstruction`.

## Regler for videre arbeid

- Svar og arbeid på norsk.
- Ikke gjør repo-endringer før brukeren har godkjent den konkrete endringen.
- Hold endringer små.
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
- venne-/telefonbokflyt på Skattejakt-oppsett
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
Neste oppgave er Skattejakt oppsett: be brukeren sende skjermbilde av Home → Skattejakt før repo-endringer.
```