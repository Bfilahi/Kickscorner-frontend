import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart-service';
import { CartItem } from '../../../model/cart-item';
import { AuthService } from '../../../services/auth/auth-service';
import { Router, RouterLink } from '@angular/router';
import { PaymentRequest } from '../../../model/request/payment-request';
import { Payment } from '../../../services/payment';
import { StripeResponse } from '../../../model/response/stripe-response';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';




@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit{

  public cartItems: CartItem[] = [];


  constructor(
    public cartService: CartService,
    public auth: AuthService,
    private paymentService: Payment,
    private router: Router,
    private spinnerService: NgxSpinnerService
  ){}


  ngOnInit(): void {
    this.listCartItems();
  }

  public listCartItems(){
    this.cartService.cartItems$.subscribe(
      response => this.cartItems = response
    )
  }

  public clearCart(){
    this.cartService.clearCart();
  }

  public checkout(){
    if(!this.auth.isLoggedIn()){
      this.router.navigate(['/login']);
      return;
    }

    if(this.cartItems.length <= 0)
      return;

    this.spinnerService.show();

    let cart: PaymentRequest = {
      currency: 'EUR',
      lineItems: []
    };

    for(let item of this.cartItems){
      cart.lineItems.push({
        name: item.name,
        description: item.description,
        amount: Math.round(item.price! * 100),
        quantity: item.quantity,
        imgUrl: item.images[0].imgUrl
      });
    }

    this.paymentService.checkout(cart).subscribe({
      next: (response: StripeResponse) => {
        if(response.status === 'SUCCESS'){
          window.location.href = response.sessionUrl;
        }
        else
          console.error('Payment initialization failed');

        this.spinnerService.hide();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Payment error', err);
        this.spinnerService.hide();
      }
    });
  }
  
}
