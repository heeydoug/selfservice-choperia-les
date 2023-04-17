import {Cliente} from "./cliente";
import {CartaoClienteGastos} from "./CartaoClienteGastos";

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
