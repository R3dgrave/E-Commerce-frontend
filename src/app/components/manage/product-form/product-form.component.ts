import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../../services/category.service';
import { BrandService } from '../../../services/brand.service';
import { Brand } from '../../../types/brand';
import { Category } from '../../../types/category';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    CommonModule,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent {
  formBuilder = inject(FormBuilder);
  productForm = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(2)]],
    shortDescription: [null, [Validators.required, Validators.minLength(5)]],
    description: [null, [Validators.required, Validators.minLength(10)]],
    price: [null, [Validators.required, Validators.min(1)]],
    discount: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
    images: this.formBuilder.array([]),
    categoryId: [null, [Validators.required]],
    brandId: [null, [Validators.required]],
    isFeatured: [false],
    isNewProduct: [false],
  });

  CategoryService = inject(CategoryService);
  brandService = inject(BrandService);
  productService = inject(ProductService);
  brands: Brand[] = [];
  categories: Category[] = [];
  id!: string;
  route = inject(ActivatedRoute);

  ngOnInit() {
    this.CategoryService.getCategories().subscribe((result) => {
      this.categories = result;
    });
    this.brandService.getBrands().subscribe((result) => {
      this.brands = result;
    });
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    if (this.id) {
      this.productService.getProductById(this.id).subscribe((result) => {
        const product = Array.isArray(result) ? result[0] : result;
        for (let index = 0; index < product.images.length; index++) {
          this.addImage();
        }
        this.productForm.patchValue(result as any);
      });
    } else {
      this.addImage();
    }
  }

  router = inject(Router);

  addProduct() {
    let value = this.productForm.value;
    console.log(value);
    this.productService.addProduct(value as any).subscribe((result) => {
      alert('Producto Añadido');
      this.router.navigateByUrl('/admin/products');
    });
  }

  updateProduct() {
    let value = this.productForm.value;
    console.log(value);
    this.productService
      .updateProduct(this.id, value as any)
      .subscribe((result) => {
        alert('Producto actualizado');
        this.router.navigateByUrl('/admin/products');
      });
  }

  addImage() {
    this.images.push(this.formBuilder.control(null));
  }

  removeImage() {
    this.images.removeAt(this.images.controls.length - 1);
  }

  get images() {
    return this.productForm.get('images') as FormArray;
  }
}
