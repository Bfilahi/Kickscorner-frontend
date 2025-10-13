import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminProductService } from '../../../services/admin/admin-product-service';
import { BrandResponse } from '../../../model/response/brand-response';
import { HttpErrorResponse } from '@angular/common/http';
import { ColorResponse } from '../../../model/response/color-response';
import { SizeResponse } from '../../../model/response/size-response';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductResponse } from '../../../model/response/product-response';
import { CustomValidators } from '../../../validators/custom-validators';



@Component({
  selector: 'app-product-form',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductForm implements OnInit, OnChanges{

  @Input() label: string = '';
  @Input() productData: ProductResponse | null = null;

  @Output() handleProductEvent = new EventEmitter<{productForm: FormGroup, formData: FormData}>();

  @ViewChildren('fileInput') fileInputs!: QueryList<ElementRef<HTMLInputElement>>;


  public brands: BrandResponse[] = [];
  public colors: ColorResponse[] = [];
  public sizes: SizeResponse[] = [];

  public imageFieldNames = ['img_1', 'img_2', 'img_3', 'img_4'];
  public productForm!: FormGroup;

  public dataLoaded: boolean = false;


  constructor(
    private fb: FormBuilder,
    private adminProductService: AdminProductService,
    private cdr: ChangeDetectorRef
  ){
    this.productForm = this.fb.nonNullable.group({
      name: ['', [Validators.required, CustomValidators.noWhiteSpaces()]],
      description: ['', [Validators.required, CustomValidators.noWhiteSpaces()]],
      brand: ['', Validators.required],
      colors: new FormArray([], CustomValidators.minSelectedCheckbox(1)),
      price: [<number | null> null, [Validators.required, Validators.min(1)]],
      unitsInStock: [<number | null> null, [Validators.required, Validators.min(1)]],
      sizes: new FormArray([], CustomValidators.minSelectedCheckbox(1)),
      images: this.fb.group({
        img_1: [null, Validators.required],
        img_2: [null, Validators.required],
        img_3: [null, Validators.required],
        img_4: [null, Validators.required]
      })
    });
  }


  get colorsFormArray(){
    return this.productForm.get('colors') as FormArray;
  }

  get sizesFormArray(){
    return this.productForm.get('sizes') as FormArray;
  }


  ngOnInit(): void {
    this.initializeForm();
  }


  private async initializeForm(): Promise<void>{
    await this.loadAll();
    this.dataLoaded = true;
    this.cdr.detectChanges();

    if(this.productData && this.colors.length > 0 && this.sizes.length > 0){
      this.prefillForm();
      this.cdr.detectChanges();
    }
  }

  private async loadAll(): Promise<void>{
    try{
      await Promise.all([
        this.listBrands(),
        this.listColors(),
        this.listSizes()
      ]);
    }catch(error){
      console.error('Error loading form data:', error);
    }
  }

  private listBrands(): Promise<void>{
    return new Promise((resolve, reject) => {
      this.adminProductService.getBrands().subscribe({
        next: (response: BrandResponse[]) => {
          this.brands = response;
          resolve();
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          reject(err);
        }
      });
    });
  }

  private listColors(): Promise<void>{
    return new Promise((resolve, reject) => {
      this.adminProductService.getColors().subscribe({
        next: (response: ColorResponse[]) => {
          this.colors = response;
          this.addCheckboxes(this.colors, this.colorsFormArray);
          resolve();
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          reject(err);
        }
      });
    });
  }

  private listSizes(): Promise<void>{
    return new Promise((resolve, reject) => {
      this.adminProductService.getSizes().subscribe({
        next: (response: SizeResponse[]) => {
          this.sizes = response;
          this.addCheckboxes(this.sizes, this.sizesFormArray);
          resolve();
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          reject(err);
        }
      });
    });
  }

  private addCheckboxes(arr: ColorResponse[] | SizeResponse[], formArray: FormArray){
    formArray.clear();
    arr.forEach(() => formArray.push(new FormControl(false)));
  }



  private prefillForm(){
    if(!this.productData) return;

    this.productForm.patchValue({
      name: this.productData.name,
      description: this.productData.description,
      brand: this.productData.brand.id,
      price: this.productData.price,
      unitsInStock: this.productData.unitsInStock
    });

    this.productData.colors.forEach(selectedColor => {
      const colorIndex = this.colors.findIndex(color => color.id === selectedColor.id);
      if(colorIndex !== -1)
        this.colorsFormArray.at(colorIndex).setValue(true);
    })

    this.productData.sizes.forEach(selectedSize => {
      const sizeIndex = this.sizes.findIndex(size => size.id === selectedSize.id);
      if(sizeIndex !== -1)
        this.sizesFormArray.at(sizeIndex).setValue(true);
    });

  }


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['productData'] && changes['productData'].currentValue && this.dataLoaded)
      this.prefillForm();
  }


  public handleProduct(productForm: FormGroup){
    const formData: FormData = this.createProductData(productForm);
    this.handleProductEvent.emit({productForm: productForm, formData: formData});
  }


  private createProductData(form: FormGroup): FormData{
    const formData: FormData = new FormData();

    formData.append('name', form.value.name.trim());
    formData.append('description', form.value.description.trim());
    formData.append('price', form.value.price.toString());
    formData.append('unitsInStock', form.value.unitsInStock.toString());
    formData.append('brandId', form.value.brand.toString());

    form.value.colors
      .map((checked: boolean, i: number) => checked ? this.colors[i].id : null)
      .filter((v: number | null) => v !== null)
      .forEach((id: number) => formData.append('colorIds', id.toString()));

    
    form.value.sizes
      .map((checked: boolean, i: number) => checked ? this.sizes[i].id : null)
      .filter((v: number | null) => v !== null)
      .forEach((id: number) => formData.append('sizeIds', id.toString()));


    this.fileInputs.forEach(inputRef => {
      const input = inputRef.nativeElement;
      if(input.files && input.files.length > 0){
        for(let i = 0; i < input.files.length; i++){
          formData.append('images', input.files[i]);
        }
      }
    });

    return formData;
  }
}
