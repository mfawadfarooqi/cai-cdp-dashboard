import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopOperationSystemsComponent } from './top-operation-systems.component';

describe('TopOperationSystemsComponent', () => {
  let component: TopOperationSystemsComponent;
  let fixture: ComponentFixture<TopOperationSystemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopOperationSystemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopOperationSystemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
