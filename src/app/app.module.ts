import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { MessagesComponent } from './components/messages/messages.component'; 
import { PostsComponent } from './components/posts/posts.component'; 
import { FormsModule, ReactiveFormsModule} from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';
import { OktaAuthModule, OktaCallbackComponent } from '@okta/okta-angular';


const config = {
  issuer: 'https://dev-878513.okta.com',
  redirectUri: 'https://authorsandblogs.com/implicit/callback',
  clientId: '0oa1y61un3b0skxmF357',
  pkce: true
}



@NgModule({
  declarations: [
    AppComponent,
    AuthorsComponent,
    MessagesComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    OktaAuthModule.initAuth(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
