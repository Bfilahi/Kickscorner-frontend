import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { PageNotFound } from './components/page-not-found/page-not-found';
import { Products } from './components/products/products';
import { ProductDetail } from './components/product-detail/product-detail';
import { Cart } from './components/user/cart/cart';
import { Orders } from './components/user/orders/orders';
import { ProductsList } from './components/admin/products-list/products-list';
import { Login } from './components/auth/login/login';
import { Register } from './components/auth/register/register';
import { SizesList } from './components/admin/sizes-list/sizes-list';
import { AddSize } from './components/admin/add-size/add-size';
import { AddColor } from './components/admin/add-color/add-color';
import { ColorsList } from './components/admin/colors-list/colors-list';
import { AddBrand } from './components/admin/add-brand/add-brand';
import { BrandsList } from './components/admin/brands-list/brands-list';
import { AddProduct } from './components/admin/add-product/add-product';
import { EditProduct } from './components/admin/edit-product/edit-product';
import { authGuard } from './guards/auth-guard';
import { User } from './components/user/user';
import { adminGuard } from './guards/admin-guard';
import { ChangePassword } from './components/change-password/change-password';
import { UsersList } from './components/admin/users-list/users-list';
import { OrderConfirmation } from './components/payment/order-confirmation/order-confirmation';
import { PaymentCancel } from './components/payment/payment-cancel/payment-cancel';


export const routes: Routes = [
    {path: 'home', component: Home},
    {path: 'products', component: Products},
    {path: 'product/:id', component: ProductDetail},
    {path: 'cart', component: Cart},
    
    {path: 'login', component: Login},
    {path: 'register', component: Register},
    {path: 'orders', component: Orders, canActivate: [authGuard]},
    {path: 'profile', component: User, canActivate: [authGuard]},
    {path: 'password', component: ChangePassword, canActivate: [authGuard]},

    {path: 'admin/new-product', component: AddProduct, canActivate: [adminGuard]},
    {path: 'admin/edit-product/:id', component: EditProduct, canActivate: [adminGuard]},
    {path: 'admin/products', component: ProductsList, canActivate: [adminGuard]},
    {path: 'admin/new-size', component: AddSize, canActivate: [adminGuard]},
    {path: 'admin/sizes', component: SizesList, canActivate: [adminGuard]},
    {path: 'admin/new-color', component: AddColor, canActivate: [adminGuard]},
    {path: 'admin/colors', component: ColorsList, canActivate: [adminGuard]},
    {path: 'admin/new-brand', component: AddBrand, canActivate: [adminGuard]},
    {path: 'admin/brands', component: BrandsList, canActivate: [adminGuard]},
    {path: 'admin/users', component: UsersList, canActivate: [adminGuard]},

    {path: 'success', component: OrderConfirmation},
    {path: 'cancel', component: PaymentCancel},

    {path: '', component: Home},
    {path: '**', component: PageNotFound}
];
