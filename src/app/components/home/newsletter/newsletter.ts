import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './newsletter.html',
  styleUrl: './newsletter.css'
})
export class Newsletter {




  public sendNewsLetter(newsLetterForm: NgForm){
    newsLetterForm.reset();
  }
}
