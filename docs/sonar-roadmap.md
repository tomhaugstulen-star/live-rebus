# Sonar: retning, beslutninger og neste steg

Denne filen beskriver gjeldende produktretning for Sonar.

Aktiv branch nå:

```text
design/sonar-setup-card-scale
```

Åpen PR:

```text
PR #2: Legg til Sonar-oppsett
base: treasure-setup-cleanup
head: design/sonar-setup-card-scale
```

PR-en skal ikke merges uten eksplisitt beskjed.

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

## Visuell produktretning

Ny viktig avklaring:

```text
Home = teaser
Setup = valg
Sikkerhet = klargjøring
Spill = radar
```

Den store radaren hører hjemme på selve Sonar-spillskjermen, ikke på setup-siden.

Brukeren mener dagens visuelle kjede ikke er helhetlig nok:

```text
Home
→ Sonar setup
→ Sikkerhet
→ Sonar-spill
```

Neste arbeid bør derfor avklare og justere samlet uttrykk for Home og setup, ikke bare flytte enkelt-elementer.

## Nåværende Sonar setup

Setup er teknisk enkel:

```text
Sonar
Velg spillmodus
[Venn] [Venner]
```

Gjort:

- `Venn` og `Venner` er valgt som knappetekst
- grått panel er fjernet for Sonar
- uklar subtitle er fjernet
- transparente knapp-assets er lagt inn
- stor radar ble testet i setup-header, men fjernet igjen

Uavklart:

```text
- om Sonar setup skal beholde blå sci-fi-bakgrunn
- om Venn/Venner-bildene skal beholdes eller tones ned
- hvordan Home Sonar-kortet skal matche spill-skjermen bedre
- om SonarSetupRadar.js skal slettes eller brukes senere
```

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
- visuell sonar på spillskjermen
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

## Implementert grunnlag

- app-generert Sonar-signal i `src/utils/sonarSignalEngine.js`
- Sonar-radar med kontinuerlig bevegelse på spillskjermen
- signalnivåer: `Klar`, `Søker`, `Øker`, `Sterkt`, `Låst`
- funnsekvens på samme Sonar-skjerm
- bare siste skatt går til slutt/resultat
- haptics ved signalopptrapping og funn
- område- og Sonar-parametere i `treasureRules.js`
- TreasureSetup uten navnefelt
- ingen automatisk genererte jaktnavn i setup/navigator/session

## Bevisst utsatt

- samlet visuell retning for Sonar Home/setup/sikkerhet/spill
- ekte lyd/pip for Sonar
- global lyd-/haptikkinnstilling
- XP-småsignal
- accelerometer/skritt/gyro
- GPS-lagjakt
- innlogging, venner, varsler og backend-synk

## Neste anbefalte steg

1. Avklar om Sonar setup skal endres til mørkere/cyan uttrykk nærmere spillskjermen.
2. Avklar om Home Sonar-kort skal bruke radar/signal-identitet i stedet for blå sci-fi-bakgrunn.
3. Avklar om Venn/Venner-bildene beholdes eller erstattes av enklere valgkort.
4. Fjern eller gjenbruk `SonarSetupRadar.js` etter retningen er bestemt.
5. Test på fysisk telefon og be om nytt skjermbilde.
