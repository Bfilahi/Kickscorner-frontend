import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarSmallDevices } from './navbar-small-devices/navbar-small-devices';
import { CartService } from '../../services/cart-service';
import { AuthService } from '../../services/auth/auth-service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CartItem } from '../../model/cart-item';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, NavbarSmallDevices, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit{

  public items$!: Observable<CartItem[]>;


  constructor(
    private cartService: CartService,
    private auth: AuthService 
  ){}

  get isAdmin(): boolean{
    return this.auth.isAdmin();
  }

  get isLoggedIn(): boolean{
    return this.auth.isLoggedIn();
    
  }


  ngOnInit(): void {
    this.items$ = this.cartService.cartItems$;
  }


  public logout(){
    this.auth.logout();
  }

}
