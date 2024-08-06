import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardIngRadioComponent } from './dashboard-ing-radio.component';

describe('DashboardIngRadioComponent', () => {
  let component: DashboardIngRadioComponent;
  let fixture: ComponentFixture<DashboardIngRadioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardIngRadioComponent]
    });
    fixture = TestBed.createComponent(DashboardIngRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
