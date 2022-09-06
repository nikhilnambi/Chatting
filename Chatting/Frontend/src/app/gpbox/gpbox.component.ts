import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../profile.service';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-gpbox',
  templateUrl: './gpbox.component.html',
  styleUrls: ['./gpbox.component.css']
})
export class GpboxComponent implements OnInit {

  constructor(private websocketservice:WebsocketService,private router:Router,private profileservice:ProfileService) { }
  messageArray:Array<{from:String,message:String,to:String,time:String}> = [];
  ngOnInit(): void {

    setInterval(()=>{
    this.websocketservice.receivegpmessage(this.gpname()).subscribe(
      (data)=>{
                this.messageArray=JSON.parse(JSON.stringify(data));
                // console.clear();
                
      })
      this.profileservice.checkGroup(this.leavedata).subscribe(
        (data)=>{
           this.leftornot=data;
        }
      )

     
    },500)
    
  }
  leftornot:any='';
  username(){
    return localStorage.getItem('username');
  }
  gpimg(){
    return sessionStorage.getItem('gpimg');
  }
  gpname(){
    return sessionStorage.getItem('gpname');
  }
  creator(){
    return sessionStorage.getItem('creator');
  }
  members(){
    return sessionStorage.getItem('members');
  }
  
  data={
    text:'',
    from: localStorage.getItem('username'),
    room:this.gpname(),
    room2:this.gpname(),
    fromimage:this.gpimg(),
    toimage:this.gpimg(),
    to:this.gpname(),
    members:
      this.members()?.split(',')

    
  }
  leavedata={
    username: localStorage.getItem('username'),
    room:this.gpname()
  }

 text:any
  sendMsg(){
    
    this.text = this.data.text;

    if(!this.text.trim()){
      alert("No message typed...")
    }
    else if(this.leftornot!=null){
      this.websocketservice.sendMessage(this.data);
    }
    else{

    }
  }
  leavegp(){
    
    this.websocketservice.leavegroup(this.leavedata).subscribe(
      (res)=>{
        
      },(err)=>{

      });
      this.router.navigate(['/groups']);
  }
  gpinfo={
      
    username: localStorage.getItem('username'),
    gpname:localStorage.getItem('gpname')
  }
  joingp(){

    this.profileservice.joinGroup(this.gpinfo).subscribe(
      (res)=>{

      },(err)=>{

      }
    )
  }


    
  

}
