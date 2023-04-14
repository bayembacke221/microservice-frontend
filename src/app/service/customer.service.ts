import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from "@angular/common/http";
import { Customer } from "../entity/customer";
import {Observable} from "rxjs";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  public apiServerUrl=environment.apiBaseUrlCustomer;
  constructor(private http: HttpClient) { }

  public getCustomer():Observable<Customer[]>{
    return this.http.get<Customer[]>(`${this.apiServerUrl}/customer/all`);
  }

  public addCustomer(customer:Customer):Observable<Customer>{
    return this.http.post<Customer>(`${this.apiServerUrl}/customer`,customer);
  }

  public updateCustomer(customer:Customer):Observable<Customer>{
    return this.http.put<Customer>(`${this.apiServerUrl}/customer`,customer);
}

public deleteCustomer(customerID:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/customer/${customerID}`);
}
}
