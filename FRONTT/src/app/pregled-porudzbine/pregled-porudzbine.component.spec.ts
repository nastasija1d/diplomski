import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledPorudzbineComponent } from './pregled-porudzbine.component';

describe('PregledPorudzbineComponent', () => {
  let component: PregledPorudzbineComponent;
  let fixture: ComponentFixture<PregledPorudzbineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PregledPorudzbineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PregledPorudzbineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
