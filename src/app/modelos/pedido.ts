import { Cliente } from "./cliente";
import { LineaPedido } from "./linea-pedido";

export class Pedido {
    id: number;
    codigo: string;
    fecha: Date;
    fechaEntrega: Date;
    qr: string;
    cantidadQr: number; 
    total: number;
    generar: boolean;
    confirmar: boolean;
    enviado: boolean;
    pagado: boolean;
    cliente: Cliente;
    lineasPedido: LineaPedido[];
    
    constructor(){
        this.id=0;
        this.codigo=null as any;
        this.fecha=null as any;
        this.fechaEntrega=null as any;
        this.qr="";
        this.cantidadQr=0;
        this.total=0;
        this.generar=false;
        this.confirmar=false;
        this.enviado=false;
        this.pagado=false;
        this.lineasPedido=[];
        this.cliente=new Cliente();
    }
}