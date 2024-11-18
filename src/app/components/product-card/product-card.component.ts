import { Component, inject, Input } from '@angular/core';
import { Product } from '../../types/product';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, MatIconModule, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product!: Product;
  wishlistService = inject(WishlistService);

  get sellingPrice() {
    return Math.round(
      this.product.price - (this.product.price * this.product.discount) / 100
    );
  }

  addToWishList(product: Product) {
    console.log(product);
    if (this.isInWishlist(product)) {
      this.wishlistService
        .removeFromWishlists(product._id!)
        .subscribe((result) => {
          this.wishlistService.init();
        });
    } else {
      this.wishlistService.addInWishlist(product._id!).subscribe((result) => {
        this.wishlistService.init();
      });
    }
  }

  isInWishlist(product: Product) {
    let isExits = this.wishlistService.wishlists.find(
      (x) => x._id == product._id
    );
    if (isExits) return true;
    else return false;
  }

  cartService = inject(CartService);
  addToCart(product: Product) {
    if (product && product._id) {
      if (!this.isProductInCart(product._id)) {
        this.cartService.addToCart(product._id, 1).subscribe(() => {
          this.cartService.init();
        });
      } else {
        this.cartService.removeFromcart(product._id).subscribe(() => {
          this.cartService.init();
        });
      }
    }
  }

  isProductInCart(productId: string): boolean {
    return !!this.cartService.items.find((x) => x.product?._id === productId);
  }

}
