# Branch-struktur

Dette dokumentet beskriver branchene som brukes i repoet og reglene for videre arbeid.

## Aktiv arbeidsbranch

```text
sonar
```

Alt videre Sonar-arbeid skal gjøres på denne branchen.

Kontroller lokalt:

```bash
git fetch origin
git switch sonar
git pull origin sonar
git branch --show-current
git status -sb
```

Forventet:

```text
sonar
## sonar...origin/sonar
```

## `main`

Formål:

- stabil hovedbranch
- ingen direkte prototype- eller designendringer
- mottar kun ferdig, testet og godkjent arbeid

Regler:

- ikke push direkte til `main`
- ikke flytt `main` manuelt
- merge først etter synkronisering, test og eksplisitt godkjenning

## `skattejakt-spillet`

Formål:

- autoritativ branch for eksisterende Tåkekart-/skattejaktgrunnlag
- inneholder navigasjonsflyt, regler, XP, Home-status og tidligere spillimplementasjon

Denne branchen skal ikke endres under Sonar-arbeidet uten eksplisitt beskjed.

## `sonar`

Opprettet fra siste godkjente commit på `skattejakt-spillet`:

```text
f0bfe3311b8fe0e41bc2557100bd6fcd8ae97a9a
```

Inneholder nå:

- egen Sonar-spillskjerm for web og native
- stor rund radar
- sweep- og puls-animasjoner
- simulert signalstyrke og avstand
- åpning ved 5 meter
- profesjonelt Sonar-valg i `TreasureSetup`
- balansert aktiv tilstand for Tåkekart
- cyan aktiv Sonar-jakt på Home
- samme XP-regler som vanlig skattejakt
- oppdatert dokumentasjon

Viktige nye filer:

```text
src/screens/treasure/SonarHuntScreen.js
src/screens/treasure/SonarHuntScreen.styles.js
```

På denne branchen re-eksporterer disse Sonar-skjermen:

```text
src/screens/treasure/TreasureHuntScreen.js
src/screens/treasure/TreasureHuntScreen.web.js
```

## Lokale brukerendringer

Ved siste kontroll hadde brukeren lokale modifikasjoner i:

```text
assets/images/treasure/treasure-setup-header.png
assets/images/treasure/treasure-setup-header.webp
package.json
package-lock.json
```

Regler:

- ikke bruk `git reset --hard`
- ikke bruk `git checkout --` på disse filene
- ikke overskriv dem via GitHub uten eksplisitt beskjed
- avhengighetsendringer må senere avklares mot brukerens lokale `package.json` og lockfil

## Eldre brancher

```text
skattejakt-spill
sikkerhet
skattejakt-oppsett
neste-design
```

Disse er historiske arbeidsbrancher og skal ikke brukes til nytt Sonar-arbeid. Ikke slett brancher uten eksplisitt godkjenning.

## Regler for videre arbeid

1. Bekreft alltid at aktiv branch er `sonar`.
2. Hent fil og gjeldende SHA fra `sonar` før oppdatering.
3. Commit én tydelig oppgave om gangen.
4. Ikke bland stor refaktorering med designjusteringer.
5. Ikke rør brukerens lokale modifiserte filer.
6. Oppdater dokumentasjon ved navigasjons-, state- eller arkitekturendringer.
7. Kontroller web og native separat.
8. Ikke anta at XP-reglene betyr at faktisk XP-utbetaling allerede er ferdig koblet.
9. Ikke merge før brukeren eksplisitt godkjenner det.

## Gjeldende Sonar-commits

```text
4858033  Add first sonar hunt screen
b172837  Style first sonar hunt screen
e1a62aa  Route web treasure hunt to sonar screen
92b42db  Route native treasure hunt to sonar screen
3278728  Polish sonar mode selection in treasure setup
4c8adac  Add subtle life to selected fog mode
fb5fea1  Mark sonar hunts for home screen styling
5c4c0cd  Style active sonar hunt on home screen
```

## Før fremtidig merge

Minimum:

```text
autoritativ activeTreasure-state
→ flere funn før resultat
→ faktisk tid og funn til resultat
→ calculateTreasureXp i virkelig flyt
→ XP utbetales én gang
→ Home bruker eksplisitt mode
→ avklar package-lock
→ synkroniser main
→ test web og fysisk enhet
→ pull request
→ eksplisitt merge-godkjenning
```

## Dokumentasjon

Autoritative dokumenter:

```text
README.md
docs/project-status.md
docs/branch-structure.md
docs/treasure-hunt-flow.md
docs/chat-handoff.md
```
