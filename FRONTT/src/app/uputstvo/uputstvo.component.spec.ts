import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UputstvoComponent } from './uputstvo.component';

describe('UputstvoComponent', () => {
  let component: UputstvoComponent;
  let fixture: ComponentFixture<UputstvoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UputstvoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UputstvoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
