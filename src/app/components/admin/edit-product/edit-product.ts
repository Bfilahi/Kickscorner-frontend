import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductForm } from '../product-form/product-form';
import { AdminProductService } from '../../../services/admin/admin-product-service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup } from '@angular/forms';
import { ProductResponse } from '../../../model/response/product-response';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from '../../../services/product-service';
import { SizeResponse } from '../../../model/response/size-response';
import { ColorResponse } from '../../../model/response/color-response';
import { BrandResponse } from '../../../model/response/brand-response';


@Component({
  selector: 'app-edit-product',
  imports: [ProductForm],
  templateUrl: './edit-product.html',
  styleUrl: './edit-product.css'
})
export class EditProduct implements OnInit{

  public product: ProductResponse = {
    id: 0,
    name: <string>'',
    description: <string>'',
    price: <number | null> null,
    unitsInStock: <number | null> null,
    sizes: <SizeResponse[]>[],
    brand: <BrandResponse> {},
    colors: <ColorResponse[]>[],
    images: []
  };

  public imageFieldNames = ['img_1', 'img_2', 'img_3', 'img_4'];


  constructor(
    private adminProductService: AdminProductService,
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private spinnerService: NgxSpinnerService
  ){}


  ngOnInit(): void {
    this.getProduct()
  }


  public editProduct(event: {productForm: FormGroup, formData: FormData}){
    const formData: FormData = event.formData;
    
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);

    this.spinnerService.show();

    this.adminProductService.updateProduct(id, formData).subscribe({
      next: (response: ProductResponse) => {
        this.spinnerService.hide();

        this.toastr.success(response.name, 'Product updated successfully', {progressBar: true});
        this.router.navigateByUrl('/admin/products');
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.spinnerService.hide();
        this.toastr.error(err.error.message, err.name, {progressBar: true});
      }
    });
  }

  private getProduct(){
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);

    this.productService.getProduct(id).subscribe({
      next: (response: ProductResponse) => {
        this.product = response;
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.error.message);
      }
    });
  }

}
