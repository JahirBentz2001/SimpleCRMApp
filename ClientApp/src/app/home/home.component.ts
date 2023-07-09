import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerRm } from '../api/models';
import { CustomerService } from '../api/services';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  customers: CustomerRm[] = [];

  constructor(
    private _customerService: CustomerService) { }

  ngOnInit(): void {
    this.getList();
  }

  public getList(){
    this._customerService.listCustomer()
      .subscribe({
        next: (customers) => this.customers = customers ?? [],
        error: this.handleError
      });
  }

  public askForDelete(id?: string){
    if(id === null || id === undefined){
      alert("Invalid ID");
      return;
    };

    // Ask for confirmation
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
    })
    .then((result) => {
      if(result.isConfirmed){
        this.deleteCustomer(id);
      }
    });
  }

  private deleteCustomer(customerId: string){
    this._customerService.deleteCustomer({ id: customerId })
      .subscribe({
        next: () => {
          this.getList();  
        },
        error: this.handleError
      })
  }

  private handleError = (error: any) => {
    if(error.status != 404){
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong!',
        text: `Something unexpected happened. Status code: ${error.status}`
      });
    }
  }

}
