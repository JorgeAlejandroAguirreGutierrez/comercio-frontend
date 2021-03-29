import { Color } from "./color";
import { Talla } from "./talla";

export class Presentacion {
    id: number;
    color: Color;
    talla: Talla;
    
    constructor(){
        this.id=0;
        this.color=new Color();
        this.talla=new Talla();
    }
}