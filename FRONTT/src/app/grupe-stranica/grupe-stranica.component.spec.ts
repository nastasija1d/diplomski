import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupeStranicaComponent } from './grupe-stranica.component';

describe('GrupeStranicaComponent', () => {
  let component: GrupeStranicaComponent;
  let fixture: ComponentFixture<GrupeStranicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrupeStranicaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrupeStranicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
