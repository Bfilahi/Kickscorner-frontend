import { BrandResponse } from "./brand-response";
import { ColorResponse } from "./color-response";
import { ImageResponse } from "./image-response";
import { SizeResponse } from "./size-response";


export interface ProductResponse{
    id: number;
    name: string;
    description: string;
    price: number | null;
    unitsInStock: number | null;

    sizes: SizeResponse[];
    brand: BrandResponse;
    colors: ColorResponse[];
    images: ImageResponse[];
}
