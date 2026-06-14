# Live Rebus

Live Rebus er en norsk aktivitetsapp med to hovedaktiviteter:

- Rebusløp
- Skattejakt

Prosjektet er bygget med Expo SDK 56, React Native og React Navigation 7.

## Status

- V1 web/demo er ferdig og brukes som funksjonell referanse.
- V2 er aktiv design- og poleringsrunde.
- Home Screen V2 er visuelt ferdigstilt og godkjent.
- Kart, ekte GPS og full native Fog of War hører til V3.

Se `docs/V2_STATUS.md` for detaljert status.

## Teknisk oppsett

- `App.js` starter `src/navigation/AppNavigator.js`
- Expo Router brukes ikke som aktiv navigasjonsløsning.
- Web-safe skjermfiler brukes der native avhengigheter ikke kan lastes på web.

## Kom i gang

Installer avhengigheter:

```bash
npm install
```

Start utviklingsserveren:

```bash
npm start
```

Start web:

```bash
npm run web
```

Ved regresjonstest kan cachen tømmes:

```bash
npx expo start --web -c
```

## Dokumentasjon

- `docs/DESIGN_V2.md` – låst V2-designretning
- `docs/V2_STATUS.md` – implementerings- og teststatus
- `docs/PRODUCT_DECISIONS.md` – produktbeslutninger
- `docs/APP_STORE_READINESS.md` – krav før App Store-innsending
- `docs/references/home-screen-reference.png` – visuell referanse for Home
