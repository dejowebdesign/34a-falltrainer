# 34a Falltrainer

Moderne Angular-Web-App zum interaktiven Training von Fallbeispielen für die
Sachkundeprüfung nach §34a GewO.

Die App nennt dem Lernenden nicht einfach einen Paragraphen, sondern trainiert
das juristische Denken in drei sichtbaren Stufen:

```
WIE VERHALTE ICH MICH?
        ↓
WAS LIEGT RECHTLICH VOR?
        ↓
MIT WELCHER RECHTSGRUNDLAGE DARF ICH EINGREIFEN?
```

## Ziel der App

Der Falltrainer führt schrittweise zur richtigen rechtlichen Einordnung. Er
soll insbesondere die typischen Denkfehler verhindern, die in der Prüfung und
in der Praxis zu Fehlern führen:

- Diebstahl erkannt → automatisch festhalten
- Hausverbot → automatisch Gewalt
- Eigentümer → darf die Sache immer selbst wegnehmen
- Besitzer → darf immer Gewalt anwenden
- Gefahr → automatisch §34 StGB
- Angriff → automatisch Notwehr
- Uniform → Polizeibefugnisse

## Das 3-Stufen-Modell

### Stufe 1 – Wie verhalten Sie sich?

Schwerpunkt ist der Umgang mit Menschen: Ruhe bewahren, professionelles
Auftreten, freundliche Ansprache, Ich-Botschaften, Eigensicherung,
Selbstbeherrschung, deeskalierende Kommunikation, Polizei bzw. Rettungsdienst
verständigen, Verstärkung rufen, Personen trennen, Erste Hilfe, Zeugen
feststellen, Personalien aufnehmen, Vorfall dokumentieren, Strafanzeige und
Strafantrag, Hausverbot erteilen.

Die App markiert nicht nur richtig/falsch, sondern erklärt, warum ein Verhalten
sinnvoll oder problematisch ist.

### Stufe 2 – Was liegt rechtlich vor?

Rechtliche Einordnung des Sachverhalts: Straftat, Diebstahl, Körperverletzung,
Hausfriedensbruch, verbotene Eigenmacht, Anspruch, Gefahr, drohende Gefahr,
gegenwärtige Gefahr, Angriff.

Wichtig: „Möglicher Diebstahl“ ist nicht automatisch „Diebstahl zweifelsfrei
erfüllt“. Die App unterscheidet strikt zwischen Sachverhalt, Tatsachen,
rechtlicher Einordnung und feststehendem Ergebnis.

### Stufe 3 – Mit welcher Rechtsgrundlage darf ich eingreifen?

Hier wird die konkrete Handlung der Sicherheitskraft bestimmt, z. B. §127 StPO,
§859 BGB, §860 BGB, §229 BGB, §32 StGB, §34 StGB, §228 BGB oder §904 BGB.

Die App leitet niemals aus dem bloßen Vorliegen einer Straftat automatisch eine
Befugnis ab:

- Diebstahl ≠ automatische Festhaltebefugnis
- Hausfriedensbruch ≠ automatisch Gewalt
- Gefahr ≠ automatisch Notstand
- Angriff ≠ automatisch jede beliebige Gewalt
- Eigentum ≠ automatisch die Sache selbst wegnehmen

## Juristische Trennung

Die interne Engine unterscheidet strikt:

| Kategorie | Frage |
| --- | --- |
| Anspruch | Wer kann von wem was verlangen? |
| Befugnis | Was darf ich selbst tun? |
| Rechtfertigung | Warum ist eine Handlung nicht rechtswidrig? |
| Entschuldigung | Warum entfällt gegebenenfalls die Schuld? |

§985 BGB ist z. B. ein Herausgabeanspruch – keine automatische Gewaltbefugnis.

## Interne Fallengine

Intern prüft die Anwendung detaillierter als die drei sichtbaren Stufen:

```
SACHVERHALT
  → RELEVANTE TATSACHEN
  → RECHTLICHE EINORDNUNG
  → MÖGLICHE NORM
  → VORAUSSETZUNGEN
  → SUBSUMTION
  → ANSPRUCH / BEFUGNIS / RECHTFERTIGUNG
  → GRENZEN
  → KONKRETE HANDLUNG
  → ERGEBNIS
```

