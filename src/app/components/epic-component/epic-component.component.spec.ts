import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicComponentComponent } from './epic-component.component';

describe('EpicComponentComponent', () => {
  let component: EpicComponentComponent;
  let fixture: ComponentFixture<EpicComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpicComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpicComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
