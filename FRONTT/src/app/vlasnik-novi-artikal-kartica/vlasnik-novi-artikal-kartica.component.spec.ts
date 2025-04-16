import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VlasnikNoviArtikalKarticaComponent } from './vlasnik-novi-artikal-kartica.component';

describe('VlasnikNoviArtikalKarticaComponent', () => {
  let component: VlasnikNoviArtikalKarticaComponent;
  let fixture: ComponentFixture<VlasnikNoviArtikalKarticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VlasnikNoviArtikalKarticaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VlasnikNoviArtikalKarticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
