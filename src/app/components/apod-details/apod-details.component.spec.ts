import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApodDetailsComponent } from './apod-details.component';

describe('ApodDetailsComponent', () => {
  let component: ApodDetailsComponent;
  let fixture: ComponentFixture<ApodDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApodDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApodDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
