import { Component } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import {PostService} from './services/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular586';
  public isAuthenticated: boolean;

  constructor(public oktaAuth: OktaAuthService, private postService:PostService) {
    // Subscribe to authentication state changes
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean)  => {
        this.isAuthenticated = isAuthenticated
      }
    );
  }

  async ngOnInit() {
    // Get the authentication state for immediate use
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
  }

  login() {
    this.oktaAuth.loginRedirect('/posts');
  }

  logout() {
    this.oktaAuth.logout('/');
  }
}
