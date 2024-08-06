import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cellule3GComponent } from './cellule3-g.component';

describe('Cellule3GComponent', () => {
  let component: Cellule3GComponent;
  let fixture: ComponentFixture<Cellule3GComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Cellule3GComponent]
    });
    fixture = TestBed.createComponent(Cellule3GComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
