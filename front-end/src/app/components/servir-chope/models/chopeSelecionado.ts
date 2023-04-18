import {Chope} from "../../../models/chope";

export class ChopeSelecionado {
  public nomeChope?: string;
  public rfidChop?: number;
  public precoCopo?: number;

  constructor(chope: Chope) {
    this.nomeChope = chope.nome;
    this.rfidChop = chope.rfid;
    this.precoCopo = chope.precoCopo;
  }
}
