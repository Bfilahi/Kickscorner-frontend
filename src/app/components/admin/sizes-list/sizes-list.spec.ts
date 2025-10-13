import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizesList } from './sizes-list';

describe('SizesList', () => {
  let component: SizesList;
  let fixture: ComponentFixture<SizesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SizesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SizesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
