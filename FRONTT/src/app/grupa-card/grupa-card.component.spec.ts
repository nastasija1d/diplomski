import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupaCardComponent } from './grupa-card.component';

describe('GrupaCardComponent', () => {
  let component: GrupaCardComponent;
  let fixture: ComponentFixture<GrupaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrupaCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrupaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
