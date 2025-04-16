import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VlagerProizvodjacComponent } from './vlager-proizvodjac.component';

describe('VlagerProizvodjacComponent', () => {
  let component: VlagerProizvodjacComponent;
  let fixture: ComponentFixture<VlagerProizvodjacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VlagerProizvodjacComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VlagerProizvodjacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
