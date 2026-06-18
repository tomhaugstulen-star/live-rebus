# Chat-handoff: Sonar signaljakt på `design-sonar-ui`

Les dette først i neste chat.

## Repo og branch

```text
tomhaugstulen-star/live-rebus
design-sonar-ui
```

Bruk alltid gjeldende `origin/design-sonar-ui` etter pull som autoritativ head for videre Sonar-design.

```bash
git fetch origin
git switch design-sonar-ui
git pull origin design-sonar-ui
git branch --show-current
git status --short
```

`main`, `sonar` og `skattejakt-spillet` skal ikke endres eller merges uten eksplisitt avtale.

## Lokale brukerendringer

Disse filene kan ha lokale endringer og skal ikke overskrives eller tas med i andre commits:

```text
assets/images/treasure/treasure-chest.png
assets/images/treasure/treasure-setup-header.png
assets/images/treasure/treasure-setup-header.webp
package.json
package-lock.json
```

## Nåstatus

Skattejaktgrunnlaget med Sonar og Tåkekart er stabilisert. Sonar er nå under designmessig videreutvikling som app-generert signaljakt uten GPS som standard.

Aktiv flyt:

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

## Sonar-produktbeslutning

Sonar skal som standard ikke bruke GPS.

Standard Sonar-opplevelse:

```text
Sonaren søker
→ signalet bygger seg opp
→ STOPP! Nytt signal funnet
→ spilleren snur seg rundt og sjekker området
→ funnet åpnes på samme Sonar-skjerm
→ sonaren gjør klar neste signal
```

Grunn: barn kan løpe raskt, GPS kan være treg/unøyaktig, og spillet må fungere uten mobildata. GPS kan senere bli et eget valg for foreldre-/lagmodus, men ikke hovedmodus.

Kjerneinstruksjon for senere nedtelling/instruksjonskort:

```text
Hold telefonen foran deg som en ekte sonar
Gå rolig og følg signalet
```

Instruksjonsbilde/animasjon på nedtellingsskjermen er bevisst utsatt.

## Sonar som er implementert nå

Nye/endrede viktige deler:

```text
src/utils/sonarSignalEngine.js
src/screens/treasure/SonarHuntScreen.js
src/screens/treasure/SonarDisplay.js
src/screens/treasure/SonarHuntScreen.styles.js
```

Implementert:

- `sonarSignalEngine` styrer app-generert signalprogresjon.
- Sonar-skjermen bruker ikke lenger synlig meter/distanse.
- Sonaren roterer hele tiden mens skjermen er aktiv.
- Signalnivåer: `Klar`, `Svakt`, `Middels`, `Sterkt`, `Svært nær`.
- Ved klart signal viser teksten `STOPP! Nytt signal funnet`.
- Brukeren får beskjed om å snu seg rundt og sjekke området.
- `Åpne skatten` kjører kort funnsekvens på samme skjerm.
- Vanlige Sonar-funn åpner ikke ny skjerm.
- Bare siste skatt går videre til slutt/resultatflyt.
- Rød målprikk vises ved svært nær/klart signal.
- Haptics er lagt inn ved signalopptrapping og funn.
- Testtempo er med vilje raskt.

Viktige commits i denne delen:

```text
179d62e  Add lightweight animated sonar display
c800b04  Refine sonar screen around signal levels
e7dd1e1  Polish lightweight sonar visuals
3553b54  Keep sonar sweep constant and show nearby target
ef4db15  Style nearby sonar target
3785dfe  Add escalating sonar vibration feedback
a8a3f85  Add sonar found burst animation
7e06c73  Style sonar found burst
1947771  Play found sequence before next sonar target
821ab4b  Keep sonar on screen after treasure found
4011465  Speed up sonar test progression
4821bf5  Add generated sonar signal engine
170d678  Use generated sonar signal engine
28a7fb3  Document sonar product direction
e550032  Refresh README for generated sonar direction
```

## XP-beslutning for Sonar

XP skal ikke være hovedmotor i Sonar og er ikke lagt inn som småsignal nå.

Prinsipper:

