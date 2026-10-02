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
- `src/app/features` – home, scenarios, stage-one/two/three, result.
- `src/app/shared/components` – reusable UI.

Rules:

- No legal logic in templates; it belongs in services/data.
- Never derive an authority (Befugnis) automatically from a criminal offense.
  The forbidden automatisms in `core/data/forbidden-automatisms.data.ts` are
  binding.
- Stufe-2 options carry a `legalLevel`; keep it in sync when adding options.
- New scenarios are seed data, never part of the knowledge base.

## Testing notes

- Test files are colocated as `*.spec.ts`.
- When adding scenarios or options, the integrity specs in
  `core/data/scenarios.data.spec.ts` must stay green (norm/authority/
  classification references, misconceptions on FALSCH options, model solution).
- `core/rules/legal-reasoning.spec.ts` guards the forbidden automatisms and the
  Anspruch/Befugnis/Rechtfertigung/Entschuldigung separation.

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
