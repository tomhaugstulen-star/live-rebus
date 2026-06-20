# Current handoff

Sist oppdatert: 2026-06-20.

Repo: `tomhaugstulen-star/live-rebus`
Branch: `home-reconstruction`

Denne filen er gjeldende overtakelsesnotat. Eldre dokumenter kan være utdatert.

## Status nå

Home har tre kort:

- Rebusløp -> RebusSetup
- Skattejakt -> TreasureSetup med `initialVariant: "fog"`
- Sonar -> SonarSetup

Sonar-oppsett er implementert:

`Home -> SonarSetup -> Safety -> TreasureReady -> TreasureHunt`

Siste relevante Sonar-commit før denne dokumentasjonen:

`6bfbfc057095bf2ea11dac4ec670ac7b7064e254` – skalerte ned Sonar player cards.

Siste verdiopprydding:

- `36d49c604a02dd1f595750aa70fb3bf3103e621b` – TreasureReadyScreen henter nå verdier fra navigationConfig.
- `86c2376d1f11c9332cd375fa1bf46e673af485a1` – treasureRules er samkjørt med 4/6/8 og 50/75/150.

## SonarSetup

Fil: `src/screens/treasure/SonarSetupScreen.js`

Nåværende design:

- solid mørk bakgrunn: `#020A14`
- cyan/glow: `#22D3EE`
- radar ca. 188 px
- haptics via `expo-haptics`
- to bildeknapper side ved side
- `sonar-player-solo.webp`
- `sonar-player-friends.webp`
- player cards er satt til `132 x 140`
- `resizeMode="contain"`

Brukeren har ikke godkjent siste kortstørrelse ennå. Neste chat bør be om nytt skjermbilde før mer Sonar-design.

Ikke ferdig:

- Venner-steget er placeholder for telefonbok.
- Back-knappen går til Home, ikke ett Sonar-steg tilbake.
- `sonar-setup-background.webp` finnes, men er ikke aktiv fordi native layering tidligere laget problemer.

## Skattejaktverdier

Følgende verdier er nå samkjørt i aktiv flyt:

- Enkel: 4 skatter / 50 m diameter
- Medium: 6 skatter / 75 m diameter
- Vanskelig: 8 skatter / 150 m diameter

Oppdatert eller indirekte samkjørt:

- `src/navigation/navigationConfig.js`
- `src/utils/treasureRules.js`
- `src/screens/treasure/TreasureReadyScreen.js`
- `src/components/treasure/TreasureSetupDetails.js` bruker `getTreasureRules()` og får dermed nye tall fra `treasureRules.js`.

Merk: `generateTreasureCoordinates()` i `treasureRules.js` er ikke aktiv i nåværende flyt og returnerer kontrollert feilmelding for automatisk GPS-plassering. Standard Sonar/Tåkejakt-flyt bruker ikke ekte GPS-plassering nå.

## Package/audio

`package.json` inneholder fortsatt `expo-av`. Ikke endre pakker uten eksplisitt avtale. Relevante skjermfiler importerer ikke `expo-av` nå.

## Dokumentstatus

Denne filen er autoritativ for neste chat.

Følgende dokumenter kan inneholde eldre status og må leses kritisk:

- `README.md`
- `docs/chat-handoff.md`
- `docs/project-status.md`
- `docs/branch-structure.md`
- `docs/V2_STATUS.md`
- `docs/sonar-roadmap.md`
- `docs/treasure-hunt-flow.md`

Historiske dokumenter skal ikke slettes uten eksplisitt avtale:

- `docs/V1_STATUS.md`
- `docs/repo-cleanup-audit.md`

## Neste anbefalte steg

1. Be bruker hente siste branch.
2. Be bruker starte dev-client med clear cache.
3. Be om nytt skjermbilde av SonarSetup.
4. Juster kun én ting etter skjermbildet.

## Regler

- Svar på norsk.
- Bruk `home-reconstruction`.
- Én liten endring per commit.
- Ikke slett filer eller brancher uten eksplisitt beskjed.
- Ikke endre package.json/package-lock uten eksplisitt beskjed.
- Etter kodeendring: oppgi commit SHA og testkommando.
