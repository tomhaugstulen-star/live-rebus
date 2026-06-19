# Sonar: retning, beslutninger og neste steg

Denne filen beskriver gjeldende produktretning for Sonar og skattejakt på `design-sonar-ui`.

## Hovedbeslutning

Sonar skal som standard være en app-generert signaljakt, ikke en GPS-avhengig meter-/kartjakt.

```text
Sonaren søker
→ signalet bygger seg opp
→ STOPP! Nytt signal funnet
→ spilleren snur seg rolig rundt og sjekker området
→ funnet åpnes på samme skjerm
→ sonaren gjør klar neste signal
```

GPS kan senere bli et avansert valg for store uteområder, men er ikke standard for Sonar.

## Låst nettregel

```text
Alle spill krever internett/mobildata.
Offline/P2P/Bluetooth er ikke kjerneflyt.
```

Dette gjelder både alenespill og spill med venner. Appen skal etter hvert bruke innlogging, venner, varsler, progresjon, XP/resultat og synkronisert lagstatus.

## Låst funnregel

```text
Skattene genereres først fra valgt område.
Spillet har bare én aktiv skatt eller ett aktivt signal om gangen.
Neste signal åpnes først når forrige funn er ferdig registrert.
```

Regelen gjelder også senere XP-bonusfunn: ett aktivt bonusfunn, én registrering, én utbetaling.

## Område og Sonar-synlighet

Vanskelighetsgrad styrer antall skatter, anbefalt uteområde og hvor langt Sonar-synligheten går foran spilleren:

```text
Enkel:     4 skatter  · ca. 50 m diameter  · 2 m Sonar-synlighet
Medium:    8 skatter  · ca. 80 m diameter  · 2,5 m Sonar-synlighet
Vanskelig: 12 skatter · ca. 150 m diameter · 3 m Sonar-synlighet
```

I koden ligger dette i `src/utils/treasureRules.js` som:

```text
areaLabel
recommendedAreaDiameterMeters
areaRadiusMeters
sonarForwardVisibilityMeters
```

Sonar-skjermen skal fortsatt ikke bli en meter-/kartskjerm. Tallene er spillparametere og forklaring i setup, ikke hovedspråk under jakt.

## TreasureSetup

Navnefeltet er fjernet. Appen skal ikke generere kunstige jaktnavn.

TreasureSetup skal være en enkel oppsettsside med:

```text
spillemodus
hvem spiller
vanskelighetsgrad
infokort for valgt vanskelighetsgrad
Gå videre
```

Infokortet skal forklare valgt nivå med stedseksempel, område og Sonar-synlighet, uten å presse alt inn i de små vanskelighetskortene.

Trykkflater og tekst skal ikke presses under mobilvennlige nivåer. Nåværende mål:

```text
spillemodus-kort: 112 px høyde
spiller-knapper: 58 px høyde
vanskelighetskort: 68 px høyde
Gå videre: 56 px høyde
modal-knapper: minst 44 px
```

Brukeren har sagt at setup-siden fortsatt skal justeres visuelt i neste chat.

## Hvorfor GPS ikke er hovedmotor

Barn beveger seg fort og uforutsigbart. GPS kan henge etter, hoppe, være unøyaktig mellom bygg/trær og fungere dårlig når telefonen holdes feil.

GPS kan brukes til å generere og avgrense skatter i en senere GPS-modus. Selve funnfølelsen bør fortsatt styres tolerant av Sonar/app-signal.

```text
GPS/område = grunnlag for plassering
Sonar/app-signal = aktivt funn
Session/synk = gyldig funn og status
```

## Mulige moduser senere

```text
Sonar Standard
- standard
- uten GPS/meter/kart som hovedopplevelse
- krever internett/mobildata
- appen genererer signaler selv

GPS-lagjakt
- avansert valg senere
- for større uteområder
- bruker GPS grovt til område/plassering
- bruker ikke eksakt GPS som funnfasit
- krever internett/mobildata
```

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

- XP skal ikke være garantert i hvert spill.
- XP skal ikke gis basert på fart, løping, meter eller risting.
- XP skal ikke kunne farmes på små områder.
- XP kan senere brukes som sjeldne småsignal/bonus med cooldown og maksgrense.
- På korte eller små runder kan XP være deaktivert.

## Sensorer senere

```text
Nå:
- app-generert signalmotor uten GPS
- visuell sonar
- funnsekvens på samme skjerm
- internett/mobildata som felles spillkrav
- områdeparameter per vanskelighetsgrad
- én aktiv skatt / ett aktivt signal om gangen

Senere:
- accelerometer/skritt som aktivitetssjekk
- for mye risting/løping kan gjøre signalet ustabilt
- gyro/relativ retning som mild bonus
- GPS-lagjakt som avansert modus
- AR/kamera som eventuell bonus
```

Sensorer skal brukes for spillfølelse og aktivitet, ikke som presis fasit.

## Implementert på `design-sonar-ui`

- app-generert Sonar-signal i `src/utils/sonarSignalEngine.js`
- Sonar-radar med kontinuerlig bevegelse
- signalnivåer: `Klar`, `Søker`, `Øker`, `Sterkt`, `Låst`
- grønn `Sonar aktiv` etter spillstart
- `STOPP!` i hovedområdet under radaren
- startpanel bare før spillstart
- funnsekvens på samme Sonar-skjerm
- bare siste skatt går til slutt/resultat
- haptics ved signalopptrapping og funn
- område- og Sonar-parametere i `treasureRules.js`
- TreasureSetup uten navnefelt og med infokort for valgt nivå
- ingen automatisk genererte jaktnavn i setup/navigator/session

## Bevisst utsatt

- ferdig visuell justering av TreasureSetup
- instruksjonsbilde/animasjon på nedtellingsskjermen
- ekte lyd/pip for Sonar
- global lyd-/haptikkinnstilling
- XP-småsignal
- accelerometer/skritt/gyro
- GPS-lagjakt
- innlogging, venner, varsler og backend-synk

## Neste anbefalte steg

1. Fortsett med visuell justering av TreasureSetup.
2. Test at setup fungerer uten navnefelt.
3. Test Sonar visuelt i web.
4. Test haptics på fysisk telefon når dev build er klar.
5. Juster signalmotorens timing og tekster.
6. Flytt eventuelt testtempo bak en tydelig testkonstant før merge.
