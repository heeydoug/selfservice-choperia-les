import {Tela} from "./tela";

export interface Usuario {
  cpf: string;
  nome: string;
  senha: string;
  telas: Tela[];


}
