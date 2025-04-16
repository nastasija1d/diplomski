import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VlasnikPorudzbinaKarticaComponent } from './vlasnik-porudzbina-kartica.component';

describe('VlasnikPorudzbinaKarticaComponent', () => {
  let component: VlasnikPorudzbinaKarticaComponent;
  let fixture: ComponentFixture<VlasnikPorudzbinaKarticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VlasnikPorudzbinaKarticaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VlasnikPorudzbinaKarticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
