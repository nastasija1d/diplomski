import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VlasnikLagerComponent } from './vlasnik-lager.component';

describe('VlasnikLagerComponent', () => {
  let component: VlasnikLagerComponent;
  let fixture: ComponentFixture<VlasnikLagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VlasnikLagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VlasnikLagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
