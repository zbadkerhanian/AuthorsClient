import { Injectable, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { OktaAuthService } from '@okta/okta-angular';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { PostSubmit } from '../models/postSubmit';
import { from } from 'rxjs';
import { Author } from '../models/author';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private oktaAuth: OktaAuthService,
    private http: HttpClient,
    private messageService: MessageService) { }

  private getUrl = 'https://localhost:44387/api/Posts/Get';  // URL to web api
  private getAuthorsUrl = 'https://localhost:44387/api/Authors/Get';  // URL to web api
  private postUrl = 'https://localhost:44387/api/Posts/Post';  // URL to web api
  private deleteUrl = 'https://localhost:44387/api/Posts/Delete';  // URL to web api
  public accessToken;
  

  returnHeaders(){
    if(this.accessToken == null){
      return {
        'Content-Type': 'application/json'
      }
    }
    return{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    }
  }

  setToken(): Observable<void> {
    return from(this.oktaAuth.getAccessToken().then(res => {
      this.accessToken = res;
    }));
    
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.getUrl, {headers:this.returnHeaders()})
      .pipe(
        catchError(this.handleError<Post[]>('getPosts', []))
      );
    
  }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.getAuthorsUrl, {headers:this.returnHeaders()})
      .pipe(
        catchError(this.handleError<Author[]>('getAuthors', []))
      );
  }

  post(post): Observable<Post>{
    console.log("in post service posting " + JSON.stringify(post));
    return this.http.post<Post>(this.postUrl, post)
      .pipe(
        catchError(this.handleError<Post>('postPost'))
      );
  }

  delete(id): Observable<any>{
    return this.http.delete(this.deleteUrl, {headers:this.returnHeaders(), params:{id}})
      .pipe(
        catchError(this.handleError('deletePost'))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`PostService: ${message}`);
  }
}
