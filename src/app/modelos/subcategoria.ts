import { Categoria } from "./categoria";
import { Subsubcategoria } from "./subsubcategoria";

export class Subcategoria {
    id: number;
    descripcion: string;
    subsubcategorias: Subsubcategoria[];
    categoria: Categoria;
        
    constructor(){
        this.id=0;
        this.descripcion="";
        this.subsubcategorias=[];
        this.categoria=null as any;
    }
}