# Sonar: retning, beslutninger og neste steg

Denne filen beskriver gjeldende produktretning for Sonar etter design- og konseptarbeid på `design-sonar-ui`.

## Hovedbeslutning

Sonar skal ikke være en GPS-avhengig skattejakt som standard.

Standardmodusen skal være en app-generert signaljakt:

```text
Sonaren søker
→ signalet bygger seg opp
→ STOPP! Nytt signal funnet
→ spilleren snur seg rolig rundt og sjekker området
→ funnet åpnes på samme skjerm
→ sonaren gjør klar neste signal
```

GPS kan senere være et eget valg for store uteområder, men skal ikke være standard for Sonar.

## Låst nettregel

Live Rebus krever internett/mobildata for spill.

Dette gjelder både alenespill og spill med venner. Årsaken er at appen uansett skal bruke innlogging, venner, varsler, progresjon, XP/resultat og senere synkronisert lagstatus. Én felles online-modell gir bedre spillopplevelse og mindre ustabil spesialkode.

Produktregel:

```text
Alle spill krever internett/mobildata.
Offline/P2P/Bluetooth er ikke kjerneflyt.
```

Dette betyr:

```text
Alenespill
- bruker samme online spillmodell
- ingen vennestatus
- samme progresjon/resultatlogikk

Vennespill
- krever innlogging og internett
- kan varsle venner
- kan synke funn, lagstatus, progresjon og resultat
```

Bluetooth/P2P skal ikke prioriteres som hovedløsning for vennespill. Det gir mer kode, mer testarbeid og høyere risiko for at meldinger om funn ikke når frem.

## Hvorfor uten GPS som standard

Barn beveger seg fort og uforutsigbart. GPS kan være treg, unøyaktig og avhengig av gode forhold. Den fungerer dårligere mellom bygg, under trær, inne, i lommer og når barna løper.

Sonar bør derfor være stabil uten GPS, meter eller kart. Internett brukes for innlogging, spilldata, varsler og synk, ikke for å gjøre Sonar til en GPS-jakt.

Målet er at Sonar skal føles fysisk og magisk uten at appen må vite nøyaktig hvor spilleren er.

## Foreslåtte moduser senere

```text
Sonar Standard
- standard
- uten GPS
- uten meter/kart
- krever internett/mobildata
- appen genererer signaler selv
- fokus: gå rolig, stopp, snu deg rundt, sjekk området

GPS-lagjakt
- avansert valg senere
- for større uteområder
- med foreldre eller lagleder
- bruker posisjon som ekstra hjelp
- krever internett/mobildata
- ikke standard
```

Unngå å skrive en fast aldersgrense i appen. Designet skal være enkelt nok for barn, men ikke låses til en bestemt alder.

## Spillregel

Kjerneinstruksjon:

```text
Hold telefonen flatt foran deg som en ekte sonar
Gå rolig og følg signalet
```

Presisering:

```text
Telefonen holdes flatt foran kroppen.
Telefonen skal ikke holdes sidelengs/landskap.
```

På skjerm under spill:

```text
SONAR SØKER
Gå rolig og hold telefonen foran deg

SIGNAL BYGGER
Fortsett rolig

STOPP!
Nytt signal funnet
Snu deg rolig rundt og sjekk området
```

Viktige meldinger skal ligge i hovedområdet ved radaren, ikke nederst ved knappen.

## XP-prinsipp

XP skal ikke være hovedmotoren i Sonar.

Regler:

- XP skal ikke være garantert i hvert spill.
- XP skal ikke gis basert på fart, løping, meter eller risting.
- XP skal ikke kunne farmes på små områder.
- XP kan senere brukes som sjeldne småsignal/bonus med cooldown og maksgrense.
- På korte eller små runder kan XP være deaktivert.

Hovedmålet er skatt/funn, ikke XP-farming.

## Sensorer senere

Aktuell prioritering:

```text
Nå:
- app-generert signalmotor uten GPS
- visuell sonar
- funnsekvens på samme skjerm
- internett/mobildata som felles spillkrav

Senere:
- accelerometer/skritt som aktivitetssjekk
- for mye risting/løping kan gjøre signalet ustabilt
- gyro/relativ retning som mild bonus
- innlogging/venner/varsler/synk
- GPS-lagjakt som avansert modus
- AR/kamera som eventuell bonus, ikke hovedmotor
```

Sensorer skal brukes for spillfølelse og aktivitet, ikke som presis fasit med meter og kart.

## Nå implementert på `design-sonar-ui`

- `src/utils/sonarSignalEngine.js` er opprettet.
- Sonar bruker app-generert signalmotor.
- Sonaren roterer hele tiden mens skjermen er aktiv.
- Signalnivåer: `Klar`, `Søker`, `Øker`, `Sterkt`, `Låst`.
- Toppstatus viser grønn `Sonar aktiv` når spillet er startet.
- Viktig `STOPP!`-melding vises i hovedområdet under radaren.
- Startpanelet vises bare før spillet starter.
- Etter start vises bare handling nederst når skatten kan åpnes.
- Funn skjer på samme Sonar-skjerm med `Skatt funnet!`-sekvens.
- Vanlige funn åpner ikke ny skjerm.
- Bare siste skatt går videre til slutt/resultatflyt.
- Haptics/vibrasjon er lagt inn for signalopptrapping og funn.
- Testtempo er med vilje raskt for designarbeid.

## Bevisst utsatt

- Instruksjonsbilde/animasjon på nedtellingsskjermen.
- Ekte lyd/pip for Sonar.
- Global lyd-/haptikkinnstilling.
- XP-småsignal.
- Sensordata fra accelerometer/skritt/gyro.
- GPS-lagjakt.
- Innlogging, venner, varsler og backend-synk.

## Neste anbefalte steg

1. Test dagens app-genererte Sonar-flyt på web.
2. Test haptics på fysisk telefon når dev build er klar.
3. Juster tekst og timing for signalmotoren.
4. Avgjør om testtempo skal beholdes midlertidig eller flyttes bak en testkonstant.
5. Legg senere inn nedtellingsinstruksjon med korrekt bilde, men ikke nå.
6. Deretter kan XP-småsignal, sensorer og online sosial flyt vurderes trinnvis.
