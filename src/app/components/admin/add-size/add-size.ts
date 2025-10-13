import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AdminProductService } from '../../../services/admin/admin-product-service';
import { SizeRequest } from '../../../model/request/size-request';
import { SizeResponse } from '../../../model/response/size-response';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-add-size',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-size.html',
  styleUrl: './add-size.css'
})
export class AddSize {

  constructor(
    private adminProductService: AdminProductService,
    private toastr: ToastrService,
    private spinnerService: NgxSpinnerService
  ){}


  public addSize(sizeForm: NgForm){
    const sizeRequest: SizeRequest = {
      name: sizeForm.value.size
    };

    this.spinnerService.show();

    this.adminProductService.addSize(sizeRequest).subscribe({
      next: (response: SizeResponse) => {
        sizeForm.reset();

        this.spinnerService.hide();

        this.toastr.success(response.name, 'Size added successfully', {progressBar: true});
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);

        this.spinnerService.hide();
        
        this.toastr.error(err.error.message, err.name, {progressBar: true});
      }
    });
  }
}