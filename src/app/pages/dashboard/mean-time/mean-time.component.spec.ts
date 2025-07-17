import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeanTimeComponent } from './mean-time.component';

describe('MeanTimeComponent', () => {
  let component: MeanTimeComponent;
  let fixture: ComponentFixture<MeanTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeanTimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeanTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
