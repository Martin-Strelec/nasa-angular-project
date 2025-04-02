import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoversComponentComponent } from './rovers-component.component';

describe('RoversComponentComponent', () => {
  let component: RoversComponentComponent;
  let fixture: ComponentFixture<RoversComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoversComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoversComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
