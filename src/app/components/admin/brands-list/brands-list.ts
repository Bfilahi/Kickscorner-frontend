import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminProductService } from '../../../services/admin/admin-product-service';
import { BrandResponse } from '../../../model/response/brand-response';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';




@Component({
  selector: 'app-brands-list',
  imports: [RouterModule, CommonModule],
  templateUrl: './brands-list.html',
  styleUrl: './brands-list.css'
})
export class BrandsList implements OnInit {

  public brands: BrandResponse[] = [];
  public isLoading: boolean = true;




  constructor(
    private adminProductService: AdminProductService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private spinnerService: NgxSpinnerService
  ){}



  ngOnInit(): void {
    this.spinnerService.show();
    this.listBrands();
  }


  public listBrands(){
    this.adminProductService.getBrands().subscribe({
      next: (response: BrandResponse[]) => {
        this.brands = response;
        this.cdr.detectChanges();

        this.spinnerService.hide();
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);

        this.spinnerService.hide();
        this.isLoading = false;
      }
    });
  }

  public delete(id: number){
    if(!confirm('Are you sure you want to delete this brand?')) return;

    this.spinnerService.show();
    this.isLoading = true;

    this.adminProductService.deleteBrand(id).subscribe({
      next: () => {
        const deletedBrand = this.brands.find(brand => brand.id === id);
        this.brands = this.brands.filter(brand => brand.id !== id);
        this.cdr.detectChanges();

        this.spinnerService.hide();
        this.isLoading = false;

        this.toastr.success(deletedBrand?.name, 'Brand deleted successfully', {progressBar: true});
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);

        this.spinnerService.hide();
        this.isLoading = false;
        
        this.toastr.error(err.error.message, 'Error:', {progressBar: true});
      }
    });
  }
}
