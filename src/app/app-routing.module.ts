import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './component/customer/customer.component';
import { OrderComponent } from './component/order/order.component';
import { ProductComponent } from './component/product/product.component';
const routes: Routes = [
  { path: '', redirectTo: '/customer', pathMatch: 'full' },
  {path:'customer',component:CustomerComponent},
  {path:'product',component:ProductComponent},
  {path:'order',component:OrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
