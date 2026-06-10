# Live Rebus – V2 design

## Status

V1 web/demo er lukket.

V2 er designrunde og visuell polering. V2 skal ikke innføre kart, GPS, native Fog of War eller annen tung V3-teknikk.

Dette dokumentet beskriver første V2-retning for Home basert på mockupen med mørk adventure-stil, Live Rebus-branding, hero-illustrasjon, store valgkort og progresjon.

## V2-designmål

Home skal føles som et adventure-dashboard, ikke bare en meny.

Mål:

- gjøre appen mer premium og spillaktig
- gjøre Rebusløp og Skattejakt tydelig forskjellige
- løfte Live Rebus-branding
- gi tydelig primærhandling
- vise progresjon og neste planlagte aktivitet
- holde designen gjennomførbar i React Native / Expo

## Home – hovedstruktur

Home bør bygges som én scrollbar dashboard-side.

Rekkefølge:

1. Profil/avatar til venstre og settings til høyre.
2. Personlig hilsen.
3. Stor `Live Rebus`-tittel.
4. Kort pitch.
5. Primær CTA: `Start nytt eventyr`.
6. Seksjon: `Velg utfordring`.
7. Kort: Rebusløp.
8. Kort: Skattejakt.
9. Seksjon: `Neste planlagte`.
10. Seksjon: `Din progresjon`.

Systemstatus som klokke, batteri og mobilstatus er ikke app-UI. Det skal ikke kodes som del av appskjermen.

## Hybrid designstrategi

Home skal bruke en hybrid løsning:

- UI, tekst, knapper og dynamiske verdier kodes.
- Dekor, stemning og komplekse illustrasjoner legges inn som bilder.

Dette gir raskere V2-implementering, bedre kontroll på uttrykket og lavere risiko for tung kode.

## Bilde-assets

Følgende assets bør lages og legges i repo før implementering.

### `assets/images/home_hero_art.png`

Brukes øverst i Home.

Innhold:

- mørk landskapsbakgrunn
- glød i horisonten
- vei/rute som slynger seg innover
- eventyrstemning
- eventuell pin/markør
- ingen tekst
- ingen knapper
- ingen UI-elementer som må kunne trykkes

Formål:

- gi Home dybde og identitet
- støtte `Live Rebus`-tittel og primær CTA
- være dekorativt bakgrunnselement

### `assets/images/home_card_rebus_art.png`

Brukes som dekor i Rebusløp-kortet.

Innhold:

- lilla/mystisk rebus-stemning
- sti/rute/spørsmålstegn/puslespill-tema
- ingen tekst
- ingen knapp

Formål:

- gjøre Rebusløp visuelt distinkt
- støtte lilla aksent

### `assets/images/home_card_treasure_art.png`

Brukes som dekor i Skattejakt-kortet.

Innhold:

- mørk/oransje/gull skattejakt-stemning
- kart/sti/skatt/glød som dekor
- ingen tekst
- ingen knapp

Formål:

- gjøre Skattejakt visuelt distinkt
- støtte gull/oransje aksent

### Valgfritt: `assets/images/home_bg_texture.png`

Kan brukes som svak bakgrunnstekstur.

Innhold:

- mørk tekstur
- svak noise/vignette/glow
- ingen tekst

Formål:

- gi mer dybde i hele Home
- skal være subtil og ikke svekke lesbarhet

## Hva som skal kodes som UI

Følgende skal ikke bakes inn i bilder:

- `Hei, Eventyrer!`
- `Live Rebus`
- ingress/pitch
- `Start nytt eventyr`-knapp
- Rebusløp-kortets tittel, tekst og knapp
- Skattejakt-kortets tittel, tekst og knapp
- `Neste planlagte`
- ventrom-knapp
- level, XP og progressbar
- avatar/profil
- settings-knapp
- alle navigasjonshandlinger

Grunn:

- tekst må kunne endres
- data kan bli dynamisk senere
- bedre tilgjengelighet
- bedre responsivitet
- enklere vedlikehold

## Home-komponenter

Anbefalt intern oppdeling når Home implementeres:

```text
HomeScreen
├─ HomeHeader
├─ HomeHero
├─ PrimaryAdventureButton
├─ ChallengeCard
├─ UpcomingEventCard
└─ ProgressCard
```

Dette er ikke et krav i første commit, men anbefalt for å unngå at `HomeScreen.js` blir for stor.

## Visuell stil

Retning:

