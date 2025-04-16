import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KorpaIkonaComponent } from './korpa-ikona.component';

describe('KorpaIkonaComponent', () => {
  let component: KorpaIkonaComponent;
  let fixture: ComponentFixture<KorpaIkonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KorpaIkonaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KorpaIkonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
