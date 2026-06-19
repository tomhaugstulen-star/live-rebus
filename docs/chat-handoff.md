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

Skattejaktgrunnlaget med Sonar og Tåkekart er stabilisert. Sonar er under designmessig videreutvikling som app-generert signaljakt uten GPS som standard.

Låst produktregel: Live Rebus krever internett/mobildata for spill. Dette gjelder både alenespill og spill med venner.

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

## Låst nettregel

```text
Alle spill krever internett/mobildata.
Offline/P2P/Bluetooth er ikke kjerneflyt.
```

Vennespill skal bygges på innlogging, internett, varsler og server/app-synk. Alenespill bruker samme grunnmodell, men uten vennestatus.

## Låst funnregel

```text
Skattene genereres først fra valgt område.
Spillet har bare én aktiv skatt eller ett aktivt signal om gangen.
Neste signal åpnes først når forrige funn er ferdig registrert.
```

Gjelder også senere XP-bonusfunn: ett aktivt bonusfunn, én registrering, én utbetaling.

## Områdeparameter per vanskelighetsgrad

Vanskelighetsgrad styrer antall skatter, anbefalt område og Sonar-synlighet foran spilleren:

```text
Enkel:     4 skatter  · ca. 50 m diameter  · 2 m Sonar-synlighet
Medium:    8 skatter  · ca. 80 m diameter  · 2,5 m Sonar-synlighet
Vanskelig: 12 skatter · ca. 150 m diameter · 3 m Sonar-synlighet
```

Dette ligger i `src/utils/treasureRules.js` som `areaLabel`, `recommendedAreaDiameterMeters` og `sonarForwardVisibilityMeters`. Sonar-skjermen viser fortsatt ikke meter, kart eller GPS-avstand som hovedspråk.

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

GPS kan senere bli et eget valg for store uteområder, men ikke hovedmodus. I eventuell GPS-modus brukes GPS grovt til område/plassering, ikke som eksakt funnfasit.

Kjerneinstruksjon for senere nedtelling/instruksjonskort:

```text
Hold telefonen flatt foran deg som en ekte sonar
Gå rolig og følg signalet
```

Presisering: telefonen skal holdes flatt foran kroppen, men ikke sidelengs/landskap. Brukeren skal finne bedre bilde senere; ikke generer flere instruksjonsbilder nå.

## Sonar som er implementert nå

Nye/endrede viktige deler:

```text
src/utils/sonarSignalEngine.js
src/screens/treasure/SonarHuntScreen.js
src/screens/treasure/SonarDisplay.js
src/screens/treasure/SonarHuntScreen.styles.js
src/utils/treasureRules.js
```

Implementert:

- `sonarSignalEngine` styrer app-generert signalprogresjon.
- Sonar-skjermen bruker ikke synlig meter/distanse.
- Sonaren roterer hele tiden mens skjermen er aktiv.
- Signalnivåer: `Klar`, `Søker`, `Øker`, `Sterkt`, `Låst`.
- Toppstatus viser grønn `Sonar aktiv` når spillet er startet.
- Ved klart signal vises `STOPP!` sentralt i hovedområdet under radaren.
- Startpanelet vises bare før spillet starter.
- Etter start vises bare handling nederst når skatten kan åpnes.
- `Åpne skatten` kjører kort funnsekvens på samme skjerm.
- Vanlige Sonar-funn åpner ikke ny skjerm.
- Bare siste skatt går videre til slutt/resultatflyt.
- Haptics er lagt inn ved signalopptrapping og funn.
- TreasureSetup viser nå antall skatter og område-label per vanskelighetsgrad.
- Testtempo er med vilje raskt.

Viktige nyere commits:

```text
a2166aa  Add sonar visibility distance per difficulty
f589bf0  Adjust treasure area diameters
8a4ebd1  Document single active treasure rule
2ab005b  Add play area size per difficulty
5625874  Show area size in treasure difficulty
6209147  Update sonar signal language
9c7b16a  Move sonar signal alert into main view
fbc901d  Update sonar active hunt layout
39cdad0  Lock online requirement for gameplay
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
3. innlogging/venner/varsler/synk
4. GPS-lagjakt som avansert modus
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

Sonar og Tåkekart bruker samme `treasureSessionStore`. Sessionen holder `name`, `mode`, `difficulty`, `treasuresFound`, `treasuresTotal`, `startedAt`, `elapsedSeconds`, `completed` og `xpAwarded`.

Sonar registrerer funn først etter den korte funnsekvensen. Hvis sessionen ikke er completed, blir spilleren værende på Sonar-skjermen.

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

1. TreasureSetup viser `lite/middels/stort område`
2. nedtelling avsluttes med `START`
3. grønn `Sonar aktiv` vises etter start
4. Sonar roterer mens skjermen er aktiv
5. Sonar går raskt til `STOPP!` i testtempo
6. `STOPP!` vises i hovedområdet, ikke nederst
7. startpanelet er borte etter start
8. `Åpne skatten` vises først når signalet er låst
9. vanlig Sonar-funn åpner ikke ny skjerm
10. siste skatt går til XP/resultat
11. fysisk telefon gir haptics ved signalendringer og funn

Haptics kan ikke verifiseres i nettleser og skal testes i dev build på fysisk telefon.

## Bevisst utsatt

- instruksjonsbilde/animasjon på nedtellingsskjermen
- ekte Sonar-lyder/pip
- global `soundEnabled`/`hapticsEnabled`
- XP-småsignal i Sonar
- accelerometer/skritt/gyro
- GPS-lagjakt
- innlogging, venner, varsler og backend-synk
- eksplisitt `mode`-prop til Home i stedet for tittel-prefiks

## Neste anbefalte steg

1. Test Sonar visuelt i web etter pull.
2. Test haptics på fysisk telefon når dev build er klar.
3. Juster signalmotorens timing og tekster.
4. Flytt eventuelt testtempo bak en tydelig testkonstant før merge.
5. Etterpå vurder lyd, sensorer og online sosial flyt.

Start neste chat med:

```text
docs/chat-handoff.md
docs/project-status.md
docs/sonar-roadmap.md
docs/treasure-hunt-flow.md
docs/branch-structure.md
```
