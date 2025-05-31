import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutAdmissionComponent } from './ajout-admission.component';

describe('AjoutAdmissionComponent', () => {
  let component: AjoutAdmissionComponent;
  let fixture: ComponentFixture<AjoutAdmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjoutAdmissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutAdmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
