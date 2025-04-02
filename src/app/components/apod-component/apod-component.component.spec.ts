import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApodComponentComponent } from './apod-component.component';

describe('ApodComponentComponent', () => {
  let component: ApodComponentComponent;
  let fixture: ComponentFixture<ApodComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApodComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApodComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
