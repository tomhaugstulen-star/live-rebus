# Produktbeslutninger

## Status

Aktiv baseline er `fc4552c`. Dette dokumentet skiller mellom beslutninger som er låst, det som er planlagt, og det som fortsatt er åpent.

## Besluttet

- Live Rebus har to hovedaktiviteter: Rebusløp og Skattejakt.
- Prosjektet skal designes før videre implementasjon.
- Hele flyten skal godkjennes før enkeltskjermer finpoleres videre.
- En voksen skal ikke måtte installere en separat app for normal bruk.
- Skattejakt skal foreslå lekeområde, ikke garantere trygghet.
- Den godkjente sikkerhetsteksten er:

  `Appen foreslår et lekeområde. En voksen må kontrollere området før start.`

- Fog of War skal ha oransje identitet.
- Sonar skal ha lilla identitet.
- Standard valg i planlagt skattejaktoppsett er Fog of War og 5 skatter.

## Planlagt

- Innlogging.
- Konto per spiller.
- Venneliste.
- Online-status mellom venner.
- Invitasjoner til deltakelse.
- Voksen- og barnebruk skal fungere uten at en voksen må ha egen app.
- Skattejakt skal støtte antall skatter 3, 5 og 7.
- Skattejakt skal støtte Fog of War og Sonar som separate moduser.
- Dersom sosial funksjonalitet bygges, må blokkering og moderering være en del av løsningen.
- Kontoer skal kunne slettes fra appen.
- Design av alle skjermer skal komme før implementasjon.

## Åpne spørsmål

- Hvilken teknisk løsning skal brukes for innlogging og kontoer.
- Hvilken teknisk løsning skal brukes for venneliste og invitasjoner.
- Hvilket nivå av moderering og blokkering som trengs i første versjon med sosial funksjonalitet.
- Hvordan backend og datalagring skal organiseres før sosial funksjonalitet bygges.

## Ikke valgt

- Offentlig brukersøk.
- Fri chat.
- Fri profiltekst.
- Opplasting av profilbilder som standard sosial modell.
- «Sist sett»-status.
- At en separat voksenapp er nødvendig for normal bruk.
- At appen selv avgjør at et område er trygt.

## Kort oppsummert

Skattejaktens retning er låst på sikkerhet, områdevalg og modusvalg. Kontomodell, venner og invitasjoner er vedtatt som produktretning, men ikke ferdig implementert i baseline.