- mørk adventure-dashboard
- høy kontrast
- oransje/gull glow for primærhandling
- lilla aksent for Rebusløp
- gull/oransje aksent for Skattejakt
- store avrundede cards
- tydelige ikoner
- myk skygge/glow, men ikke tung animasjon i V2

## Palett

Eksisterende palett videreføres:

```text
background: #0F172A
surface/card: #1E293B
surfaceAlt: #334155
text: #E2E8F0
muted: #94A3B8
primary/orange: #FF6B35
treasure/gold: #F59E0B
success/green: #22C55E
rebus/purple: #8B5CF6
danger/red: #EF4444
```

Home-spesifikk bruk:

- `#FF6B35` brukes på primær CTA og Live-aksent.
- `#F59E0B` brukes på Skattejakt og XP/progresjon.
- `#8B5CF6` brukes på Rebusløp.
- `#0F172A` brukes som basebakgrunn.
- `#1E293B` og transparente varianter brukes på cards.

## Typografi

Foreslått hierarki:

- App-tittel: svært stor, tung vekt, hvit/oransje delt aksent.
- Seksjonstitler: tydelige, hvite, fet vekt.
- Korttitler: store og fargede etter modus.
- Body: lys grå, god linjehøyde.
- Knapper: fet, hvit eller mørk tekst avhengig av bakgrunn.
- Metadata: mindre tekst, muted.

Ingen fontbytte er nødvendig i første V2-steg. Bruk systemfont inntil videre.

## Spacing og layout

Foreslått retning:

- sidepadding: 20–24 px
- stor toppseksjon med hero
- cards med 20 px padding
- radius 20–24 px på store cards
- radius 16–18 px på knapper
- minimum touch height 44 px
- tydelig avstand mellom hovedseksjoner

## Home-copy

Foreslått tekst:

```text
Hei, Eventyrer!
Live Rebus
Utforsk byen som et spill.
Finn poster, løs spørsmål, jakt på skatter og samle XP ute i virkelige omgivelser.
Start nytt eventyr
```

Rebusløp:

```text
Rebusløp
Konkurrer med en venn. Samme rute, samme spørsmål og motsatt vei.
Velg rebusløp
```

Skattejakt:

```text
Skattejakt
Utforsk området, følg signalet og finn skatten.
Velg skattejakt
```

Merk: V2 kan bruke mer dramatisk copy for testbrukere, men bør ikke love ekte kart/GPS/Fog of War før V3 dersom dette skal kommuniseres bredere.

## Rebusløp-kort

Skal signalisere:

- konkurranse
- spørsmål
- rute
- motsatt vei
- lilla identitet

Kodes:

- tittel
- beskrivelse
- knapp
- border/glow
- ikon

Bilde:

- stemningsbakgrunn i kortet

## Skattejakt-kort

Skal signalisere:

- skatt
- signal/sonar
- utforskning
- gull/oransje identitet

Kodes:

- tittel
- beskrivelse
- knapp
- border/glow
- ikon

Bilde:

- stemningsbakgrunn i kortet

## Neste planlagte

Skal vise neste planlagte event som kort.

Første V2-versjon kan fortsatt bruke eksisterende demo-data.

Kodes:

- eventtype
- starttid
- antall poster / kort metadata
- knapp: `Åpne venterom`

## Din progresjon

Skal vise spillerens progresjon på en spillaktig måte.

Kodes:

- level-badge
- XP
- progressbar
- tekst: `80 XP igjen til neste level`

Dette skal ikke være bilde, fordi XP og level senere skal være dynamisk.

## V2 skal ikke gjøre

V2 skal ikke innføre:

- ekte kart
- GPS
- native Fog of War
- `react-native-maps` i web-safe filer
- ny spillmekanikk
- større refaktor av Rebusløp/Skattejakt
- backend eller konto-/vennesystem

## Første anbefalte implementeringssteg

Når assets finnes, anbefales første kode-steg:

```text
Oppdater HomeScreen.js til ny V2-struktur med eksisterende data og nye bilde-assets.
```

Avgrensning for første Home-commit:

- én skjerm: `src/screens/home/HomeScreen.js`
- kun Home
- ingen navigasjonsendring
- ingen V3-teknikk
- ingen endring i Rebusløp eller Skattejakt-flyt
- bruk placeholder hvis assets ikke finnes ennå

## Asset-regel

Ikke legg tekst i bildene.

Bilder skal kun inneholde:

- stemning
- landskap
- glød
- rute/vei
- dekorative symboler

Bilder skal ikke inneholde:

- overskrifter
- knapper
- labels
- XP
- klokke/statusbar
- UI som brukeren må kunne trykke på
