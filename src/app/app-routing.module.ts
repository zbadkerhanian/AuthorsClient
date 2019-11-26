import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { PostsComponent } from './components/posts/posts.component';
import { OktaAuthModule, OktaCallbackComponent } from '@okta/okta-angular';


const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'implicit/callback', component: OktaCallbackComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}