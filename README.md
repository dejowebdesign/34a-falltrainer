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

Das didaktische Modell der Themenvertiefung ordnet Stufe 2 zusätzlich den
Rechtsgebieten zu. Die App zeigt das jeweilige Gebiet als Kennzeichnung an der
Option:

| Rechtsgebiet | Beispiele |
| --- | --- |
| Strafrecht | Diebstahl, Körperverletzung, Hausfriedensbruch, Beleidigung |
| Privatrecht | verbotene Eigenmacht, Besitzanspruch, Herausgabeanspruch |
| Öffentliches Recht | hoheitliche Maßnahmen (Abgrenzung zur Sicherheitskraft) |
| Rechtsbegriff | Gefahr, drohende/gegenwärtige Gefahr, Angriff |

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
                   + Stufe-1-Verhaltenskatalog (didaktisch)
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
- `StageOption` – id, text, verdict, explanation, misconception, normIds, legalLevel (Stufe 2)
- `LegalNorm` – id, law, paragraph, title, officialText, source, verificationStatus
- `LegalClassification` – id, name, level, normIds, certainty, prerequisites, explanation
- `LegalAuthority` – id, normId, kind, holder, prerequisites, permittedAction, limits, proportionality
- `Result` – behaviorResult, legalResult, authorityResult, explanation, modelSolution

Szenarien sind separate Seed-Daten und nicht Teil der juristischen Knowledge
Base. Dadurch können beliebig viele Fälle ergänzt werden.

## Juristische Datenquelle

Maßgebliche Quelle für die juristische Logik ist die Knowledge Base **V5.3.1**
(`34a_bibel_v5_3_1.txt`, Rechtsstand 01.10.2026).

Die Bibel wird nicht verkürzt, nicht umgeschrieben und nicht durch allgemeines
Modellwissen ersetzt. Alle Normen, Rechtsbegriffe, Tatbestände, Befugnisse,
Selbsthilfe-, Notwehr- und Notstandregeln sowie die Fall- und Softwarelogik
stammen aus dieser Quelle.

Amtliche Gesetzestexte stammen aus „Gesetze im Internet“ (Bundesministerium der
Justiz / Bundesamt für Justiz). Wo ein amtlicher Gesetzestext in der Knowledge
Base nicht vorhanden ist, wird die Angabe als fehlend markiert
(`verificationStatus: 'MISSING'`) statt erfunden zu werden. Ein Beispiel ist
§823 BGB: Die Bibel nennt die Norm nur als Beispiel für einen Anspruch, ohne
eigenen Normabschnitt; die App führt sie deshalb ohne amtlichen Wortlaut.

### Didaktische Quelle

Die drei sichtbaren Stufen, die Verhaltensbausteine der Stufe 1 und die
Rechtsgebiete der Stufe 2 folgen der Unterlage **„Fallbeispiele –
Themenvertiefung“ (30.09.2026, Sachkundeprüfung §34a GewO)**.

- Stufe 1: Verhaltensbausteine „Umgang mit Menschen“
  (`src/app/core/data/behavior-catalog.data.ts`).
- Stufe 2: Rechtsgebiete Strafrecht / Privatrecht / öffentliches Recht.
- Stufe 3: Rechtfertigungsgründe und Befugnisse aus der V5.3.1-Bibel.

Die Unterlage ist die didaktische Leitlinie; die juristische Begründung bleibt
ausschließlich die V5.3.1-Bibel. Die Fallbeispiele der Unterlage werden als
eigene Seed-Szenarien abgebildet (u. a. Wegnahme aus dem Einkaufswagen,
Marktschließung/Hausverbot) und nicht in die Knowledge Base eingebaut.

## Hinweis zur V5.3.1 Knowledge Base

- Keine neuen Rechtsgrundlagen erfinden.
- Fehlende oder unklare Informationen werden als fehlend/unklar markiert.
- Der amtliche Gesetzestext wird – wenn vorhanden – wörtlich wiedergegeben.
- Die Knowledge Base ist von den Szenarien getrennt und versionierbar.

## Deployment

Die App ist eine rein statische Angular-Webanwendung. Sie wird einmalig in
GitHub Actions gebaut und als fertiges Docker-Image in der GitHub Container
Registry (GHCR) veröffentlicht. Das Zielsystem lädt nur noch dieses Image – es
baut nichts selbst.

```
GitHub Repository
      ↓
GitHub Actions (CI: Tests + Angular Production Build)
      ↓
Docker Image (Multi-Stage: Node-Build → nginx-Runtime)
      ↓
GitHub Container Registry (GHCR)
      ↓
Portainer lädt fertiges Image
      ↓
Container läuft (z. B. auf Umbrel)
```

