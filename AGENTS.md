# AGENTS.md

Repository-specific knowledge for the **34a Falltrainer** Angular app.

## What this project is

Angular (standalone, signals) web app that trains case handling for the German
§34a GewO Sachkundeprüfung. The learner always works through exactly three
visible stages:

1. Wie verhalten Sie sich? (Umgang mit Menschen)
2. Was liegt rechtlich vor? (rechtliche Einordnung)
3. Mit welcher Rechtsgrundlage dürfen Sie eingreifen?

Never add further visible learning stages. The internal rule engine may check
more, but the UI stays at three stages plus a result page.

## Authoritative sources

- `34a_bibel_v5_3_1.txt` – **authoritative** legal knowledge base. Do not
  shorten, rewrite, or replace with general model knowledge. Never invent norms,
  paragraphs or legal bases. If something is missing, mark it as missing
  (`verificationStatus: 'MISSING'`, empty `officialText`).
- `30092026_Fallbeispiele_Themenvertiefung .pdf` – didactic source for the three
  stages, the Stufe-1 behavior catalog and the Stufe-2 legal areas (Strafrecht /
  Privatrecht / öffentliches Recht). It is a didactic guide only; the legal
  reasoning always comes from the V5.3.1 Bible.
- `scripts/Fragen.txt` – question bank for the mündliche Prüfungssimulation
  (244 blocks, 9 categories, difficulties 1–5). Main question + correct answer
  are taken 1:1 (`source: 'QUESTIONS_TXT'`). The bank has **no** follow-up
  answers; those are authored in
  `src/app/core/data/oral-exam-authored.data.ts` and flagged
  `AUTHORED_FROM_BIBEL` (BGB / StGB-StPO only) or
  `AUTHORED_FROM_FACHWISSEN` / `UNVERIFIED` (categories the Bible does not
  cover). Never silently change questions or answers from `Fragen.txt`; report
  problems instead.

## Commands

```bash
npm install
npm start              # dev server, http://localhost:4200
npm run build          # production build -> dist/34a-falltrainer
npm test               # Karma/Chrome Headless, single run
npm run test:ci        # ChromeHeadlessNoSandbox for containers
```

## Architecture / conventions

- `src/app/core/data` – knowledge base + seed data. Legal knowledge and
  scenarios are strictly separated; scenarios only reference knowledge-base IDs.
- `src/app/core/models` – TypeScript interfaces.
- `src/app/core/rules` – case engine and the legal separation check
  (Anspruch ≠ Befugnis ≠ Rechtfertigung ≠ Entschuldigung).
- `src/app/core/services` – knowledge, scenario and case-state services.
- `src/app/features` – home, scenarios, stage-one/two/three, result, oral-exam.
- `src/app/shared/components` – reusable UI.

Rules:

- No legal logic in templates; it belongs in services/data.
- Never derive an authority (Befugnis) automatically from a criminal offense.
  The forbidden automatisms in `core/data/forbidden-automatisms.data.ts` are
  binding.
- Stufe-2 options carry a `legalLevel`; keep it in sync when adding options.
- New scenarios are seed data, never part of the knowledge base.
- Display every paragraph via `formatNorm(norm)` (`core/utils/norm-format.ts`):
  `§ [Paragraph] [Absatz] [Gesetz] – [offizieller Titel]`. The title comes only
  from `legal-norms.data.ts`. Never print a bare paragraph number, and never use
  a fachliche Kurzbezeichnung as the official title (§228/§904 BGB → title
  "Notstand"; "Defensivnotstand"/"Aggressivnotstand" go into
  `fachlicheEinordnung`).
- The Lernhilfe (`shared/components/legal-orientation.component.ts`) teaches by
  structure, not by slogans: no Merksätze such as "Straftat ≠ automatisch
  Eingriffsbefugnis". Cards within a row must render at equal height (grid with
  `align-items: stretch`); the "ODER" between the Stufe-2 categories is only a
  visual separator and must not sit inside a card.
- The start page is the central learning page and mirrors the three exam
  questions in order (Umgang mit Menschen → rechtliche Einordnung →
  Rechtsgrundlage), directly visible, never inside an accordion. There is exactly
  one central arrow between the two diagram levels; the second level's heading
  sits below its cards. The page ends with the copyright footer; case examples
  are started only via the header "Fallbeispiele" link.

