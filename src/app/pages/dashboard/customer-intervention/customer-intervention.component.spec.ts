import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerInterventionComponent } from './customer-intervention.component';

describe('CustomerInterventionComponent', () => {
  let component: CustomerInterventionComponent;
  let fixture: ComponentFixture<CustomerInterventionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerInterventionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerInterventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
