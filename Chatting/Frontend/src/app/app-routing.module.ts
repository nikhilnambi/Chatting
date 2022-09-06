import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import {SignupComponent} from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import {UserComponent} from './user/user.component';
import {FriendsComponent} from './friends/friends.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { SearchresultComponent } from './searchresult/searchresult.component';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { ChathistoryComponent } from './chathistory/chathistory.component';
import { GroupsComponent } from './groups/groups.component';
import { MessageboxComponent } from './messagebox/messagebox.component';
import { GpboxComponent } from './gpbox/gpbox.component';

const routes: Routes = [{path:'',component:SignupComponent}
                        ,{path:'login',component:LoginComponent},
                        {path:'profile',canActivate:[AuthGuard],component:UserComponent},
                          {path:'my-profile',canActivate:[AuthGuard],component:MyprofileComponent},
                        {
                            path:'message',canActivate:[AuthGuard],component:ChatboxComponent
                          },{path:'chats',canActivate:[AuthGuard],component:ChathistoryComponent},{
                            path:'groups',canActivate:[AuthGuard],component:GroupsComponent
                          },{path:'messages',canActivate:[AuthGuard],component:MessageboxComponent},
                          {path:'group-msg',canActivate:[AuthGuard],component:GpboxComponent}
                       ];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    relativeLinkResolution:'corrected',
    initialNavigation:'enabledBlocking',
    useHash:true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
