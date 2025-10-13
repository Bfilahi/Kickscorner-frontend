import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AdminProductService } from '../../../services/admin/admin-product-service';
import { ColorRequest } from '../../../model/request/color-request';
import { ColorResponse } from '../../../model/response/color-response';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-color',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-color.html',
  styleUrl: './add-color.css'
})
export class AddColor {

  constructor(
    private adminProductService: AdminProductService,
    private toastr: ToastrService,
    private spinnerService: NgxSpinnerService
  ){}


  public addColor(colorForm: NgForm){
    const colorRequest: ColorRequest = {
      name: colorForm.value.color
    };

    this.spinnerService.show();

    this.adminProductService.addColor(colorRequest).subscribe({
      next: (response: ColorResponse) => {
        colorForm.reset();

        this.spinnerService.hide();

        this.toastr.success(response.name, 'Color added successfully', {progressBar: true});
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.spinnerService.hide();
        this.toastr.error(err.error.message, err.name, {progressBar: true});
      }
    });
  }
}
