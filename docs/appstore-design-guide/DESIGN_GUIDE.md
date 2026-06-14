# Designguide for Live Rebus

Denne guiden gjelder alle skjermer og komponenter i prosjektet. Den bygger på Apples Human Interface Guidelines, App Review Guidelines og prosjektets egne konservative standarder.

## 1. Typografi

- Bruk plattformens systemfont.
- På iOS betyr det San Francisco gjennom systemets standardtekststiler.
- Unngå egen `fontFamily` med mindre det finnes en tydelig produktgrunn.
- Bruk `allowFontScaling={true}` der det er relevant.
- Ikke bruk tekst mindre enn 11 pt.
- Anbefalt baseline:
  - stor tittel: 34 pt
  - tittel: 28 pt
  - seksjonstittel: 22 pt
  - brødtekst: 17 pt
  - sekundærtekst: 15 pt
  - bildetekst: 13 pt

## 2. Spacing og layout

- Bruk 8-punkts spacing-grid.
- Bruk 4 pt til mikrojusteringer.
- Kompakt horisontal margin: 16 pt.
- Regelmessig horisontal margin: 20 pt.
- Visuell avstand mellom tilstøtende kontroller: minst 8 pt.
- Avstand mellom større seksjoner: omtrent 24 pt.
- Ikke hardkod absolutte skjermkoordinater.
- Respekter safe areas og systeminsets.
- Layout skal fungere ved større tekststørrelser og ulike skjermbredder.

## 3. Knapper og trykkflater

- Minimum trykkflate: 44 × 44 pt.
- Primærknapp: minst 48 pt høy, helst 52 pt.
- Knappetekst skal være tydelig og handlingsorientert.
- Ikke bruk bare farge for å vise valgt tilstand.
- Valgt tilstand skal også ha ikon, hake, kant eller annen formindikator.
- Deaktiverte knapper skal fortsatt være lesbare.

## 4. Farger og kontrast

- Vanlig tekst: minst 4,5:1 kontrast.
- Stor eller fet tekst: minst 3:1.
- Ikoner, kanter og andre ikke-tekstlige kontroller: minst 3:1.
- Ikke bruk farge alene for feil, suksess eller valgt tilstand.
- Test både mørk og lys visning dersom appen støtter begge.
- Prosjektets godkjente fargepalett skal brukes konsekvent.

## 5. Navigasjon

- Tilbakeknapp skal være gjenkjennelig og ha minst 44 × 44 pt trykkflate.
- Overskrift og navigasjonskontroller skal følge et stabilt visuelt hierarki.
- Hjelp og sekundærhandlinger skal ikke konkurrere med hovedhandlingen.
- Bruk plattformkonvensjoner der det er mulig.

## 6. Tilgjengelighet

- Alle interaktive elementer skal ha `accessibilityLabel`.
- Kontroller skal ha korrekt rolle og tilstand.
- Fokusrekkefølge skal være logisk.
- VoiceOver skal kunne forklare valgt tilstand.
- Tekst skal kunne skaleres uten at handlinger skjules.
- Berøringsmål skal være store nok også når ikonene er små.

## 7. Feedback og tilstander

- Bruk tydelig feedback ved trykk, lasting, feil og suksess.
- Lasting skal ikke se ut som at appen har stoppet.
- Feilmeldinger skal forklare hva som skjedde og hva brukeren kan gjøre.
- Tomme tilstander skal ha forklaring og relevant neste steg.

## 8. Personvern, innlogging og tillatelser

- Be bare om tillatelser som er nødvendige for kjernefunksjonen.
- Purpose strings skal være konkrete og forståelige.
- Personvernerklæring skal være tilgjengelig i appen og i App Store Connect.
- Dersom konto kan opprettes, skal den kunne slettes i appen.
- Innlogging må kunne testes av App Review.

## 9. App Review-preflight

Før innsending:

- test på fysisk enhet
- fjern placeholders og midlertidig innhold
- kontroller at backend er tilgjengelig
- dokumenter demo-konto eller demo-modus
- kontroller metadata og skjermbilder
- verifiser personverndata
- kontroller alle tillatelser og purpose strings
- kontroller at ingen funksjoner er skjult eller utilgjengelige
- legg forklaring av ikke-opplagte flyter i Review Notes

## 10. Prosjektregel for nye design

Alle nye skjermer skal:

1. bygges fra godkjent referanse eller tydelig spesifikasjon
2. bruke delte designtokens
3. bruke systemfont
4. følge 8-punkts spacing-grid
5. ha minst 44 × 44 pt trykkflater
6. ha dokumentert kontrast
7. testes med større tekst
8. sammenlignes visuelt mot referansen før godkjenning

Ved konflikt mellom denne guiden og Apples nyeste dokumentasjon gjelder Apples dokumentasjon.