# App Store: design- og godkjenningspakke

**Språk:** Norsk  
**Oppdatert:** 14. juni 2026  
**Kildegrunnlag:** Apples offisielle App Review Guidelines, Human Interface Guidelines og App Store Connect-hjelp.

Denne mappen er prosjektets felles referanse for design, tilgjengelighet og App Store-godkjenning. Den gjelder alle skjermer og designflyter i Live Rebus.

## Prioritet

1. **Review-krav** – forhold som direkte kan føre til avvisning.
2. **Apple-anbefalinger** – HIG og tilgjengelighetspraksis som reduserer risiko.
3. **Prosjektstandarder** – konservative verdier for spacing og typografi. Disse er ikke formelle Apple-krav.

Ingen sjekkliste kan garantere godkjenning. App Review vurderer hele appen, funksjonaliteten, innholdet, metadata, personvern, betaling og teknisk kvalitet.

## Viktigste minimum før innsending

- Test appen på fysisk enhet for krasj, feil og avbrutte flyter.
- Fjern placeholder-tekst, tomme sider og midlertidig innhold.
- Hold backend og testdata tilgjengelig under review.
- Gi Apple demo-konto eller fullverdig demo-modus når innlogging kreves.
- Beskriv ikke-opplagte funksjoner og kjøp tydelig i Review Notes.
- Sørg for at skjermbilder, beskrivelse og personverndata stemmer med appen.
- Gi kontroller minst **44 × 44 pt** trykkflate.
- Bruk minst **11 pt** for vanlig lesbar tekst; bruk helst Dynamic Type.
- Sikt mot minst **4,5:1** kontrast for vanlig tekst og **3:1** for store tekster og ikke-tekstlige kontroller.
- Bruk safe areas og fleksibel layout.
- Ikke bruk bare farge for å kommunisere valgt, feil eller suksess.
- Ha personvernerklæring både i App Store Connect og lett tilgjengelig i appen.
- Har appen kontoopprettelse, skal kontoen kunne slettes fra appen.
- Be bare om tillatelser som er nødvendige for kjernefunksjonen, med konkrete purpose strings.

## Prosjektstandard for React Native

- Bruk plattformens systemfont.
- Ikke hardkod skjermkoordinater.
- Respekter `SafeAreaView`/insets.
- Bruk `allowFontScaling={true}` der det er relevant.
- Sett `accessible` og `accessibilityLabel` på interaktive kontroller.
- Bruk minimum 44 × 44 pt trykkflate.
- Bruk 8-punkts spacing-grid med 4-punkts mikrospacing.

## Filer

- `DESIGN_GUIDE.md` – samlet design-, tilgjengelighets- og review-guide.
- `SOURCES.md` – offisielle Apple-kilder.
- `apple-design-baseline.json` – maskinlesbar baseline.
- `appleApprovalTokens.ts` – delte React Native-tokens.
- `app-review-checklist.md` – sjekkliste før innsending.

Fontfiler er ikke inkludert. Bruk systemfonten San Francisco gjennom plattformens tekststiler på iOS.