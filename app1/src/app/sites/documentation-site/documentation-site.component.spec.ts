import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationSiteComponent } from './documentation-site.component';

describe('DocumentationSiteComponent', () => {
  let component: DocumentationSiteComponent;
  let fixture: ComponentFixture<DocumentationSiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentationSiteComponent]
    });
    fixture = TestBed.createComponent(DocumentationSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
