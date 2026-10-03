import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter, Router } from '@angular/router';
import { OralExamIntroComponent } from './oral-exam-intro.component';
import { OralExamService } from '../../core/services/oral-exam.service';

describe('OralExamIntroComponent', () => {
  let fixture: ComponentFixture<OralExamIntroComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OralExamIntroComponent],
      providers: [provideNoopAnimations(), provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(OralExamIntroComponent);
    fixture.detectChanges();
    element = fixture.nativeElement as HTMLElement;
  });

  it('nennt Umfang, Punkte und Bestehensgrenze', () => {
    const text = element.textContent ?? '';
    expect(text).toContain('9');
    expect(text).toContain('27');
    expect(text).toContain('14 / 27');
    expect(text).toContain('50 %');
  });

  it('listet alle neun Themengebiete auf', () => {
    const text = element.textContent ?? '';
    for (const label of [
      'Rechtsordnung / Staatskunde',
      'GewO / BewachV',
      'Datenschutz',
      'BGB',
      'StGB / StPO',
      'Waffen',
      'DGUV / UVV',
      'Umgang mit Menschen',
      'Sicherheitstechnik',
    ]) {
      expect(text).toContain(label);
    }
  });

  it('startet bei Klick einen Durchlauf und navigiert zur Durchführung', () => {
    const service = TestBed.inject(OralExamService);
    const router = TestBed.inject(Router);
    const navigate = spyOn(router, 'navigate');

    (element.querySelector('.start') as HTMLButtonElement).click();

    expect(service.exam()).not.toBeNull();
    expect(navigate).toHaveBeenCalledWith(['/pruefungssimulation/durchfuehrung']);
  });
});
