import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestigationSeverityComponent } from './investigation-severity.component';

describe('InvestagtionSeverityComponent', () => {
  let component: InvestigationSeverityComponent;
  let fixture: ComponentFixture<InvestigationSeverityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestigationSeverityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestigationSeverityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
