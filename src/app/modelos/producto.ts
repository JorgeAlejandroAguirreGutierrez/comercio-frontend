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
        this.titulo=null as any;
        this.descripcion=null as any;
        this.material=null as any;
        this.marca=null as any;
        this.categoria=new Categoria();
        this.subcategoria=new Subcategoria();
        this.subsubcategoria=new Subsubcategoria();
        this.compra=null as any;
        this.precio=null as any;
        this.descuento=null as any;
        this.garantia=null as any;
        this.presentaciones=[];
        this.imagenes=[];
        this.disponible=false;
    }
}