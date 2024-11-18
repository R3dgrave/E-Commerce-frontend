import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from "../login/login.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCardComponent, RouterLink, CommonModule, LoginComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  customerService = inject(CustomerService);
  authService = inject(AuthService)
  newProducts: Product[] = [];
  featuredProducts: Product[] = [];

  ngOnInit() {
    this.customerService.getFeatureProducts().subscribe((result) => {
      this.featuredProducts = result;
      console.log(this.featuredProducts);
    });
    this.customerService.getNewProducts().subscribe((result) => {
      this.newProducts = result;
      console.log(this.newProducts);
    });
  }
}
