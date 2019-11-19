import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, OperatorFunction, pipe, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

export abstract class AbstractGenericRepository<T> {

  protected constructor(protected http: HttpClient, protected readonly apiUrl: string) {}

  abstract get(id: number): Observable<T>;

  abstract create(model: T): Observable<T>;

  abstract update(model: T): Observable<T>;

  abstract patch(model: T): Observable<T>;

  abstract delete(id: number): Observable<any>;

  protected defaultErrorHandler(httpErrorResponse: HttpErrorResponse): Observable<any> {
    if (httpErrorResponse.error instanceof ErrorEvent) {
      console.error('An error occurred: ' + httpErrorResponse.error.message);
    }
    return throwError(httpErrorResponse);
  }

  protected defaultPipe(): OperatorFunction<any, any> {
    return pipe(catchError(this.defaultErrorHandler));
  }

}


