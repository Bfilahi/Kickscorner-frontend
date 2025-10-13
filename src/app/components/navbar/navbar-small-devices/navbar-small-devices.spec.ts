import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarSmallDevices } from './navbar-small-devices';

describe('NavbarSmallDevices', () => {
  let component: NavbarSmallDevices;
  let fixture: ComponentFixture<NavbarSmallDevices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarSmallDevices]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarSmallDevices);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
