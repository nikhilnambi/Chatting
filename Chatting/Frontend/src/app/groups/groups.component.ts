import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { ProfileService } from '../profile.service';
import { FormGroup,FormControl,Validators} from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  constructor(private profileservice:ProfileService,private router:Router) { }
 
  regForm = new FormGroup({
    name: new FormControl(''),
    });

   groupodd=[
    {
      gpname:"",
      creator:"",
      members:"",
      image:""
    }
   ]
   groupeven=[
    {
      gpname:"",
      creator:"",
      members:"",
      image:""
    }
   ]

  ngOnInit(): void {

     this.profileservice.getgroups(this.getusername()).subscribe(
      (res)=>{
                this.groupodd = JSON.parse(JSON.stringify(res))
      },(err)=>{

      }
     )

     this.profileservice.getnoningroup(this.getusername()).subscribe(
      (res)=>{
        this.groupeven = JSON.parse(JSON.stringify(res))
      },(err)=>{

      }
     )
  }

  user={
    name:"",
  }
  people=[{
    username:'',
    name:'',
    image:'',
    status:''
  }]

 getuserimage(){
  return localStorage.getItem('image');
 }
 getName(){
  return localStorage.getItem('Name');
 }
 getusername(){
  return localStorage.getItem('username');
 }
  // loading=false;
  getPeople(){
    // this.loading=true
    this.profileservice.people();
    this.people=this.profileservice.peopledata;

  } 
   data:any;
   successmessage:any;
   errormessage:any;
  createGroup(){
    this.data={
      gpname: this.regForm.value.name,
      creator:this.getusername(),
      members:this.getusername()

 }
    this.profileservice.createGroup(this.data).subscribe(
      (res)=>{
        
        this.successmessage= res.message;
        this.ngOnInit();
        console.log(this.successmessage);
      },(err)=>{
        this.errormessage= err.message;
      }
    )
  }
  show=false;
  gpinfo:any;
  joinGroup(data:any){

    this.gpinfo={
      gpname:data,
      username:this.getusername()
    }

    this.profileservice.joinGroup(this.gpinfo).subscribe(
      (res)=>{
        // this.show=true;
        this.ngOnInit()

      },(err)=>{

      }
    )
  }
  go(data:any){
    
    sessionStorage.setItem('gpimg',data.image);
    sessionStorage.setItem('gpname',data.gpname);
    sessionStorage.setItem('creator',data.creator);
    sessionStorage.setItem('members',data.members);

    this.router.navigate(["/group-msg"]);
  }

}
