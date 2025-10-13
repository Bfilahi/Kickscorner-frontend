import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service';
import { UserService } from '../../services/user/user-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { UserResponse } from '../../model/response/user-response';

@Component({
  selector: 'app-user',
  imports: [CommonModule, RouterLink],
  templateUrl: './user.html',
  styleUrl: './user.css'
})
export class User implements OnInit{
  
  public user$!: Observable<UserResponse>;

  
  constructor(
    private auth: AuthService, 
    private userService: UserService,
    private router: Router,
    private spinnerService: NgxSpinnerService
  ){}


  ngOnInit(): void { 
    this.user$ = this.userService.getUserInfo();
  }

  public deleteAccount(){
    if(!confirm('Are you sure you want to delete you profile?')) return;

    this.spinnerService.show();

    this.userService.deleteProfile().subscribe({
      next: () => {
        this.spinnerService.hide();
        this.router.navigate(['/home']);
      },
      error: err => {
        console.error(err);
        this.spinnerService.hide();
      }
    });
  }


  public logout(){
    this.auth.logout();
  }
}
