# Live Rebus

Live Rebus er en Expo/React Native-app for rebusløp og skattejakt. Appen bruker React Navigation med en sentral stack i `src/navigation/AppNavigator.js` og støtter iOS, Android og web.

## Kom i gang

Installer avhengigheter:

```bash
npm install
```

Start webutgaven med tømt cache:

```bash
npx expo start --web -c
```

## Aktiv arbeidsbranch

```text
skattejakt-spillet
```

Denne branchen er autoritativ for pågående skattejaktarbeid. `main` skal ikke endres direkte før branchen er synkronisert, testet og godkjent for merge.

Ved siste kontroll var `skattejakt-spillet` 104 commits foran og 7 commits bak `main`. Branchen må derfor synkroniseres med `main` før merge.

Detaljer:

- [`docs/project-status.md`](docs/project-status.md)
- [`docs/branch-structure.md`](docs/branch-structure.md)
- [`docs/treasure-hunt-flow.md`](docs/treasure-hunt-flow.md)
- [`docs/chat-handoff.md`](docs/chat-handoff.md)

## Prosjektstruktur

```text
App.js
src/
  components/
    home/
    treasure/
  navigation/
    AppNavigator.js
  screens/
    home/
    rebus/
    treasure/
  utils/
    designTokens.js
    playerProgressStore.js
    treasureRules.js
    xpRules.js
assets/
  images/
    home/
    treasure/
docs/
  branch-structure.md
  chat-handoff.md
  project-status.md
  treasure-hunt-flow.md
```

Viktige filer i skattejaktmodulen:

- `src/screens/treasure/TreasureSetupScreen.js`: navn, modus, spillere, vanskelighetsgrad og telefonkontakter.
- `src/screens/treasure/SafetyScreen.js`: sikkerhetsbekreftelse.
- `src/screens/treasure/TreasureReadyScreen.js`: deltakere og nedtelling.
- `src/screens/treasure/TreasureHuntScreen.js`: native spillskjerm.
- `src/screens/treasure/TreasureHuntScreen.web.js`: separat web-spillskjerm.
- `src/screens/treasure/TreasureFoundScreen.js`: funnbekreftelse.
- `src/screens/treasure/TreasureResultScreen.js`: resultat og XP-fordeling.
- `src/utils/treasureRules.js`: områderegler og koordinatgenerator.
- `src/utils/xpRules.js`: XP-, level- og belønningsregler.
- `src/utils/playerProgressStore.js`: midlertidig lokal XP-status.

## Gjeldende skattejaktflyt

```text
Home
  → TreasureSetup
  → Safety
  → TreasureReady
  → TreasureHunt
  → TreasureFound
  → TreasureResult
  → Home eller ny jakt
```

Når en jakt starter, vises den som pågående på Home med fremdrift og en `Fortsett`-knapp. Denne statusen er foreløpig lokal og overlever ikke en full appomstart.

## Spillmoduser

### Tåkekart

- kartflate med mørk tåke
- synlig radius etter vanskelighetsgrad
- samme statusrad, tid og resultatflyt som resten av skattejakten
- native-skjermen bruker felles regler fra `treasureRules.js`
- web-skjermen er ennå ikke koblet til de samme felles reglene

### Sonar

Planlagt som en minimal variant av samme spillskjerm:

- samme toppfelt, statuskort, åpneknapp, XP og resultatflyt
- rund radar i stedet for kart
- andre ikoner enn Tåkekart
- bip blir raskere når spilleren nærmer seg
- ingen presis skattmarkør
- `Åpne skatten` aktiveres først omtrent 3–5 meter fra skatten

Sonarens endelige bip- og radarlogikk er ikke ferdig implementert.

## Felles skatteregler

| Vanskelighet | Skatter | Områderadius | Synlig tåkeradius | Minste avstand mellom skatter |
|---|---:|---:|---:|---:|
| Enkel | 4 | 50 m | 10 m | 15 m |
| Medium | 8 | 150 m | 6 m | 20 m |
| Vanskelig | 12 | 300 m | 4 m | 50 m |

