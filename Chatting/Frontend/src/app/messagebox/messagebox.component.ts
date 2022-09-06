import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messagebox',
  templateUrl: './messagebox.component.html',
  styleUrls: ['./messagebox.component.css']
})
export class MessageboxComponent implements OnInit {
  routeState: any;
  user={
    toImage:'',
    to:'',
    from:''
  }
 
       getuserName(){
        return localStorage.getItem('username');
       }
  
  constructor(private router: Router) {
    this.routeState = this.router.getCurrentNavigation()?.extras.state;
    if (this.routeState) {
          
     
      
      if(this.routeState.frontEnd.chat){
        
        this.user = this.routeState.frontEnd;
       
        
      }
      else{
        
        this.user = this.routeState.frontEnd;
       
      }
     
      
      
    }
   }

  ngOnInit(): void {

  }

  data={
   text:'',
  }

  sendMsg(){
      
  }

  }

 


