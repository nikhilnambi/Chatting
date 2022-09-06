import { Component, OnInit,OnDestroy } from '@angular/core';
import { ProfileService } from '../profile.service';
import {Router } from '@angular/router';





@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  
  constructor(private profileservice:ProfileService,private router:Router) { }

 
  people=[{
    username:'',
    name:'',
    image:'',
    status:''
  }]


 
User = JSON.parse(localStorage.getItem(('user')) || "[]" );


  ngOnInit(): void {
    
    this.profileservice.people();
    this.people=this.profileservice.peopledata;


    console.clear();
   
  }
  _url = 'http://localhost:3200/';
  
   dp(){
    return `${this._url}/${localStorage.getItem('image')}`;
   }
  
 getImage(){
  localStorage.getItem('image');
 }

 
 
 chatUser(data:any){
     
    localStorage.setItem('tousername',data.username);
    localStorage.setItem('toname',data.name);
    localStorage.setItem('toimage',data.image);
    localStorage.setItem('tostatus',data.status);
    if(data.username==localStorage.getItem('username')){
       alert("You can't chat with yourself");
    }
    else{
    // this.router.navigateByUrl('/message',{ state: {          
    //   frontEnd: data,

      this.router.navigate(['/message']);

    // }});
  }
 }

  

}


