import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { WebsocketService } from './websocket.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[WebsocketService]
})
export class AppComponent implements OnInit {
  title = 'ChattingApp';

  constructor(private websocketservice:WebsocketService,private loginservice: LoginService){

  }



 
 ngOnInit(){
   
    this.websocketservice.checkauth().subscribe(
      res=>{
            //  console.log(res);
      },(err)=>{
        console.clear();
         if(err){
                this.loginservice.logout(localStorage.getItem('username')).subscribe(
                  res=>{

                  },(err)=>{

                  }
                )
         }
      }
    )
 }


}
