import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericRestRepository } from 'src/app/spring-repository/generic-rest-repository';
import { Page } from 'src/app/spring-repository/types/generic/page';
import { RepositoryParams } from 'src/app/spring-repository/types/generic/params';
import { environment } from 'src/environments/environment';
import { Pessoa } from '../_model/pessoa.model';
import { Util } from 'src/assets/util/util';

@Injectable({
  providedIn: 'root'
})
export class JobService extends GenericRestRepository<Pessoa> {


  constructor(protected http: HttpClient) {
    super(http, environment.api + 'pessoaws');
  }

  findByFiltro(filtro: RepositoryParams): Observable<Page<Pessoa>> {
    return this.customSearchAll<Page<Pessoa>>('find-all-page', filtro);
  }

  findAll(): Observable<Pessoa[]> {
    return this.getAll(null);
  }

  salvar(pessoa: Pessoa): Observable<Pessoa> {
    if (Util.isUndefined(pessoa.id)) {
      return this.create(pessoa);
    } else {
      return this.updateGen(pessoa, `/salvar-by-id/${pessoa.id}`);
    }
  }


  findById(id: number): Observable<Pessoa> {
    return this.get(id);
  }

  deteleJob(id: number): Observable<any> {
    return this.delete(id);
  }

}
