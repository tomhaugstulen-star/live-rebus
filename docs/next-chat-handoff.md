# Live Rebus – overtakelse for neste chat

Dette dokumentet er arbeidskontrollen for videre Home- og Skattejakt-oppsett. Bruk dette i neste chat for å fortsette uten å miste retning.

## Viktige regler

- Jobb på `treasure-setup-cleanup` for Skattejakt-oppsett.
- Ikke rør `main`, `sonar`, `skattejakt-spillet` eller `design-sonar-ui`.
- Én liten oppgave om gangen.
- Én commit per oppgave.
- Hold filer under 300 linjer.
- Ikke endre `package.json` eller `package-lock.json` uten eksplisitt godkjenning.
- Ikke slett eller bytt gamle assets før ny løsning er testet på fysisk iPhone.
- Ikke merge før fysisk iPhone-test er godkjent.

## Aktiv branch

```bash
git checkout treasure-setup-cleanup
git pull --rebase origin treasure-setup-cleanup
```

## Nåværende status

### HomeScreen

HomeScreen er i hovedsak ferdig for denne runden.

Gjort:

- Ny `home-background.webp` brukes i Home.
- Bakgrunnen dekker hele skjermen.
- Home har to valgkort: `Rebusløp` og `Skattejakt`.
- Ikoner og tittelstørrelse er justert.
- Tekstskalering på Home-kort er låst.
- Glasspanel bak tekst er lagt inn.
- Haptic feedback er lagt inn via felles helper.
- Felles helper finnes i `src/utils/haptics.js`.

Gjenstår:

- [ ] Sjekke at `assets/images/home/home-background.webp` faktisk er commitet i repoet.
- [ ] Teste Home etter fresh pull på fysisk iPhone.
- [ ] Vurdere mørkere overlay bak header/hero.
- [ ] Vurdere om oransje glød oppe til høyre bør dempes.
- [ ] Senere: avgjøre om Home skal ha 2 eller 3 hovedkort.

## Skattejakt-oppsett – produktretning

Skjermen skal være dynamisk, ikke vise alt samtidig.

Ønsket flyt:

1. Brukeren velger jaktmodus.
2. Etter valgt modus skjules modus-kortene.
3. Det vises liten valgt-status.
4. Brukeren velger hvem de spiller med.
5. Hvis `Med venner` velges, vises telefonbokvalg.
6. `Gå videre` vises først når nødvendige valg er gjort.

Vanskelighetsgrad skal ikke vises i første flyt. `difficulty = "medium"` brukes midlertidig som default.

## Skattejakt-oppsett – nåværende kode

Filer:

- `src/screens/treasure/TreasureSetupScreen.js`
- `src/screens/treasure/TreasureSetupScreen.styles.js`
- `src/components/treasure/TreasureSetupOptions.js`
- `src/utils/haptics.js`

Nåværende status:

- Skjermen bruker samme bakgrunn som Home.
- Skjermen har mørk overlay over bakgrunnen.
- `variant` starter som `null`.
- Først vises bare `Tåkejakt` og `Sonar`.
- Etter valg vises `Tåkejakt valgt` eller `Sonar valgt`.
- `Hvem spiller du med?` vises først etter valgt modus.
- `Alene` og `Med venner` vises som neste steg.
- `Gå videre` vises først etter at spiller-type er valgt.
- `difficulty` er fortsatt `medium`, men ikke synlig i første flyt.
- Haptics er lagt på `Tåkejakt`, `Sonar`, `Alene`, `Med venner`, `Endre` og `Telefonbok`.
- Telefonbok åpnes via egen knapp etter at `Med venner` er valgt.

Siste kjente filstørrelser:

- `TreasureSetupScreen.js`: ca. 265 linjer.
- `TreasureSetupScreen.styles.js`: ca. 122 linjer.

## Siste relevante commits på `treasure-setup-cleanup`

- `ef46ed69b96588106e8714e1e364c581cc02c8cb` – Add treasure setup background image
- `8f0167195a33dc9800c0a13125c6617d13b183a1` – Style treasure setup background layers
- `3e9d1c9a1d56f593d008bc9afb9dc69c9739a93e` – Reduce treasure setup mode cards
- `cc88afbcf49847e75843481df956861b6980cd02` – Compress treasure setup mode cards height
- `5ac70be30e5a307b04a7f7003f8ba2ac56f07542` – Make treasure setup flow dynamic
- `6d05e99b6e6c8bfbe7e07d0458c18a827d49497b` – Style selected treasure setup mode summary
- `a05477587551b3802ad6058795210159eccb9647` – Add haptics to treasure setup cards

