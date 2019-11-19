import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, OperatorFunction, throwError } from 'rxjs';
import { pipe } from 'rxjs/internal/util/pipe';
import { catchError } from 'rxjs/operators';

export abstract class GenericService<T> {



  protected constructor(public apiUrl: string,
                        private httpClient: HttpClient) { }

  public readonly options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' +
        btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password'))
    })
  };

  protected defaultPipe(): OperatorFunction<any, any> {
    return pipe(catchError(this.defaultErrorHandler));
  }

  protected defaultErrorHandler(error: any) { return throwError(error); }



  public delete(item: { id: number } | number): Observable<T> {
    const url = `${this.apiUrl}delete/${item}`;
    return this.httpClient.delete<T>(url, this.options).pipe(this.defaultPipe());
  }

}
