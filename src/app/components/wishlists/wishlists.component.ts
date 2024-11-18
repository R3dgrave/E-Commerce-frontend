import { Component, inject } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../../types/product';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlists',
  standalone: true,
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './wishlists.component.html',
  styleUrl: './wishlists.component.scss'
})
export class WishlistsComponent {

  constructor(){}
  wishlists: Product[]=[];
  wishlistService = inject(WishlistService);
  http = inject(HttpClient);

  ngOnInit(){
    this.wishlistService.init();
  }
}
