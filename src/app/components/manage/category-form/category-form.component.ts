import { Component, inject } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss',
})
export class CategoryFormComponent {
  categoryForm: FormGroup;
  categoryService = inject(CategoryService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  isEdit = false;
  id!: String;

  constructor(private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('^[a-zA-Z0-9 ]+$'),
        ],
      ],
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.isEdit = true;
      this.categoryService.getCategoryById(this.id).subscribe((result: any) => {
        this.categoryForm.patchValue({ name: result.name });
      });
    }
  }

  add() {
    if (this.categoryForm.valid) {
      this.categoryService
        .addCategory(this.categoryForm.value.name)
        .subscribe(() => {
          alert('Categoria Añadida');
          this.router.navigateByUrl('/admin/categories');
        });
    }
  }

  update() {
    if (this.categoryForm.valid) {
      this.categoryService
        .updateCategory(this.id, this.categoryForm.value.name)
        .subscribe(() => {
          alert('Categoria Actualizada');
          this.router.navigateByUrl('/admin/categories');
        });
    }
  }
}
