import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VlasnikFinansijeComponent } from './vlasnik-finansije.component';

describe('VlasnikFinansijeComponent', () => {
  let component: VlasnikFinansijeComponent;
  let fixture: ComponentFixture<VlasnikFinansijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VlasnikFinansijeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VlasnikFinansijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