## Arbeidsskjema – neste oppgaver

### 1. Test dynamisk flyt

- [ ] Åpne Skattejakt-oppsett på fysisk iPhone.
- [ ] Bekreft at første visning kun viser `Velg jaktmodus`.
- [ ] Trykk `Tåkejakt`.
- [ ] Bekreft at modus-kortene forsvinner.
- [ ] Bekreft at `Tåkejakt valgt` vises.
- [ ] Bekreft at `Hvem spiller du med?` vises.
- [ ] Trykk `Endre`.
- [ ] Bekreft at modusvalg kommer tilbake.
- [ ] Trykk `Sonar`.
- [ ] Bekreft at `Sonar valgt` vises.
- [ ] Trykk `Alene`.
- [ ] Bekreft at `Gå videre` vises.
- [ ] Trykk `Med venner`.
- [ ] Bekreft at telefonbok-knappen vises.

### 2. Fikse layout etter dynamisk flyt

Gjør dette først etter testen over.

- [ ] Justere høyden på `Tåkejakt` og `Sonar` hvis de ble for lave.
- [ ] Sikre at `Tåkejakt` ikke brekker.
- [ ] Sikre at Sonar-tekst ikke brekker stygt.
- [ ] Sikre at `Alene` og `Med venner` ikke kuttes.
- [ ] Justere panel-padding kun hvis skjermen fortsatt er trang.
- [ ] Sikre god avstand mellom valgt modus, spiller-valg og knapp.
- [ ] Sikre at `Gå videre` ligger visuelt riktig.

### 3. Telefonbok og venner

- [ ] Gjøre telefonbok-seksjonen tydeligere når `Med venner` er valgt.
- [ ] Endre tekst fra bare `Telefonbok` til mer forklarende tekst hvis nødvendig.
- [ ] Vise valgte venner under telefonbok-knappen.
- [ ] Vise status `Venter på svar` på valgte venner.
- [ ] La bruker fjerne valgt venn.
- [ ] Beholde maks 5 venner.
- [ ] Senere: vise status `Godtatt` når invitasjon er akseptert.
- [ ] Senere: vise godtatte venner tydeligere enn ventende venner.

### 4. Gå videre / config

- [ ] Bekrefte at `variant` sendes riktig videre.
- [ ] Bekrefte at `players` sendes riktig videre.
- [ ] Bekrefte at `invitedContacts` sendes ved `Med venner`.
- [ ] Bekrefte at `difficulty: "medium"` fortsatt sendes som default.
- [ ] Hvis `Med venner`: avgjøre om minst én venn må være valgt før `Gå videre` aktiveres.

### 5. Haptics

- [ ] Teste haptics på `Tåkejakt`.
- [ ] Teste haptics på `Sonar`.
- [ ] Teste haptics på `Alene`.
- [ ] Teste haptics på `Med venner`.
- [ ] Teste haptics på `Endre`.
- [ ] Teste haptics på `Telefonbok`.
- [ ] Eventuelt legge haptics på `Gå videre` i egen commit.
- [ ] Ikke duplisere direkte `expo-haptics`-kode.

## Senere produktavgjørelser

- [ ] Bestemme om Sonar skal forbli inne i Skattejakt-oppsett eller få eget Home-kort.
- [ ] Bestemme hvor vanskelighetsgrad skal bo.
- [ ] Bestemme om vanskelighetsgrad skal være egen side, avansert valg eller bare default.
- [ ] Bestemme hvordan venner godtar invitasjon.
- [ ] Bestemme om verten kan starte før alle venner har godtatt.
- [ ] Bestemme hvordan aktive/ventende venner vises under spillet.

## Viktig teknisk merknad

`home-background.webp` må finnes lokalt på branch der appen kjøres:

```bash
ls assets/images/home/home-background.webp
```

Hvis Metro feiler med `Unable to resolve home-background.webp`, er asset-filen ikke til stede på branch/lokal checkout.

## Anbefalt neste lille commit

Ikke gjør mer før fysisk iPhone-test av dynamisk flyt.

Etter test bør neste commit være én av disse:

1. `Fix treasure setup dynamic layout spacing`
2. `Improve treasure setup friend picker section`
3. `Add haptics to treasure setup continue button`

Velg kun én.
