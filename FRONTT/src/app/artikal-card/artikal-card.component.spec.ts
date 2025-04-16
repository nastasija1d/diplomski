import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtikalCardComponent } from './artikal-card.component';

describe('ArtikalCardComponent', () => {
  let component: ArtikalCardComponent;
  let fixture: ComponentFixture<ArtikalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtikalCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtikalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
