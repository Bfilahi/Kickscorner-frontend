import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../services/cart-service';
import { AuthService } from '../../../services/auth/auth-service';
import { UserService } from '../../../services/user/user-service';
import { Observable } from 'rxjs';
import { CartItem } from '../../../model/cart-item';

@Component({
  selector: 'app-navbar-small-devices',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar-small-devices.html',
  styleUrl: './navbar-small-devices.css'
})
export class NavbarSmallDevices implements OnInit{

  public isMenuOpened: boolean = false;
  public items$!: Observable<CartItem[]>;

  constructor(
    private cartService: CartService, 
    public auth: AuthService,
    public userService: UserService
  ){}


  ngOnInit(): void {
    this.items$ = this.cartService.cartItems$;
  }

  public toggleMenu(){
    this.isMenuOpened = !this.isMenuOpened;
  }

  public logout(){
    this.auth.logout();
  }
}
