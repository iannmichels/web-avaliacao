import EnumAdapter from './enums-adapter';
import { TipoTelefone } from 'src/app/job/_model/enum/tipo-telefone.enum';

export const enums = {
    tipoTelefone: EnumAdapter.toEnumAdapter<TipoTelefone>(TipoTelefone)
};