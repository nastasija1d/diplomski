import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtikalPageComponent } from './artikal-page.component';

describe('ArtikalPageComponent', () => {
  let component: ArtikalPageComponent;
  let fixture: ComponentFixture<ArtikalPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtikalPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtikalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
