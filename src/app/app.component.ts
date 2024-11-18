import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartService } from './services/cart.service';
import { WishlistService } from './services/wishlist.service';
import { AuthService } from './services/auth.service';
import { initFlowbite } from 'flowbite'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'App-E-Commerce';

  wishlistService = inject(WishlistService);
  cartService = inject(CartService);
  authService = inject(AuthService);

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.wishlistService.init();
      this.cartService.init();
    }
    initFlowbite();
  }
}
