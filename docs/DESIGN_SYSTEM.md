# Live Rebus Design System V2

## Status

Dette dokumentet beskriver gjeldende designretning etter at korrekt V2 HomeScreen ble verifisert og merget til `main`.

## Farger

```txt
Bakgrunn:        #0F172A
Kort/panel:      #1E293B
Sekundær flate:  #334155
Primær tekst:    #E2E8F0
Dempet tekst:    #94A3B8
Primær/orange:   #FF6B35
Skattejakt/gull: #F59E0B
Natur/grønn:     #22C55E
Rebus/lilla:     #8B5CF6
Spiller/blå:     #3B82F6
Fare/rød:        #EF4444
Border:          rgba(226, 232, 240, 0.12)
```

## Typografi

Anbefalt:

```txt
Primær font: systemfont / Inter
Displayfont: Poppins ved behov
Fallback: systemfont
```

Bruk tydelig hierarki og unngå å introdusere ny fontavhengighet uten konkret behov.

## Fontstørrelser

```txt
Hero title:       42
Section title:    24
Card title:       20–26
Body:             16
Muted/body small: 14
Button:           16
Small label:      13
```

Viktig innhold skal normalt ikke være mindre enn 12 pt.

## Spacing

```txt
Screen padding:       20
Card padding:         16–20
Section spacing:      28–32
Item/card gap:        12–16
Small gap:            8
Hero bottom spacing:  28
```

Spacing skal følge eksisterende HomeScreen-mønster før nye lokale varianter introduseres.

## Radius og overflater

- Kort skal bruke konsistente radiusverdier.
- Mørke overflater skal ha tydelig, men dempet separasjon.
- Glød og skygge brukes kontrollert og skal ikke redusere lesbarhet.
- Valgt tilstand skal ikke kommuniseres kun med farge.

## Touch targets

```txt
Minimum touch target: 44 x 44 pt
Primary button:       minst 54 pt høyde
Icon button:          minst 44 x 44 pt
Avatar:               minst 44 x 44 pt
```

## Tilgjengelighet

- Alle interaktive elementer skal ha korrekt `accessibilityRole`.
- Ikonknapper skal ha eksplisitt `accessibilityLabel`.
- Valgt tilstand skal bruke tekst, ikon eller form i tillegg til farge.
- Kontrast skal være tilstrekkelig på mørk bakgrunn.
- Layout må tåle større tekst uten å skjule primære handlinger.

## Safe area og mobil

- Bruk `SafeAreaView` fra `react-native-safe-area-context` der skjermen krever det.
- Primærhandling nederst må ikke dekkes av home indicator eller tastatur.
- Skjermen skal kunne scrolles på mindre enheter når innholdet krever det.

## HomeScreen som referanse

Følgende filer representerer gjeldende V2 HomeScreen i `main`:

```text
src/screens/home/HomeScreen.js
src/components/home/HomeChallengeCard.js
src/components/home/HomeUpcomingCard.js
assets/images/home/
docs/references/home-screen-reference.png
```

HomeScreen skal behandles som ferdig designreferanse. Endringer må gjøres i egen branch og gjennomgås visuelt før merge.

## Skattejakt-oppsett

Aktiv videreutvikling skjer i `skattejakt-oppsett`.

Skjermen skal følge samme designfamilie som HomeScreen:

- mørk bakgrunn
- oransje hovedhandling
- gullaksent for skatt
- tydelig valgt og ikke-valgt tilstand
- minimum 44 pt trykkflater
- stabil layout på små iPhone-størrelser og web
