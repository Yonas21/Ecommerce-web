import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import  { NgFlashMessageService } from 'ng-flash-messages';
import {ProductModel} from '../../../models/product.model';
import {DeleteModel} from '../../../models/delete.model';

const URL = 'http://localhost:4000/products';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
    productForm = new FormGroup({
        name: new FormControl(''),
        price: new FormControl(''),
        color: new FormControl('')
    });
    files = null;
  constructor(
      private http: HttpClient,
      private formBuilder: FormBuilder,
      private flashMessage: NgFlashMessageService
  ) {
  }
    ngOnInit() {
        this.productForm = this.formBuilder.group({
            name: new FormControl('', Validators.required),
            price: new FormControl('', Validators.required),
            color: new FormControl('', Validators.required),
            productImage: ['']
        });
    }
    onChange(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.productForm.get('productImage').setValue(file);
        }
    }

  onSubmit() {
      const formData = new FormData();
      formData.append('name', this.productForm.get('name').value);
      formData.append('price', this.productForm.get('price').value)
      formData.append('productImage', this.productForm.get('productImage').value);
      this.http.post<any>(URL, formData).subscribe((result: DeleteModel) => {
          this.flashMessage.showFlashMessage({
              messages: [result.message],
              dismissible: true,
              timeout: 4000,
              type: 'success'
          });
      });
  }


}
