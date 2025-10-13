import { Component, DOCUMENT, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer implements OnInit{

  private document: Document = inject(DOCUMENT);

  public ngOnInit(): void {

    const date = new Date();
    const year = this.document.querySelector('#year') as HTMLElement;
    year.textContent = date.getFullYear().toString();
  }
  
}
