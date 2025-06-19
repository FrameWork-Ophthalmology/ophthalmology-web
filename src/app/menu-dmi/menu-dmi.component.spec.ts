import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDMIComponent } from './menu-dmi.component';

describe('MenuDMIComponent', () => {
  let component: MenuDMIComponent;
  let fixture: ComponentFixture<MenuDMIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuDMIComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuDMIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
