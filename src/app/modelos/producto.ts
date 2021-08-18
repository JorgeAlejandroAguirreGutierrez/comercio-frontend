import { Presentacion } from "./presentacion";
import { Imagen } from "./imagen";
import { Subcategoria } from "./subcategoria";
import { Categoria } from "./categoria";
import { Subsubcategoria } from "./subsubcategoria";

export class Producto {
    id: number;
    titulo: string;
    descripcion: string; 
    material: string;
    marca: string;
    categoria: Categoria;
    subcategoria: Subcategoria;
    subsubcategoria: Subsubcategoria;
    compra: number;
    precio: number;
    descuento: number;
    garantia: string;
    presentaciones: Presentacion[];
    imagenes: Imagen[];
    disponible: boolean;

    constructor(){
        this.id=0;
        this.titulo="";
        this.descripcion="";
        this.material="";
        this.marca="";
        this.categoria=new Categoria();
        this.subcategoria=new Subcategoria();
        this.subsubcategoria=new Subsubcategoria();
        this.compra=0;
        this.precio=0;
        this.descuento=0;
        this.garantia="";
        this.presentaciones=[];
        this.imagenes=[];
        this.disponible=false;
    }
}