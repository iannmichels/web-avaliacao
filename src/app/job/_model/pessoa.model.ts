import { Email } from './email.model';
import { Telefone } from './telefone.model';
import { Endereco } from './endereco.model';


export class Pessoa {
    public id: number;
    public name: string;
    public cpf: string;
    public endereco: Endereco;
    public emails: Email[];
    public telefones: Telefone[];
}
