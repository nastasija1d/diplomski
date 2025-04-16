import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VlagerKategorijaComponent } from './vlager-kategorija.component';

describe('VlagerKategorijaComponent', () => {
  let component: VlagerKategorijaComponent;
  let fixture: ComponentFixture<VlagerKategorijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VlagerKategorijaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VlagerKategorijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
