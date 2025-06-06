import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NajprodavanijiComponent } from './najprodavaniji.component';

describe('NajprodavanijiComponent', () => {
  let component: NajprodavanijiComponent;
  let fixture: ComponentFixture<NajprodavanijiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NajprodavanijiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NajprodavanijiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
