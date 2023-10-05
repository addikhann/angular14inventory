import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServerServices } from 'src/app/common/AppServices.services';
import { defaultConfig } from 'src/app/config/default';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  public ImageFile :  File ;
  public submitted = false;
  public AddProduct: FormGroup;
  public IsImageShow = false;
  public url : any= '';

  constructor(private serverService: ServerServices ,private formBuilder: FormBuilder,private toastr: ToastrService) {  
    
   }
  ngOnInit(): void {
    this.AddProduct = this.formBuilder.group({
      'Name': ['', Validators.required],
      'Description': ['', Validators.required],
      'Price':['', Validators.required]
    });  
  }
 
  
  get f(): { [key: string]: AbstractControl } {
    return this.AddProduct.controls;
  }

  onSubmit(){     
    if(this.ImageFile == null){
     alert("Add Image of Product");     
      return;
    }
    var formData = new FormData();
    formData.append('ImageFile', this.ImageFile);
    formData.append('Name', this.AddProduct.value.Name);
    formData.append('Description', this.AddProduct.value.Description)
    formData.append('Price', this.AddProduct.value.Price)

    this.serverService.postdata(defaultConfig.addProduct,formData)
    .subscribe(data => {
     const d = data as any;
    
      if(d.success){
        this.toastr.success(d.succes)     
      }
      else
      this.toastr.error(d.succes)     
    },error => this.toastr.error(error.message));
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
