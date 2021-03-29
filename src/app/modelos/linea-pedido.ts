import { Presentacion } from "./presentacion";
import { Producto } from "./producto";

export class LineaPedido {
    id: number;
    presentacion: Presentacion; 
    producto: Producto;
    total: number;

    constructor(){
        this.id=0;
        this.presentacion=new Presentacion();
        this.producto=new Producto();
        this.total=0;
    }
}