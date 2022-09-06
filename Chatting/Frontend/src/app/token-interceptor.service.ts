import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector:Injector) { }

  intercept(req:any,next:any){
    
   let loginservice = this.injector.get(LoginService)
 
   let tokenizedReq = req.clone(
    {
      setHeaders:{
        Authorization:`Bearer ${loginservice.getToken()}`
      }
    }
   )
   

   return next.handle(tokenizedReq)
  }
}
