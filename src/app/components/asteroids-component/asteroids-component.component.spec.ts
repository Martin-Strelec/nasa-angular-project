import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsteroidsComponentComponent } from './asteroids-component.component';

describe('AsteroidsComponentComponent', () => {
  let component: AsteroidsComponentComponent;
  let fixture: ComponentFixture<AsteroidsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsteroidsComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsteroidsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
