import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private login:LoginService,private router:Router){}

  canActivate():boolean{

    if(this.login.loggedIn()){
       
      return true;

    }
    else{
        this.router.navigate(['/']);
        return false;
    }
  }
   
  
}
