import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-order-confirmation',
  imports: [],
  templateUrl: './order-confirmation.html',
  styleUrl: './order-confirmation.css'
})
export class OrderConfirmation {
  public sessionId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.sessionId = this.route.snapshot.queryParamMap.get('session_id');
  }

  public viewOrders(): void {
    this.router.navigate(['/orders']);
  }

  public continueShopping(): void {
    this.router.navigate(['/products']);
  }

}

