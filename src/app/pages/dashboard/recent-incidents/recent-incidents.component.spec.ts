import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentIncidentsComponent } from './recent-incidents.component';

describe('RecentIncidentsComponent', () => {
  let component: RecentIncidentsComponent;
  let fixture: ComponentFixture<RecentIncidentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentIncidentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecentIncidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
