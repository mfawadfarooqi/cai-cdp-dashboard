import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPIeComponenetsComponent } from './top-pie-componenets.component';

describe('TopPIeComponenetsComponent', () => {
  let component: TopPIeComponenetsComponent;
  let fixture: ComponentFixture<TopPIeComponenetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopPIeComponenetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopPIeComponenetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
