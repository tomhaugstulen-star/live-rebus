# Repo-opprydding: audit

Branch: `sonar`

Denne filen dokumenterer oppryddingen før videre funksjonsarbeid. Målet er å fjerne gamle varianter, duplikater og ubrukt kode uten å endre aktiv spillflyt.

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
- XP vises nå direkte i Home-headeren og leses fra `playerProgressStore.js`

## I aktiv bruk

Følgende deler er bekreftet som aktive gjennom `App.js`, `AppNavigator.js` eller direkte imports:

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
- `src/screens/treasure/TreasureFoundScreen.js`
- `src/screens/treasure/TreasureResultScreen.js`
- `src/utils/treasureSessionStore.js`
- `src/utils/treasureSafetyStore.js`
- `src/utils/playerProgressStore.js`
- `src/utils/treasureRules.js`
- `src/utils/xpRules.js`

## Kandidater for neste oppryddingsrunde

### `src/screens/treasure/AreaCheckScreen.js`

Status: sannsynlig foreldet, ikke slettet ennå.

Observasjoner:

- skjermen er fortsatt importert og registrert i `AppNavigator.js`
- dagens oppsett går direkte fra `TreasureSetup` til `Safety`
- dokumentert aktiv flyt inkluderer ikke `AreaCheck`
- ingen aktiv knapp sender brukeren til ruten

Neste tiltak:

- fjern import og Stack.Screen fra `AppNavigator.js`
- slett filen i en egen commit
- test hele skattejaktflyten etterpå

### Ubrukte props i Home-kallet

Status: kodeopprydding, ikke utført ennå.

`AppNavigator.js` sender fortsatt props som dagens `HomeScreen` ikke bruker:

- `level`
- `xpToNextLevel`

Disse kan fjernes uten å endre XP-store eller Home-visning.

### Dokumentasjon

Status: må oppdateres etter oppryddingen.

Følgende dokumenter refererer fortsatt til den slettede `.web.js`-filen eller eldre flyt:

- `README.md`
- `docs/project-status.md`
- `docs/chat-handoff.md`

## Regler videre

- én type opprydding per commit
- ingen samtidig design- eller funksjonsendring
- ingen sletting bare basert på filnavn
- navigasjonsregistrering og imports skal kontrolleres før sletting
- aktiv Sonar-, Tåkekart-, sikkerhets- og XP-flyt skal testes etter hver runde
