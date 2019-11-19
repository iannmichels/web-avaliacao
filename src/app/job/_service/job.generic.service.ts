import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericService } from 'src/app/spring-repository/generic.service';
import { environment } from 'src/environments/environment';
import { Pessoa } from '../_model/pessoa.model';

@Injectable({ providedIn: 'root' })
export class JobGenericService extends GenericService<Pessoa> {

  constructor(public http: HttpClient) {
    super(environment.api + 'pessoaws/', http);
  }

  deteleJob(id: number): Observable<any> {
    return this.delete(id);
  }

}
