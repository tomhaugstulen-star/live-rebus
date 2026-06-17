# Prosjektstatus: Live Rebus / Skattejakt

Sist oppdatert på branch:

```text
skattejakt-spillet
```

## Sammendrag

Skattejaktmodulen har nå en komplett visuell navigasjonsflyt fra Home til resultat, lokal aktiv jakt på Home, felles regler for skatteplassering, XP-regler og en lokal XP-oppdatering. Modulen er fortsatt en V2-prototype og er ikke klar for merge før de kritiske punktene i merge-planen er fullført.

## Ferdig eller delvis ferdig

### Navigasjon og skjermer

- Home
- TreasureSetup
- Safety
- TreasureReady
- TreasureHunt
- TreasureFound
- TreasureResult

### Oppsett

- navn på jakt
- Tåkekart eller Sonar
- alene eller med venner
- Enkel, Medium eller Vanskelig
- telefonkontaktvalg

### Aktiv jakt på Home

- opprettes ved start
- vises som pågående
- viser funn/progresjon
- `Fortsett` åpner jakten

Begrensning: lokal minnestatus, ikke persistent.

### Skatteregler

- sentral regelmodul
- tilfeldig koordinatgenerator
- områderadius
- tåkeradius
- minimumsavstand
- maksimalt antall plasseringsforsøk
- tydelig feilresultat ved mislykket plassering

Begrensning: ikke koblet til ekte GPS eller faktisk spillstate.

### XP og level

- XP per fullføring
- XP per skatt
- vinnerbonusregler definert
- level 1–30
- milepælbelønninger
- lokal XP-oppdatering på Home

Begrensning: navigatoren bruker fortsatt demo-XP/resultatdata.

## Gjeldende filstruktur

```text
src/
  components/
    home/
      HomeChallengeCard.js
      HomeUpcomingCard.js
    treasure/
      TreasureSetupHeader.js
  navigation/
    AppNavigator.js
  screens/
    home/
      HomeScreen.js
    rebus/
      ...
    treasure/
      AreaCheckScreen.js
      SafetyScreen.js
      TreasureSetupScreen.js
      TreasureReadyScreen.js
      TreasureReadyScreen.styles.js
      TreasureHuntScreen.js
      TreasureHuntScreen.web.js
      TreasureHuntScreen.styles.js
      TreasureFoundScreen.js
      TreasureResultScreen.js
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

## Kritiske tekniske avvik

### Web og native er separate

`TreasureHuntScreen.js` og `TreasureHuntScreen.web.js` er to separate implementasjoner. Endringer i én fil gjelder ikke automatisk den andre.

Native bruker felles skatteregler. Web gjør det ikke ennå.

### Resultatdata er ikke autoritativ

Resultatsiden støtter riktig beregning, men navigatoren sender fortsatt hardkodede demoverdier. Derfor kan Home-XP bli feil i nåværende testflyt.

### Lockfil mangler i branch-differansen

`package.json` inneholder `expo-contacts`, men `package-lock.json` må regenereres og committes før merge.

### Branch er diverged

Ved siste kontroll:

```text
ahead_by: 104
behind_by: 7
status: diverged
```

Merge uten synkronisering anbefales ikke.

## Beslutninger som er låst

### Tåkekart

| Nivå | Antall | Område | Synlig radius | Minste skattavstand |
|---|---:|---:|---:|---:|
| Enkel | 4 | 50 m | 10 m | 15 m |
| Medium | 8 | 150 m | 6 m | 20 m |
| Vanskelig | 12 | 300 m | 4 m | 50 m |

### Sonar

- samme skjermstruktur som Tåkekart
- rund radar i stedet for kart
- egne ikoner
- ingen presis skattmarkør
- bip-frekvens øker når avstanden minker
- åpning omtrent 3–5 meter fra skatt

### XP

| Nivå | Fullføring | Per skatt | Maks normal XP |
|---|---:|---:|---:|
| Enkel | 60 | 10 | 100 |
| Medium | 120 | 12 | 216 |
| Vanskelig | 220 | 15 | 400 |

### V3

- backend
- pushvarsler
- delt starttid og koordinater
- første spiller per skatt
- dobbeltfunnbeskyttelse
- «fant flest skatter»

## Obligatorisk merge-plan

```text
Koble web-tåkekart til felles regler
→ koble faktisk XP og funn til resultat
→ få med package-lock
→ synkroniser main inn i branchen
→ test hele flyten
→ merge
```

### Status per punkt

- [ ] Web-tåkekart bruker `getTreasureRules`
- [ ] Navigator sender faktisk vanskelighetsgrad
- [ ] Navigator sender faktisk antall funn
- [ ] Hardkodet demo-XP er fjernet
- [ ] XP utbetales bare én gang
- [ ] `package-lock.json` er oppdatert og committed
- [ ] `origin/main` er merget inn i `skattejakt-spillet`
- [ ] Konflikter er løst på arbeidsbranchen
- [ ] Web-flyt er testet
- [ ] Fysisk enhet er testet
- [ ] Pull request er kontrollert
- [ ] Merge er eksplisitt godkjent

## Testmatrise

### Web

- 320 px
- 375 px
- 390 px
- 393 px
- 430 px
- ingen horisontal scrolling
- alle tre vanskelighetsgrader
- Home-status og `Fortsett`
- resultat og XP

### Fysisk enhet

- kontaktrettigheter
- GPS-rettigheter
- reell posisjonsoppdatering når det implementeres
- Sonar-lyd når det implementeres
- safe area
- tilbakeknapper

### Ren installasjon

```bash
npm ci
npx expo start --web -c
```

`npm ci` skal fungere før merge. Det krever korrekt `package-lock.json`.

## Ikke blokkerende for neste merge

Følgende kan tas senere:

- full Sonar-lydmotor
- produksjonsklar tåkemaske
- «Gratulerer, du fant flest skatter»
- detaljert flerspillerresultat
- vinnerbonus i faktisk backendflyt
- pushvarsler
- persistent appstatus

## Dokumentasjonsansvar

Ved videre endringer skal minst disse vurderes oppdatert:

- `README.md`
- `docs/project-status.md`
- `docs/treasure-hunt-flow.md`
- `docs/chat-handoff.md`
- `docs/branch-structure.md`
