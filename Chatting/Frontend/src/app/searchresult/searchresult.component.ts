import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.css']
})
export class SearchresultComponent implements OnInit {
  
     

  people=[{
    name:"",
    username:"",
  }]

  errormessage:null | undefined;
 
     
      routeState: any;
    
      constructor(private router: Router) {
        
        
        this.routeState = this.router.getCurrentNavigation()?.extras.state;
        if (this.routeState) {
              
          if(this.routeState.frontEnd){
          this.people = this.routeState.frontEnd;
         
          }
          else{
            this.errormessage= this.routeState.frontEndError
           
          }
        }
      
         
          
  
  
        
      
      }
      _url = 'http://localhost:3200/';
      LinkImg(){
        return `${this._url}/1661802620051.jpg`;
      }
     
      
 
  ngOnInit(): void {
   
    
  }
     

   
    
  

  }
