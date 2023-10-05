import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductAddComponent } from './pages/product-add/product-add.component';
import { ProductViewComponent } from './pages/product-view/product-view.component';
import { ServerServices } from './common/AppServices.services';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    ProductAddComponent,
    ProductViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,FormsModule,
    ReactiveFormsModule,ToastrModule.forRoot(),
    BrowserAnimationsModule
    
  ],
  providers: [ServerServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
