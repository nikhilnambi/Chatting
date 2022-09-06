import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  _url = 'http://localhost:3200/login/'


  Login(logindata:any){
   
    return  this.http.post<any>("http://localhost:3200/login",logindata);

  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
     return localStorage.getItem('token')
  }


  logout(user:any){
    localStorage.clear();
    sessionStorage.clear();
    console.clear();
    return  this.http.post<any>("http://localhost:3200/logout",user);
  }

}