### GitHub Actions

| Workflow | Datei | Aufgabe |
| --- | --- | --- |
| CI | `.github/workflows/ci.yml` | `npm ci` → `npm test` → `npm run build` bei Push auf `main` und bei Pull Requests |
| Docker Image | `.github/workflows/docker-image.yml` | erst CI (Tests + Build), danach Docker-Build und Push nach GHCR |

Der Docker-Workflow läuft nur bei Push auf `main` (und manuell per
`workflow_dispatch`) und veröffentlicht erst, wenn die Tests und der Build
erfolgreich waren.

### Docker Image und GHCR

```
ghcr.io/dejowebdesign/34a-falltrainer
```

Erzeugte Tags:

| Tag | Bedeutung |
| --- | --- |
| `latest` | jeweils letzter erfolgreicher Build von `main` |
| `main` | letzter erfolgreicher Build des `main`-Branches |
| `sha-<commit>` | exakter Commit (z. B. `sha-4af2248…`), vollständiger SHA |

Der Workflow wird derzeit bei Push auf `main` und manuell
(`workflow_dispatch`) ausgelöst; die Tags `latest`, `main` und
`sha-<commit>` werden dabei gesetzt.

**Reproduzierbare Deployments:** Für einen festen, jederzeit wiederholbaren
Stand ist ein `sha-<commit>`-Tag besser geeignet als `latest`, weil `latest`
sich mit jedem Build ändern kann. `latest` eignet sich für einen schnellen
Test; ein SHA-Tag garantiert, dass immer genau derselbe Stand läuft.

### Dockerfile

- **Stage 1 (`build`):** `node:22-alpine`, `npm ci`, `npm run build`.
- **Stage 2 (`runtime`):** `nginx:1.27-alpine` mit ausschließlich
  `dist/34a-falltrainer/browser` und der nginx-Konfiguration.

Das Image wird als Multi-Arch-Image für `linux/amd64` und `linux/arm64`
veröffentlicht, damit es sowohl auf Umbrel-Home/x86 als auch auf
Raspberry-Pi-Geräten läuft.

Der Runtime-Container enthält kein Node, keine npm-Abhängigkeiten und keine
Quelldateien. Die SPA-Konfiguration (`nginx/default.conf`) liefert bei
unbekannten Routen `index.html` als Fallback aus, damit direktes Aufrufen von
`/scenarios/:id/stage/2` usw. funktioniert.

Lokaler Test des Images:

```bash
docker build -t 34a-falltrainer:local .
docker run --rm -p 8085:80 34a-falltrainer:local
# danach http://localhost:8085/ aufrufen
```

### Portainer Test Deployment

1. **GHCR Image verfügbar machen.** Nach einem erfolgreichen Lauf von
   *Docker Image* unter `https://github.com/dejowebdesign/34a-falltrainer/pkgs/container/34a-falltrainer`
   prüfen. Ist das Paket privat, im Paket unter *Package settings* die
   Sichtbarkeit auf öffentlich stellen **oder** in Portainer eine Registry
   `ghcr.io` mit einem GitHub-Token (Scope `read:packages`) hinterlegen.
2. **Portainer öffnen** und links **Stacks** wählen.
3. **Neuen Stack anlegen** (*Add stack*).
4. **`docker-compose.portainer.yml`** aus diesem Repository in den
   Stack-Editor einfügen (oder das Repository als Git-Stack verbinden).
5. **Stack deployen.** Portainer zieht nur das fertige Image aus GHCR.
6. **URL aufrufen:** `http://<umbrel-host>:8085/` (der Host-Port `8085` ist in
   der Compose-Datei frei wählbar).
7. **Healthcheck prüfen:** In Portainer beim Container den Status *healthy*
   kontrollieren (HTTP-GET auf `/`).

Auf dem Umbrel wird **kein npm, kein Angular-Build und kein Docker-Build**
ausgeführt. Es wird ausschließlich das fertige GHCR-Image heruntergeladen und
gestartet.

### Sicherheit und Betrieb

- Keine privilegierten Rechte, kein Docker-Socket-Mount, kein Host-Networking.
- Keine persistenten Volumes – die App ist statisch und benötigt keine Daten.
- `read_only` Root-Dateisystem; nur `/var/cache/nginx`, `/var/run` und `/tmp`
  sind als flüchtige `tmpfs` eingebunden.
- `no-new-privileges` gesetzt.
- Begrenztes Logging (`json-file`, 10 MB × 3).

