# Design System

## Status

Aktiv baseline er `fc4552c`.

Baseline har en etablert mørk adventure-retning i kode, med delte tokens og noen delte skjermkomponenter. Full V2-komponentisering er ikke ferdig, og ingen senere V2-redesign skal beskrives som implementert uten kodebelegg.

## Etablert I Baseline

### Palett

Følgende farger er allerede etablert i design tokens og brukt som grunnlag:

```txt
background: #0F172A
surface: #1E293B
surfaceAlt: #334155
text: #E2E8F0
textMuted: #94A3B8
primary/orange: #FF6B35
treasure/gold: #F59E0B
success/green: #22C55E
rebus/purple: #8B5CF6
player/blue: #3B82F6
danger/red: #EF4444
border: rgba(226, 232, 240, 0.12)
```

### Typografi

Etablert hierarki i tokens:

```txt
Hero:        42 / 48, 900
Section:     24 / 30, 900
Card title:  26 / 32, 900
Body:        16 / 24, 400
Body strong: 16 / 24, 800
Muted:       14 / 20, 400
Button:      16 / 20, 900
Label:       13 / 18, 800
```

Systemfont kan brukes videre, og Inter/Poppins kan vurderes senere dersom fontlasting blir en del av designretningen.

### Spacing

```txt
xs: 4
sm: 8
md: 16
lg: 20
xl: 24
section: 32
heroBottom: 28
```

### Radius

```txt
sm: 12
md: 18
lg: 24
xl: 28
pill: 999
```

### Minimum touch target

```txt
Minst: 44 x 44 pt
Standard knapp: 54 pt høyde
Ikonknapp: 48 pt
Avatar: 48 pt
```

### Delte mønstre som finnes i kode

- header
- kort
- knapper
- progresjonskort
- kommende aktivitet-kort
- status- og bekreftelsesmønstre

## Planlagt Retning

### Visuell stil

- mørk adventure-stil
- høy kontrast
- tydelig oransje/gull primæraksent
- lilla identitet for Rebusløp
- oransje identitet for Fog of War
- lilla identitet for Sonar
- store avrundede kort
- rolige glødeffekter, ikke tung animasjon

### Små skjermer først

Designet skal testes og finjusteres for:

- 375 px
- 390 px
- 430 px

Små skjermer skal være førstesjekken, ikke et etterpå-tilpasset unntak.

### Felles komponentmønstre

Følgende mønstre skal standardiseres før videre implementasjon:

- felles header
- felles kort
- felles knapper
- felles footer
- felles statusmønstre

Disse mønstrene skal beskrives og godkjennes før de bygges ut til hele flyten.

### Modusfarger

- Fog of War: oransje
- Sonar: lilla
- Rebusløp: lilla
- Skattejakt: gull/oransje

## Bruksregel

Ikke hev at en ny V2-komponent er ferdig implementert dersom den ikke kan spores direkte i koden på `fc4552c`.
