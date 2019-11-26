import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Post[];

  postForm;


  constructor(private postService: PostService,
              private formBuilder: FormBuilder,
  ) { 
    this.postForm = this.formBuilder.group({
      id: null,
      body: null      
    });
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
    this.postService.post(post).subscribe();
    this.postForm.reset();
  }

}
