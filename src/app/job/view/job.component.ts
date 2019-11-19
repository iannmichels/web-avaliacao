import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { LazyLoadEvent, MessageService, SelectItem } from 'primeng/api';
import { AuthenticationService } from 'src/app/login/_service/authentication.service';
import { toPageParams } from 'src/app/spring-repository/helpers/params-helper';
import { Page } from 'src/app/spring-repository/types/generic/page';
import { FiltroPessoa } from '../_model/filtro-pessoa.model';
import { Pessoa } from '../_model/pessoa.model';
import { JobGenericService } from '../_service/job.generic.service';
import { JobService } from '../_service/job.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  public form: FormGroup;
  public filtro: FiltroPessoa;
  public pessoas: Page<Pessoa>;
  public pessoa: Pessoa;

  constructor(
    private formBuilder: FormBuilder,
    private jobService: JobService,
    private messageService: MessageService,
    private router: Router,
    private auth: AuthenticationService,
    private jobGenericService: JobGenericService,
  ) {
  }

  ngOnInit() {
    this.filtro = new FiltroPessoa();
    this.form = this.formBuilder.group({
      name: new FormControl(''),
      cpf: new FormControl(''),
    });
    this.onChanges();
    this.buscar();
  }

  onChanges(): void {
    this.form.get('name').valueChanges.subscribe(v => {
      this.filtro.name = v;
    });
    this.form.get('cpf').valueChanges.subscribe(v => {
      this.filtro.cpf = v;
    });
    this.form.valueChanges.subscribe(() => {
      this.buscar();
    });
  }

  private buscar(event?: LazyLoadEvent) {
    this.jobService.findByFiltro(_.assign(this.getValueFiltroConsulta(this.filtro),
      { pageParams: toPageParams(event, { name: 'asc' }) }
    )).subscribe(retorno => {
      this.pessoas = retorno;
    });
  }


  private getValueFiltroConsulta(filtro) {
    return _.pickBy({
      name: filtro.name,
      cpf: filtro.cpf
    });
  }

  editar(idJob: number) {
    this.router.navigate(['/pessoas', idJob, 'edit']);
  }

  removerJob(idJob) {
    this.jobGenericService.deteleJob(idJob).subscribe(res => {
      if (res) {
        this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Pessoa ' + res + ' removida com sucesso!' });
      }
    });
  }

  onCloseModal() {
    this.buscar();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
