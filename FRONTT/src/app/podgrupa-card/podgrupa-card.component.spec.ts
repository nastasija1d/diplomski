import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodgrupaCardComponent } from './podgrupa-card.component';

describe('PodgrupaCardComponent', () => {
  let component: PodgrupaCardComponent;
  let fixture: ComponentFixture<PodgrupaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PodgrupaCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PodgrupaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
