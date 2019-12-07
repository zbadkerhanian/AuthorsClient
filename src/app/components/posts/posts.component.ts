import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { FormBuilder } from '@angular/forms';
import { AppComponent } from '../../app.component'
import { PostSubmit } from 'src/app/models/postSubmit';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Post[];

  postForm;

  isAuthenticated: boolean;


  constructor(private postService: PostService,
              private formBuilder: FormBuilder,
              private appComponent: AppComponent
  ) { 
    this.postForm = this.formBuilder.group({
      email: null,
      body: null      
    });

    this.isAuthenticated = appComponent.isAuthenticated;
    
  }


  

  ngOnInit() {
    this.getPosts();
  }



  getPosts(): void {
    this.postService.getPosts().subscribe(posts => {
      console.log(posts);
      this.posts = posts;
    });
  }

  onSubmit(post){
    console.warn('Your post has been submitted', post);
    this.postService.post(post).subscribe(res => console.log("response from post: " + JSON.stringify(res)));
    this.postForm.reset();
  }

  delete(post){
    console.log("clicked delete");
    
    console.log(post.id);

    
    this.postService.delete(post.id).subscribe(body => {
      console.log("Return from service. Deleted post ID: " + body);
    });
  }
}
