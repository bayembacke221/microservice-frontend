import { HttpClient, HttpEvent, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {Observable} from "rxjs";
import { environment } from "src/environments/environment";
import { Product } from "../entity/product";

@Injectable({
    providedIn:'root'
})
export class ProductService {
    public apiServerUrl=environment.apiBaseUrlProduct;
    constructor(private http: HttpClient){}

    public getProduct():Observable<Product[]>{
        return this.http.get<Product[]>(`${this.apiServerUrl}/produit/all`);
    }
    public getOnProduct(productID : string):Observable<any>{
      return this.http.get(`${this.apiServerUrl}/produit/${productID}`);
  }

    public addProduct(product:Product):Observable<Product>{
        return this.http.post<Product>(`${this.apiServerUrl}/produit`,product);
    }

    public updateProduct(product:Product):Observable<Product>{
        return this.http.put<Product>(`${this.apiServerUrl}/produit`,product);
    }

    public deleteProduct(productID:number):Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/produit/${productID}`);
    }
    uploadPhoto(filename:File,productID:number):Observable<HttpEvent<{}>> {
      let form :FormData=new FormData();
      form.append('file',filename);

      const  request=new HttpRequest('POST',this.apiServerUrl+'upload/'+productID,form,{
        reportProgress:true,
          responseType:'text'
      });
      return this.http.request(request);

    }
}
