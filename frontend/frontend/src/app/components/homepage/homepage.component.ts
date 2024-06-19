import { Component, OnInit } from '@angular/core';
import { AllApisService } from 'src/app/services/all-apis.service'

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(
    private allApiServices: AllApisService
  ) { }

  fromDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0);
  toDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+1, 0, 0, 0);

  ngOnInit(): void {
    this.getAllDetails();
  }

  getAllDetails(){
    this.imageFullData = [];
    this.imageList = [];
    this.imageSelected = "";
    this.fromDate.setHours(5)
    this.fromDate.setMinutes(30)
    this.toDate.setHours(5)
    this.toDate.setMinutes(30)
    const body = {
      from : this.fromDate.toISOString(),
      to : this.toDate.toISOString()
    }
    this.allApiServices.getAllDetails(body).subscribe((data)=>{
      console.log(data)
      if(data && data.length > 0){
        data.forEach(eachData => {
          this.imageFullData.push(eachData);
          if(eachData.image){
            this.imageList.push(eachData.image);
          }
          else{
            console.log("Field Image is not found")
          }
        });
      }
      else{
        console.log("Data is empty")
      }
      this.imageFullData = [...this.imageFullData]
      this.imageList = [...this.imageList]
    })
  }

  afterImageSelection(){
    this.imageFullData.forEach(element => {
      if(element && element.image === this.imageSelected){
        
        this.mainImage = this.imageBasePath + "/" + element.image;
        if(element.ODAC){
          this.odacImage = this.imageBasePath + "/" + element.ODAC;
        }
        else{
          console.log("ODAC is not found")
        }
        
        if(element.subImagedata){
          this.selectedSubImageFullData = element.subImagedata;
        }
        else{
          console.log("subImagedata not found")
        }
      }
    });
    console.log(this.imageFullData);
  }

  imageBasePath = "http://127.0.0.1:8010/file"
  mainImage;
  odacImage;

  imageSelected = "";
  selectedImageData;
  imageList = [];
  imageFullData = [];

  selectedSubImageFullData = [];

}
