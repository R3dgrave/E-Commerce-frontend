import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { BrandService } from '../../../services/brand.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Category } from '../../../types/category';

@Component({
  selector: 'app-brand-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.scss',
})
export class BrandFormComponent {
  brandForm: FormGroup;
  brandsService = inject(BrandService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  isEdit = false;
  id!: string;
  categories: Category[] = [];

  constructor(private fb: FormBuilder) {
    this.brandForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('^[a-zA-Z0-9 ]+$'),
        ],
      ],
      categoryId: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.isEdit = true;
      this.brandsService.getBrandById(this.id).subscribe((result: any) => {
        this.brandForm.patchValue({
          name: result.name,
          categoryId: result.categoryId,
        });
      });
    }

    this.brandsService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  add() {
    if (this.brandForm.valid) {
      this.brandsService.addBrand(this.brandForm.value).subscribe(() => {
        alert('Nueva marca añadida');
        this.router.navigateByUrl('/admin/brands');
      });
    }
  }

  update() {
    if (this.brandForm.valid) {
      this.brandsService
        .updateBrand(this.id, this.brandForm.value)
        .subscribe(() => {
          alert('Marca actualizada');
          this.router.navigateByUrl('/admin/brands');
        });
    }
  }
}
