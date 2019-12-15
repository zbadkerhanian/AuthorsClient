import { Injectable, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { Observable, of, throwError } from 'rxjs';
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
  private baseUrl = 'https://api.authorsandblogs.com' // URL to web api
  private getUrl = this.baseUrl + '/api/Posts/Get';  
  private getAuthorsUrl = this.baseUrl + '/api/Authors/Get';
  private postUrl = this.baseUrl + '/api/Posts/Post';
  private deleteUrl = this.baseUrl + '/api/Posts/Delete';
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
    return this.http.get<Post[]>(this.getUrl)
      .pipe(
        catchError(this.handleError<Post[]>('getPosts', []))
      );
    
  }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.getAuthorsUrl)
      .pipe(
        catchError(this.handleError<Author[]>('getAuthors', []))
      );
  }

  post(post): Observable<any>{
    return this.http.post<any>(this.postUrl, post, {headers:this.returnHeaders()})
      .pipe(
            catchError(this.handleError<any>('postPost'))
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
      //console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      return throwError(error);
    };
  }

  private log(message: string) {
    this.messageService.add(`PostService: ${message}`);
  }
}
