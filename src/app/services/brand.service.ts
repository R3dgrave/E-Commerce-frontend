import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Brand } from '../types/brand';
import { Category } from '../types/category';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor() {}
  http = inject(HttpClient);

  getBrands() {
    return this.http.get<Brand[]>(environment.apiUrl + '/brand');
  }

  getBrandById(id: string) {
    return this.http.get<Brand>(environment.apiUrl + '/brand/' + id);
  }

  addBrand(brandData: { name: string; categoryId: string }) {
    return this.http.post(environment.apiUrl + '/brand', brandData);
  }

  updateBrand(id: string, brandData: { name: string; categoryId: string }) {
    return this.http.put( environment.apiUrl + '/brand/' + id, brandData);
  }

  deleteBrandById(id: String) {
    return this.http.delete(environment.apiUrl + '/brand/' + id);
  }

  getCategories() {
    return this.http.get<Category[]>(environment.apiUrl + '/category');
  }
}
