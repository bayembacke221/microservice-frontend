import { HttpClient, HttpEvent, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {Observable} from "rxjs";
import { environment } from "src/environments/environment";
import { Order } from "../entity/order";
import {map} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public apiServerUrl=environment.apiBaseUrlOrder;
  constructor(private http: HttpClient) { }

  public getOrder():Observable<Order[]>{
    return this.http.get<Order[]>(`${this.apiServerUrl}/order/all`);
}

public addOrder(order:Order):Observable<Order>{
    return this.http.post<Order>(`${this.apiServerUrl}/order`,order);
}

public updateOrder(order:Order):Observable<Order>{
    return this.http.put<Order>(`${this.apiServerUrl}/order`,order);
}

public deleteOrder(orderID:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/order/${orderID}`);
}
public getOrderListCustomer(orderID:number){
  return this.http.get<any>(`${this.apiServerUrl}/order/order-list-customer/${orderID}`)
    .pipe(map((result:any)=>{
      return result;
    }))
}
getTotalAmount(orderID:number){
  return this.http.get<any>(`this.apiServerUrl}/order/amount/${orderID}`)
    .pipe(map((result:any)=>{
      return result;
    }))
}
}
