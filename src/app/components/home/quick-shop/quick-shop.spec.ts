import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickShop } from './quick-shop';

describe('QuickShop', () => {
  let component: QuickShop;
  let fixture: ComponentFixture<QuickShop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickShop]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickShop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
