import { Component, OnInit , Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { ProductService } from '../../service/product.service';
import {HttpEvent, HttpEventType, HttpResponse,HttpErrorResponse} from "@angular/common/http";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {formatNumber} from "@angular/common";
import { Product } from "../../entity/product";
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public products: Product[];
  public editProduct: Product;
  public product : Product;
  public deleteProduct: Product;
  public uploading : number;
  private formGroup:FormGroup;
  private currentFileUpload: any;
  private selectedFiles:any;
  ProductService: any;

  constructor(private productService: ProductService){

  }

  ngOnInit(): void {
    this.getProduct();
  }
  public getProduct(): void{
    this.productService.getProduct().subscribe(
      (response:Product[])=>{
        this.products = response
        console.log(response);
      },
      (error:HttpErrorResponse)=>{
        alert(error.message)
      }
    )
  }

  public onAddProduct(addForm:NgForm):void {
    document.getElementById('add-product-form').click();
    this.productService.addProduct(addForm.value).subscribe(
      (response: Product) => {
        console.log(response);
        this.getProduct();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateProduct(product: Product): void {
    this.productService.updateProduct(product).subscribe(
      (response: Product) => {
        console.log(response);
        this.getProduct();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onDeleteProduct(productID: number): void {
    this.productService.deleteProduct(productID).subscribe(
      (response: void) => {
        console.log(response);
        this.getProduct();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchProduct(key: string): void {
    console.log(key);
    const results: Product[] = [];
    for (const product of this.products) {
      if (product.designation.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || product.description.toLowerCase().indexOf(key.toLowerCase()) !== -1 ){
        results.push(product);
      }
    }
    this.products = results;
    if (results.length === 0 || !key) {
      this.getProduct();
    }
  }

  public onOpenModal(product: Product, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addProductModal');
    }
    if (mode === 'edit') {
      this.editProduct = product;
      button.setAttribute('data-target', '#updateProductModal');
    }
    if (mode === 'delete') {
      this.deleteProduct = product;
      button.setAttribute('data-target', '#deleteProductModal');
    }
    container.appendChild(button);
    button.click();
  }
  uploadPhoto(){
    this.uploading=0;

    this.currentFileUpload=this.selectedFiles.item(0);
     this.productService.uploadPhoto(this.currentFileUpload,this.product.idProduct)
       .subscribe(event=>{
         if(event.type==HttpEventType.UploadProgress){

           this.uploading=Math.round(100 * event.loaded / event.total);
         }else if(event instanceof HttpResponse){

           let reference=document.getElementById('dismiss');
           reference?.click();
         }
       },error=>{
          alert("Failed to load");
         this.getProduct();
       })
   this.selectedFiles=undefined
 }
  Choose(event: Event) {
  // @ts-ignore
  this.selectedFiles=event.target.files;
  this.formGroup.get("photo")?.setValue(this.selectedFiles);
}

}
