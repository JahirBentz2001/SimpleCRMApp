import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../api/services';
import { CustomerRm } from '../api/models';
import { CustomerDto } from '../api/models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {

  constructor(
    private _customerService: CustomerService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router){}

  customerRm: CustomerRm = {};

  formGroup = new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl('', Validators.compose([
      Validators.minLength(3),
      Validators.maxLength(50)
    ])),
    lastName: new FormControl('', Validators.compose([
      Validators.minLength(3),
      Validators.maxLength(75)
    ])),
    email: new FormControl('', Validators.compose([
      Validators.email,
      Validators.minLength(5),
      Validators.maxLength(100)
    ]))
  });

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      const customerId = params['id'];
      this.getCustomerById(customerId);
    });
  }

  getCustomerById(customerId: string) {
    this._customerService.getCustomer({ id: customerId })
      .subscribe({
        next: (customer) => this.customerRm = customer,
        error: this.customerNotFound
      });
  }

  updateCustomer(){
    if(this.formGroup.invalid)
      return;

    const customerDto: CustomerDto = {
      id: this.customerRm.id,
      firstName: this.formGroup.controls.firstName.value,
      lastName: this.formGroup.controls.lastName.value,
      email: this.formGroup.controls.email.value
    };

    this._customerService.updateCustomer({ body: customerDto })
      .subscribe({
        next: _ => { 
          // Navigate to the home page
          this._router.navigate(['/']);
        },
        error: this.handleError
      });
  }

  private customerNotFound = (error: any) => {
    Swal.fire({
      icon: 'error',
      title: 'Customer not found',
      text: 'The customer you are looking for does not exist',
      confirmButtonText: 'Ok'
    })
    .then(() => this._router.navigate(['/']));
  }

  private handleError = (error: any) => {
    Swal.fire({
      icon: 'error',
      title: 'There was an error',
      text: `Something went wrong! Status code: ${error.status}`,
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
