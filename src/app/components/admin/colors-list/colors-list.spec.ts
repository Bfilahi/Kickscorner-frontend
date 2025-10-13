import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorsList } from './colors-list';

describe('ColorsList', () => {
  let component: ColorsList;
  let fixture: ComponentFixture<ColorsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
