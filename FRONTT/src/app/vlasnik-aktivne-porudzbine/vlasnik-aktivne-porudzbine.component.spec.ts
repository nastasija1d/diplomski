import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VlasnikAktivnePorudzbineComponent } from './vlasnik-aktivne-porudzbine.component';

describe('VlasnikAktivnePorudzbineComponent', () => {
  let component: VlasnikAktivnePorudzbineComponent;
  let fixture: ComponentFixture<VlasnikAktivnePorudzbineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VlasnikAktivnePorudzbineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VlasnikAktivnePorudzbineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
