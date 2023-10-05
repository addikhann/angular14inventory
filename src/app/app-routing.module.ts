import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductAddComponent } from './pages/product-add/product-add.component';
import { ProductViewComponent } from './pages/product-view/product-view.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'product-add', component: ProductAddComponent },
  { path: 'product-details/:ID', component: ProductViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
