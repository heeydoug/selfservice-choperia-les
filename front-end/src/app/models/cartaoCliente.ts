import {Cliente} from "./cliente";
import {CartaoClienteGastos} from "./cartaoClienteGastos";

export interface CartaoCliente {
  id?: number;
  cliente?: Cliente;
  rfid?: any;
  metodoPagamento?: string,
  entrada?: Date,
  saida?: Date,
  status?: number,
  gastos?: CartaoClienteGastos[]

}