`generateTreasureCoordinates` i `src/utils/treasureRules.js`:

- genererer koordinater rundt vertens eller solospillerens posisjon
- holder skattene innenfor områdets radius
- validerer minsteavstand mellom skatter
- stopper etter maksimalt antall forsøk
- returnerer en tydelig feil dersom alle skatter ikke kan plasseres

Generatoren er laget, men er ennå ikke koblet til ekte GPS/startposisjon i spillflyten.

## XP-regler

| Vanskelighet | Fullføring | XP per skatt | Maks normal XP |
|---|---:|---:|---:|
| Enkel | 60 XP | 10 XP | 100 XP |
| Medium | 120 XP | 12 XP | 216 XP |
| Vanskelig | 220 XP | 15 XP | 400 XP |

Flerspillerregler planlagt for senere backend:

- alle aktive deltakere får fullførings-XP
- bare spilleren som finner skatten får skatt-XP
- vinnerbonus: 25 XP
- delt førsteplass: 15 XP hver

Levelsystemet støtter level 1–30 og stigende XP-krav. Belønninger er definert ved level 5, 10, 15, 20, 25 og 30.

Home viser oppdatert lokal total-XP etter at resultatet avsluttes. XP-statusen er foreløpig ikke persistent og nullstilles ved full appomstart.

## Kontakter og flerspiller

- `expo-contacts` er lagt til i `package.json` og `app.json`.
- valgt kontaktliste sendes videre til klar-til-start-skjermen.
- ekte invitasjoner, pushvarsler, synkronisering og backend kommer senere.
- pushvarsling ved funnet skatt er planlagt for V3.
- `package-lock.json` må oppdateres og committes før merge.

## Må gjøres før merge

Følg denne rekkefølgen:

```text
Koble web-tåkekart til felles regler
→ koble faktisk XP og funn til resultat
→ få med package-lock
→ synkroniser main inn i branchen
→ test hele flyten
→ merge
```

Mer konkret:

1. Oppdater `TreasureHuntScreen.web.js` til å bruke `getTreasureRules`.
2. Send faktisk vanskelighetsgrad, antall funn og fullføringsstatus til `TreasureResultScreen`.
3. Fjern den hardkodede demo-XP-en fra navigatoren.
4. Regenerer og commit `package-lock.json` etter `npm install`.
5. Hent `main` inn i `skattejakt-spillet` og løs eventuelle konflikter på arbeidsbranchen.
6. Test web og fysisk enhet.
7. Opprett/kontroller pull request og merge først etter godkjenning.

## Test før merge

```bash
git switch skattejakt-spillet
git pull origin skattejakt-spillet
npm install
npx expo start --web -c
```

Kontroller minst:

- hele flyten fra Home til resultat og tilbake
- Home-kort for pågående skattejakt
- `Fortsett` åpner riktig jakt
- Tåkekart på web og native bruker samme regler
- Enkel, Medium og Vanskelig viser riktige skatte- og områdeverdier
- faktisk antall funn brukes på resultatet
- riktig XP beregnes og legges til Home
- XP legges til bare én gang
- tilbakeknapper og avslutt-dialog
- 320, 375, 390, 393 og 430 px bredde
- ingen horisontal scrolling
- telefonkontakter på fysisk enhet
- appen starter etter ren installasjon fra oppdatert lockfil

## Ikke ferdig

- ekte GPS og kartdata
- faktisk kobling av koordinatgenerator til startposisjon
- produksjonsklar tåkeavdekking som lagres langs spillerens rute
- ferdig Sonar med radar og bip-frekvens
- persistent lokal lagring
- backend, pushvarsler og sanntidssynkronisering
- beskyttelse mot doble funn på server
- flerspillerresultat og «fant flest skatter»
- produksjonsklare release-builds