Für den Benutzer bleiben diese Informationen in den drei didaktischen Stufen
organisiert. Weitere sichtbare Lernstufen werden bewusst nicht eingeführt.

## Architektur

```
src/
  app/
    core/
      data/        Knowledge Base (Normen, Einordnungen, Befugnisse, Automatismen)
      models/      TypeScript-Interfaces (Scenario, LegalNorm, ...)
      rules/       Fallengine und juristische Trennprüfung
      services/    Knowledge-, Scenario- und Fallzustand-Services
    features/
      home/        Startseite und Stufen-Erklärung
      scenarios/   Fallübersicht und Fallbeschreibung
      stage-one/   Stufe 1 – Verhalten
      stage-two/   Stufe 2 – rechtliche Einordnung
      stage-three/ Stufe 3 – Rechtsgrundlage
      result/      Ergebnis und Musterlösung
    shared/
      components/  Wiederverwendbare UI-Bausteine
```

Daten, juristische Logik und UI sind strikt getrennt. In Templates steht keine
juristische Logik.

## Routing

| Route | Inhalt |
| --- | --- |
| `/` | Startseite |
| `/scenarios` | Fallübersicht |
| `/scenarios/:id` | Fallbeschreibung |
| `/scenarios/:id/stage/1` | Stufe 1 |
| `/scenarios/:id/stage/2` | Stufe 2 |
| `/scenarios/:id/stage/3` | Stufe 3 |
| `/scenarios/:id/result` | Ergebnis und Musterlösung |

## Technik

- Angular (Standalone Components, Signals)
- TypeScript
- Angular Material
- Tailwind CSS
- Responsive für Desktop, Tablet und Mobile
- Barrierearme Bedienung (Skip-Link, ARIA, Tastaturbedienung)

## Installation

```bash
npm install
```

## Entwicklung

```bash
npm start
```

Die App läuft dann unter `http://localhost:4200/`.

## Build

```bash
npm run build
```

Das Ergebnis liegt unter `dist/34a-falltrainer`.

## Tests

```bash
npm test
```

Für containerisierte Umgebungen (Chromium ohne Sandbox):

```bash
npm run test:ci
```

Getestet werden u. a. Fallnavigation, Stufenwechsel, Antwortauswertung,
richtige/falsche Antworten, juristische Regelverknüpfungen, fehlende Daten und
die Ergebnisberechnung der Rule Engine.

## Datenmodell

Zentrale Typen (`src/app/core/models`):

- `Scenario` – id, title, description, facts
- `StageOne` / `StageTwo` / `StageThree` – options, correctOptions, explanations
- `LegalNorm` – id, law, paragraph, title, officialText, source, verificationStatus
- `LegalClassification` – id, name, normIds, prerequisites, explanation
- `LegalAuthority` – id, normId, holder, prerequisites, permittedAction, limits, proportionality
- `Result` – behaviorResult, legalResult, authorityResult, explanation, modelSolution

Szenarien sind separate Seed-Daten und nicht Teil der juristischen Knowledge
Base. Dadurch können beliebig viele Fälle ergänzt werden.

## Juristische Datenquelle

Maßgebliche Quelle ist die Knowledge Base **V5.3.1**
(`34a_bibel_v5_3_1.txt`, Rechtsstand 01.10.2026).

Die Bibel wird nicht verkürzt, nicht umgeschrieben und nicht durch allgemeines
Modellwissen ersetzt. Alle Normen, Rechtsbegriffe, Tatbestände, Befugnisse,
Selbsthilfe-, Notwehr- und Notstandregeln sowie die Fall- und Softwarelogik
stammen aus dieser Quelle.

Amtliche Gesetzestexte stammen aus „Gesetze im Internet“ (Bundesministerium der
Justiz / Bundesamt für Justiz). Wo ein amtlicher Gesetzestext in der Knowledge
Base nicht vorhanden ist, wird die Angabe als fehlend markiert
(`verificationStatus: 'MISSING'`) statt erfunden zu werden.

## Hinweis zur V5.3.1 Knowledge Base

- Keine neuen Rechtsgrundlagen erfinden.
- Fehlende oder unklare Informationen werden als fehlend/unklar markiert.
- Der amtliche Gesetzestext wird – wenn vorhanden – wörtlich wiedergegeben.
- Die Knowledge Base ist von den Szenarien getrennt und versionierbar.
