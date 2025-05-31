import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckSumComponent } from './check-sum.component';

describe('CheckSumComponent', () => {
  let component: CheckSumComponent;
  let fixture: ComponentFixture<CheckSumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckSumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckSumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
