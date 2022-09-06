import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { TokenInterceptorService } from './token-interceptor.service';

import { FormGroup, FormControl } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { UserheaderComponent } from './userheader/userheader.component';
import { FooterComponent } from './footer/footer.component';
import { FriendsComponent } from './friends/friends.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { SearchresultComponent } from './searchresult/searchresult.component';
import { ProfileheaderComponent } from './profileheader/profileheader.component';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { ChathistoryComponent } from './chathistory/chathistory.component';
import { GroupsComponent } from './groups/groups.component';
import { MessageboxComponent } from './messagebox/messagebox.component';
import { GpboxComponent } from './gpbox/gpbox.component';


const config: SocketIoConfig = { url: 'http://localhost:3200', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HeaderComponent,
    LoginComponent,
    UserComponent,
    UserheaderComponent,
    FooterComponent,
    FriendsComponent,
    MyprofileComponent,
    SearchresultComponent,
    ProfileheaderComponent,
    ChatboxComponent,
    ChathistoryComponent,
    GroupsComponent,
    MessageboxComponent,
    GpboxComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,NgOtpInputModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    {
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
