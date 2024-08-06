import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdocfinanciereSiteComponent } from './editdocfinanciere-site.component';

describe('EditdocfinanciereSiteComponent', () => {
  let component: EditdocfinanciereSiteComponent;
  let fixture: ComponentFixture<EditdocfinanciereSiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditdocfinanciereSiteComponent]
    });
    fixture = TestBed.createComponent(EditdocfinanciereSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
