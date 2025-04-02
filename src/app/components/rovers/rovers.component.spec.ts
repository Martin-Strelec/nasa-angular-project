import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoversComponent } from './rovers.component';

describe('RoversComponent', () => {
  let component: RoversComponent;
  let fixture: ComponentFixture<RoversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoversComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
