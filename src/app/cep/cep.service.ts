import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cep } from './cep.model';


@Injectable()
export class CepService {

    url = 'https://viacep.com.br/ws/';

    constructor(private http: HttpClient) { }

    findCep(cep: any): Observable<Cep> {
        return this.http.get<any>(this.url+cep+'/json');
    }
    

}