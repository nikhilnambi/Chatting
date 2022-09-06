import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable()
export class WebsocketService {

 private socket: Socket;

  constructor(private http:HttpClient) {
    this.socket = io("http://localhost:3200",{ transports: ['websocket','polling', 'flashback']});
   }
  
 
 sendMessage(data:any){
    return this.socket.emit('message', data);
  }
  newMessageReceived(){
    let observable = new Observable<{user:String, message:String, userID:String}>(observer=>{
        this.socket.on('new message', (data:any)=>{
            observer.next(data);
            // console.log(data);
        });
        return () => {this.socket.disconnect();}
    });

    return observable;
  }

  chathistory(getusername:any){
    return this.http.get<any>("http://localhost:3200/chathistory/"+getusername);
  }

  // chathistoryeven(getusername:any){
  //   return this.http.get<any>("http://localhost:3200/chathistoryeven/"+getusername);
  // }


  receivemessage(room:any){
    return this.http.get<any>("http://localhost:3200/receive-message/"+room);
  }
  receivegpmessage(data:any){
    return this.http.get<any>("http://localhost:3200/receive-gpmessage/"+data);
  }

  checkstatus(username:any){
    return this.http.get<any>("http://localhost:3200/checkstatus/"+username)
  }
  checkcreation(data:any){
    return this.http.get<any>("http://localhost:3200/checkcreator/"+data)
  }
   
  blockUser(data:any){

    return this.http.post<any>("http://localhost:3200/block/",data)
  }

  checkBlock(data:any){
    return this.http.post<any>("http://localhost:3200/checkblock/",data)
  }
  checkBlocked(data:any){
    return this.http.post<any>("http://localhost:3200/checkblocked/",data)
  }
  checkMute(data:any){
    return this.http.post<any>("http://localhost:3200/checkmute/",data)
  }
  unblockUser(data:any){
    return this.http.post<any>("http://localhost:3200/unblock/",data)
  }


  muteUser(data:any){
    return this.http.post<any>("http://localhost:3200/mute/",data)
  }
  unmuteUser(data:any){
    return this.http.post<any>("http://localhost:3200/unmute/",data)
  }
  // leavegroup(data:any){
  //   console.log(data)
  //   return this.http.get<any>("http://localhost:3200/groupleft/"+data)
  // }
  leavegroup(data:any){
    return this.http.post<any>("http://localhost:3200/leavegp/",data)
  }
  checkauth(){
    return this.http.get<any>("http://localhost:3200/checkauth/")
  }
}
