import {Tela} from "./tela";

export interface Usuario extends Tela{
  cpf: String;
  nome: String;
  senha: String;
  telas: Tela[];


}
