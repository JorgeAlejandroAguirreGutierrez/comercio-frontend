import { Subcategoria } from "./subcategoria";

export class Subsubcategoria {
    id: number;
    descripcion: string;
    subcategoria: Subcategoria;
        
    constructor(){
        this.id=0;
        this.descripcion="";
        this.subcategoria=null as any;
    }
}