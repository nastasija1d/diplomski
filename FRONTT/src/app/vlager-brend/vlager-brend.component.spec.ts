import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VlagerBrendComponent } from './vlager-brend.component';

describe('VlagerBrendComponent', () => {
  let component: VlagerBrendComponent;
  let fixture: ComponentFixture<VlagerBrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VlagerBrendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VlagerBrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
