import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopMelwareAttackComponent } from './top-melware-attack.component';

describe('TopMelwareAttackComponent', () => {
  let component: TopMelwareAttackComponent;
  let fixture: ComponentFixture<TopMelwareAttackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopMelwareAttackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopMelwareAttackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
