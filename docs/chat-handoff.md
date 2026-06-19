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

Begrunnelse:

- appen skal uansett bruke innlogging
- venner, invitasjoner og varsler krever nett
- funn, lagstatus, progresjon, XP og resultat bør bruke én stabil online-modell
- P2P/Bluetooth gir mer kode, mer testing og større risiko for ustabile meldinger
- best spillopplevelse er viktigere enn å støtte alle offline-varianter

Vennespill skal derfor bygges på innlogging, internett, varsler og server/app-synk. Alenespill bruker samme grunnmodell, men uten vennestatus.

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
```

Implementert:

- `sonarSignalEngine` styrer app-generert signalprogresjon.
- Sonar-skjermen bruker ikke synlig meter/distanse.
- Sonaren roterer hele tiden mens skjermen er aktiv.
- Signalnivåer: `Klar`, `Søker`, `Øker`, `Sterkt`, `Låst`.
- Toppstatus viser grønn `Sonar aktiv` når spillet er startet.
- Ved klart signal vises `STOPP!` sentralt i hovedområdet under radaren.
- Brukeren får beskjed om `Nytt signal funnet` og å snu seg rolig rundt.
- Startpanelet vises bare før spillet starter.
- Etter start vises bare handling nederst når skatten kan åpnes.
- `Åpne skatten` kjører kort funnsekvens på samme skjerm.
- Vanlige Sonar-funn åpner ikke ny skjerm.
- Bare siste skatt går videre til slutt/resultatflyt.
- Rød målprikk vises ved låst signal/testskatt.
- Haptics er lagt inn ved signalopptrapping og funn.
- Testtempo er med vilje raskt.

Viktige nyere commits:

```text
6209147  Update sonar signal language
9c7b16a  Move sonar signal alert into main view
fbc901d  Update sonar active hunt layout
39cdad0  Lock online requirement for gameplay
f0e90fe  Document online gameplay requirement
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

1. nedtelling avsluttes med `START`
2. spillskjermen fader inn tydelig
3. grønn `Sonar aktiv` vises etter start
4. Sonar roterer mens skjermen er aktiv
5. Sonar går raskt til `STOPP!` i testtempo
6. `STOPP!` vises i hovedområdet, ikke nederst
7. startpanelet er borte etter start
8. `Åpne skatten` vises først når signalet er låst
9. vanlig Sonar-funn åpner ikke ny skjerm
10. siste skatt går til XP/resultat
11. resultat viser riktig funn, total og XP
12. resultatknapp går til Home uten å åpne resultatet på nytt
13. fysisk telefon gir haptics ved signalendringer og funn

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
