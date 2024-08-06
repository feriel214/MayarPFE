import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cellule2GComponent } from './cellule2-g.component';

describe('Cellule2GComponent', () => {
  let component: Cellule2GComponent;
  let fixture: ComponentFixture<Cellule2GComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Cellule2GComponent]
    });
    fixture = TestBed.createComponent(Cellule2GComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
