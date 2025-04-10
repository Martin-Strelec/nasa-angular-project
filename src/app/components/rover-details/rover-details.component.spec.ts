import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoverDetailsComponent } from './rover-details.component';

describe('RoverDetailsComponent', () => {
  let component: RoverDetailsComponent;
  let fixture: ComponentFixture<RoverDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoverDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoverDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
