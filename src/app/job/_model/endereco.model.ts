import { Pessoa } from 'src/app/job/_model/pessoa.model';

export class Endereco {
    public id: number;
    public cep: string;
    public logradouro: string;
    public bairro: string;
    public cidade: string;
    public uf: string;
    public complemento: string;
}
