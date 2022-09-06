import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) { }

  _url = 'http://localhost:3200/searchname/'

  searchPeople(name:any){
    return this.http.get<any>("http://localhost:3200/searchname/"+name)
  }
  peopledata=[{
    username:'',
    name:'',
    status:'',
    image:''
  }]
  

  people(){
    
    return this.http.get<any>("http://localhost:3200/people/").subscribe(
      res=>{
         this.peopledata= JSON.parse(JSON.stringify(res))
         localStorage.setItem('user',JSON.stringify(this.peopledata));
      },(err)=>{
            
      }
    )

    
  }


  // imageUpload(img:any){
  //   return this.http.post<any>("http://localhost:3200/profile/"+this.getusername()+"/upload",img);
  // }

  createGroup(data:any){
    return this.http.post<any>("http://localhost:3200/create/group",data);
  }

  getgroups(data:any){
    return this.http.get<any>("http://localhost:3200/getgroup/"+data);
  }

  getnoningroup(data:any){
    return this.http.get<any>("http://localhost:3200/getnongroup/"+data);
  }
  joinGroup(data:any){
    
    return this.http.post<any>("http://localhost:3200/joingroup/",data);
  }
  checkGroup(data:any){
    return this.http.post<any>("http://localhost:3200/checkgroup/",data);
  }

  getimage(data:any){
    return this.http.get<any>("http://localhost:3200/getimage/"+data);
  }
  removeDp(data:any){
    return this.http.post<any>("http://localhost:3200/removedp/",data);
  }

}


