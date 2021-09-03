import { Producto } from "./producto";

export class Detalle {
    id: number;
    filtro: string;
    valor: string;
    pvp: number;
    stock: number;
    unidad: string;
    producto: Producto;

    //BANDERAS
    banderaActualizarDetalle: boolean;

    constructor(){
        this.id=0;
        this.filtro=null as any;
        this.valor=null as any;
        this.pvp=null as any;
        this.stock=null as any;
        this.unidad=null as any;
        this.producto=null as any;
        
        //BANDERAs
        this.banderaActualizarDetalle=false;
    }
}