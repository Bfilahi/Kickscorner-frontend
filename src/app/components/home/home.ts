import { Component } from '@angular/core';
import { Hero } from "./hero/hero";
import { QuickShop } from "./quick-shop/quick-shop";
import { Newsletter } from "./newsletter/newsletter";

@Component({
  selector: 'app-home',
  imports: [Hero, QuickShop, Newsletter],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
