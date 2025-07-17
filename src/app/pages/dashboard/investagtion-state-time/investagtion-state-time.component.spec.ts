import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestagtionStateTImeComponent } from './investagtion-state-time.component';

describe('InvestagtionStateTImeComponent', () => {
  let component: InvestagtionStateTImeComponent;
  let fixture: ComponentFixture<InvestagtionStateTImeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestagtionStateTImeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvestagtionStateTImeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
