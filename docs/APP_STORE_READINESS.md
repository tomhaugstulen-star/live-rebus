# App Store readiness

## Status

Prosjektet er ikke klart for App Store-innsending.

Dette er en intern kravliste, ikke juridisk rådgivning. Offisielle Apple-krav må kontrolleres før innsending.

## Låste sikkerhetsprinsipper

- Appen skal ikke fremstille et foreslått område som automatisk trygt.
- En voksen må kontrollere området før start.
- Godkjent tekst:

  `Appen foreslår et lekeområde. En voksen må kontrollere området før start.`

- Barns sanntidsposisjon skal ikke deles med andre spillere.
- Appen skal samle inn minst mulig data.
- Kontoer som opprettes i appen skal kunne slettes fra appen.

## Home Screen – gjennomført tilgjengelighet og layout

- safe area håndteres på topp, venstre og høyre
- interaktive kontroller har minst 44 pt trykkflate
- lange brukernavn avkortes uten å overlappe settings
- statusknapper er testet med lange etiketter
- Home er testet ved 375 × 812
- skjermen krever ikke scrolling ved målvisningen
- dynamiske statuser beholder lesbarhet og stabil korthøyde

Dette er nødvendige kvalitetskrav, men er ikke alene nok til å gjøre appen klar for innsending.

## Må implementeres

- forklaring av stedstilgang før systemdialog
- bruk av stedstilgang bare når nødvendig
- ingen unødvendig posisjonshistorikk
- mulighet til å avvise eller endre områdevalg
- personvernerklæring
- kontosletting dersom konto aktiveres
- blokkering og moderering dersom sosial funksjonalitet bygges
- tydelig dataminimering for konto- og vennefunksjoner

## Må verifiseres før innsending

- fysisk iPhone
- stedstilgang avslått
- tap av GPS og nettverk
- kontosletting
- blokkering og vennestatus dersom dette finnes
- at andre deltakere ikke ser eksakt posisjon
- at område kan avvises og velges på nytt
- at sikkerhetsflyten kommer før aktiv lek
- at App Review kan fullføre hele flyten
- at metadata og skjermbilder samsvarer med faktisk funksjonalitet
- VoiceOver og dynamisk tekst der dette er relevant
- kontrast og trykkflater på alle sentrale skjermer

## App Review-notat

Prosjektet skal ikke beskrives som klart for innsending før konto, personvern, stedstilgang, sikkerhet, tilgjengelighet og eventuelle sosiale funksjoner er verifisert i faktisk kode.
