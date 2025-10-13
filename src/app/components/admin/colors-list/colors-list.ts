import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ColorResponse } from '../../../model/response/color-response';
import { AdminProductService } from '../../../services/admin/admin-product-service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-colors-list',
  imports: [RouterModule],
  templateUrl: './colors-list.html',
  styleUrl: './colors-list.css'
})
export class ColorsList implements OnInit{

  public colors: ColorResponse[] = [];
  public isLoading: boolean = true;


  constructor(
    private adminProductService: AdminProductService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private spinnerService: NgxSpinnerService
  ){}


  ngOnInit(): void {
    this.spinnerService.show();
    this.listColors();
  }


  public listColors(){
    this.adminProductService.getColors().subscribe({
      next: (response: ColorResponse[]) => {
        this.colors = response;
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
    if(!confirm('Are you sure you want to delete this color?')) return;

    this.spinnerService.show();
    this.isLoading = true;

    this.adminProductService.deleteColor(id).subscribe({
      next: () => {
        const deletedColor = this.colors.find(color => color.id === id);
        this.colors = this.colors.filter(color => color.id !== id);
        this.cdr.detectChanges();

        this.spinnerService.hide();
        this.isLoading = false;
      
        this.toastr.success(deletedColor?.name, 'Color deleted successfully', {progressBar: true});
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
