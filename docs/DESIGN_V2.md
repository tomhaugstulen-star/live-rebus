# Live Rebus – V2-design

## Status

V1 web/demo er lukket og brukes som funksjonell referanse.

V2 er designrunde og visuell polering. V2 skal ikke innføre ekte kart, ekte GPS, full native Fog of War eller annen tung V3-teknikk.

Home Screen V2 er ferdigstilt og visuelt godkjent.

## V2-designmål

Home skal oppleves som et adventure-dashboard, ikke som en ordinær meny.

Mål:

- tydelig Live Rebus-identitet
- høy kontrast og mørk eventyrstil
- klar visuell forskjell mellom Rebusløp og Skattejakt
- dynamiske kort for spillerens neste aktiviteter
- responsiv layout uten scrolling på målskjermen
- gjennomførbar implementasjon i React Native og Expo

## Låst Home-struktur

Home består av:

1. Safe-area-tilpasset header
2. Avatar/profilhandling
3. Dynamisk hilsen med kontrollert avkorting av lange navn
4. XP-visning
5. Settings-handling
6. `Live Rebus`-hero med kort pitch
7. Seksjonen `Velg eventyr`
8. Rebusløp-kort
9. Skattejakt-kort
10. Dynamisk seksjon for første, neste eller siste eventyr
11. Opptil to dynamiske aktivitetskort

Home bruker ikke `ScrollView`.

## Dynamiske overskrifter

- Ingen aktivitetshistorikk: `Start ditt første eventyr`
- Planlagt eller pågående aktivitet: `Dine neste eventyr`
- Bare fullførte aktiviteter: `Dine siste eventyr`

## Aktivitetsstatus

- Planlagt: `Gå til venterom`
- Pågående: `Fortsett eventyr`
- Fullført: `Se resultat`

Flere aktiviteter av samme type skal støttes.

## Førstegangsvisning

Rebusløp:

- status: `Din første rebus venter`
- knapp: `Velg rebusløp`

Skattejakt:

- status: `Klar for å finne skatten?`
- knapp: `Velg skattejakt`

## Challenge-copy

Rebusløp:

`Løs oppgaver langs ruten og konkurrer med andre.`

Skattejakt:

`Følg kartet og finn den skjulte skatten.`

## Hybrid designstrategi

- Tekst, knapper, statuser, XP og navigasjon kodes som UI.
- Landskap, stemning og komplekse dekorative elementer brukes som bilde-assets.
- Tekst og trykkbare kontroller skal ikke bakes inn i bilder.

## Home-assets

Aktive assets ligger under:

```text
assets/images/home/
```

Designet bruker blant annet:

- `home-background.png`
- `home-calendar-icon.png`
- `home-hero-art.png`
- `home-level-shield.png`
- `home-rebus-art.png`
- `home-settings.png`
- `home-treasure-art.png`

Kun assets som faktisk importeres i appen skal beholdes.

## Ikoner

Dynamiske UI-symboler bruker `expo-symbols` der dette er egnet.

Rebusløp bruker puslespill-/extension-symbol.

Skattejakt bruker kart-symbol.

Settings bruker plattformtilpasset settings-/gear-symbol.

## Layoutkrav

- minimum 44 pt trykkflate på interaktive kontroller
- safe area på topp, venstre og høyre
- ingen kollisjon mellom langt brukernavn og settings
- ingen tekstkutt i statusknappene
- ingen scrolling på Home ved testoppløsningen 375 × 812
- kortene skal beholde stabil høyde ved ulike statuser

## Visuell stil

- mørk adventure-dashboard
- oransje/gull som primær aksent
- lilla identitet for Rebusløp
- oransje/gull identitet for Skattejakt
- store avrundede kort
- dempet glow og høy lesbarhet
- systemfont inntil et senere eksplisitt fontvalg

## V2 skal ikke gjøre

- ekte kartintegrasjon
- ekte GPS i web-test
- full native Fog of War
- backend eller kontosystem
- større refaktor av eksisterende spillflyter
- tung animasjon som svekker ytelse eller vedlikeholdbarhet

## Visuell referanse

Godkjent Home-referanse ligger her:

```text
docs/references/home-screen-reference.png
```
