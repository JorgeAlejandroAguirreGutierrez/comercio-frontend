import { Color } from "./color";
import { Producto } from "./producto";
import { Talla } from "./talla";

export class LineaPedido {
    id: number;
    talla: Talla;
    color: Color;
    producto: Producto;

    constructor(){
        this.id=0;
        this.talla=new Talla();
        this.color=new Color();
        this.producto=new Producto();
    }
}