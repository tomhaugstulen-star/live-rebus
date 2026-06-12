# Live Rebus

## Status

- Aktiv baseline: `fc4552c`
- V1 web/demo er ferdig og brukes som referanse
- Senere V2-arbeid er bevisst satt til side
- Nåværende prosjektfase: designfase før videre implementasjon

Live Rebus er en norsk aktivitetsapp med to hovedspor: Rebusløp og Skattejakt. Baseline `fc4552c` viser en Expo/React Native-app med egen navigator, delte skjermflyter og en web-testbar skattejaktvisning.

## Teknisk Oppsett

- Expo SDK 56
- React Native
- React Navigation 7
- `App.js` starter `src/navigation/AppNavigator.js`
- Den tilsiktede Live Rebus-kjeden bruker App.js og React Navigation. Repoet inneholder også et Expo Router-startertre under src/app, som kan påvirke web-start og må avklares før videre implementasjon.

## Kom i Gang

Installer avhengigheter:

```bash
npm install
```

Start appen:

```bash
npm start
```

Start web:

```bash
npm run web
```

## Prosjektfase

Arbeidet er i en designfase. Skjermer og navigasjonsflyt skal designes og godkjennes før videre implementasjon. V1 web/demo er referansegrunnlaget; senere V2-implementasjon skal ikke beskrives som ferdig i dokumentasjonen.

## Videre Dokumentasjon

Se også [docs/README.md](docs/README.md).
