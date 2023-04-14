import { Component, OnInit } from '@angular/core';
import { Customer } from "../../entity/customer";
import { CustomerService } from '../../service/customer.service';
import {HttpEvent, HttpEventType, HttpResponse,HttpErrorResponse} from "@angular/common/http";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  public customers: Customer[];
  public editCustomer: Customer;
  public deleteCustomer: Customer;
  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getCustomer();
  }
  public getCustomer(): void{
    this.customerService.getCustomer().subscribe(
      (response:Customer[])=>{
        this.customers = response
        console.log(response);
      },
      (error:HttpErrorResponse)=>{
        alert(error.message)
      }
    )
  }

  public onAddCustomer(addForm:NgForm):void {
    document.getElementById('add-product-form').click();
    this.customerService.addCustomer(addForm.value).subscribe(
      (response: Customer) => {
        console.log(response);
        this.getCustomer();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateCustomer(customer: Customer): void {
    this.customerService.updateCustomer(customer).subscribe(
      (response: Customer) => {
        console.log(response);
        this.getCustomer();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteCustomer(customerID: number): void {
    this.customerService.deleteCustomer(customerID).subscribe(
      (response: void) => {
        console.log(response);
        this.getCustomer();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchCustomer(key: string): void {
    console.log(key);
    const results: Customer[] = [];
    for (const customer of this.customers) {
      if (customer.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || customer.prenom.toLowerCase().indexOf(key.toLowerCase()) !== -1 ){
        results.push(customer);
      }
    }
    this.customers = results;
    if (results.length === 0 || !key) {
      this.getCustomer();
    }
  }

  public onOpenModal(customer: Customer, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addProductModal');
    }
    if (mode === 'edit') {
      this.editCustomer = customer;
      button.setAttribute('data-target', '#updateProductModal');
    }
    if (mode === 'delete') {
      this.deleteCustomer = customer;
      button.setAttribute('data-target', '#deleteProductModal');
    }
    container.appendChild(button);
    button.click();
  }
}
