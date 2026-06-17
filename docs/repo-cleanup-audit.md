# Repo-opprydding: audit

Branch: `sonar`

Denne filen dokumenterer gjennomført opprydding før videre funksjonsarbeid. Den er et historisk audit-dokument; dagens operative status finnes i `docs/project-status.md` og `docs/chat-handoff.md`.

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
- `src/screens/treasure/TreasureFoundScreen.js`
- `src/screens/treasure/TreasureResultScreen.js`
- `src/screens/treasure/TreasureResultScreen.styles.js`
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
- web-testmodus for rask sluttflyt
- `pendingResultStore` for ferdige resultatdata
- direkte overgang fra siste skatt til XP/resultat

Dette er funksjonsarbeid og ikke en ny cleanup-runde.

## Gjenstående små oppryddingskandidater

### Ubrukte props i Home-kallet

Status: kodeopprydding, ikke utført.

`AppNavigator.js` sender fortsatt props som dagens `HomeScreen` ikke bruker:

- `level`
- `xpToNextLevel`

Dette er ikke blokkerende og skal ikke kombineres med funksjonsendringer.

## Regler videre

- én type opprydding per commit
- ingen samtidig design- eller funksjonsendring
- ingen sletting bare basert på filnavn
- navigasjonsregistrering og imports skal kontrolleres før sletting
- aktiv Sonar-, Tåkekart-, sikkerhets- og XP-flyt skal testes etter hver runde
- autoritative dokumenter skal oppdateres når flyt eller arkitektur endres

## Statusmerknad 17. juni 2026

Den planlagte oppryddingen er avsluttet. `AreaCheck`, gamle web-duplikater og foreldede dokumentreferanser er håndtert. Dagens status finnes i:

```text
README.md
docs/chat-handoff.md
docs/project-status.md
docs/treasure-hunt-flow.md
docs/branch-structure.md
```

Neste større arbeidsområde er Live Rebus.
