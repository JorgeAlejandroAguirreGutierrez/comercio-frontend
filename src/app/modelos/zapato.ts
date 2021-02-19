import { Producto } from "./producto";

export class Zapato extends Producto {
    talla: string;
    
    constructor(){
        super();
        this.talla="";
    }
}