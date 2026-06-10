# Live Rebus — Skattejakt V1 + Radarmodus

Oppdatert GitHub-klar MVP-start for **Skattejakt**.

## Nytt i denne versjonen

- Radarmodus lagt inn i V1
- Hint er gjort om til knapp
- Kart / Kompass / Radar er egne visninger
- Radarmodus viser ikke kart/kompass-tabs
- Tåke brukes bare i Kartmodus
- Sikkerhetsbekreftelse er obligatorisk før start

## Inneholder

- Velg utfordring
- Skattejakt-oppsett
- Områdesjekk
- Sikkerhet først
- Aktiv skattejakt:
  - Kartmodus (Fog of War)
  - Kompassmodus
  - Radarmodus
- Hint-knapp med 3 hintnivåer
- Godkjenning av skatt
- Lyd-/vibrasjonsfeedback
- XP/resultat

## Palett

- Bakgrunn: `#0F172A`
- Kort: `#1E293B`
- Sekundær flate: `#334155`
- Tekst: `#E2E8F0`
- Dempet tekst: `#94A3B8`
- Primær/orange: `#FF6B35`
- Skatt/gull: `#F59E0B`
- Suksess/grønn: `#22C55E`
- Lilla: `#8B5CF6`

## Installer

```bash
npm install
npx expo install expo-location react-native-maps expo-haptics expo-av
npm start
```

## Filstruktur

```txt
App.js
README.md
app.json
package.json
assets/sounds/README.md
docs/DESIGN_SYSTEM.md
src/components/
src/screens/
src/utils/
```

## Viktig

Dette er fortsatt V1/MVP. For produksjon bør du senere legge til:

- backend for bruker, XP og skattejakter
- server-side XP-utdeling
- lagring av fullførte jakter
- tryggere områdefilter
- ekte lydfil i `assets/sounds/approved.mp3`
