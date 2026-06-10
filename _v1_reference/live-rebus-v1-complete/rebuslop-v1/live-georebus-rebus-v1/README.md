# Live Georebus — Rebusløp V1

GitHub-klar MVP-start for **Rebusløp**-delen av appen.

## Inneholder

- Velg utfordring
- Lag rebusløp
- Velg antall poster
- Velg starttid
- Generer felles rute
- Host får vanlig rekkefølge
- Venn får motsatt rekkefølge
- Invitasjonsdeling
- Venterom
- Aktivt spill med kart eller kompass
- Riksantikvaren + Kartverket som datakilder
- Samme poster og samme spørsmål
- GPS + svar-godkjenning
- Godkjent-overlay
- Vibrasjon/haptics
- XP-resultat

## Palett

- Bakgrunn: `#0F172A`
- Kort: `#1E293B`
- Primær/orange: `#FF6B35`
- Natur/grønn: `#22C55E`
- Historie/lilla: `#8B5CF6`
- Tekst: `#E2E8F0`

## Installer

```bash
npm install
npx expo install expo-location react-native-maps expo-haptics expo-av
npm start
```

## Viktig

Dette er V1/MVP. For ekte produksjon bør du legge til:

- backend for ruter, invitasjoner, brukere og XP
- server-side svarvalidering
- server-side XP-utdeling
- deep links
- trygghetsfilter for ruter
- bedre ruteoptimalisering
- sanntidsstatus for begge lag
- lagring av historikk

## Filstruktur

```txt
App.js
README.md
app.json
package.json
src/
  components/
  screens/
  services/
  utils/
assets/sounds/
```
