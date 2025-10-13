import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { OrderResponse } from '../../model/response/order-response';

@Injectable({
  providedIn: 'root'
})
export class Order {

  private url: string = environment.ORDERS_URL;

  constructor(private http: HttpClient) { }


  public getOrders(): Observable<OrderResponse[]>{
    return this.http.get<OrderResponse[]>(this.url);
  }

}
