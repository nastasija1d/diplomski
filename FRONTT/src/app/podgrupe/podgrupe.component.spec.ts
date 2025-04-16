import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodgrupeComponent } from './podgrupe.component';

describe('PodgrupeComponent', () => {
  let component: PodgrupeComponent;
  let fixture: ComponentFixture<PodgrupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PodgrupeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PodgrupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
