import { Producto } from "./producto";

export class LineaPedido {
    id: number;
    producto: Producto;
    total: number;

    constructor(){
        this.id=0;
        this.producto=new Producto();
        this.total=0;
    }
}