import { AfterContentInit, AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WebsocketService } from '../websocket.service';
import {Router } from '@angular/router';




@Component({
  selector: 'app-chathistory',
  templateUrl: './chathistory.component.html',
  styleUrls: ['./chathistory.component.css']
})
export class ChathistoryComponent implements OnInit {
  mute: any;
  
  

  constructor(private websocketservice:WebsocketService,private router:Router) { }
  
  

 
  chatrecord:any=[];
  ngOnInit(): void {
    setInterval(()=>{

         this.websocketservice.chathistory(localStorage.getItem('username')).subscribe((data: any)=>{
          this.chatrecord =data.reverse();
    
         })

        },700)
        
       
  }

 
  
 
  status:any='';
  tousername:any='';
  toimage:any='';
  creator:any='';
  members:any={};
  chatUser(data:any){
    
    if(data.room==data.room2){

    sessionStorage.setItem('gpimg',data.toImage);
    sessionStorage.setItem('gpname',data.room);
    localStorage.setItem('gpname',data.room);
  
    // sessionStorage.setItem('members',data.members);

    this.websocketservice.checkcreation(data.room).subscribe((data:any)=>{
      
      this.creator=data;
      sessionStorage.setItem('creator',this.creator);
        
      })

    this.router.navigate(['/group-msg']);

    }
    else{
    this.tousername= data.to==this.getusername()?data.from:data.to;
    this.toimage= data.toImage==this.getimg()?data.fromImage:data.toImage;
    localStorage.setItem('tousername',this.tousername);
    localStorage.setItem('toname',this.tousername);
    localStorage.setItem('toimage',this.toimage);
   
    this.websocketservice.checkstatus(localStorage.getItem('tousername')).subscribe((data:any)=>{
      
     this.status=data;
       localStorage.setItem('tostatus',this.status);
       
     })
    

     this.router.navigate(['/message']);
    }
  }

  getusername(){
    return localStorage.getItem('username');
  }
  getimg(){
    return localStorage.getItem('image');
  }

 

}
