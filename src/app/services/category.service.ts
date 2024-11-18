import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../types/category';
import { Brand } from '../types/brand';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  http = inject(HttpClient);
  constructor() {}

  getCategories() {
    return this.http.get<Category[]>(environment.apiUrl + '/category');
  }

  getCategoryById(id: String) {
    return this.http.get<Category[]>(environment.apiUrl + '/category/' + id);
  }

  addCategory(name: String) {
    return this.http.post(environment.apiUrl + '/category', {
      name: name,
    });
  }

  updateCategory(id: String, name: String) {
    return this.http.put(environment.apiUrl + '/category/' + id, {
      name: name,
    });
  }

  deleteCategoryById(id: String) {
    return this.http.delete(environment.apiUrl + '/category/' + id);
  }

  getBrands() {
    return this.http.get<Brand[]>(environment.apiUrl + '/brand');
  }
}
