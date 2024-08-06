import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cellule4GComponent } from './cellule4-g.component';

describe('Cellule4GComponent', () => {
  let component: Cellule4GComponent;
  let fixture: ComponentFixture<Cellule4GComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Cellule4GComponent]
    });
    fixture = TestBed.createComponent(Cellule4GComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
