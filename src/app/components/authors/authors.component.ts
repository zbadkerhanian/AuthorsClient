import { Component, OnInit } from '@angular/core';
import { Author } from '../../models/author';
import { AuthorService } from '../../services/author.service';
import { FormBuilder } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  author= {
    id: 1,
    name: 'admin'
  }
  authors: Author[];
  authorForm;
  isAuthenticated: boolean;



  constructor(private authorService: AuthorService,
              private formBuilder: FormBuilder,
              private appComponent: AppComponent
    ) {
    this.authorForm = this.formBuilder.group({
      firstName: null,
      lastName: null,      
      email: null      
    });

    this.isAuthenticated = appComponent.isAuthenticated;
    
   }

    ngOnInit() {
    this.authorService.setToken().subscribe(() => {
        this.getAuthors();
    });
  }

  getAuthors(): void {
    this.authorService.getAuthors().subscribe(authors => {
      //console.log(authors);
      this.authors = authors;
    });
  }
  
  // delete(author){
  //   console.log("clicked delete");
    
  //   console.log(author.id);

    
  //   this.authorService.delete(author.id).subscribe(body => {
  //     console.log("Return from service. Deleted author with ID: " + body);
  //   });
  // }

  onSubmit(author){
    console.warn('Creating new author', author);
    this.authorService.post(author).subscribe(res => console.log("New author's ID: " + JSON.stringify(res)),
        err => alert(err.error));
    this.authorForm.reset();
  }
}
