import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
 
  
 
  constructor(private profileservice:ProfileService,private http:HttpClient) { }

  ngOnInit(): void {
     setInterval(()=>{
    this.profileservice.getimage(this.getusername()).subscribe((data)=>{
      localStorage.setItem('image',data);
    })
  },500)

  }
  openFile(){

    let element = <HTMLElement>document.querySelector('#inputchange');
    element.click();
    let btndismis = <HTMLElement>document.querySelector('#dismiss');
    btndismis.click();
  }
  
  getimage(){
    return localStorage.getItem('image');
  }
 

 images:any;
 getusername(){
  return localStorage.getItem('username');
}
  previewsrc:any;
 
  handle(event:any){
    
    const file = event.target.files[0];
    
    if(event.target.files.length>0){
      const reader = new FileReader();
      this.images=file;
      console.log(this.images)
      reader.readAsDataURL(file);
    
      reader.onload = () =>{ 
       this.previewsrc = reader.result as string ;
       
    }
   
      }

      
    }
      
   
    
   
    imagedp:any;
    getimageback:any;
   
   _url = 'http://localhost:3200/';
  
   dp(){
    return `${this._url}/${localStorage.getItem('image')}`;
   }
   img(){
    return `${this._url}/${this.imgresponse}`;
   }
   name(){
    return localStorage.getItem('Name');
   }

   username(){
    return localStorage.getItem('username');
   }

   email(){
    return localStorage.getItem('email');
   }
   joined(){
    return localStorage.getItem('joined');
   }
   p:any;
   show=true;
   imgresponse:any='';
    onSubmit(){
        
         const formData = new FormData();
         formData.append('file',this.images);
        
         

         this.http.post<any>('http://localhost:3200/file/'+this.getusername()+"/"+this.getimage(),formData).subscribe(
          (res)=>{
              this.show=false;
              this.imgresponse = res;
              localStorage.setItem('image',res)
            
          },

          (err)=>{
            console.log(err)
            alert("Internal Server Error");
          }
         );
    }

    updatepic={
      username:this.username(),
      image:localStorage.getItem('image')
    }
    remove(){
      let btndismis = <HTMLElement>document.querySelector('#dismiss');
      btndismis.click();
      this.profileservice.removeDp(this.updatepic).subscribe((data)=>{
           localStorage.setItem('image',data);
      })
    }

  }

 




