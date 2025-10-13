import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddColor } from './add-color';

describe('AddColor', () => {
  let component: AddColor;
  let fixture: ComponentFixture<AddColor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddColor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddColor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
