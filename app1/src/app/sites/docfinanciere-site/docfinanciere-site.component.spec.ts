import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocfinanciereSiteComponent } from './docfinanciere-site.component';

describe('DocfinanciereSiteComponent', () => {
  let component: DocfinanciereSiteComponent;
  let fixture: ComponentFixture<DocfinanciereSiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocfinanciereSiteComponent]
    });
    fixture = TestBed.createComponent(DocfinanciereSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
