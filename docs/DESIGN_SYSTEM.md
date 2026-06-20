# Live Rebus Design System V1

## Prioritet: iPhone- og App Store-sikker layout

Disse kravene gjelder for alle nye skjermer og alle designendringer. De har høyere prioritet enn lokale visuelle ideer, mockups og enkeltstående skjermbilder.

### Ingen fastlåst skjermhøyde

- Ikke design som bare passer én iPhone.
- Alt ordinært skjerminnhold skal kunne ligge i `ScrollView` når høyden kan variere.
- CTA nederst skal ha safe-area-padding slik at den ikke treffer home indicator.

### Safe area skal respekteres

- Ikke legg innhold under statusbar.
- Ikke legg knapp eller primærhandling under home indicator.
- Header skal bruke trygg topp-padding, normalt via `SafeAreaView` eller tilsvarende insets.

### Touch targets

- Alle trykkflater skal være minst ca. 44 x 44 pt.
- Primærknapp skal være minst ca. 54 pt høy.
- Små radio-, check- eller ikon-elementer skal ikke være eneste trykkflate; hele raden eller kortet skal være trykkbart.

### Responsiv bredde

- Ikke design etter én skjermbredde.
- Layout må fungere på små iPhones og større iPhones.
- Sidepadding skal normalt være 20–24 pt, men kan reduseres kontrollert på små skjermer.

### Norsk tekst må tåles

- Layout skal ikke knekke på lengre norske labels som `Vanskelighetsgrad` eller `Velg venner fra telefonbok`.
- Viktig tekst skal ikke presses inn i for smale kort.
- Bruk `numberOfLines`, fleksibel wrapping eller vertikal layout der norsk tekst ellers blir for trang.

### Scrolling er tillatt og forventet

- På små iPhones skal skjermen kunne scrolle.
- Scroll skal føles ryddig, ikke som om innhold er stappet inn.
- Viktige handlinger skal fortsatt ha god visuell plass og trygg bunnspacing.

### Ikke mockup-logikk

- Ikke implementer design som bare fungerer visuelt i et bilde, men ikke i Expo dev-client.
- Bruk enkel, stabil React Native-layout først.
- Avanserte effekter, tunge assets og fastlåste komposisjoner skal unngås hvis de svekker robusthet på fysisk iPhone.

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
Primær font: Inter
Display/font for store titler: Poppins
Fallback: systemfont
```

Expo-installasjon ved bruk av custom fonts:

```bash
npx expo install expo-font
```

Hvis du ikke laster inn fonts ennå, bruker komponenten systemfont med fontWeight.

## Fontstørrelser

```txt
Hero title:       42
Section title:    24
Card title:       26
Body:             16
Muted/body small: 14
Button:           16
Small label:      13
```

## Spacing

```txt
Screen padding:       20
Card padding:         20
Section spacing:      32
Item/card gap:        16
Small gap:            8
Hero bottom spacing:  28
```

## Touch targets

```txt
Minimum touch target: 44 x 44 pt
Primary button:       54 pt height
Icon button:          48 pt
Avatar:               48 pt
```

## App Store / iOS-notater

- Bruk SafeAreaView.
- Ikke bruk tekst under 12 pt for viktig innhold.
- Bruk 16 pt eller mer for brødtekst.
- Ikke bruk bare farge for å forklare spillmodus; bruk også ikon og tekst.
- Avatar skal ha accessibilityLabel: "Profil".
- Tannhjul skal ha accessibilityLabel: "Innstillinger".
- Alle knapper skal ha minst 44 pt trykkflate.
