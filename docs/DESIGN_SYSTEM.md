# Live Rebus Design System V1

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
