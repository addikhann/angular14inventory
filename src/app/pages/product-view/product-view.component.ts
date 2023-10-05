import { Component, OnInit } from '@angular/core';
import { ServerServices } from 'src/app/common/AppServices.services';
import { defaultConfig } from 'src/app/config/default';
import { ProductModel } from 'src/app/Model/ProductModel';
import { ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  public id: string;
  public product: ProductModel  
  public ImageFile :  File ;
  public submitted = false;
  public AddProduct: FormGroup;
  public IsImageShow = false;
  public IsImageShowBig = false;
  public IsImageChange = false;
  public url : any= '';

  constructor(private serverService: ServerServices,private route: ActivatedRoute,private formBuilder: FormBuilder,private toastr: ToastrService) {  

  }

  ngOnInit(): void {
  
  this.id = this.route.snapshot.paramMap.get('ID') 
    this.serverService.getdata(defaultConfig.productById + '/' + this.id )
    .subscribe(data => {
      const d = data as any;      
       if(d.success){
       this.product =  d.response;
       this.AddProduct.patchValue({
        Name: this.product.Name,
        Description: this.product.Description,
        Price:  this.product.Price,
      });
      this.toastr.success(d.succes)     
    }
    },error => this.toastr.error(error.message));
    this.AddProduct = this.formBuilder.group({
      'Name': ['', Validators.required],
      'Description': ['', Validators.required],
      'Price':['', Validators.required]
    }); 
  }

  onSubmit(){ 
    var formData = new FormData();
   
    if(this.IsImageShow == true){
    formData.append('ImageFile', this.ImageFile);
    if(this.ImageFile == null){
     alert("Add Image of Product");     
      return;
    }
  }
   
    formData.append('ID', this.product.ID.toString())
    formData.append('Name', this.AddProduct.value.Name);
    formData.append('Description', this.AddProduct.value.Description)
    formData.append('Price', this.AddProduct.value.Price)

    this.serverService.putdata(defaultConfig.updateProduct,formData)
    .subscribe(data => {
     const d = data as any;
    
      if(d.success){
        this.IsImageShowBig = true;
        this.product.Name = this.AddProduct.value.Name
        this.product.Description = this.AddProduct.value.Description
        this.product.Price = this.AddProduct.value.Price
        this.toastr.success(d.succes)   
      }
      else
      this.toastr.error(d.succes)    
    },error => this.toastr.error(error.message));
  }
  get f(): { [key: string]: AbstractControl } {
    return this.AddProduct.controls;
  }
  onFileSelect(event: any) { 
   
    if (event.target.files.length > 0) {
      this.ImageFile = event.target.files[0];
     
    }
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
  
      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
      }
  
      reader.readAsDataURL(event.target.files[0]);
      this.IsImageShow = true;
    
    }
  }

}
