import { Directive, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Scenario, StageOption } from '../../core/models';
import { LEGAL_LEVEL_LABELS } from '../../core/data/legal-classifications.data';
import { CaseStateService } from '../../core/services/case-state.service';
import { LegalKnowledgeService } from '../../core/services/legal-knowledge.service';
import { ScenarioService } from '../../core/services/scenario.service';
import { formatNorm } from '../../core/utils/norm-format';

/** Stufendaten, die eine konkrete Stufenseite bereitstellen muss. */
export interface StageData {
  prompt: string;
  options: StageOption[];
  correctOptions: string[];
  explanation: string;
}

/**
 * Gemeinsame Logik der drei sichtbaren Stufen.
 *
 * Die Unterklassen liefern nur noch Template und Stufenzuordnung. Die
 * Auswertung erfolgt ausschließlich über die Fallengine.
 */
@Directive()
export abstract class StagePageBase implements OnInit {
  protected readonly route = inject(ActivatedRoute);
  protected readonly router = inject(Router);
  protected readonly scenarios = inject(ScenarioService);
  protected readonly state = inject(CaseStateService);
  protected readonly knowledge = inject(LegalKnowledgeService);

  abstract readonly stage: 1 | 2 | 3;
  abstract readonly heading: string;

  readonly scenario = signal<Scenario | undefined>(undefined);
  readonly selected = signal<string[]>([]);
  readonly submitted = signal(false);

  readonly evaluation = computed(() => (this.submitted() ? this.state.evaluateSingle(this.stage) : undefined));

  readonly allowMultiple = computed(() => {
    const current = this.scenario();
    return current ? this.stageData(current).correctOptions.length > 1 : true;
  });

  readonly normLabels = computed<Record<string, string>>(() => {
    const labels: Record<string, string> = {};
    for (const norm of this.knowledge.getNorms()) {
      labels[norm.id] = formatNorm(norm);
    }
    return labels;
  });

  /** Anzeigenamen der Rechtsgebiete für Stufe 2. */
  readonly legalLevelLabels = LEGAL_LEVEL_LABELS;

  readonly nextLabel = computed(() => {
    if (this.stage === 3) return 'Zum Ergebnis';
    return `Weiter zu Stufe ${this.stage + 1}`;
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    const scenario = this.scenarios.getScenario(id);
    this.scenario.set(scenario);
    if (!scenario) {
      this.router.navigate(['/scenarios']);
      return;
    }
    this.state.start(id);
    this.selected.set(this.state.getSelection(this.stage));
    this.submitted.set(this.state.isAnswered(this.stage));
  }

  /** Von der Unterklasse bereitzustellende Stufendaten. */
  protected abstract stageData(scenario: Scenario): StageData;

  protected abstract nextRoute(scenarioId: string): unknown[];

  toggleOption(optionId: string): void {
    if (this.allowMultiple()) {
      const current = this.selected();
      this.selected.set(
        current.includes(optionId) ? current.filter((id) => id !== optionId) : [...current, optionId],
      );
    } else {
      this.selected.set([optionId]);
    }
  }

  submit(): void {
    if (this.selected().length === 0) {
      return;
    }
    this.state.setSelection(this.stage, this.selected());
    this.submitted.set(true);
  }

  next(): void {
    const current = this.scenario();
    if (!current) {
      return;
    }
    this.router.navigate(this.nextRoute(current.id));
  }
}
