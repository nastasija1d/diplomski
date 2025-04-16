import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VlasnikDodajArtikalComponent } from './vlasnik-dodaj-artikal.component';

describe('VlasnikDodajArtikalComponent', () => {
  let component: VlasnikDodajArtikalComponent;
  let fixture: ComponentFixture<VlasnikDodajArtikalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VlasnikDodajArtikalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VlasnikDodajArtikalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
