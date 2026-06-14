# Produktbeslutninger

## Status

Dette dokumentet skiller mellom låste beslutninger, planlagt funksjonalitet og åpne spørsmål.

Home Screen V2 er ferdigstilt og visuelt godkjent.

## Besluttet

- Live Rebus har to hovedaktiviteter: Rebusløp og Skattejakt.
- V1 web/demo brukes som funksjonell referanse.
- V2 brukes til design og visuell polering.
- Kart, ekte GPS og full native Fog of War holdes til V3.
- En voksen skal ikke måtte installere en separat app for normal bruk.
- Skattejakt skal foreslå lekeområde, ikke garantere trygghet.
- Godkjent sikkerhetstekst:

  `Appen foreslår et lekeområde. En voksen må kontrollere området før start.`

## Låste Home-beslutninger

- Home skal være et mørkt adventure-dashboard.
- Home skal ikke bruke scrolling ved målvisningen.
- Header viser avatar, dynamisk hilsen, XP og settings.
- Lange navn skal avkortes før settings-området.
- Rebusløp og Skattejakt skal ha tydelig ulik visuell identitet.
- Home viser maksimalt to dynamiske aktivitetskort.
- Flere aktiviteter av samme type skal støttes.
- Dynamisk seksjonstittel bestemmes av aktivitetenes status.
- Førstegangsvisning skal gi ett startkort for hver hovedaktivitet.
- Statushandlinger er:
  - planlagt: `Gå til venterom`
  - pågående: `Fortsett eventyr`
  - fullført: `Se resultat`
- XP vises i headeren, ikke som en separat stor progresjonsseksjon på Home.
- Trykkbare kontroller skal ha minst 44 pt trykkflate.
- Tekst og dynamiske verdier skal kodes som UI, ikke bakes inn i bilder.

## Planlagt

- innlogging
- konto per spiller
- venneliste
- online-status
- invitasjoner
- kontosletting
- blokkering og moderering ved sosial funksjonalitet
- flere skattejaktvarianter og konfigurasjonsvalg
- videre V2-polering av resterende skjermer

## Åpne spørsmål

- teknisk løsning for innlogging og konto
- teknisk løsning for venneliste og invitasjoner
- backend og datalagring
- nødvendig modereringsnivå
- endelig native kart- og GPS-arkitektur i V3

## Ikke valgt

- offentlig brukersøk
- fri chat
- fri profiltekst
- opplasting av profilbilder som standard sosial modell
- «sist sett»-status
- separat voksenapp som krav
- at appen selv avgjør at et område er trygt

## Kort oppsummert

Home Screen V2 er låst. Videre arbeid skal bevare den godkjente strukturen og dynamiske statuslogikken. Nye fundamentale Home-endringer krever en eksplisitt designbeslutning.
