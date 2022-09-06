import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {Router} from  '@angular/router';
import { SignupService } from '../signup.service';
import { NgOtpInputModule } from 'ng-otp-input';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

   
  
  constructor(private router:Router,private Signupservice:SignupService) { }

  ngOnInit(): void {
    console.clear();
  }

  user={
    name:"",
    username:"",
    email:"",
    password:"",

  }

 
  loading=false;
  responsemessage: null | undefined;
  errorresponse:null | undefined;
  UserSignup(){
    this.loading=true;
     this.Signupservice.AddUser(this.user).subscribe(
      res=>{
        this.loading=false;
        this.responsemessage=res.message;
          setTimeout(() =>{ this.router.navigate(['/login']);},2500);
      },(err)=>{
        this.loading=false;
        this. errorresponse=err.error.errorresponse;
      }
     )
 
  }
  
  showPassword: boolean = false;

  otp:boolean=false;
  
  showHidePassword() {
    this.showPassword = !this.showPassword;
  }
   
  errormessage: null | undefined;
  successmessage: null | undefined;
  useremailmessage:null | undefined;
 
  UsernameCheck(event:any) {
    const inputValue = event.target.value;
    
    if(inputValue.length>=4 && inputValue.length<=14){
      var username=inputValue;
       
       this.Signupservice.UsernameCheck(username).subscribe(
        res=>{
             
        //  this.successmessage=res.valid.message;

        },(err)=>{
           
          this.errormessage=err.error.message;
        }
       )
    }

      

  }
  

  otpverify(email:any){

    this.otp=true;
   
    this.Signupservice.Otp(email).subscribe(
      res=>{

      },
      (err)=>{

      }
    )
    
  }
  emailverified:null |undefined;
  otpmessage:null |undefined;
  emailsucess:true | undefined;
  
  onOtpChange(event: string): void {
    

    
    if(event.length==4){
     
      const otpverification={
        email:this.user.email,
        otp:event
      }
       this.Signupservice.OtpVerify(otpverification).subscribe(
        res=>{
              
               this.emailverified=res.message;
               

        },(err)=>{
                   
                 this.otpmessage=err.error.message;
                
        }
       )
    }
  }
  
  

  useremail(event:any){
   
    const inputValue = event.target.value;

    let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{3,4}$/g;
    if(inputValue.match(regex)){
      
      var email = inputValue;

      this.Signupservice.UseremailCheck(email).subscribe(
        res=>{

        },
        (err)=>{
          this.useremailmessage=err.error.message;
        }
      )

    
    }


  }
  checkboxticked=false;

  checkbox(event:any){
       if(event.target.checked){
        this.checkboxticked = true;
       }
       else{
        this.checkboxticked = false;
       }
  }

  

 

}


