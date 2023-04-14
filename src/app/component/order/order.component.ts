import { Component, OnInit , Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { OrderService } from '../../service/order.service';
import {HttpEvent, HttpEventType, HttpResponse,HttpErrorResponse} from "@angular/common/http";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {formatNumber} from "@angular/common";
import { Order } from "../../entity/order";
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public orders: Order[];
  public editOrder: Order;
  public deleteOrder: Order;
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrder();
  }
  public getOrder(): void{
    this.orderService.getOrder().subscribe(
      (response:Order[])=>{
        this.orders = response
        console.log(response);
      },
      (error:HttpErrorResponse)=>{
        alert(error.message)
      }
    )
  }


  public onAddOrder(addForm:NgForm):void {
    document.getElementById('add-product-form').click();
    this.orderService.addOrder(addForm.value).subscribe(
      (response: Order) => {
        console.log(response);
        this.getOrder();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateOrder(order: Order): void {
    this.orderService.updateOrder(order).subscribe(
      (response: Order) => {
        console.log(response);
        this.getOrder();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteOrder(orderID: number): void {
    this.orderService.deleteOrder(orderID).subscribe(
      (response: void) => {
        console.log(response);
        this.getOrder();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public onOpenModal(order: Order, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addProductModal');
    }
    if (mode === 'edit') {
      this.editOrder = order;
      button.setAttribute('data-target', '#updateProductModal');
    }
    if (mode === 'delete') {
      this.deleteOrder = order;
      button.setAttribute('data-target', '#deleteProductModal');
    }
    container.appendChild(button);
    button.click();
  }

}
