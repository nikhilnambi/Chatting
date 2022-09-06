
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  

  constructor(private http:HttpClient) { }



  _url = 'http://localhost:3200/username/';

  UsernameCheck(usernamecheck:any){
    return this.http.get<any>(this._url+usernamecheck)
  }

  UseremailCheck(email:any){
     return this.http.get<any>("http://localhost:3200/useremail/"+email)
  }

  AddUser(user:any){
          return this.http.post<any>("http://localhost:3200/add/",user)
          
  }

  Otp(email:any){
    return this.http.get<any>("http://localhost:3200/otp/"+email)
  }
  OtpVerify(otpverification:any){
    
    return this.http.post<any>("http://localhost:3200/otpverify/",otpverification)
  }

 
}
