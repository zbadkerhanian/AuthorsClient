import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  private usersUrl = 'https://localhost:44387/api/Users/Get';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders(
      { 
        'Content-Type': 'application/json'
        // ,'Access-Control-Allow-Origin': '*'
      })
  };




  getUsers(): Observable<User[]> {

    // return this.http.get(this.commentsUrl)
    //                     // ...and calling .json() on the response to return data
    //                      .map((res:Response) => res.json())
    //                      //...errors if any
    //                      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
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
    this.messageService.add(`UserService: ${message}`);
  }
}
