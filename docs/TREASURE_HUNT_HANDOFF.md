# Skattejakt-handoff

## Status

Aktiv baseline er `fc4552c`.

I baseline finnes en fungerende skattejaktflyt, men den senere Treasure Setup-redesignen skal ikke beskrives som implementert eller ferdig.

## Hva Som Faktisk Finnes I Koden

- `App.js` peker til `src/navigation/AppNavigator.js`.
- Navigasjonen har skattejaktstegene `TreasureSetup → AreaCheck → Safety → TreasureHunt → TreasureFound → TreasureResult`.
- `src/screens/treasure/TreasureSetupScreen.js` er en enkel demooppsettsskjerm med Sonar som valgt modus, demo-område, én skatt og en enkel vanskelighetsvelger.
- `src/screens/treasure/AreaCheckScreen.js` viser en enkel områdesjekk med kontrollpunkter og videreknapp.
- `src/screens/treasure/SafetyScreen.js` krever eksplisitt bekreftelse før jaktstart.
- `src/screens/treasure/TreasureHuntScreen.web.js` er en web-safe demo med Kart, Kompass og Sonar, samt demo-knapper for å justere avstand.
- `src/screens/treasure/TreasureFoundScreen.js` viser funn og belønning i web-testmodus.
- `src/screens/treasure/TreasureResultScreen.js` viser oppsummering og retur til meny eller ny jakt.
- `src/components/treasure/SonarPulse.js` brukes i web-varianten av Sonar.

## Hva Som Ble Satt Til Side

- Full Treasure Setup-redesign.
- Flerspillerlobby og venneinvitasjoner.
- Innlogging og kontomodell.
- Online-status.
- Separat voksenapp som krav for normal bruk.
- Full kart- og GPS-implementasjon i senere V2/V3-retning.

## Låste Produktbeslutninger

- To hovedaktiviteter: Rebusløp og Skattejakt.
- Skattejakt skal foreslå lekeområde, ikke garantere trygghet.
- Den godkjente sikkerhetsteksten er:

  `Appen foreslår et lekeområde. En voksen må kontrollere området før start.`

- Planlagte spillmoduser er Fog of War og Sonar.
- Planlagt antall skatter er 3, 5 eller 7.
- Fog of War skal ha oransje identitet.
- Sonar skal ha lilla identitet.
- Standardvalg i planlagt oppsett er Fog of War og 5 skatter.
- En voksen trenger ikke egen app for normal bruk.
- Design skal godkjennes før kodeendringer i nye skjermflyter.

## Planlagt Skjermflyt På Høyt Nivå

Planlagt videre retning:

`Innlogging → Oppsett → Områdegodkjenning → Inviter venner → Sikkerhet → Venterom → Spill → Resultat`

I baseline er den faktiske skattejaktflyten enklere og direkte:

`TreasureSetup → AreaCheck → Safety → TreasureHunt → TreasureFound → TreasureResult`

## Sikkerhetskrav

- Appen skal ikke hevde at et område automatisk er trygt.
- Appen skal vise sikkerhetstekst før aktiv jakt.
- Området skal kontrolleres av en voksen før start.
- Posisjon skal bare brukes når den er nødvendig for lek og områdekontroll.
- Ingen deltakere skal få se andres eksakte sanntidsposisjon.

## Designkrav

- Mørk adventure-stil.
- Tydelig oransje/gull primæraksent.
- Lilla identitet for Rebusløp.
- Oransje identitet for Fog of War.
- Lilla identitet for Sonar.
- Små skjermer først: 375, 390 og 430 px.
- Minimum touch target: 44 x 44 pt.
- Felles header, kort, knapper, footer og statusmønstre skal godkjennes før videre utvidelse.

## Neste Anbefalte Steg

Før neste kodeendring bør oppsett, områdegodkjenning og sikkerhetsflyt designes som én helhet, og deretter godkjennes sammen. Først etter det bør Treasure Setup eller andre tilhørende skjermer bygges videre.
