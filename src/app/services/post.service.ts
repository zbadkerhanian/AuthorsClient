import { Injectable, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { OktaAuthService } from '@okta/okta-angular';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { PostSubmit } from '../models/postSubmit';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private oktaAuth: OktaAuthService,
    private http: HttpClient,
    private messageService: MessageService) { }

  private getUrl = 'https://localhost:44387/api/Posts/Get';  // URL to web api
  private postUrl = 'https://localhost:44387/api/Posts/Post';  // URL to web api
  private deleteUrl = 'https://localhost:44387/api/Posts/Delete';  // URL to web api
  private accessToken;
  private httpOptions;

  // httpOptions = {
  //   headers: new HttpHeaders(
  //   { 
  //     'Content-Type': 'application/json',
  //   })
  // };

  async setHttpOptions(){
    this.accessToken = await this.oktaAuth.getAccessToken();
    console.log(this.accessToken);
    this.httpOptions = new HttpHeaders({
      Authorization: 'Bearer ' + this.accessToken
    });
  }

  getPosts(): Observable<Post[]> {
    this.setHttpOptions();
    
    return this.http.get<Post[]>(this.getUrl)
      .pipe(
        catchError(this.handleError<Post[]>('getPosts', []))
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
    console.log("I am in service");
    console.log(id);
    this.httpOptions = {
        headers:
        { 
          'Content-Type': 'text/plain',
        },
        params: {
          'id': id
        }
    };
    return this.http.delete(this.deleteUrl, this.httpOptions)
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
