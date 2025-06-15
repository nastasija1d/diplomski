import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavetiComponent } from './saveti.component';

describe('SavetiComponent', () => {
  let component: SavetiComponent;
  let fixture: ComponentFixture<SavetiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavetiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavetiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