- XP skal ikke være garantert i hvert Sonar-spill.
- XP skal ikke gis basert på løping, meter, fart eller risting.
- Små områder skal ikke kunne brukes til XP-farming.
- Eventuelle XP-småsignal senere skal ha cooldown, maksgrense og kunne være deaktivert på korte/små runder.

Ordinær slutt-XP eksisterer fortsatt via dagens resultatsystem.

## Sensorbeslutning

Ikke bygg presis virtuell GPS nå.

Mulig senere prioritet:

```text
1. accelerometer/skritt som aktivitetssjekk
2. gyro/relativ retning som mild bonus
3. QR-kode for å dele generert jakt
4. GPS-lagjakt som avansert foreldre-/lagmodus
5. AR/kamera som mulig bonus, ikke hovedmotor
```

Sensorer skal brukes for spillfølelse, ikke som eksakt fasit med meter.

## Tåkekart/Fog status

Tåkekart er stabilisert og skal ikke refaktoreres bredt uten konkret feil.

Tidligere web-testkontroller er deaktivert:

- ett web-funn fullfører ikke lenger hele jakten
- Tåkekart viser ikke lenger `Testmodus` eller gul `Åpne skatten`-knapp på web
- testkontrollen skal ikke gjeninnføres før v3 og etter at skattejakt er merget

## Nedtelling og lyd

`TreasureReadyScreen` eier nedtellingen:

```text
10 → 9 → ... → 1 → START
```

Human countdown-lyd er koblet via `expo-av` og bruker:

```text
assets/audio/treasure/countdown.mp3
```

Ikke legg inn instruksjonsbildet på nedtellingen nå. Det er en senere designoppgave.

## Session og funn

Sonar og Tåkekart bruker samme `treasureSessionStore`.

Sessionen holder blant annet:

```text
name
mode
difficulty
treasuresFound
treasuresTotal
startedAt
elapsedSeconds
completed
xpAwarded
```

Sonar registrerer nå funn først etter den korte funnsekvensen. Hvis sessionen ikke er completed, blir spilleren værende på Sonar-skjermen.

## Resultat og XP

Siste funn:

```text
pendingResultStore.setPendingResult(...)
→ TreasureResult
```

Resultatskjermen prioriterer data fra `pendingResultStore`, med session/props som fallback. `markTreasureXpAwarded()` hindrer dobbel utbetaling.

XP-regler:

| Nivå | Fullføring | Per skatt | Maks normal XP |
|---|---:|---:|---:|
| Enkel | 60 | 10 | 100 |
| Medium | 120 | 12 | 216 |
| Vanskelig | 220 | 15 | 400 |

## Test

```bash
git switch design-sonar-ui
git pull origin design-sonar-ui
npx expo start --web -c
```

Verifiser:

1. nedtelling avsluttes med `START`
2. spillskjermen fader inn tydelig
3. Sonar roterer før og etter start
4. Sonar går raskt til `STOPP! Nytt signal funnet` i testtempo
5. `Åpne skatten` viser funnsekvens på samme skjerm
6. vanlig Sonar-funn åpner ikke ny skjerm
7. siste skatt går til XP/resultat
8. resultat viser riktig funn, total og XP
9. resultatknapp går til Home uten å åpne resultatet på nytt
10. fysisk telefon gir haptics ved signalendringer og funn

Haptics kan ikke verifiseres i nettleser og skal testes i dev build på fysisk telefon.

## Bevisst utsatt

- instruksjonsbilde/animasjon på nedtellingsskjermen
- ekte Sonar-lyder/pip
- global `soundEnabled`/`hapticsEnabled`
- XP-småsignal i Sonar
- accelerometer/skritt/gyro
- QR-deling
- GPS-lagjakt
- persistent lagring
- backend og flerspillersynkronisering
- eksplisitt `mode`-prop til Home i stedet for tittel-prefiks

## Neste anbefalte steg

1. Test Sonar visuelt i web etter pull.
2. Test haptics på fysisk telefon når dev build er klar.
3. Juster signalmotorens timing og tekster.
4. Flytt eventuelt testtempo bak en tydelig testkonstant før merge.
5. Etterpå vurder lyd og senere sensorer.

Start neste chat med:

```text
docs/chat-handoff.md
docs/project-status.md
docs/sonar-roadmap.md
docs/treasure-hunt-flow.md
docs/branch-structure.md
```
