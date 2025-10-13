import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { ProductResponse } from '../../model/response/product-response';
import { HttpErrorResponse } from '@angular/common/http';
import { AdminProductService } from '../../services/admin/admin-product-service';
import { SizeResponse } from '../../model/response/size-response';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CartService } from '../../services/cart-service';
import { CartItem } from '../../model/cart-item';
import { PaymentRequest } from '../../model/request/payment-request';
import { Payment } from '../../services/payment';
import { StripeResponse } from '../../model/response/stripe-response';
import { AuthService } from '../../services/auth/auth-service';



@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxSpinnerModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail implements OnInit{

  public product: ProductResponse = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    unitsInStock: 0,
    sizes: [],
    brand: {
      id: 0,
      name: ''
    },
    colors: [],
    images: []
  };

  public selectedImage: string = '';
  public sizes: SizeResponse[] = [];
  public showError: boolean = false;
  public selectedSize: boolean = false;

  public cartItems: CartItem[] = [];


  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private auth: AuthService,
    private paymentService: Payment,
    private cdr: ChangeDetectorRef,
    private adminProductService: AdminProductService,
    private spinnerService: NgxSpinnerService
  ){}


  ngOnInit(): void {
    this.listSizes();

    this.route.paramMap.subscribe(param => {
      if(param.get('id')){
        this.spinnerService.show();
        this.getProduct();
      }
    });

    this.cartService.cartItems$.subscribe(
      response => this.cartItems = response
    );

  }


  public doesSizeExist(sizeId: number): boolean{
    return this.product.sizes.find(s => s.id === sizeId) ? true : false;
  }

  public addToCart(){
    this.cartService.addToCart(new CartItem(this.product));
  }

  public selectSize(){
    this.selectedSize = true;
  }

  public checkout(){
    if(!this.auth.isLoggedIn()){
      this.router.navigate(['/login']);
      return;
    }

    this.spinnerService.show();

    let cart: PaymentRequest = {
      currency: 'EUR',
      lineItems: []
    };

    cart.lineItems.push({
      name: this.product.name,
      description: this.product.description,
      amount: Math.round(this.product.price! * 100),
      quantity: 1,
      imgUrl: this.product.images[0].imgUrl
    });

    this.paymentService.checkout(cart).subscribe({
      next: (response: StripeResponse) => {
        if(response.status === 'SUCCESS')
          window.location.href = response.sessionUrl;
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


  private getProduct(){
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);

    this.productService.getProduct(id).subscribe({
      next: (response: ProductResponse) => {
        this.product = response;
        this.selectedImage = response.images[0].imgUrl;

        this.spinnerService.hide();
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
      }
    });
  }

  private listSizes(){
    this.adminProductService.getSizes().subscribe({
      next: (response: SizeResponse[]) => {
        this.sizes = response;
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
      }
    });
  }

}
