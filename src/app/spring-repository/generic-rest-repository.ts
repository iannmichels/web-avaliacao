import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AbstractGenericRepository } from './abstract-generic-repository';
import { toHttpParams } from './helpers/params-helper';
import { Page } from './types/generic/page';
import { RepositoryParams } from './types/generic/params';

export class GenericRestRepository<T extends Identifiable> extends AbstractGenericRepository<T> {

  constructor(protected http: HttpClient,
    protected apiUrl: string) { super(http, apiUrl); }

  public readonly options = {
    headers: new HttpHeaders({
      Authorization: 'Basic ' +
        btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password'))
    })
  };

  public get(id: number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${id}`, this.options).pipe(this.defaultPipe());
  }

  public create<M extends T | T[]>(itemOrArray: M): Observable<M> {
    return this.http.post<M>(this.apiUrl, itemOrArray).pipe(this.defaultPipe());
  }

  public update(model: T): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/salvar/${model.id}`, model).pipe(this.defaultPipe());
  }

  public patch(model: T): Observable<T> {
    return this.http.patch<T>(`${this.apiUrl}/${model.id}`, model).pipe(this.defaultPipe());
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`).pipe(this.defaultPipe());
  }

  public getAll<R extends T[] | Page<T>>(params?: RepositoryParams): Observable<R> {
    return this._get<R>(this.apiUrl, toHttpParams(params));
  }

  public search(searchName: string, params?: RepositoryParams): Observable<T> {
    return this._get<T>(`${this.apiUrl}/search/${searchName}`, toHttpParams(params));
  }

  public searchAll<R extends T[] | Page<T>>(params?: RepositoryParams): Observable<R> {
    return this.customSearchAll<R>('findAllByFilter', toHttpParams(params));
  }

  public customSearchAll<R extends T[] | Page<T>>(searchName: string, params?: RepositoryParams): Observable<R> {
    return this._get<R>(`${this.apiUrl}/search/${searchName}`, toHttpParams(params));
  }

  protected _get<R>(url: string, params: HttpParams): Observable<R> {
    return this.http.get<R>(url, { params }).pipe(this.defaultPipe());
  }

  public updateGen(item: T | any, urlComplement?: string): Observable<null | T> {
    return this.http.put<T>(this.configureUrl(urlComplement), item, this.options).pipe(this.defaultPipe());
  }

  private configureUrl(urlComplement?: string): string {
    let url = this.apiUrl;
    if (urlComplement) { url += urlComplement; }
    return url;
  }
}
