import { Component, inject } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../types/order';
import { CommonModule, DatePipe } from '@angular/common';
import { Product } from '../../../types/product';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [DatePipe, MatButtonToggleModule, RouterLink, CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  authService = inject(AuthService)
  orderService = inject(OrderService);
  orders: Order[] = [];

  ngOnInit() {
    this.orderService.getAdminOrder().subscribe((result) => {
      this.orders = result;
    });
  }

  sellingPrice(product: Product) {
    return Math.round(product.price - (product.price * product.discount) / 100);
  }

  statusChanged(button: any, order: Order) {
    console.log(button.value);
    this.orderService
      .updateOrderStatus(order._id!, button.value)
      .subscribe((result) => {
        alert('Estado de orden actualizada');
      });
  }
}
