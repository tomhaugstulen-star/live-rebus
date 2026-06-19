# Prosjektstatus: Home-rekonstruksjon

Aktiv arbeidsbranch:

```text
home-reconstruction
```

`home-reconstruction` er isolert branch for ny Home-skjerm. Stabil referanse er `design-sonar-ui`. Ikke gjør mer Home-arbeid direkte på `design-sonar-ui` nå.

## Nåstatus

Aktivt arbeid er Home. Skattejaktgrunnlaget med Sonar og Tåkekart er stabilisert nok til å ligge i ro mens Home justeres.

Home-mål:

```text
Førstegangs-Home med header/profil, hero og to liggende valgkort:
- Rebusløp
- Skattejakt
```

Gjort:

- nye bakgrunnsbilder for Home-kort
- egne ikonbilder for Home-kort
- liggende kortoppsett
- fjernet `Velg eventyr` og `Alle utfordringer`
- fjernet nederste dupliserte førstegangsseksjon når `homeEvents` ikke finnes
- kortene bruker bilde, overlay, tittel, tekst, ikon og pil

Viktige filer:

```text
src/screens/home/HomeScreen.js
src/screens/home/HomeScreen.styles.js
src/components/home/HomeChallengeCard.js
```

Viktige assets:

```text
assets/images/home/cards/rebus-card-background.png
assets/images/home/cards/treasure-card-background.png
assets/images/home/cards/rebus-card-icon.png
assets/images/home/cards/treasure-card-icon.png
```

## Kjent Home-feil akkurat nå

Siste skjermbilde viste:

```text
1. Ikonene er byttet om.
2. `Skattejakt` kuttes til `Skattej...`.
```

Før neste større designsteg må `src/components/home/HomeChallengeCard.js` fikses og testes på telefon.

Foreslått fix:

```text
- bytt ikonmapping i HomeChallengeCard.js
- reduser ikonramme fra 58 til ca. 52
- reduser ikonbilde fra 46 til ca. 42
- reduser pilknapp fra 44 til ca. 40
- senk title fontSize fra 24 til ca. 22
- reduser horisontal padding noe
```

Merk: Filnavnene/innholdet på ikonene ser ut til å være omvendt etter lokal klipping. Siste skjermbilde er fasit, ikke filnavnet.

## Brancher og filer som ikke skal røres uten avtale

Ikke endre eller merge:

```text
main
sonar
skattejakt-spillet
design-sonar-ui
```

Ikke overskriv:

```text
assets/images/treasure/treasure-chest.png
assets/images/treasure/treasure-setup-header.png
assets/images/treasure/treasure-setup-header.webp
package.json
package-lock.json
```

## Låste spillregler

```text
Alle spill krever internett/mobildata.
Offline/P2P/Bluetooth er ikke kjerneflyt.
Skattene genereres først fra valgt område.
Spillet har bare én aktiv skatt eller ett aktivt signal om gangen.
Neste signal åpnes først når forrige funn er ferdig registrert.
```

## Områdeparameter

```text
Enkel:     4 skatter  · ca. 50 m diameter  · 2 m Sonar-synlighet
Medium:    8 skatter  · ca. 80 m diameter  · 2,5 m Sonar-synlighet
Vanskelig: 12 skatter · ca. 150 m diameter · 3 m Sonar-synlighet
```

Dette ligger i `src/utils/treasureRules.js`.

## TreasureSetup-status

TreasureSetup er ikke hovedfokus nå, men status er:

- navnefeltet er fjernet
- appen skal ikke generere kunstige jaktnavn
- eget infokort viser valgt vanskelighetsgrad
- kortene for vanskelighetsgrad holdes enkle: nivå + antall skatter
- trykkflater skal holdes over ca. 44 px

## Skattejakt/Sonar-status

Implementert:

- riktig routing mellom Sonar og Tåkekart
- felles `treasureSessionStore`
- resultatdata i `pendingResultStore`
- beskyttelse mot dobbel XP
- siste skatt går direkte til resultat/XP
- Tåkekart sin gule web-testknapp er deaktivert
- Sonar bruker app-generert signalmotor i `src/utils/sonarSignalEngine.js`
- Sonar har roterende radar, rød målprikk, haptics og funnsekvens på samme skjerm

Sonar skal som standard være app-generert signaljakt uten GPS, meter og kart.

## XP

| Nivå | Fullføring | Per skatt | Maks normal XP |
|---|---:|---:|---:|
| Enkel | 60 | 10 | 100 |
| Medium | 120 | 12 | 216 |
| Vanskelig | 220 | 15 | 400 |

Sonar-småsignal med XP er ikke implementert og skal ikke kunne farmes.

## Test nå

Home må testes i dev build på fysisk telefon.

Kontroller først:

- riktig ikon på Rebusløp
- riktig ikon på Skattejakt
- `Skattejakt` vises fullt
- kortene har nok luft mellom seg
- bakgrunnsbildene er synlige, men teksten er lesbar
- hele kortet er trykkbart

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

## Neste arbeidsområde

```text
Fiks HomeChallengeCard.js: ikonrekkefølge og tittel-fit.
Test på telefon og be om nytt skjermbilde før flere designendringer.
```

Start neste chat med:

```text
README.md
docs/chat-handoff.md
docs/project-status.md
docs/branch-structure.md
```
