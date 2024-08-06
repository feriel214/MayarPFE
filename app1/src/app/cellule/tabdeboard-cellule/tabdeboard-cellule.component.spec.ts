import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabdeboardCelluleComponent } from './tabdeboard-cellule.component';

describe('TabdeboardCelluleComponent', () => {
  let component: TabdeboardCelluleComponent;
  let fixture: ComponentFixture<TabdeboardCelluleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabdeboardCelluleComponent]
    });
    fixture = TestBed.createComponent(TabdeboardCelluleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
