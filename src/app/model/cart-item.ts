import { BrandResponse } from "./response/brand-response";
import { ImageResponse } from "./response/image-response";
import { ProductResponse } from "./response/product-response";

export class CartItem{
    id: number;
    name: string;
    description: string;
    brand: BrandResponse;
    selectedSize: string;
    price: number | null;
    quantity: number;
    images: ImageResponse[];
    
    constructor(product: ProductResponse){
        this.id = product.id;
        this.name = product.name;
        this.description = product.description;
        this.brand = product.brand;
        this.selectedSize = '';
        this.price = product.price;
        this.quantity = 1;
        this.images = product.images;
    }
}