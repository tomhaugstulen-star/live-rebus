# Repo-opprydding: audit

Branch: `design-sonar-ui`

Denne filen dokumenterer gjennomført opprydding før videre funksjonsarbeid. Den er et historisk audit-dokument; dagens operative status finnes i `docs/project-status.md`, `docs/chat-handoff.md` og `docs/sonar-roadmap.md`.

## Fjernet

### `src/screens/treasure/TreasureHuntScreen.web.js`

Status: fjernet.

Begrunnelse:

- var en gammel duplikat av `TreasureHuntScreen.js`
- Expo/Metro valgte `.web.js` automatisk på web
- nyere rettinger i fellesfilen ble derfor ignorert i nettleseren
- både web og native bruker nå samme rutingsfil

### `src/components/home/HomeProgressCard.js`

Status: fjernet.

Begrunnelse:

- tilhørte den tidligere Home-layouten
- dagens `HomeScreen.js` importerer ikke komponenten
- XP vises direkte i Home-headeren og leses fra `playerProgressStore.js`

### `src/screens/treasure/AreaCheckScreen.js`

Status: fjernet.

Begrunnelse:

- aktiv flyt går direkte fra `TreasureSetup` til `Safety`
- ruten var ikke del av dagens skattejaktflyt
- import og navigatorregistrering ble fjernet før filen ble slettet

## I aktiv bruk

Følgende deler er aktive gjennom `App.js`, `AppNavigator.js` eller direkte imports:

- `src/navigation/AppNavigator.js`
- `src/screens/home/HomeScreen.js`
- `src/components/home/HomeChallengeCard.js`
- `src/components/home/HomeUpcomingCard.js`
- `src/screens/treasure/TreasureSetupScreen.js`
- `src/screens/treasure/SafetyScreen.js`
- `src/screens/treasure/TreasureReadyScreen.js`
- `src/screens/treasure/TreasureHuntScreen.js`
- `src/screens/treasure/FogHuntScreen.js`
- `src/screens/treasure/SonarHuntScreen.js`
- `src/screens/treasure/SonarDisplay.js`
- `src/screens/treasure/SonarHuntScreen.styles.js`
- `src/screens/treasure/TreasureFoundScreen.js`
- `src/screens/treasure/TreasureResultScreen.js`
- `src/screens/treasure/TreasureResultScreen.styles.js`
- `src/utils/sonarSignalEngine.js`
- `src/utils/treasureSessionStore.js`
- `src/utils/treasureSafetyStore.js`
- `src/utils/playerProgressStore.js`
- `src/utils/treasureRules.js`
- `src/utils/xpRules.js`
- `src/utils/pendingResultStore.js`

Result-assets i aktiv bruk:

```text
assets/images/treasure/result/result-chest.png
assets/images/treasure/result/result-ribbon.png
```

## Gjennomført etter oppryddingen

Etter selve cleanup-runden er skattejaktflyten videre stabilisert med:

- fade-in fra nedtelling til spillskjerm
- dedikert XP/resultatskjerm med fade-in
- telefon-haptics på resultat
- `pendingResultStore` for ferdige resultatdata
- direkte overgang fra siste skatt til XP/resultat
- deaktivering av gammel Tåkekart web-testknapp
- Sonar-komponentdeling med `SonarDisplay.js`
- Sonar-haptics og rød målprikk
- Sonar-funnsekvens på samme skjerm
- app-generert Sonar-signaljakt via `sonarSignalEngine.js`

Dette er funksjonsarbeid og ikke en ny cleanup-runde.

## Gjenstående små oppryddingskandidater

### Ubrukte props i Home-kallet

Status: kodeopprydding, ikke utført.

`AppNavigator.js` sender fortsatt props som dagens `HomeScreen` ikke bruker:

- `level`
- `xpToNextLevel`

Dette er ikke blokkerende og skal ikke kombineres med funksjonsendringer.

### AppNavigator er fortsatt stor

Status: utsatt.

`AppNavigator.js` ble delvis ryddet gjennom statisk data-ekstraksjon, men er fortsatt en kandidat for videre splitting. Ikke gjør dette samtidig med Sonar-produktarbeid.

## Regler videre

- én type opprydding per commit
- ingen samtidig design- eller funksjonsendring
- ingen sletting bare basert på filnavn
- navigasjonsregistrering og imports skal kontrolleres før sletting
- aktiv Sonar-, Tåkekart-, sikkerhets- og XP-flyt skal testes etter hver runde
- autoritative dokumenter skal oppdateres når flyt eller arkitektur endres

## Statusmerknad

Den planlagte oppryddingen er avsluttet. `AreaCheck`, gamle web-duplikater og foreldede dokumentreferanser er håndtert. Dagens operative status finnes i:

```text
README.md
docs/chat-handoff.md
docs/project-status.md
docs/sonar-roadmap.md
docs/treasure-hunt-flow.md
docs/branch-structure.md
```

Neste større arbeidsområde på denne branchen er videre testing og finjustering av Sonar signaljakt.
