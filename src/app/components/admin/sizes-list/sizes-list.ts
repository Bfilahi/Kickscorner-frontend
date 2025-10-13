import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SizeResponse } from '../../../model/response/size-response';
import { AdminProductService } from '../../../services/admin/admin-product-service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sizes-list',
  imports: [RouterModule],
  templateUrl: './sizes-list.html',
  styleUrl: './sizes-list.css'
})
export class SizesList implements OnInit{

  public sizes: SizeResponse[] = [];
  public isLoading: boolean = true;


  constructor(
    private adminProductService: AdminProductService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private spinnerService: NgxSpinnerService
  ){}


  ngOnInit(): void {
    this.spinnerService.show();
    this.listSizes();
  }


  public listSizes(){
    this.adminProductService.getSizes().subscribe({
      next: (response: SizeResponse[]) => {
        this.sizes = response;
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
    if(!confirm('Are you sure you want to delete this size?')) return;

    this.spinnerService.show();
    this.isLoading = true;

    this.adminProductService.deleteSize(id).subscribe({
      next: () => {
        const deletedSize = this.sizes.find(size => size.id === id);
        this.sizes = this.sizes.filter(size => size.id !== id);
        this.cdr.detectChanges();

        this.spinnerService.hide();
        this.isLoading = false;
        
        this.toastr.success(deletedSize?.name, 'Size deleted successfully', {progressBar: true});
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
