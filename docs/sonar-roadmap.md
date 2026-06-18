# Sonar: retning, beslutninger og neste steg

Denne filen beskriver gjeldende produktretning for Sonar etter design- og konseptarbeid på `design-sonar-ui`.

## Hovedbeslutning

Sonar skal ikke være en GPS-avhengig skattejakt som standard.

Standardmodusen skal være en app-generert signaljakt:

```text
Sonaren søker
→ signalet bygger seg opp
→ STOPP! Nytt signal funnet
→ spilleren snur seg rundt og sjekker området
→ funnet åpnes på samme skjerm
→ sonaren gjør klar neste signal
```

GPS kan senere være et eget valg for foreldre-/lagspill, men skal ikke være standard for barn som leker fritt.

## Hvorfor uten GPS som standard

Barn beveger seg fort og uforutsigbart. GPS kan være treg, unøyaktig og avhengig av gode forhold. Den fungerer dårligere mellom bygg, under trær, inne, i lommer og når barna løper. Sonar bør derfor være stabil uten GPS, mobildata eller kart.

Målet er at Sonar skal føles fysisk og magisk uten at appen må vite nøyaktig hvor spilleren er.

## Foreslåtte moduser senere

```text
Trygg signaljakt
- standard
- uten GPS
- fungerer uten mobildata
- appen genererer signaler selv
- barn kan spille raskt
- fokus: gå rolig, stopp, snu deg rundt, sjekk området

GPS-lagjakt
- avansert valg senere
- for større uteområder
- med foreldre eller lagleder
- bruker posisjon som ekstra hjelp
- ikke standard
```

Unngå å skrive en fast aldersgrense i appen. Designet skal være enkelt nok for barn, men ikke låses til en bestemt alder.

## Spillregel

Kjerneinstruksjon:

```text
Hold telefonen foran deg som en ekte sonar
Gå rolig og følg signalet
```

På skjerm under spill:

```text
Gå rolig rundt. Ikke spring.
STOPP! Nytt signal funnet.
Snu deg rundt og sjekk området før du åpner funnet.
```

Dette skal være en sikkerhets- og spillvane, ikke en streng teknisk vinkelkontroll.

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

Senere:
- accelerometer/skritt som aktivitetssjekk
- for mye risting/løping kan gjøre signalet ustabilt
- gyro/relativ retning som mild bonus
- QR-kode for å dele samme jakt med venner
- GPS-lagjakt som avansert modus
- AR/kamera som eventuell bonus, ikke hovedmotor
```

Sensorer skal brukes for spillfølelse og aktivitet, ikke som presis fasit med meter og kart.

## Nå implementert på `design-sonar-ui`

- `src/utils/sonarSignalEngine.js` er opprettet.
- Sonar bruker app-generert signalmotor.
- Sonaren roterer hele tiden mens skjermen er aktiv.
- Signalnivåer: `Klar`, `Svakt`, `Middels`, `Sterkt`, `Svært nær`.
- Når signalet er klart viser skjermen `STOPP! Nytt signal funnet`.
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
- QR-deling av generert jakt.
- Backend/flerspillersynkronisering.

## Neste anbefalte steg

1. Test dagens app-genererte Sonar-flyt på web.
2. Test haptics på fysisk telefon når dev build er klar.
3. Juster tekst og timing for signalmotoren.
4. Avgjør om testtempo skal beholdes midlertidig eller flyttes bak en testkonstant.
5. Legg senere inn nedtellingsinstruksjon med illustrasjon, men ikke nå.
6. Deretter kan XP-småsignal og sensorer vurderes trinnvis.
