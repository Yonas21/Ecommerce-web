import { Component, OnInit } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest} from 'ngx-paypal';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../services/product.service';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
    public payPalConfig?: IPayPalConfig;
    public showSuccess = false;
    public showCancel = false;
    public showError = false;
  constructor(
      private route: ActivatedRoute,
      private productService: ProductService,
      public navCtl: NgxNavigationWithDataComponent
  ) {}

  ngOnInit() {
      const data = 0;
      this.initConfig();
  }

  private initConfig(): void {
      this.payPalConfig = {
          currency: 'EUR',
          clientId: 'AeNsZEk5o9B5owh8gDf3NcSymRGOd72vp9vzZXdpAjwO-tM7WHSOpD6rcbNVACmwPMl9c_QuIZdZ7ADg',
          createOrderOnClient: (data) => <ICreateOrderRequest> {
              intent: 'CAPTURE',
              purchase_units: [{
                  amount: {
                      currency_code: 'EUR',
                      value: this.navCtl.get('price'),
                      breakdown: {
                          item_total: {
                              currency_code: 'EUR',
                              value: this.navCtl.get('price')
                          }
                      }
                  },
                  items: [{
                      name: 'Enterprise Subscription',
                      quantity: '1',
                      category: 'DIGITAL_GOODS',
                      unit_amount: {
                          currency_code: 'EUR',
                          value: '9.99',
                      },
                  }]
              }]
          },
          advanced: {
              commit: 'true'
          },
          style: {
              label: 'paypal',
              layout: 'vertical'
          },
          onApprove: (data, actions) => {
              console.log('onApprove - transaction was approved, but not authorized', data, actions);
              actions.order.get().then(details => {
                  console.log('onApprove - you can get full order details inside onApprove: ', details);
              });

          },
          onClientAuthorization: (data) => {
              console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
              this.showSuccess = true;
          },
          onCancel: (data, actions) => {
              console.log('OnCancel', data, actions);
              this.showCancel = true;

          },
          onError: err => {
              console.log('OnError', err);
              this.showError = true;
          },
          onClick: (data, actions) => {
              console.log('onClick', data, actions);
              this.resetStatus();
          }
      };
      }

    private resetStatus(): void {
        this.showError = false;
        this.showSuccess = false;
        this.showCancel = false;
    }

}
