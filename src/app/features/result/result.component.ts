import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CaseResult, LegalNorm, Scenario } from '../../core/models';
import { CaseEngineService } from '../../core/rules/case-engine.service';
import { CaseStateService } from '../../core/services/case-state.service';
import { LegalKnowledgeService } from '../../core/services/legal-knowledge.service';
import { ScenarioService } from '../../core/services/scenario.service';
import { formatFachlicheEinordnung, formatNorm } from '../../core/utils/norm-format';
import { ProgressStepperComponent } from '../../shared/components/progress-stepper.component';
import { VerdictBadgeComponent } from '../../shared/components/verdict-badge.component';

@Component({
  selector: 'app-result',
  imports: [
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    ProgressStepperComponent,
    VerdictBadgeComponent,
  ],
  template: `
    <div class="ft-container page">
      <app-progress-stepper [current]="4" />

      @if (caseResult(); as result) {
        @if (scenario(); as current) {
          @if (current.originalCaseText) {
            <mat-card appearance="outlined" class="case-card">
              <mat-card-content>
                <details class="case-details">
                  <summary>Sachverhalt anzeigen</summary>
                  <p class="case-text">{{ current.originalCaseText }}</p>
                </details>
              </mat-card-content>
            </mat-card>
          }

          <mat-card appearance="outlined" class="result-head">
            <mat-card-header>
              <mat-card-title>Ergebnis: {{ current.title }}</mat-card-title>
              <mat-card-subtitle>Gesamtbewertung</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="overall">
                <app-verdict-badge [verdict]="result.overallVerdict" />
                <span class="score">{{ result.score }} %</span>
              </div>
              <mat-progress-bar
                mode="determinate"
                [value]="result.score"
                [attr.aria-label]="'Erreichte Punktzahl ' + result.score + ' Prozent'"
              />
              <p class="explanation">{{ result.result.explanation }}</p>
            </mat-card-content>
          </mat-card>

          <mat-card appearance="outlined" class="model-solution">
            <mat-card-header>
              <mat-card-title>Musterlösung</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <ol class="solution">
                <li>
                  <h3>1. Verhalten</h3>
                  <p>{{ result.result.modelSolution.behavior }}</p>
                </li>
                <li>
                  <h3>2. Rechtliche Einordnung</h3>
                  <p>{{ result.result.modelSolution.legalClassification }}</p>
                </li>
                <li>
                  <h3>3. Rechtsgrundlage</h3>
                  <p>{{ result.result.modelSolution.legalBasis }}</p>
                </li>
                <li>
                  <h3>4. Begründung</h3>
                  <p>{{ result.result.modelSolution.reasoning }}</p>
                </li>
                <li>
                  <h3>5. Grenzen</h3>
                  <p>{{ result.result.modelSolution.limits }}</p>
                </li>
              </ol>
            </mat-card-content>
          </mat-card>

          <div class="stage-results">
            @for (evaluation of result.evaluations; track evaluation.stage) {
              <mat-card appearance="outlined" class="stage-card">
                <mat-card-header>
                  <mat-card-title>Stufe {{ evaluation.stage }}</mat-card-title>
                  <mat-card-subtitle>
                    {{ evaluation.correctCount }} richtig · {{ evaluation.partialCount }} teilweise ·
                    {{ evaluation.wrongCount }} falsch
                  </mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>
                  <app-verdict-badge [verdict]="evaluation.verdict" />
                  <p class="stage-explanation">{{ evaluation.explanation }}</p>
                  @if (misconceptionsForStage(evaluation.stage).length) {
                    <div class="misconception-box">
                      <h4>
                        <mat-icon aria-hidden="true">lightbulb</mat-icon>
                        Typische Denkfehler
                      </h4>
                      <ul>
                        @for (item of misconceptionsForStage(evaluation.stage); track item) {
                          <li>{{ item }}</li>
                        }
                      </ul>
                    </div>
                  }
                </mat-card-content>
              </mat-card>
            }
          </div>

          @if (usedNorms().length) {
            <mat-card appearance="outlined" class="norms-card">
              <mat-card-header>
                <mat-card-title>Rechtsgrundlagen dieses Falls</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <ul class="norms">
                  @for (norm of usedNorms(); track norm.id) {
                    <li>
                      <div class="norm-head">
                        <strong>{{ formatNorm(norm) }}</strong>
                        @if (formatFachlicheEinordnung(norm); as einordnung) {
                          <span class="norm-einordnung">Fachliche Einordnung: {{ einordnung }}</span>
                        }
                      </div>
                      <p class="mnemonic">{{ norm.mnemonic }}</p>
                      @if (norm.verificationStatus !== 'VERIFIED_OFFICIAL_TEXT') {
                        <p class="missing">
                          <mat-icon aria-hidden="true">report_problem</mat-icon>
                          Amtlicher Gesetzestext in der Knowledge Base nicht vorhanden – als fehlend
                          markiert.
                        </p>
                      } @else if (norm.officialText) {
                        <details>
                          <summary>Amtlicher Gesetzestext</summary>
                          <p class="official">{{ norm.officialText }}</p>
                          <a [href]="norm.source" target="_blank" rel="noopener">Quelle: {{ norm.source }}</a>
                        </details>
                      }
                    </li>
                  }
                </ul>
              </mat-card-content>
            </mat-card>
          }

          <div class="actions">
            <a mat-stroked-button [routerLink]="['/scenarios', current.id, 'stage', 1]">
              <mat-icon aria-hidden="true">refresh</mat-icon>
              Fall erneut bearbeiten
            </a>
            <a mat-flat-button color="primary" routerLink="/scenarios">
              <mat-icon aria-hidden="true">list</mat-icon>
              Zur Fallübersicht
            </a>
          </div>
        }
      } @else {
        <mat-card appearance="outlined">
          <mat-card-content>
            <h2>Kein Ergebnis verfügbar</h2>
            <p>Bearbeiten Sie zuerst den Fall über alle drei Stufen.</p>
          </mat-card-content>
          <mat-card-actions align="end">
            <a mat-flat-button color="primary" routerLink="/scenarios">Zur Fallübersicht</a>
          </mat-card-actions>
        </mat-card>
      }
    </div>
  `,
  styles: [
    `
      .page {
        padding-block: 1.5rem 3.5rem;
        display: grid;
        gap: 1.25rem;
      }
      .result-head,
      .model-solution,
      .stage-card,
      .norms-card,
      .case-card {
        border-radius: 14px;
      }
      .case-details {
        border: 1px solid var(--ft-border);
        border-radius: 10px;
        background: var(--ft-surface-2);
        padding: 0.6rem 0.85rem;
      }
      .case-details summary {
        cursor: pointer;
        color: var(--ft-primary);
        font-weight: 600;
      }
      .case-text {
        margin: 0.6rem 0 0;
        line-height: 1.6;
      }
      .overall {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.75rem;
      }
      .score {
        font-size: 1.4rem;
        font-weight: 700;
        color: var(--ft-primary);
      }
      .explanation {
        margin: 1rem 0 0;
        line-height: 1.6;
      }
      .solution {
        margin: 0;
        padding-left: 1.1rem;
        display: grid;
        gap: 0.9rem;
      }
      .solution h3 {
        margin: 0 0 0.25rem;
        font-size: 1rem;
        color: var(--ft-primary);
      }
      .solution p {
        margin: 0;
        line-height: 1.6;
      }
      .stage-results {
        display: grid;
        gap: 1rem;
        grid-template-columns: 1fr;
      }
      @media (min-width: 768px) {
        .stage-results {
          grid-template-columns: repeat(3, 1fr);
        }
      }
      .stage-explanation {
        margin: 0.75rem 0 0;
        color: var(--ft-muted);
        line-height: 1.55;
      }
      .misconception-box {
        margin-top: 0.9rem;
        padding: 0.8rem;
        border-radius: 10px;
        background: var(--ft-warn-surface);
        border: 1px solid var(--ft-warn-border);
      }
      .misconception-box h4 {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        margin: 0 0 0.4rem;
        font-size: 0.92rem;
        color: var(--ft-warn-text);
      }
      .misconception-box h4 mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }
      .misconception-box ul {
        margin: 0;
        padding-left: 1.1rem;
        color: var(--ft-warn-text);
        font-size: 0.88rem;
        line-height: 1.5;
      }
      .norms {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 1rem;
      }
      .norms li {
        padding-bottom: 0.9rem;
        border-bottom: 1px solid var(--ft-border);
      }
      .norms li:last-child {
        border-bottom: none;
        padding-bottom: 0;
      }
      .norm-head {
        display: flex;
        gap: 0.5rem;
        align-items: baseline;
        flex-wrap: wrap;
      }
      .norm-title {
        color: var(--ft-muted);
        font-size: 0.9rem;
      }
      .norm-einordnung {
        display: inline-block;
        color: var(--ft-muted);
        font-size: 0.85rem;
        font-style: italic;
      }
      .mnemonic {
        margin: 0.3rem 0 0;
        color: var(--ft-primary);
        font-size: 0.9rem;
      }
      .missing {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        color: var(--ft-warn);
        font-size: 0.85rem;
        margin: 0.4rem 0 0;
      }
      .missing mat-icon {
        font-size: 16px;
        width: 16px;
        height: 16px;
      }
      details {
        margin-top: 0.5rem;
      }
      summary {
        cursor: pointer;
        color: var(--ft-primary);
        font-size: 0.9rem;
      }
      .official {
        margin: 0.5rem 0 0.25rem;
        padding: 0.75rem;
        background: var(--ft-surface-2);
        border-radius: 8px;
        line-height: 1.55;
        font-size: 0.92rem;
      }
      .actions {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
      }
    `,
  ],
})
export class ResultComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly scenarios = inject(ScenarioService);
  private readonly state = inject(CaseStateService);
  private readonly knowledge = inject(LegalKnowledgeService);
  private readonly engine = inject(CaseEngineService);

  readonly scenario = signal<Scenario | undefined>(undefined);
  readonly caseResult = signal<CaseResult | undefined>(undefined);

  readonly usedNorms = computed<LegalNorm[]>(() => {
    const scenario = this.scenario();
    const result = this.caseResult();
    if (!scenario || !result) {
      return [];
    }
    const ids = new Set<string>();
    const collect = (options: { normIds?: string[] }[]) =>
      options.forEach((option) => (option.normIds ?? []).forEach((id) => ids.add(id)));

    collect(scenario.stageOne.options);
    collect(scenario.stageTwo.options);
    collect(scenario.stageThree.options);
    this.knowledge
      .getAuthoritiesByIds(scenario.stageThree.authorityIds)
      .forEach((authority) => ids.add(authority.normId));

    return this.knowledge.getNormsByIds([...ids]);
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    const scenario = this.scenarios.getScenario(id);
    if (!scenario) {
      this.router.navigate(['/scenarios']);
      return;
    }
    // Ohne Bearbeitungszustand (z. B. nach einem Neuladen) würde die Auswertung
    // sonst 0 % zeigen; dann zurück zum Fallbeginn statt ein falsches Ergebnis.
    if (this.state.progress()?.scenarioId !== id) {
      this.router.navigate(['/scenarios', id, 'stage', 1]);
      return;
    }
    this.scenario.set(scenario);
    this.caseResult.set(this.state.evaluate());
  }

  /** Denkfehler einer Stufe aus dem Gesamtergebnis. */
  misconceptionsForStage(stage: 1 | 2 | 3): string[] {
    const scenario = this.scenario();
    if (!scenario) {
      return [];
    }
    return this.engine.misconceptionsForStage(scenario, stage, this.state.getSelection(stage));
  }

  /** Zentrale Normdarstellung: § [Paragraph] [Absatz] [Gesetz] – [Titel]. */
  formatNorm = formatNorm;

  /** Fachliche Einordnung, getrennt vom offiziellen Gesetzestitel. */
  formatFachlicheEinordnung = formatFachlicheEinordnung;
}
