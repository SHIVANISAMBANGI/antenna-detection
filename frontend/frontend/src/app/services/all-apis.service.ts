import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AllApisService {

  readonly BASEURL = environment.BASE_URL;

  constructor(private http:HttpClient) { }

  getAllDetails(body : any){
    return this.http.post<any>( this.BASEURL + "/dateData", body);
  }
  getImageByImageID(imageInJPG : any){
    return this.http.get<any>( this.BASEURL + "/file" + imageInJPG);
  }
}
