# Live Rebus

Expo/React Native-app for rebusløp og skattejakt på iOS, Android og web.

## Aktiv arbeidsbranch nå

```text
home-reconstruction
```

`home-reconstruction` er opprettet fra stabil `design-sonar-ui` for å rekonstruere Home-skjermen isolert. Ikke gjør mer Home-arbeid direkte på `design-sonar-ui` før Home er godkjent.

Branches som ikke skal endres eller merges uten eksplisitt avtale:

```text
main
sonar
skattejakt-spillet
design-sonar-ui
```

`design-sonar-ui` er stabil referanse for Sonar/TreasureSetup etter at iOS-build ble bekreftet OK. `home-reconstruction` er eksperiment-/arbeidsbranch for ny Home.

## Ikke overskriv uten eksplisitt beskjed

```text
assets/images/treasure/treasure-chest.png
assets/images/treasure/treasure-setup-header.png
assets/images/treasure/treasure-setup-header.webp
package.json
package-lock.json
```

Pakker skal ikke endres uten eksplisitt avtale. `expo-av`-bruk ble fjernet fra `TreasureReadyScreen.js` for å få iOS-build gjennom, men `package.json` er ikke ryddet.

## Start for neste chat

```bash
git fetch origin
git switch home-reconstruction
git pull --rebase origin home-reconstruction
git status --short
npx expo start --dev-client
```

Les først:

```text
docs/chat-handoff.md
docs/project-status.md
docs/branch-structure.md
```

## Nåstatus: Home-rekonstruksjon

Målet nå er en ryddig førstegangs-Home med to store liggende valgkort:

```text
Rebusløp
Skattejakt
```

Gjort på `home-reconstruction`:

- fjernet synlig `Velg eventyr`/`Alle utfordringer`-rad fra Home
- fjernet nederste duplisering når `homeEvents` ikke finnes
- byttet til liggende kort
- lagt inn nye bakgrunnsbilder for Home-kort
- lagt inn egne ikonbilder for Home-kort
- økt kontrast/luft i kortene

Relevante assets:

```text
assets/images/home/cards/rebus-card-background.png
assets/images/home/cards/treasure-card-background.png
assets/images/home/cards/rebus-card-icon.png
assets/images/home/cards/treasure-card-icon.png
```

Relevante filer:

```text
src/screens/home/HomeScreen.js
src/screens/home/HomeScreen.styles.js
src/components/home/HomeChallengeCard.js
```

Kjent status ved siste dokumentoppdatering:

- Home-strukturen er riktig nok til videre visuell justering.
- Kortene vises, men polish er ikke ferdig.
- Ikonene var sist observert byttet om: Rebusløp viste skatteikon og Skattejakt viste rebusikon.
- `Skattejakt` ble trunkert til `Skattej...` fordi ikon + pil + tekst tok for mye bredde.
- Siste foreslåtte lokale fix var å bytte ikonmapping og redusere ikon/pil/tittelstørrelse i `HomeChallengeCard.js`. Verifiser om denne lokale fixen er commitet/pushet før videre arbeid.

Neste konkrete steg:

```text
1. Kontroller git status og siste commit på home-reconstruction.
2. Verifiser om HomeChallengeCard.js har riktig ikonmapping.
3. Fiks tittelbredde/tekstfit for Skattejakt.
4. Test på fysisk telefon/dev-client.
5. Be om nytt skjermbilde før flere designendringer.
```

## Låste spillregler

```text
Alle spill krever internett/mobildata.
Offline/P2P/Bluetooth er ikke kjerneflyt.
Skattene genereres først fra valgt område.
Bare én aktiv skatt / ett aktivt signal om gangen.
Neste signal åpnes først når forrige funn er ferdig registrert.
```

Dette gjelder også senere XP-bonusfunn: ett aktivt bonusfunn, én registrering, én utbetaling.

## Gjeldende skattejaktflyt

```text
Home
→ TreasureSetup
→ Safety
→ TreasureReady
→ nedtelling
→ TreasureHunt
→ SonarHuntScreen eller FogHuntScreen
→ funnsekvens/jakt mens skatter gjenstår
→ TreasureResult/XP direkte etter siste skatt
→ Home når resultatet lukkes
```

Det skal ikke være et synlig Home-mellomsteg før XP/resultatskjermen.

## TreasureSetup og Sonar

TreasureSetup:

- navnefeltet er fjernet
- appen skal ikke generere kunstige jaktnavn
- viser spillemodus, hvem spiller, vanskelighetsgrad, infokort og `Gå videre`

Område og Sonar-synlighet:

```text
Enkel:     4 skatter  · ca. 50 m diameter  · 2 m Sonar-synlighet
Medium:    8 skatter  · ca. 80 m diameter  · 2,5 m Sonar-synlighet
Vanskelig: 12 skatter · ca. 150 m diameter · 3 m Sonar-synlighet
```

Sonar er standard app-generert signaljakt, ikke GPS-jakt. GPS kan senere bli avansert modus for store uteområder.

## XP

| Nivå | Fullføring | Per skatt | Maks normal XP |
|---|---:|---:|---:|
| Enkel | 60 | 10 | 100 |
| Medium | 120 | 12 | 216 |
| Vanskelig | 220 | 15 | 400 |

Ordinær slutt-XP påvirkes ikke av modus. Sonar-småsignal med XP er ikke implementert og skal ikke kunne farmes.

## Bevisst utsatt

- ferdig Home-polish
- ferdig visuell justering av TreasureSetup
- instruksjonsbilde/animasjon på nedtellingsskjermen
- ekte GPS og GPS-lagjakt
- accelerometer/skritt/gyro
- Sonar-lyd/pip
- global lyd-/haptikkinnstilling
- Sonar-småsignal med XP
- innlogging, venner, varsler og backend-synk

## Dokumentasjon

- [`docs/chat-handoff.md`](docs/chat-handoff.md) – start her i neste chat
- [`docs/project-status.md`](docs/project-status.md) – nåstatus og testpunkter
- [`docs/branch-structure.md`](docs/branch-structure.md) – brancher og arbeidsmåte
- [`docs/sonar-roadmap.md`](docs/sonar-roadmap.md) – Sonar-retning og videre plan
- [`docs/treasure-hunt-flow.md`](docs/treasure-hunt-flow.md) – navigasjon, session, web-test og XP
- [`docs/repo-cleanup-audit.md`](docs/repo-cleanup-audit.md) – historikk for gjennomført opprydding
