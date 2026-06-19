# Chat-handoff: Home-rekonstruksjon på `home-reconstruction`

Les dette først i neste chat.

## Repo og branch

```text
tomhaugstulen-star/live-rebus
home-reconstruction
```

Bruk `origin/home-reconstruction` som autoritativ head for videre Home-arbeid.

```bash
git fetch origin
git switch home-reconstruction
git pull --rebase origin home-reconstruction
git branch --show-current
git status --short
```

Ikke endre eller merge disse branchene uten eksplisitt avtale:

```text
main
sonar
skattejakt-spillet
design-sonar-ui
```

`design-sonar-ui` er stabil referanse etter Sonar/TreasureSetup og iOS-buildfix. `home-reconstruction` er isolert arbeidsbranch for ny Home.

## Ikke overskriv uten eksplisitt beskjed

```text
assets/images/treasure/treasure-chest.png
assets/images/treasure/treasure-setup-header.png
assets/images/treasure/treasure-setup-header.webp
package.json
package-lock.json
```

Ikke gjør package-endringer uten avtale. iOS-build ble løst ved å fjerne `expo-av`-bruk fra `src/screens/treasure/TreasureReadyScreen.js`, men package-filene ble ikke ryddet.

## Nåstatus

Aktivt arbeid er Home-skjermen. TreasureSetup og Sonar skal ikke være hovedfokus i neste chat med mindre brukeren eksplisitt ber om det.

Home-målet nå:

```text
Førstegangs-Home med header/profil, hero og to liggende valgkort:
- Rebusløp
- Skattejakt
```

Gjort på `home-reconstruction`:

- opprettet branch fra stabil `design-sonar-ui`
- lagt inn nye Home-kort-bakgrunner
- lagt inn nye Home-kort-ikoner
- fjernet `Velg eventyr` og `Alle utfordringer`-rad
- fjernet nederste dupliserte førstegangsseksjon når `homeEvents` ikke finnes
- laget liggende kortoppsett
- justert bildekonstrast, overlay og luft mellom kort
- SF-symboler er byttet ut med egne ikonbilder i `HomeChallengeCard.js`

Relevante Home-assets:

```text
assets/images/home/cards/rebus-card-background.png
assets/images/home/cards/treasure-card-background.png
assets/images/home/cards/rebus-card-icon.png
assets/images/home/cards/treasure-card-icon.png
```

Relevante Home-filer:

```text
src/screens/home/HomeScreen.js
src/screens/home/HomeScreen.styles.js
src/components/home/HomeChallengeCard.js
```

## Viktig: sist observerte Home-feil

Siste skjermbilde viste at kortene nå vises, men har to konkrete feil:

```text
1. Ikonene er byttet om.
   Rebusløp viser skatteikon.
   Skattejakt viser rebusikon.

2. Skattejakt-tittelen kuttes til `Skattej...`.
   Årsak: ikon + pil + tekst tar for mye horisontal plass.
```

Siste foreslåtte fix ble ikke pushet av assistenten fordi GitHub-verktøyet blokkerte filoppdateringen. Sjekk derfor om brukeren har gjort den lokalt før videre arbeid.

Lokal fix som må verifiseres i `src/components/home/HomeChallengeCard.js`:

```js
const iconArtwork = title === "Skattejakt" ? rebusIcon : treasureIcon;
```

Ja, denne ser omvendt ut, men den matcher de faktiske filene slik de ble klippet inn lokalt. Skjermbildet viste at filnavnene/innholdet ikke matchet antatt semantikk.

Anbefalt layoutjustering i samme fil:

```text
iconWrap: 52 x 52
iconImage: 42 x 42
actionPill: 40 x 40
title fontSize: 22
contentRow paddingHorizontal: 14
copy paddingRight: 8
```

Målet er at `Skattejakt` vises helt på iPhone-bredde uten å redusere lesbarheten for mye.

## Arbeidsmåte videre

1. Ikke gjør bred redesign.
2. Fiks bare `HomeChallengeCard.js` først.
3. Test på fysisk telefon/dev-client.
4. Be om nytt skjermbilde.
5. Deretter vurder kort-høyde, tekst, kontrast og ikonstørrelse.

Ikke bytt tilbake til to-kolonnekort. Bruker ønsker liggende kort med mer luft.

## Låst nettregel

```text
Alle spill krever internett/mobildata.
Offline/P2P/Bluetooth er ikke kjerneflyt.
```

Vennespill bygges senere på innlogging, internett, varsler og server/app-synk. Alenespill bruker samme grunnmodell uten vennestatus.

## Låst funnregel

```text
Skattene genereres først fra valgt område.
Spillet har bare én aktiv skatt eller ett aktivt signal om gangen.
Neste signal åpnes først når forrige funn er ferdig registrert.
```

Gjelder også senere XP-bonusfunn: ett aktivt bonusfunn, én registrering, én utbetaling.

## Områdeparameter per vanskelighetsgrad

```text
Enkel:     4 skatter  · ca. 50 m diameter  · 2 m Sonar-synlighet
Medium:    8 skatter  · ca. 80 m diameter  · 2,5 m Sonar-synlighet
Vanskelig: 12 skatter · ca. 150 m diameter · 3 m Sonar-synlighet
```

Dette ligger i `src/utils/treasureRules.js`.

## TreasureSetup-status

TreasureSetup er ikke aktivt arbeidsområde akkurat nå, men status er:

- navnefeltet er fjernet
- appen skal ikke generere kunstige jaktnavn
- infokort viser valgt vanskelighetsgrad med område, stedseksempel og Sonar-synlighet
- videre visuell justering er utsatt til Home er avklart

Viktige filer:

```text
src/screens/treasure/TreasureSetupScreen.js
src/screens/treasure/TreasureSetupScreen.styles.js
src/components/treasure/TreasureSetupOptions.js
src/utils/treasureRules.js
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

GPS kan senere bli et eget valg for store uteområder, men ikke hovedmodus.

## Nedtelling og lyd

`TreasureReadyScreen` eier nedtellingen. Tidligere `expo-av`-bruk i denne filen ble fjernet for å løse iOS-build. Ikke gjeninnfør `expo-av` uten ny avtale.

Ikke legg inn instruksjonsbildet på nedtellingen nå.

## Test

For Home:

```bash
npx expo start --dev-client
```

Test på telefon. Kontroller:

- Rebusløp har riktig ikon
- Skattejakt har riktig ikon
- `Skattejakt` vises fullt, ikke trunkert
- kortene har nok luft mellom seg
- bakgrunnsbildene har nok kontrast
- hele kortet er trykkbart
- trykkflate på pil/ikon føles ikke for liten

## Bevisst utsatt

- ferdig Home-polish
- ferdig visuell justering av TreasureSetup
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
Fortsett på branch home-reconstruction. Første oppgave er å verifisere/fikse HomeChallengeCard.js: riktig ikonrekkefølge og at `Skattejakt` ikke trunkeres.
```
