import { Routes } from '@angular/router';
import { CategoryFormComponent } from './components/manage/category-form/category-form.component';
import { BrandFormComponent } from './components/manage/brand-form/brand-form.component';
import { ProductFormComponent } from './components/manage/product-form/product-form.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { authGuard } from './core/auth-guard';
import { adminGuard } from './core/admin-guard';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

const adminRoutes: Routes = [
  {
    path: 'admin',
    loadComponent: () =>
      import(
        './components/manage/admin-dashboard/admin-dashboard.component'
      ).then((c) => c.AdminDashboardComponent),
    canActivate: [adminGuard],
  },
  {
    path: 'admin/categories',
    loadComponent: () =>
      import('./components/manage/categories/categories.component').then(
        (c) => c.CategoriesComponent
      ),
    canActivate: [adminGuard],
  },
  {
    path: 'admin/categories/add',
    loadComponent: () =>
      import('./components/manage/category-form/category-form.component').then(
        (c) => c.CategoryFormComponent
      ),
    canActivate: [adminGuard],
  },
  {
    path: 'admin/categories/:id',
    component: CategoryFormComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/brands',
    loadComponent: () =>
      import('./components/manage/brands/brands.component').then(
        (c) => c.BrandsComponent
      ),
    canActivate: [adminGuard],
  },
  {
    path: 'admin/brands/add',
    loadComponent: () =>
      import('./components/manage/brand-form/brand-form.component').then(
        (c) => c.BrandFormComponent
      ),
    canActivate: [adminGuard],
  },
  {
    path: 'admin/brands/:id',
    component: BrandFormComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/products',
    loadComponent: () =>
      import('./components/manage/products/products.component').then(
        (c) => c.ProductsComponent
      ),
    canActivate: [adminGuard],
  },
  {
    path: 'admin/products/add',
    loadComponent: () =>
      import('./components/manage/product-form/product-form.component').then(
        (c) => c.ProductFormComponent
      ),
    canActivate: [adminGuard],
  },
  {
    path: 'admin/products/:id',
    component: ProductFormComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/orders',
    loadComponent: () =>
      import('./components/manage/orders/orders.component').then(
        (c) => c.OrdersComponent
      ),
    canActivate: [adminGuard],
  },
];

const customerRoutes: Routes = [
  {
    path: 'customer/orders',
    loadComponent: () =>
      import('./components/customer-orders/customer-orders.component').then(
        (c) => c.CustomerOrdersComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./components/product-list/product-list.component').then(
        (c) => c.ProductListComponent
      ),
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
    canActivate: [authGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/register/register.component').then(
        (c) => c.RegisterComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
  {
    path: 'wishlists',
    loadComponent: () =>
      import('./components/wishlists/wishlists.component').then(
        (c) => c.WishlistsComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'cart', component: ShoppingCartComponent, canActivate: [authGuard],
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./components/customer-profile/customer-profile.component').then(
        (c) => c.CustomerProfileComponent
      ),
    canActivate: [authGuard],
  },
];

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home.component').then((c) => c.HomeComponent),
  },
  ...adminRoutes,
  ...customerRoutes,
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Rutas no encontradas
];
