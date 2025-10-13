import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Order } from '../../../services/user/order';
import { OrderResponse } from '../../../model/response/order-response';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { OrderItemDTO } from '../../../model/OrderItemDTO';


@Component({
  selector: 'app-orders',
  imports: [CommonModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css'
})
export class Orders implements OnInit{

  public orders: OrderResponse[] = [];
  public orderItems: OrderItemDTO[] = [];

  public showModal: boolean = false;
  public isLoading: boolean = true;


  constructor(
    private orderService: Order,
    private spinnerService: NgxSpinnerService,
    private cdr: ChangeDetectorRef
  ){}


  ngOnInit(): void {
    this.listOrders();
  }



  public showOrderItems(orderItems: OrderItemDTO[]){
    this.showModal = true;
    this.orderItems = orderItems;
  }

  public closeModal(){
    this.showModal = false;
  }


  private listOrders(){
    this.spinnerService.show();

    this.orderService.getOrders().subscribe({
      next: (response: OrderResponse[]) => {
        this.orders = response;
        this.spinnerService.hide();
        this.isLoading = false;

        this.cdr.markForCheck();
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.spinnerService.hide();
        this.isLoading = false;
      }
    });
  }

}
