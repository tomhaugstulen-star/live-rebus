# App Store readiness

## Status

Aktiv baseline er `fc4552c`, og prosjektet er ikke App Store-klart ennå.

Dette er en intern kravliste, ikke juridisk rådgivning. Offisielle Apple-kilder må kontrolleres før innsending.

## Besluttet

- Barnets område skal aldri fremstilles som automatisk trygt.
- Appen skal foreslå lekeområde, ikke garantere sikkerhet.
- En voksen må kontrollere området før start.
- Den godkjente sikkerhetsteksten er:

  `Appen foreslår et lekeområde. En voksen må kontrollere området før start.`

- Appen skal ikke være avhengig av at en voksen installerer en separat app for normal bruk.
- Appen skal samle inn minst mulig data.
- Barns sanntidsposisjon skal ikke deles med andre spillere.
- Kontoer som opprettes i appen skal kunne slettes fra appen.

## Må implementeres

- Formålet med stedstilgang skal forklares før systemdialogen vises.
- Stedstilgang skal bare brukes når den er nødvendig for kartvalg, områdekontroll eller aktiv lek.
- Posisjonshistorikk skal ikke lagres uten et klart og nødvendig formål.
- Brukeren skal kunne avvise eller endre områdevalg.
- Personvernerklæring skal finnes og beskrive innsamling, bruk, lagring og sletting.
- Datamodellen må støtte kontosletting hvis kontoer og innlogging blir aktiv funksjonalitet.
- Hvis sosial funksjonalitet bygges, må innsyn, blokkering og moderering støtte den løsningen.
- Hvis konto og venner bygges, må appen ha en tydelig måte å håndtere personvern og dataminimering på.

## Må verifiseres før innsending

- Test på fysisk iPhone.
- Test stedstilgang avslått.
- Test tap av GPS og nettverk.
- Test kontosletting.
- Test blokkering og vennestatus hvis sosial funksjonalitet finnes.
- Test at ingen deltakere kan se andres eksakte posisjon.
- Test at område kan avvises og godkjennes på nytt.
- Test at sikkerhetsflyten kommer før aktiv lek.
- Test at App Review kan komme gjennom hele flyten med demokonto eller testoppsett.
- Test at skjermbilder, metadata og personvernopplysninger stemmer med faktisk funksjonalitet.

## App Review-notat

Prosjektet må ikke beskrives som klart for innsending før konto, personvern, sikkerhet og eventuelle sosiale funksjoner er verifisert i faktisk kode.
