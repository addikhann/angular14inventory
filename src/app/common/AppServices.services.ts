import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { defaultConfig } from '../config/default';
import { ProductModel } from '../Model/ProductModel';


@Injectable()
export class ServerServices {

  constructor(private http: HttpClient) {

  }
  postdata(urlPath:any, data: any) {
    return this.http.post(defaultConfig.BaseUrl + urlPath, data )
  }

  putdata(urlPath : any, data: {}) {
 
    return this.http.put(defaultConfig.BaseUrl + urlPath, data)
  }
  
  getdata(urlPath: any) {   
    return this.http.get<ProductModel>(defaultConfig.BaseUrl +urlPath)
  }
  deletedata(urlPath : any) {
  
    return this.http.delete(defaultConfig.BaseUrl + urlPath)
  }
}