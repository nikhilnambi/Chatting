import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { io, Socket } from 'socket.io-client';
import { WebsocketService } from '../websocket.service';



@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {
  

socket: any;

  user={
    name:localStorage.getItem('toname'),
    username:localStorage.getItem('tousername'),
    status:localStorage.getItem('tostatus'),
    image:localStorage.getItem('toimage'),
  }


  
  routeState: any;
  constructor(private router:Router,private websocketservice:WebsocketService,private http:HttpClient) {}
  chatrecord:any=[];
  blockdata={
    to:this.user.username,
    from:this.username()
   }
   blockeddata={
    from:this.user.username,
    to:this.username()
   }
  mutedata={
    to:this.user.username,
    from:this.username()
   }
  messageArray:Array<{from:String,message:String,to:String,time:String,image:String}> = [];
  blocked:any='';
  blockedfrom:any='';
  mute:any='';
  unblock=true;
  muted=true;
  notshowmute=true;
  ngOnInit():void{
   
  //  setInterval(()=>{
  //   console.clear();
  //  },1)
    
    setInterval(()=>{
     
     
    this.websocketservice.receivemessage(this.createRoomName(this.username(),this.tousername())).subscribe(
      (data)=>{
         if(this.blockedfrom==null){
                this.messageArray=JSON.parse(JSON.stringify(data));
                console.clear();
         }
                
      }
        )
        this.websocketservice.chathistory(localStorage.getItem('username')).subscribe((data: any)=>{
          this.chatrecord =data.reverse();
          console.clear();
      
         })
      
      this.websocketservice.checkBlock(this.blockdata).subscribe((data:any)=>{
        this.blocked=data;
        console.clear();
     })
     this.websocketservice.checkBlocked(this.blockeddata).subscribe((data:any)=>{
      this.blockedfrom=data;
      console.clear();
   })

  
     this.websocketservice.checkMute(this.blockdata).subscribe((data:any)=>{
      this.mute=data;
   })
   
  },500)
}
  
  username(){
    return localStorage.getItem('username');
  }
  tousername(){
    return localStorage.getItem('tousername');
  }

  createRoomName(string1:any,string2:any){
    return string1.concat(string2);
  }
  createRoom(string1:any,string2:any){
    return string2.concat(string1);
  }
  

  data= {
    from: localStorage.getItem('username'),
    to: localStorage.getItem('tousername'),
    text:'',
    image:'',
    room:this.createRoomName(this.username(),this.tousername()),
    room2:this.createRoom(this.username(),this.tousername()),
    fromimage:localStorage.getItem('image'),
    toimage:localStorage.getItem('toimage'),
    members:[
      localStorage.getItem('username'),
      localStorage.getItem('tousername')
    ]
  }

   text:any
   previewsrc:any;
   image:any='';
   handleimg(event:any){
    
    const file = event.target.files[0];
    
    if(event.target.files.length>0){
      const reader = new FileReader();
      this.images=file;
      console.log(this.images)
      reader.readAsDataURL(file);
    
      reader.onload = () =>{ 
       this.previewsrc = reader.result as string ;
       
    }
   
      }

      
    }
   sendimg(){

    this.previewsrc=null;
    const formData = new FormData();
    formData.append('file',this.images);
    
   
    

    this.http.post<any>('http://localhost:3200/file/'+this.data.from+"/"+this.data.to
    +"/"+this.data.room+"/"+this.data.room2+"/"+this.data.fromimage+"/"
    +this.data.toimage+"/"+this.data.members,formData).subscribe(
     (res)=>{
      
        
       
     },

     (err)=>{
       console.log(err)
       alert("Internal Server Error");
     }
    );
     
    }
   sendMsg(){
    
    this.text=this.data.text;
    if(!this.text.trim()){
      
    }
    else{
    if(this.blocked==null && this.blockedfrom==null){
     this.websocketservice.sendMessage(this.data);
   
    }
   
  }
 
   }
   getusername(){
    return localStorage.getItem('username');
  }
  getimage(){
    return localStorage.getItem('image');
  }
   blockeddiv=true;
   unblockeddiv=true;
    blockUser(){
       this.websocketservice.blockUser(this.blockdata).subscribe((data:any)=>{
        // this.blockeddiv=true;
       })
    }
    unblockUser(){
     
      this.websocketservice.unblockUser(this.blockdata).subscribe((data:any)=>{
        // this.unblockeddiv=true;
      })
    }
    muteUser(){
      this.websocketservice.muteUser(this.blockdata).subscribe((data:any)=>{
      })
    }
    unmuteUser(){
      this.websocketservice.unmuteUser(this.blockdata).subscribe((data:any)=>{
      })
    }
    forwardedmsg:any='';
    ShareMessage(data:any){
      this.forwardedmsg=data;
      document.getElementById("modalbtn")?.click();
    }
    forwarddata:any={};
    gpdata:any={};
    ShareMsgtoChat(data:any){
     
      this.router.navigate(['/chats']).then(()=>{
        // setTimeout(()=>{window.location.reload()},1);
        window.location.reload();
      });
      this.forwarddata={
          from:this.getusername(),
          to:data.to==this.getusername()?data.from:data.to,
          text:this.forwardedmsg,
          fromimage:this.getimage(),
          toimage:data.fromImage==this.getimage()?data.toImage:data.fromImage,
          room:this.createRoomName(data.from==this.getusername()?data.from:data.to,data.to==this.getusername()?data.from:data.to),
          room2:this.createRoomName(data.to==this.getusername()?data.from:data.to,data.from==this.getusername()?data.from:data.to),
          members:[
            this.getusername(),
            data.to==this.getusername()?data.from:data.to
          ]
      }
      // if(this.forwarddata.room != this.forwarddata.room2 ){
      
      this.websocketservice.sendMessage(this.forwarddata);

      // }
      // else{

      //   this.gpdata={
      //     text:this.forwardedmsg,
      //     from: localStorage.getItem('username'),
      //     room:data.to,
      //     room2:data.to,
      //     fromimage:data.fromImage,
      //     toimage:data.toImage,
      //     to:data.to,
      //     members:data.members
          
      //   }
      //   this.websocketservice.sendMessage(this.gpdata);
      // }
      };

      openFile(){

        let element = <HTMLElement>document.querySelector('#imgupload');
        element.click();
      }
      images:any;
      handle(event:any){
   
        // const img = event.target.value;
    
        if(event.target.files.length>0){
          const file = event.target.files[0];
          this.images=file;
    
          let element = <HTMLElement>document.querySelector('#dpsubmit');
           element.click();
        }
        
        }
       
      
    }
  

