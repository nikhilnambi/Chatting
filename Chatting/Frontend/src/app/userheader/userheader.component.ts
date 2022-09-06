import { HttpErrorResponse } from '@angular/common/http';
import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../profile.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-userheader',
  templateUrl: './userheader.component.html',
  styleUrls: ['./userheader.component.css']
})
export class UserheaderComponent implements OnInit {


  constructor(private router:Router, private profileservice:ProfileService,route:ActivatedRoute,private loginservice:LoginService) {
    
   }

  ngOnInit(): void {
  }
  
  searchname='';
  people:[] | undefined

  errormessage:null | undefined;
  responsemessage:null | undefined;
  sessionmesssage:null | undefined;
  loading=false;
  navigate=false

  user={
    username:localStorage.getItem('username'),
    email:localStorage.getItem('email')
  }
   
  logoutUser(){

    localStorage.clear();

    this.loginservice.logout(this.user).subscribe(
      res=>{
       
      },(err)=>{

      }
    )
    this.router.navigate(['login'])
  }

  Search(){
    this.loading=true;
    
    if(this.searchname.length>4){
      
      this.profileservice.searchPeople(this.searchname).subscribe(
        
        res=>{
         
              this.loading=false;
              this.people= JSON.parse(JSON.stringify(res));
              this.responsemessage = res.message;
              
             
              setTimeout(() =>{ this.router.navigate(['/my-profile']);},1);
              
              setTimeout(() =>{ this.router.navigate(['/search'], {
                
                state: {
                 
                  frontEnd: this.people,
                },
              });},2);
            
              
        },(err)=>{
             this.loading=false;
             if(err instanceof HttpErrorResponse){
              if(err.status === 401){
                this.logoutUser();
              }
             }
             else{
             this.errormessage=err.error.message;
             setTimeout(() =>{ this.router.navigate(['/my-profile']);},1);
             setTimeout(() =>{ this.router.navigate(['/search'], {
                
              state: {
               
                frontEndError:this.errormessage,
              },
            });},2);
          }
           
        })
    }
    else{
           this.loading=false;
    }
      
  }

}
