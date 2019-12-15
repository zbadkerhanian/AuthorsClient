import { Injectable } from '@angular/core';
import { Author } from '../models/author';
import { Observable, of, throwError } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders, HttpParams, HttpHandler, HttpRequest } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { OktaAuthService } from '@okta/okta-angular';
import { from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private oktaAuth: OktaAuthService,
              private http: HttpClient,
              private messageService: MessageService) { }

  private baseUrl ='https://api.authorsandblogs.com'
  private getUrl = this.baseUrl + '/api/Authors/Get';  // URL to web api
  private postUrl = this.baseUrl + '/api/Authors/Post';  
  //private deleteUrl = this.baseUrl + '/api/Authors/Delete';
  private accessToken;


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

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.getUrl)
      .pipe(
        catchError(this.handleError<Author[]>('getAuthors', []))
      );
  }

  post(author): Observable<any>{
    return this.http.post(this.postUrl, author, {headers:this.returnHeaders()})
      .pipe(
        catchError(this.handleError('postAuthor'))
      );
  }

  // delete(id): Observable<any>{
  //   console.log("I am in service");
  //   console.log(id);
  //   this.httpOptions.params.id = id;
    
  //   return this.http.delete(this.deleteUrl, this.httpOptions)
  //     .pipe(
  //       catchError(this.handleError('deleteAuthor'))
  //     );
  // }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead

          // TODO: better job of transforming error for user consumption
          this.log(`${operation} failed: ${error.message}`);

          return throwError(error);
      };
  }

  private log(message: string) {
    this.messageService.add(`AuthorService: ${message}`);
  }
}
