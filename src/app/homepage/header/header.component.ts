import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { MallService } from '../../services/mall.service';
import {MallModel} from '../../models/mall.model';
import { ShopService } from '../../services/shop.service';
import { ShopMallService} from '../../services/shop_mall.service';
import {ShopModel} from '../../models/shop.model';
import {Router} from '@angular/router';
import {WishlistModel} from '../../models/wishlist.model';
import {CartModel} from '../../models/cart.model';
import {ProductService} from '../../services/product.service';

// @ts-ignore
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    shops: Array<MallModel> = [];
    private wishlists: number;
    private carts: number;
  constructor(
      private userService: UserService,
      private flashMessage: NgFlashMessageService,
      private mallService: MallService,
      private shopService: ShopService,
      private shopMallService: ShopMallService,
      private router: Router,
      private productService: ProductService
      ) {
      this.mallService.getMalls().subscribe((results: MallModel[]) => {
          for (const data of results) {
              this.shops.push(data);
          }
      });
      this.productService.getWishlists().subscribe((result: WishlistModel[]) => {
          this.wishlists = result.length;
      });
      this.productService.getProductFromCart().subscribe((result: CartModel[]) => {
          this.carts = result.length;
      });
  }

    findMalls(item) {
        this.router.navigate([`/mall/${item}`]);
        this.mallService.getAMall(item).subscribe(result => {
            this.shopMallService.toggle(result);
        });
    }

    onLogoutClick() {
        this.userService.logout();
        this.flashMessage.showFlashMessage({
            messages: ['You Logged out Successfully.'],
            dismissible: true,
            timeout: 5000,
            type: 'info'
        });
    }

  ngOnInit() {
  }

}
