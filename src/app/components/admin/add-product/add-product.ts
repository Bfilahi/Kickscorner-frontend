import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminProductService } from '../../../services/admin/admin-product-service';
import { ProductResponse } from '../../../model/response/product-response';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductForm } from '../product-form/product-form';


@Component({
  selector: 'app-add-product',
  imports: [ProductForm],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css'
})
export class AddProduct {

  constructor(
    private adminProductService: AdminProductService,
    private spinnerService: NgxSpinnerService,
    private toastr: ToastrService
  ){}

  public addProduct(event: {productForm: FormGroup, formData: FormData}){
    const productForm: FormGroup = event.productForm;
    const formData: FormData = event.formData;

    this.spinnerService.show();

    this.adminProductService.addProduct(formData).subscribe({
      next: (response: ProductResponse) => {
        productForm.reset();

        this.spinnerService.hide();

        this.toastr.success(response.name, 'Product added successfully', {progressBar: true});
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.spinnerService.hide();
        this.toastr.error(err.error.message, err.name, {progressBar: true});
      }
    });
  }

}
