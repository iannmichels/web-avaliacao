import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Cep } from 'src/app/cep/cep.model';
import { CepService } from 'src/app/cep/cep.service';
import { AuthenticationService } from 'src/app/login/_service/authentication.service';
import { Util } from 'src/assets/util/util';
import { Email } from '../_model/email.model';
import { Endereco } from '../_model/endereco.model';
import { Pessoa } from '../_model/pessoa.model';
import { Telefone } from '../_model/telefone.model';
import { JobService } from '../_service/job.service';
import { enums } from 'src/app/helper/enums/enums';

@Component({
  selector: 'app-job-form',
  templateUrl: './job.form.component.html',
  styleUrls: ['./job.form.component.scss'],
})
export class JobFormComponent implements OnInit {

  public emailSelecionado: Email = undefined;
  public telefoneSelecionado: Telefone = undefined;
  public form: FormGroup;
  public formEmail: FormGroup;
  public formTelefone: FormGroup;
  public pessoa: Pessoa = new Pessoa();
  private routeSub: Subscription;
  private idJob: any;
  public dropTipoTelefone: SelectItem[] = [];
  public masks: any = '00 0000';


  constructor(
    private formBuilder: FormBuilder,
    private jobService: JobService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private cepService: CepService
  ) {
  }

  ngOnInit() {
    this.pessoa.emails = [];
    this.pessoa.telefones = [];
    this.pessoa.endereco = new Endereco();
    enums.tipoTelefone.entries.forEach(e => this.dropTipoTelefone.push({ label: e.value, value: e.name }));
    this.criarForms();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idJob = params.get('id');
      if (!Util.isUndefined(this.idJob)) {
        this.jobService.findById(this.idJob).subscribe((res: Pessoa) => {
          if (res) {
            this.form.get('name').setValue(res.name);
            this.form.get('cpf').setValue(res.cpf);
            this.form.get('cep').setValue(res.endereco.cep);
            this.form.get('logradouro').setValue(res.endereco.logradouro);
            this.form.get('bairro').setValue(res.endereco.bairro);
            this.form.get('cidade').setValue(res.endereco.cidade);
            this.form.get('uf').setValue(res.endereco.uf);
            this.form.get('complemento').setValue(res.endereco.complemento);
            this.pessoa = res;
          }
        });
      }
      this.setValuesChange();
    });
  }

  criarForms() {
    this.form = this.formBuilder.group({
      name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern(/^[a-zA-Z0-9]*$/)])),
      cpf: new FormControl('', Validators.compose([Validators.required, Validators.minLength(11)])),
      cep: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(8)])),
      logradouro: new FormControl({ value: '', disabled: true }, Validators.required),
      bairro: new FormControl({ value: '', disabled: true }, Validators.required),
      cidade: new FormControl({ value: '', disabled: true }, Validators.required),
      uf: new FormControl({ value: '', disabled: true }, Validators.required),
      complemento: new FormControl(''),
    });
    this.formEmail = this.formBuilder.group({
      descricao: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    });
    this.formTelefone = this.formBuilder.group({
      descricao: new FormControl('', Validators.required),
      tipoTelefone: new FormControl(null, Validators.required),
    });
  }

  setValuesChange(): void {
    this.form.get('name').valueChanges.subscribe(v => {
      this.pessoa.name = v;
    });
    this.form.get('cpf').valueChanges.subscribe(v => {
      this.pessoa.cpf = v;
    });
    this.valuesChangeEndereco();
  }


  valuesChangeEndereco() {
    this.form.get('cep').valueChanges.subscribe(v => {
      this.pessoa.endereco.cep = v;
    });
    this.form.get('logradouro').valueChanges.subscribe(v => {
      this.pessoa.endereco.logradouro = v;
    });
    this.form.get('bairro').valueChanges.subscribe(v => {
      this.pessoa.endereco.bairro = v;
    });
    this.form.get('cidade').valueChanges.subscribe(v => {
      this.pessoa.endereco.cidade = v;
    });
    this.form.get('uf').valueChanges.subscribe(v => {
      this.pessoa.endereco.uf = v;
    });
    this.form.get('complemento').valueChanges.subscribe(v => {
      this.pessoa.endereco.complemento = v;
    });
  }

  buscarCep() {
    if (Util.isUndefined(this.pessoa.endereco.cep)) {
      return;
    }
    this.cepService.findCep(this.pessoa.endereco.cep).subscribe((res: Cep) => {
      this.form.get('logradouro').setValue(res.logradouro);
      this.form.get('bairro').setValue(res.bairro);
      this.form.get('cidade').setValue(res.localidade);
      this.form.get('uf').setValue(res.uf);
    });
  }

  editar(dados: any, index, tipo) {
    if (tipo === 'email') {
      this.editarEmail(dados, index);
    } else {
      this.editarTelefone(dados, index);
    }
  }

  editarTelefone(dados: any, index) {
    this.telefoneSelecionado = dados;
    this.pessoa.telefones.splice(index, 1);
    this.formTelefone.get('descricao').setValue(this.telefoneSelecionado.descricao);
    this.formTelefone.get('tipoTelefone').setValue(this.telefoneSelecionado.tipoTelefone);
  }

  adicionarTelefone() {
    const telefone: Telefone = new Telefone();
    if (this.formTelefone.get('descricao').valid && this.formTelefone.get('tipoTelefone').valid) {
      telefone.descricao = this.formTelefone.get('descricao').value;
      telefone.tipoTelefone = this.formTelefone.get('tipoTelefone').value;
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warn Message', detail: 'Preencha os campos de "telefone" corretamente!' });
      return;
    }
    this.pessoa.telefones.push(telefone);
    this.formTelefone.reset();
  }

  atualizarTelefone() {
    if (this.formTelefone.get('descricao').valid && this.formEmail.get('tipoTelefone').valid) {
      this.telefoneSelecionado.descricao = this.formTelefone.get('descricao').value;
      this.telefoneSelecionado.tipoTelefone = this.formTelefone.get('tipoTelefone').value;
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warn Message', detail: 'Preencha os campos de "telefone" corretamente!' });
      return;
    }
    this.pessoa.telefones.push(this.telefoneSelecionado);
    this.telefoneSelecionado = undefined;
    this.formTelefone.reset();
  }

  editarEmail(dados: any, index) {
    this.emailSelecionado = dados;
    this.pessoa.emails.splice(index, 1);
    this.formEmail.get('descricao').setValue(this.emailSelecionado.descricao);
  }

  adicionarEmail() {
    const email: Email = new Email();
    if (this.formEmail.get('descricao').valid) {
      email.descricao = this.formEmail.get('descricao').value;
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Alerta!', detail: 'Preencha os campos de "e-mail" corretamente!' });
      return;
    }
    this.pessoa.emails.push(email);
    this.formEmail.reset();
  }

  atualizarEmail() {
    if (this.formEmail.get('descricao').valid) {
      this.emailSelecionado.descricao = this.formEmail.get('descricao').value;
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warn Message', detail: 'Preencha os campos de "e-mail" corretamente!' });
      return;
    }
    this.pessoa.emails.push(this.emailSelecionado);
    this.formEmail.reset();
    this.emailSelecionado = undefined;
  }

  removerEmail(index) {
    this.pessoa.emails.splice(index, 1);
  }

  removerTelefone(index) {
    this.pessoa.telefones.splice(index, 1);
  }

  salvar() {
    if (this.form.valid) {
      this.validarRelacionamentos();
      this.jobService.salvar(this.pessoa).subscribe(res => {
        if (res) {
          this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Pessoa cadastrada com sucesso!' });
          this.router.navigate(['pessoas']);
        }
      }, reserror => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: reserror.error.message });
      });
    }
  }

  validarRelacionamentos() {
    if (this.pessoa.emails.length < 1) {
      this.messageService.add({ severity: 'warn', summary: 'Warn Message', detail: 'Email é um campo de preenchimento obrigatório!' });
    }
    if (this.pessoa.telefones.length < 1) {
      this.messageService.add({ severity: 'warn', summary: 'Warn Message', detail: 'Telefone é um campo de preenchimento obrigatório!' });
    }
  }

  voltar() {
    this.router.navigate(['pessoas']);
  }


  logout() {
    this.authenticationService.logout();
  }
}
