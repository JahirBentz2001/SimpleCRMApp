import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerDto } from '../api/models';
import { CustomerService } from '../api/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent {

  constructor(
    private _customerService: CustomerService,
    private _router: Router){}

  formGroup = new FormGroup({
    firstName: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ])),
    lastName: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(75)
    ])),
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email,
      Validators.minLength(5),
      Validators.maxLength(100)
    ]))
  });

  addCustomer(){
    if(this.formGroup.invalid)
      return;

    const customerDto: CustomerDto = {
      firstName: this.formGroup.controls.firstName.value,
      lastName: this.formGroup.controls.lastName.value,
      email: this.formGroup.controls.email.value
    };

    this._customerService.createCustomer({ body: customerDto })
      .subscribe({
        next: this.handleSuccess,
        error: this.handleError
      });
  }

  private handleSuccess = () => {
    this._router.navigate(['/']);
  }

  private handleError = (error: any) => {
    Swal.fire({
      icon: 'error',
      title: 'There was an error',
      text:
        error.status === 409 ? JSON.parse(error.error).message : 
        `Something went wrong! Status code: ${error.status}`,
      confirmButtonText: 'Ok'
    });
  }

  // Form validations
  get invalidFirstName(){
    return this.formGroup.controls.firstName.invalid 
      && (this.formGroup.controls.firstName.dirty || this.formGroup.controls.firstName.touched);
  }

  get invalidLastName(){
    return this.formGroup.controls.lastName.invalid 
      && (this.formGroup.controls.lastName.dirty || this.formGroup.controls.lastName.touched);
  }

  get invalidEmail(){
    return this.formGroup.controls.email.invalid 
      && (this.formGroup.controls.email.dirty || this.formGroup.controls.email.touched);
  }

  

}
