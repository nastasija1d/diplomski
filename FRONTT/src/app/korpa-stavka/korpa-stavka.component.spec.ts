import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KorpaStavkaComponent } from './korpa-stavka.component';

describe('KorpaStavkaComponent', () => {
  let component: KorpaStavkaComponent;
  let fixture: ComponentFixture<KorpaStavkaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KorpaStavkaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KorpaStavkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
