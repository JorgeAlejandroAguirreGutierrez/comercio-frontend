import { Producto } from "./producto";

export class LineaPedido {
    id: number;
    producto: Producto;
    cantidad: number;
    total: number;

    constructor(){
        this.id=0;
        this.producto=new Producto();
        this.cantidad=0;
        this.total=0;
    }
}