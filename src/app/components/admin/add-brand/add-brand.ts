import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AdminProductService } from '../../../services/admin/admin-product-service';
import { HttpErrorResponse } from '@angular/common/http';
import { BrandRequest } from '../../../model/request/brand-request';
import { BrandResponse } from '../../../model/response/brand-response';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-add-brand',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-brand.html',
  styleUrl: './add-brand.css'
})
export class AddBrand {

  constructor(
    private adminProductService: AdminProductService,
    private toastr: ToastrService,
    private spinnerService: NgxSpinnerService
  ){}


  public addBrand(brandForm: NgForm){
    const brandRequest: BrandRequest = {
      name: brandForm.value.brand
    };

    if(brandRequest.name.trim() === ''){
      this.toastr.error('Field must not be empty', 'Error:', {progressBar: true});
      brandForm.reset();
      return;
    }

    this.spinnerService.show();

    this.adminProductService.addBrand(brandRequest).subscribe({
      next: (response: BrandResponse) => {
          brandForm.reset();

          this.spinnerService.hide();

          this.toastr.success(response.name, 'Brand added successfully', {progressBar: true});
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.spinnerService.hide();
        this.toastr.error(err.error.message, err.name, {progressBar: true});
      }
    });
  }
}
