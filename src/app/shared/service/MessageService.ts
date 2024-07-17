// message.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'http://localhost:8080/messages';

  constructor(private http: HttpClient) {}

  getMessages(): Observable<string> {
    return this.http.get(this.apiUrl, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  pollMessages(): Observable<string> {
    return interval(5000).pipe(
      switchMap(() => this.getMessages())
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }
}
