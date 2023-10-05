import { Component, OnInit, ElementRef } from '@angular/core';
import { ServerServices } from 'src/app/common/AppServices.services';
import { defaultConfig } from 'src/app/config/default';
import { ProductModel } from 'src/app/Model/ProductModel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public productListModel: ProductModel  [] 
  constructor(private serverService: ServerServices,private toastr: ToastrService) { }

  ngOnInit(): void {
    
    this.serverService.getdata(defaultConfig.productList)
    .subscribe(data => {
      console.log(data,"=========================")
     const d = data as any;
     console.log(d.response,"========data")
      if(d.success){
      this.productListModel =  d.response;
      this.toastr.success(d.succes)
      }
      else
        this.toastr.error(d.response)
    }, error => this.toastr.error(error.message));
  }
  removeFromList(product) {
    if(confirm("Are you sure to delete "+name)) {
      this.serverService.deletedata(defaultConfig.deleteById + '/' + product.ID)
      .subscribe(data => {
       const d = data as any;
       
        if(d.success){
          this.toastr.success(d.succes)
          var index = this.productListModel.indexOf(product);  
          this.productListModel.splice(index, 1);       
        }
        else
        this.toastr.error(d.success)
      },error => this.toastr.error(error.message));
    }    

  }
}
