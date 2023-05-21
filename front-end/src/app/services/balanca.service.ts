import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BalancaService {


  porta:any;
  reader:any;
  peso:any;
  navegador:any;

  constructor() { }

  getReader():any{
    return this.reader;
  }

  getPorta():any{
    return this.porta;
  }

  async inicializarPorta(){
    if(!this.porta){

      let navegador:any;
      navegador = window.navigator;
      if (navegador && navegador.serial) {
        const portas = await navegador.serial.getPorts();
        if(localStorage.getItem('balancaIndex')){
          this.porta = portas[Number(localStorage.getItem('balancaIndex')) - 1]; // retirar o -1
        }
        else {
          localStorage.setItem("balancaIndex", portas.length);
        }
      }
    }
  }



  async readerBalanca(): Promise<any> {

    this.navegador = window.navigator;

    if (this.navegador && this.navegador.serial) {

      if(this.porta === undefined || this.porta === null){
        const porta = await this.navegador.serial.requestPort();
        await porta.open({baudRate: 9600});
        this.porta = porta;
      } else {

        try{
          await this.porta.open({baudRate: 9600});
        }catch (error) {}
      }
      while (this.porta.readable) {

        try{
          this.reader = this.porta.readable.getReader();
        }catch (error) {}
        try {
          while (true) {

            const {value, done} = await this.reader.read();

            const hex = this.buf2hex(value)
            const ascii = this.hex2a(hex)
            this.formatarPeso(ascii)
            break;
          }
        } catch (error) {
        } finally {
          try{
            this.reader.releaseLock();
          } catch (err){}

        }
      }
    }
  }

  formatarPeso(ascii: any) {

    var valor = Number(ascii);
    if (!valor) {
      valor = Number(ascii.substring(1));
    }
    this.peso = valor;
    console.log(this.peso);
  }

  buf2hex(buffer: any) { // buffer is an ArrayBuffer
    return [...new Uint8Array(buffer)]
      .map(x => x.toString(16).padStart(2, '0'))
      .join('');
  }

  toHexString(byteArray: any) {// Byte Array -> HEX
    return Array.from(byteArray,
      function (byte: any) {
        return ('0' + (byte & 0XFF).toString(16)).slice(-2);
      }).join()
  }


  hex2a(hexx: any) { // HEX-> ASCII
    var hex = hexx.toString(); //força conversão
    var str = ''
    for (var i = 0; i < hex.length; i += 2) {
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
  }
}
