import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { FormBuilder } from '@angular/forms';
import { AppComponent } from '../../app.component'
import { PostSubmit } from 'src/app/models/postSubmit';
import { Author } from 'src/app/models/author';
import { AuthorsComponent } from '../authors/authors.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Post[];

  postForm;

  authors: Author[];

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
    this.postService.setToken().subscribe(()=>{
      this.getPosts();
      this.getAuthors();
    });

  }



  getPosts(): void {
    this.postService.getPosts().subscribe(posts => {
      //console.log(posts);
      this.posts = posts;
    });
  }

  getAuthors(): void {
    this.postService.getAuthors().subscribe(authors => {
      //console.log(authors);
      this.authors = authors;
    });
  }

  delete(post){
     this.postService.delete(post.id).subscribe(post => {
      console.log("Return from service. Deleted: " + JSON.stringify(post.body));
    });
  }

  onSubmit(post){
    console.warn('Your post has been submitted', post);
    this.postService.post(post).subscribe(res => console.log("response from post: " + JSON.stringify(res)),
        err => alert(err.error.message));
    this.postForm.reset();
  }
}
