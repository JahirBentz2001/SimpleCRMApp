import { Component, OnInit } from '@angular/core';
import { CustomerRm } from '../api/models';
import { CustomerService } from '../api/services';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  customers: CustomerRm[] = [];

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getList();
  }

  public getList(){
    this.customerService.listCustomer()
      .subscribe({
        next: (customers) => this.customers = customers,
        error: (err) => this.handleError
      });
  }

  private handleError = (error: any) => {
    Swal.fire({
      icon: 'error',
      title: 'Something went wrong!',
      text: `Something unexpected happened. Status code: ${error.status}`
    });
  }

}
