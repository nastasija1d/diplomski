import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DugmePoruciComponent } from './dugme-poruci.component';

describe('DugmePoruciComponent', () => {
  let component: DugmePoruciComponent;
  let fixture: ComponentFixture<DugmePoruciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DugmePoruciComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DugmePoruciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
