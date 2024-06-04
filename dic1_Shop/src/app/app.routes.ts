import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { Iscription1Component } from './iscription1/iscription1.component';
import { Iscription2Component } from './iscription2/iscription2.component';
import { InfoCompteComponent } from './info-compte/info-compte.component';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'inscription1', component: Iscription1Component },
  { path: 'inscription2', component: Iscription2Component },
  { path: 'info_compte', component: InfoCompteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
