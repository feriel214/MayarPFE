import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabdebordSiteComponent } from './tabdebord-site.component';

describe('TabdebordSiteComponent', () => {
  let component: TabdebordSiteComponent;
  let fixture: ComponentFixture<TabdebordSiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabdebordSiteComponent]
    });
    fixture = TestBed.createComponent(TabdebordSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
