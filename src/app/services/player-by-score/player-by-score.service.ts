import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { PlayersByScore } from '../../models/PlayersByScore';
@Injectable({
  providedIn: 'root',
})
export class PlayerByScoreService {
  private playersRestUrl =
    'https://61e2d92b3050a100176822c8.mockapi.io/api/v1/PlayersByScore';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  getPlayersByScore(): Observable<PlayersByScore[]> {
    return this.httpClient
      .get<PlayersByScore[]>(this.playersRestUrl, this.httpOptions)
      .pipe(retry(3), catchError(this.httpErrorHandler));
  }

  private httpErrorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(
        'A client side error occurs. The error message is ' + error.message
      );
    } else {
      console.error(
        'An error happened in server. The HTTP status code is ' +
          error.status +
          ' and the error returned is ' +
          error.message
      );
    }

    return throwError('Error occurred. Please try again');
  }
}
