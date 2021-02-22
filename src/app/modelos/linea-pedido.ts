import { Color } from "./color";
import { Producto } from "./producto";
import { Talla } from "./talla";

export class LineaPedido {
    id: number;
    talla: Talla;
    color: Color;
    producto: Producto;
    total: number;

    constructor(){
        this.id=0;
        this.talla=new Talla();
        this.color=new Color();
        this.producto=new Producto();
        this.total=0;
    }
}