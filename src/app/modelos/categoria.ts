import { Subcategoria } from "./subcategoria";

export class Categoria {
    id: number;
    descripcion: string;
    subcategorias: Subcategoria[];
        
    constructor(){
        this.id=0;
        this.descripcion="";
        this.subcategorias=[];
    }
}