## Mündliche Prüfungssimulation

- Standalone feature (`src/app/features/oral-exam`, routes
  `/pruefungssimulation[/durchfuehrung|/auswertung|/audit]`), independent of the
  three-stage case flow. Do not turn it into a fourth case stage.
- 9 categories × 1 randomly chosen block × (1 main + 2 follow-up) = 27 scored
  questions, 1 point each, pass ≥ 50 % (14/27). Threshold, selection and scoring
  live in `core/rules/oral-exam-engine.ts` (`buildExam` / `evaluateExam` /
  `validatePool`), the run state in `core/services/oral-exam.service.ts`.
- Every question has exactly five options with exactly one correct answer. The
  correct option position is rotated across the exam.
- Per category the pool must contain several candidate blocks
  (`oral-exam-authored.data.ts`) so the choice is genuinely random;
  `validatePool` enforces full category coverage and 4 distractors per question.
- `validatePoolQuality` enforces the formal answer-quality rules (no paragraph,
  acronym or keyword leaks in any option, no norm named only in an answer, no
  absolute/extreme/mirror/redundant/ambiguous distractors, balanced option
  lengths, valid difficulty 1–5, mixed difficulty within a block, no legacy
  visible category label). It must stay green against the shipped pool.
  Question-level difficulty and legal basis are data-model fields shown in the
  run/evaluation UI after answering.
- The visible label of the `Technik` category is `Sicherheitstechnik`; the
  legacy label `Technik` is rejected by `LEGACY_CATEGORY_LABEL`.
- `buildExam` prefers per category a difficulty level not yet used in the run,
  so the nine topics produce a mixed difficulty sequence.
- The exam is time-boxed to **15 minutes** (`ORAL_EXAM_DURATION_SECONDS`). The
  run state stores `startedAt`/`finishedAt`/`timedOut` in `sessionStorage`, so
  remaining time is derived from the start timestamp (a refresh does not reset
  the clock) and is restored on reload. On expiry the service auto-finishes the
  run, locks all inputs and the run component redirects to the evaluation.
  `evaluateExam` reports `durationSeconds`, `elapsedSeconds`, `timedOut` and
  `unansweredCount`; unanswered questions count as wrong (0 points).
- The participant progress display is deliberately lean: `Themengebiet X von 9`
  and `Frage Y von 27` in the header plus a progress bar. Do not re-add a
  separate “Z von 27 Fragen beantwortet” text line (redundant with the bar).
- Source/verification flags (`QUESTIONS_TXT`, `AUTHORED_FROM_BIBEL`,
  `AUTHORED_FROM_FACHWISSEN`/`UNVERIFIED`) are data-model and audit-view only.
  They must never appear in the participant-facing exam UI.

## Testing notes

- Test files are colocated as `*.spec.ts`.
- When adding scenarios or options, the integrity specs in
  `core/data/scenarios.data.spec.ts` must stay green (norm/authority/
  classification references, misconceptions on FALSCH options, model solution).
- `core/rules/legal-reasoning.spec.ts` guards the forbidden automatisms and the
  Anspruch/Befugnis/Rechtfertigung/Entschuldigung separation.
- `core/rules/oral-exam-engine.spec.ts` and
  `core/services/oral-exam.service.spec.ts` guard exam selection, scoring and
  the 14/27 pass threshold; the four `oral-exam-*.component.spec.ts` cover the
  intro, run, evaluation and audit views.

## Deployment

- `.github/workflows/ci.yml` – `npm ci` → `npm test` → `npm run build` on push
  to `main` and on pull requests.
- `.github/workflows/docker-image.yml` – runs the CI job first, then builds the
  multi-stage image; pushes to GHCR (`ghcr.io/dejowebdesign/34a-falltrainer`)
  only on `main` pushes or manual dispatch, never on pull requests.
- `Dockerfile` – stage 1 builds Angular with Node, stage 2 is a minimal nginx
  runtime with only `dist/34a-falltrainer/browser`.
- `nginx/default.conf` – SPA fallback to `index.html`, long cache for hashed
  assets, no-cache for `index.html`.
- `docker-compose.portainer.yml` – image-only stack for Portainer/Umbrel; never
  add a `build:` section, the target host must not build anything.

Do not change the app's legal/didactic logic when touching deployment files.
