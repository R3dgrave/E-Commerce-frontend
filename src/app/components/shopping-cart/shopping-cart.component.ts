import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../types/product';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { OrderService } from '../../services/order.service';
import { Order } from '../../types/order';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
})
export class ShoppingCartComponent {
  cartService = inject(CartService);

  ngOnInit() {
    this.cartService.init();
  }

  get cartItems() {
    return this.cartService.items;
  }

  sellingPrice(product: Product) {
    if (product && product.price !== undefined) {
      return Math.round(product.price - (product.price * product.discount) / 100);
    }
    return 0;  //Valor predeterminado si el producto es nulo o inválido
  }

  addToCart(producId: string, quantity: number) {
    this.cartService.addToCart(producId, quantity).subscribe((result) => {
      this.cartService.init();
    });
  }

  removeFromCart(productId: string) {
    this.cartService.removeFromcart(productId).subscribe(() => {
      this.cartService.init(); //Refresca el carrito después de remover el producto
    });
  }


  get totalAmmount() {
    let ammount = 0;
    for (let index = 0; index < this.cartItems.length; index++) {
      const element = this.cartItems[index];
      if (element.product) {
        ammount += this.sellingPrice(element.product) * element.quantity;
      }
    }
    return ammount;
  }

  orderStep: number = 0;
  formBuilder = inject(FormBuilder);
  paymentType = 'cash';
  addressForm = this.formBuilder.group({
    address1: [''],
    address2: [''],
    city: [''],
    pincode: [''],
  });

  checkout() {
    this.orderStep = 1;
  }

  addAddress() {
    this.orderStep = 2;
  }

  orderService = inject(OrderService);
  router = inject(Router);

  completeOrder() {
    let order: Order = {
      items: this.cartItems,
      paymentType: this.paymentType,
      address: this.addressForm.value,
      date: new Date(),
    };
    this.orderService.addOrder(order).subscribe((result) => {
      alert('Tu orden esta enviada');
      this.cartService.init();
      this.orderStep = 0;
      this.router.navigateByUrl('/orders');
    });
  }

}
