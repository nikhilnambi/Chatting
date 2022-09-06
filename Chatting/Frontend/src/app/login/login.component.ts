import { Component, OnInit } from '@angular/core';
import {Router} from  '@angular/router';
import { LoginService } from '../login.service';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router ,private loginservice:LoginService,private profileservice:ProfileService) { }

  showPassword:boolean = false;


  logindata={
    username:"",
    password:"",
  }

  ngOnInit(): void {
    console.clear();
    console.warn = () =>{};
  }
   
  errormessage: null | undefined;
  responsemessage:null | undefined;
  loading=false;
  
  UserLogin(){
         this.loading=true;
         this.loginservice.Login(this.logindata).subscribe(
         res=>{
          
          this.loading=false;
          this.responsemessage=res.message;
          localStorage.setItem('token',res.token)
          localStorage.setItem('Name',res.userinfo.name);
          localStorage.setItem('username',res.userinfo.username);
          localStorage.setItem('email',res.userinfo.email);
          localStorage.setItem('image',res.userinfo.image);
          localStorage.setItem('joined',res.userinfo.joined)
          
         
          
          setTimeout(() =>{ this.router.navigate(['/profile']);},500);
           
            
         },(err)=>{
          this.loading=false;
          this.errormessage=err.error.message;
          }
         )
  }

}
